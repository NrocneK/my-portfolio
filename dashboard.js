"use strict";


/* ============================================================
   LANGUAGE
   ============================================================ */

const LANGUAGE_STORAGE_KEY =
    "portfolio-language";

// Lần đầu ghé thăm (chưa lưu lựa chọn nào) -> đoán theo ngôn ngữ trình duyệt,
// mặc định "vi" nếu không xác định được hoặc không phải "vi"
function detectBrowserLanguage() {
    const langs = navigator.languages || [navigator.language || ""];
    return langs.some((lang) => lang.toLowerCase().startsWith("vi"))
        ? "vi"
        : "en";
}

let currentLanguage =
    localStorage.getItem(LANGUAGE_STORAGE_KEY) ||
    detectBrowserLanguage();


function applyLanguage(language) {

    if (!dictionary[language]) {
        language = "vi";
    }

    currentLanguage = language;

    localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        language
    );

    document.documentElement.lang =
        language;

    applyI18nText(
        dictionary,
        language
    );

    const toggle =
        document.getElementById("langToggle");

    if (toggle) {
        toggle.textContent =
            language === "vi"
                ? "EN"
                : "VI";
    }

}


/* ============================================================
   LANGUAGE TOGGLE
   ============================================================ */

function initLanguageToggle() {

    const toggle =
        document.getElementById("langToggle");

    if (!toggle) {
        return;
    }

    toggle.addEventListener(
        "click",
        () => {

            const nextLanguage =
                currentLanguage === "vi"
                    ? "en"
                    : "vi";

            applyLanguage(nextLanguage);

        }
    );

}


/* ============================================================
   SCROLL SPY
   ============================================================ */

function initScrollSpy() {

    const links =
        Array.from(
            document.querySelectorAll(
                ".site-nav a[data-section]"
            )
        );

    const sections =
        Array.from(
            document.querySelectorAll(
                "[data-section-target]"
            )
        );


    if (!links.length || !sections.length) {
        return;
    }


    function setActive(sectionId) {

        links.forEach((link) => {

            link.classList.toggle(
                "active",
                link.dataset.section === sectionId
            );

        });

    }


    function update() {

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.35;


        const documentBottom =
            document.documentElement.scrollHeight -
            window.innerHeight;


        /*
         * Contact must become active when the user reaches
         * the bottom of the page.
         */

        if (
            window.scrollY >=
            documentBottom - 40
        ) {

            setActive("contact");

            return;
        }


        let current = "top";


        sections.forEach((section) => {

            if (
                section.offsetTop <= scrollPosition
            ) {

                const id =
                    section.dataset.sectionTarget;

                /*
                 * "other-projects" and "experience" do not
                 * have direct navigation links.
                 */

                if (
                    links.some(
                        (link) =>
                            link.dataset.section === id
                    )
                ) {
                    current = id;
                }

                if (id === "other-projects") {
                    current = "projects";
                }

                if (id === "experience") {
                    current = "skills";
                }

            }

        });


        setActive(current);

    }


    links.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                setActive(
                    link.dataset.section
                );

            }
        );

    });


    // Throttle bằng rAF thay vì chạy update() trên mọi sự kiện scroll thô
    // (nhiều sự kiện scroll có thể bắn ra trong 1 frame) — giữ nguyên cách
    // xác định section đang active (offsetTop), KHÔNG đổi sang
    // IntersectionObserver vì kiểu "nhiều mục giao nhau cùng lúc" từng gây
    // flicker ở timeline glow trước đây.
    let ticking = false;

    function onScroll() {
        if (ticking) {
            return;
        }
        ticking = true;
        requestAnimationFrame(() => {
            update();
            ticking = false;
        });
    }

    window.addEventListener(
        "scroll",
        onScroll,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        onScroll
    );


    update();

}


/* ============================================================
   CONTACT FORM
   ============================================================ */

// Đổi URL production sau khi deploy backend
const CONTACT_API_URL =
    ["localhost", "127.0.0.1"].includes(window.location.hostname)
        ? "http://localhost:3001/api/contact"
        : "https://my-portfolio-6o01.onrender.com/api/contact";

const CONTACT_MESSAGES = {
    vi: {
        sending: "Đang gửi...",
        success: "Đã gửi thành công. Mình sẽ phản hồi sớm nhất có thể!",
        invalid: "Vui lòng điền đầy đủ và kiểm tra lại địa chỉ email.",
        rateLimited: "Bạn gửi quá nhiều tin nhắn. Vui lòng thử lại sau.",
        failed: "Không gửi được tin nhắn. Vui lòng thử lại hoặc email trực tiếp cho mình.",
        network: "Không kết nối được máy chủ. Vui lòng thử lại sau."
    },
    en: {
        sending: "Sending...",
        success: "Message sent. I'll get back to you soon!",
        invalid: "Please fill in every field and check your email address.",
        rateLimited: "Too many messages. Please try again later.",
        failed: "Could not send your message. Please try again or email me directly.",
        network: "Cannot reach the server. Please try again later."
    }
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


function initContactForm() {

    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    const submitButton = document.getElementById("contactSubmit");

    if (!form || !status || !submitButton) {
        return;
    }

    let hideStatusTimer = null;

    function setStatus(type, key) {
        if (hideStatusTimer) {
            clearTimeout(hideStatusTimer);
            hideStatusTimer = null;
        }

        status.className = type ? `form-status ${type}` : "form-status";
        status.textContent = CONTACT_MESSAGES[currentLanguage][key];

        // Thông báo lỗi/đang gửi giữ nguyên để người dùng đọc và xử lý;
        // chỉ thông báo THÀNH CÔNG mới tự ẩn sau một lúc.
        if (type === "success") {
            hideStatusTimer = setTimeout(() => {
                status.className = "form-status";
                status.textContent = "";
                hideStatusTimer = null;
            }, 6000);
        }
    }

    function setSubmitting(isSubmitting) {
        submitButton.disabled = isSubmitting;
        submitButton.classList.toggle("is-loading", isSubmitting);
        if (isSubmitting) {
            submitButton.setAttribute("aria-busy", "true");
        } else {
            submitButton.removeAttribute("aria-busy");
        }
    }

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        if (submitButton.disabled) {
            return;
        }

        const data = Object.fromEntries(new FormData(form));

        const payload = {
            name: (data.name || "").trim(),
            email: (data.email || "").trim(),
            subject: (data.subject || "").trim(),
            message: (data.message || "").trim(),
            website: data.website || ""      // honeypot
        };

        // Form đang có novalidate nên phải tự kiểm tra
        if (
            !payload.name ||
            !payload.subject ||
            !payload.message ||
            !EMAIL_PATTERN.test(payload.email)
        ) {
            setStatus("error", "invalid");
            return;
        }

        setSubmitting(true);
        setStatus("", "sending");

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        try {
            const response = await fetch(CONTACT_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            if (response.ok) {
                form.reset();
                setStatus("success", "success");
            } else if (response.status === 429) {
                setStatus("error", "rateLimited");
            } else if (response.status === 400) {
                setStatus("error", "invalid");
            } else {
                setStatus("error", "failed");
            }

        } catch (error) {
            setStatus("error", "network");

        } finally {
            clearTimeout(timeoutId);
            setSubmitting(false);
        }
    });
}



/* ============================================================
   SCROLL REVEAL
   Mỗi section chỉ cần lộ diện MỘT LẦN khi vào viewport (không cần chọn
   ra "mục đang active" giữa nhiều mục như scroll-spy), nên
   IntersectionObserver ở đây an toàn — khác trường hợp timeline glow
   từng bị flicker vì phải phân xử nhiều mục giao nhau cùng lúc.
   ============================================================ */

function initScrollReveal() {

    const targets = Array.from(
        document.querySelectorAll(".section")
    ).filter((el) => el.id !== "hero");

    if (!targets.length || !("IntersectionObserver" in window)) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-revealed");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => {
        el.classList.add("reveal-on-scroll");
        observer.observe(el);
    });
}


/* ============================================================
   READING PROGRESS + BACK TO TOP
   ============================================================ */

function initReadingProgress() {

    const bar = document.getElementById("readingProgress");
    if (!bar) {
        return;
    }

    let ticking = false;

    function update() {
        const scrollTop = window.scrollY;
        const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
        const ratio = docHeight > 0
            ? Math.min(Math.max(scrollTop / docHeight, 0), 1)
            : 0;
        bar.style.transform = `scaleX(${ratio})`;
    }

    function onScroll() {
        if (ticking) {
            return;
        }
        ticking = true;
        requestAnimationFrame(() => {
            update();
            ticking = false;
        });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
}

function initBackToTop() {

    const button = document.getElementById("backToTop");
    if (!button) {
        return;
    }

    function onScroll() {
        button.classList.toggle("is-visible", window.scrollY > 600);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


/* ============================================================
   INIT
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        applyLanguage(
            currentLanguage
        );

        initLanguageToggle();
        initScrollSpy();
        initContactForm();
        initScrollReveal();
        initReadingProgress();
        initBackToTop();

    }
);