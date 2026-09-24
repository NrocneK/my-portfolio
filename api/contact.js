const nodemailer = require('nodemailer');

const RATE_WINDOW_MS = 60 * 1000;
const RATE_LIMIT = 5;

const attempts = new Map();


function getClientIp(req) {

    const forwarded =
        req.headers['x-forwarded-for'];

    if (
        typeof forwarded === 'string' &&
        forwarded.length > 0
    ) {
        return forwarded
            .split(',')[0]
            .trim();
    }

    return (
        req.socket?.remoteAddress ||
        'unknown'
    );
}


function isRateLimited(ip) {

    const now =
        Date.now();

    const entry =
        attempts.get(ip);


    if (
        !entry ||
        now - entry.startedAt >
        RATE_WINDOW_MS
    ) {

        attempts.set(
            ip,
            {
                startedAt: now,
                count: 1
            }
        );

        return false;
    }


    entry.count += 1;

    return (
        entry.count >
        RATE_LIMIT
    );
}


function clean(
    value,
    maxLength
) {

    return String(
        value ?? ''
    )
        .trim()
        .slice(
            0,
            maxLength
        );
}


function escapeHtml(
    value
) {

    return value
        .replace(
            /&/g,
            '&amp;'
        )
        .replace(
            /</g,
            '&lt;'
        )
        .replace(
            />/g,
            '&gt;'
        )
        .replace(
            /"/g,
            '&quot;'
        )
        .replace(
            /'/g,
            '&#039;'
        );
}


module.exports =
    async function handler(
        req,
        res
    ) {

        if (
            req.method !== 'POST'
        ) {

            return res
                .status(405)
                .json({
                    success: false,
                    message:
                        'Method not allowed'
                });

        }


        const ip =
            getClientIp(req);


        if (
            isRateLimited(ip)
        ) {

            return res
                .status(429)
                .json({
                    success: false,
                    message:
                        'Too many requests'
                });

        }


        let body;

        try {

            body =
                typeof req.body === 'string'
                    ? JSON.parse(
                        req.body || '{}'
                    )
                    : (
                        req.body || {}
                    );

        } catch {

            return res
                .status(400)
                .json({
                    success: false,
                    message:
                        'Invalid request body'
                });

        }


        /*
         * Honeypot.
         * Bot điền field này sẽ nhận success giả
         * để tránh tiết lộ cơ chế chống bot.
         */

        if (
            clean(
                body.website,
                100
            )
        ) {

            return res
                .status(200)
                .json({
                    success: true
                });

        }


        const name =
            clean(
                body.name,
                80
            );

        const email =
            clean(
                body.email,
                160
            );

        const subject =
            clean(
                body.subject,
                160
            );

        const message =
            clean(
                body.message,
                4000
            );


        const emailValid =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(email);


        if (
            !name ||
            !emailValid ||
            !subject ||
            !message
        ) {

            return res
                .status(400)
                .json({
                    success: false,
                    message:
                        'Invalid form data'
                });

        }


        if (
            !process.env.SMTP_USER ||
            !process.env.SMTP_PASSWORD ||
            !process.env.CONTACT_RECEIVER
        ) {

            console.error(
                'Missing required SMTP environment variables.'
            );

            return res
                .status(500)
                .json({
                    success: false,
                    message:
                        'Mail service is not configured'
                });

        }


        const port =
            Number(
                process.env.SMTP_PORT ||
                465
            );


        const secure =
            port === 465;


        const transporter =
            nodemailer.createTransport({
                host:
                    process.env.SMTP_HOST ||
                    'smtp.gmail.com',

                port,

                secure,

                auth: {
                    user:
                        process.env.SMTP_USER,

                    pass:
                        process.env.SMTP_PASSWORD
                }
            });


        try {

            await transporter.sendMail({

                from:
                    `Portfolio Contact <${process.env.SMTP_USER}>`,

                to:
                    process.env.CONTACT_RECEIVER,

                replyTo:
                    email,

                subject:
                    `[Portfolio] ${subject}`,

                text: [
                    `Name: ${name}`,
                    `Email: ${email}`,
                    '',
                    message
                ].join('\n'),

                html: `
          <div
            style="
              font-family:Arial,sans-serif;
              line-height:1.6
            "
          >

            <h2>
              New portfolio contact
            </h2>

            <p>
              <strong>Name:</strong>
              ${escapeHtml(name)}
            </p>

            <p>
              <strong>Email:</strong>
              ${escapeHtml(email)}
            </p>

            <p>
              <strong>Subject:</strong>
              ${escapeHtml(subject)}
            </p>

            <hr>

            <p
              style="
                white-space:pre-wrap
              "
            >
              ${escapeHtml(message)}
            </p>

          </div>
        `

            });


            return res
                .status(200)
                .json({
                    success: true
                });


        } catch (error) {

            console.error(
                'SMTP send error:',
                error
            );

            return res
                .status(500)
                .json({
                    success: false,
                    message:
                        'Failed to send email'
                });

        }

    };