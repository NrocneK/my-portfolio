"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { Resend } = require("resend");


/* ============================================================
   CONFIG
   ============================================================ */

const {
    RESEND_API_KEY,
    MAIL_FROM = "onboarding@resend.dev",
    MAIL_TO,
    ALLOWED_ORIGIN = "",
    PORT = 3001
} = process.env;

if (!RESEND_API_KEY || !MAIL_TO) {
    console.error("Thiếu RESEND_API_KEY hoặc MAIL_TO trong .env");
    process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);

const allowedOrigins = ALLOWED_ORIGIN
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

// Giới hạn độ dài khớp với maxlength trong index.html
const LIMITS = { name: 100, email: 254, subject: 200, message: 5000 };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


/* ============================================================
   HELPERS
   ============================================================ */

// Xóa ký tự xuống dòng để chống header injection (subject, name)
function singleLine(value, max) {
    return typeof value === "string"
        ? value.replace(/[\r\n]+/g, " ").trim().slice(0, max)
        : "";
}

function multiLine(value, max) {
    return typeof value === "string"
        ? value.replace(/\r\n/g, "\n").trim().slice(0, max)
        : "";
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Email HTML dùng bố cục table + style inline để hiển thị đúng trên mọi client
// (Gmail, Outlook... thường bỏ qua <style> trong <head> hoặc CSS hiện đại)
function buildContactEmailHtml({ name, email, subject, message }) {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
    const initial = escapeHtml(name.trim().charAt(0).toUpperCase() || "?");

    return `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#eef1f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef1f8;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(20,25,45,0.08);">

  <tr>
    <td style="background:linear-gradient(135deg,#496fe8,#7c9cff);padding:28px 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="color:#ffffff;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;opacity:0.9;">
            Tin nhắn mới từ Portfolio
          </td>
        </tr>
        <tr>
          <td style="color:#ffffff;font-size:22px;font-weight:800;padding-top:6px;">
            ${safeSubject}
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr>
    <td style="padding:28px 32px 8px 32px;">
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td style="width:44px;height:44px;border-radius:50%;background:#e8edfc;color:#496fe8;font-size:18px;font-weight:800;text-align:center;vertical-align:middle;" valign="middle" align="center">
            ${initial}
          </td>
          <td style="padding-left:14px;">
            <div style="font-size:15px;font-weight:700;color:#101522;">${safeName}</div>
            <a href="mailto:${safeEmail}" style="font-size:13px;color:#496fe8;text-decoration:none;">${safeEmail}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr>
    <td style="padding:16px 32px 32px 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f7fb;border:1px solid #e5e9f2;border-radius:12px;">
        <tr>
          <td style="padding:20px 22px;font-size:15px;line-height:1.7;color:#333c4d;white-space:pre-wrap;">${safeMessage}</td>
        </tr>
      </table>
    </td>
  </tr>

  <tr>
    <td style="padding:0 32px 28px 32px;">
      <a href="mailto:${safeEmail}?subject=${encodeURIComponent("Re: " + subject)}"
         style="display:inline-block;background-color:#496fe8;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:10px;">
        Trả lời ${safeName}
      </a>
    </td>
  </tr>

  <tr>
    <td style="padding:18px 32px;background-color:#f5f7fb;border-top:1px solid #e5e9f2;">
      <div style="font-size:12px;color:#778196;">Gửi tự động từ form liên hệ trên portfolio của bạn.</div>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}


/* ============================================================
   APP
   ============================================================ */

const app = express();

// Cần khi deploy sau reverse proxy (Render, Railway, Vercel...) để rate limit đọc đúng IP
app.set("trust proxy", 1);

app.use(express.json({ limit: "20kb" }));

app.use(
    cors({
        origin(origin, callback) {
            // Cho phép request không có Origin (curl, health check)
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Origin không được phép"));
        },
        methods: ["POST", "GET"]
    })
);

const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,   // 1 giờ
    limit: 5,                   // tối đa 5 tin / IP / giờ
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({ ok: false, error: "RATE_LIMITED" });
    }
});


app.get("/api/health", (req, res) => {
    res.json({ ok: true });
});


app.post("/api/contact", contactLimiter, async (req, res) => {

    const body = req.body || {};

    // Honeypot: bot điền ô ẩn → giả vờ thành công, không gửi mail
    if (typeof body.website === "string" && body.website.trim() !== "") {
        return res.json({ ok: true });
    }

    const name = singleLine(body.name, LIMITS.name);
    const email = singleLine(body.email, LIMITS.email);
    const subject = singleLine(body.subject, LIMITS.subject);
    const message = multiLine(body.message, LIMITS.message);

    const invalidFields = [];
    if (!name) invalidFields.push("name");
    if (!EMAIL_PATTERN.test(email)) invalidFields.push("email");
    if (!subject) invalidFields.push("subject");
    if (!message) invalidFields.push("message");

    if (invalidFields.length > 0) {
        return res.status(400).json({
            ok: false,
            error: "VALIDATION",
            fields: invalidFields
        });
    }

    try {
        const { error } = await resend.emails.send({
            // Chưa verify domain riêng thì bắt buộc phải là onboarding@resend.dev
            from: `Portfolio Contact <${MAIL_FROM}>`,
            to: MAIL_TO,
            // Bấm Reply trong hộp thư sẽ trả lời thẳng cho người gửi
            replyTo: `${name} <${email}>`,
            subject: `[Portfolio] ${subject}`,
            text: `Từ: ${name} <${email}>\n\n${message}`,
            html: buildContactEmailHtml({ name, email, subject, message })
        });

        if (error) {
            console.error("Gửi mail thất bại:", error.message || error);
            return res.status(500).json({ ok: false, error: "SEND_FAILED" });
        }

        return res.json({ ok: true });

    } catch (error) {
        console.error("Gửi mail thất bại:", error.message);
        return res.status(500).json({ ok: false, error: "SEND_FAILED" });
    }
});


// Bắt lỗi chung (vd: CORS bị từ chối, JSON sai định dạng)
app.use((error, req, res, next) => {
    const status = error.type === "entity.parse.failed" ? 400 : 403;
    res.status(status).json({ ok: false, error: "BAD_REQUEST" });
});


app.listen(PORT, () => {
    console.log(`Mail server chạy tại http://localhost:${PORT}`);
});