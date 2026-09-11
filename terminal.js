/* ================= CONTENT (all real — matches dashboard.html / story.html) ================= */
const T = {
  vi: {
    bootLines: [
      "Đang khởi động ops-console…",
      "Nạp hồ sơ: Ngô Minh Nhựt…",
      "Gắn kết /skills … OK",
      "Gắn kết /projects (4) … OK",
      "Thiết lập kết nối TP.HCM · GMT+7 … OK",
      "Sẵn sàng. Gõ \u201chelp\u201d để xem danh sách lệnh, hoặc chạm vào một lệnh gợi ý bên dưới."
    ],
    helpIntro: "Các lệnh khả dụng:",
    help: [
      ["about", "giới thiệu ngắn về tôi"],
      ["education", "học vấn & đồ án tốt nghiệp"],
      ["experience", "kinh nghiệm làm việc"],
      ["thesis", "chi tiết đồ án tổng đài VoIP/Asterisk"],
      ["skills", "kỹ năng & công cụ"],
      ["projects [1-4]", "danh sách dự án, hoặc chi tiết 1 dự án"],
      ["contact", "thông tin liên hệ"],
      ["cv", "tải CV (theo ngôn ngữ hiện tại)"],
      ["lang vi|en", "đổi ngôn ngữ"],
      ["theme", "đổi giao diện sáng/tối"],
      ["clear", "xoá màn hình"]
    ],
    about: [
      "Ngô Minh Nhựt — lập trình viên Fullstack, TP. Hồ Chí Minh.",
      "Tốt nghiệp Điện tử Viễn thông tại Đại học Bách Khoa TP.HCM (2024), hiện là Quản lý kho vận tại Phương Nam Retail, phụ trách một đội 5 người — song song tự học và chuyển hướng sang lập trình web.",
      "Các dự án đều xuất phát từ vấn đề vận hành thật mà tôi trực tiếp gặp ở kho hàng, không phải bài tập lý thuyết."
    ],
    education: {
      heading: "Học vấn",
      rows: [
        ["Trường", "Đại học Bách Khoa TP.HCM (HCMUT)"],
        ["Chuyên ngành", "Điện tử Viễn thông"],
        ["Tốt nghiệp", "2024"],
        ["Đồ án tốt nghiệp", "Nghiên cứu và xây dựng tổng đài VoIP trên nền tảng Asterisk"]
      ],
      hint: "Gõ \u201cthesis\u201d để xem chi tiết đồ án."
    },
    experience: {
      heading: "Kinh nghiệm",
      body: [
        "Quản lý kho vận — Phương Nam Retail Co., Ltd (hiện tại)",
        "Phụ trách một đội ngũ 5 người, xử lý toàn bộ quy trình nhập – xuất – kiểm kê hàng hoá.",
        "Trong lúc làm việc, tự học lập trình web và ứng dụng trực tiếp hiểu biết CNTT vào chính công việc vận hành — từ đó hình thành WMS Pro và các dự án fullstack khác."
      ]
    },
    thesis: [
      "Đồ án tốt nghiệp — Điện tử Viễn thông, HCMUT (2024)",
      "Đề tài: nghiên cứu và xây dựng tổng đài VoIP (switchboard) trên nền tảng Asterisk.",
      "Đây là nền tảng cho cách tiếp cận vấn đề mang tính hệ thống mà tôi mang sang lập trình web sau này: tách lớp rõ ràng, xử lý luồng dữ liệu/tín hiệu có kiểm soát."
    ],
    skillsHeading: "Kỹ năng & Công cụ",
    skillGroups: [
      { label: "Ngôn ngữ & Framework", tags: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Next.js", "Node.js"], desc: "Dùng xuyên suốt trong cả 4 dự án đã xây dựng — từ giao diện React/Next.js đến backend Node.js/Express." },
      { label: "Cơ sở dữ liệu & Công cụ", tags: ["MySQL", "Git & GitHub"], desc: "MySQL là lựa chọn cơ sở dữ liệu cho cả 4 dự án (raw SQL qua mysql2 ở WMS Pro, Prisma ORM ở My HRMS); Git/GitHub dùng để quản lý toàn bộ mã nguồn." },
      { label: "Backend & Realtime", tags: ["Express.js", "JWT", "Socket.IO", "WebRTC", "Prisma", "NextAuth.js"], desc: "Xác thực JWT và phân quyền theo vai trò trong cả 4 dự án; Socket.IO/WebRTC cho nhắn tin và gọi video thời gian thực trong Communix; Prisma ORM và NextAuth.js trong My HRMS." },
      { label: "Hỗ trợ bởi AI", tags: ["Claude", "ChatGPT", "Gemini"], desc: "Dùng AI hỗ trợ viết code, debug và tăng tốc học công nghệ mới trong quá trình tự học." }
    ],
    projectsHeading: "Dự án (4)",
    projectsHint: "Gõ \u201cprojects 1\u201d đến \u201cprojects 4\u201d để xem chi tiết từng dự án.",
    projects: [
      {
        name: "WMS Pro", tag: "01/04",
        problemLabel: "Bài toán", problem: "Tại kho hàng nơi tôi quản lý, quy trình nhập – xuất – kiểm kê phần lớn xử lý thủ công, gây mất thời gian và dễ sai sót khi làm việc với một đội 5 người.",
        solutionLabel: "Giải pháp", solution: "Tự thiết kế và xây dựng WMS Pro — hệ thống quản lý kho vận fullstack cho nghiệp vụ nhà sách/xuất bản (Node.js, Express, MySQL, React). JWT access+refresh token; phân quyền Admin (toàn hệ thống) vs Thủ kho (theo từng kho); tồn kho nhiều kho thời gian thực; nhập/xuất Excel; tự sinh phiếu xuất kho; audit log mọi thao tác ghi.",
        resultLabel: "Kết quả", result: "Rút gọn đáng kể quy trình và thời gian thao tác so với cách làm thủ công trước đó. Backend deploy trên Render, MySQL trên Aiven Cloud — dự án tâm đắc nhất vì sinh ra từ vấn đề thật, không phải bài tập lý thuyết.",
        links: [["Backend", "https://github.com/NrocneK/wms-pro-backend"], ["Frontend", "https://github.com/NrocneK/wms-pro-frontend"]]
      },
      {
        name: "My Shop (BagStore)", tag: "02/04",
        problemLabel: "Bài toán", problem: "Cần thực hành xây dựng một luồng thương mại điện tử hoàn chỉnh, từ trưng bày sản phẩm đến giỏ hàng.",
        solutionLabel: "Giải pháp", solution: "Xây dựng BagStore — website bán túi xách & balo với giỏ hàng lai (khách vãng lai lưu ở trình duyệt, user đăng nhập đồng bộ DB), tích hợp thanh toán MoMo (QR/deep-link) và VietQR, theo dõi đơn hàng công khai không cần đăng nhập, dashboard quản trị doanh thu/đơn hàng/sản phẩm theo biến thể màu/size.",
        resultLabel: "Kết quả", result: "Hệ thống hơn 45 API endpoint trên database 13 bảng, đã qua 10 phiên bản lặp (V10). Nắm vững luồng e-commerce fullstack từ giao diện React đến tích hợp cổng thanh toán thật.",
        links: [["Repo", "https://github.com/NrocneK/my-shop"]]
      },
      {
        name: "My HRMS", tag: "03/04",
        problemLabel: "Bài toán", problem: "Doanh nghiệp nhỏ cần một công cụ tập trung để theo dõi thông tin nhân sự, thay vì quản lý rời rạc trên bảng tính.",
        solutionLabel: "Giải pháp", solution: "Xây dựng My HRMS trên Next.js 14 (App Router) + Prisma ORM + NextAuth.js, phân quyền 3 cấp Admin/HR/Employee với ma trận quyền hạn riêng cho từng tính năng. CRUD hồ sơ nhân viên, quản lý phòng ban, chấm công vào/ra kèm lịch sử, tự phục vụ nhân viên.",
        resultLabel: "Kết quả", result: "Hệ thống CRUD hoàn chỉnh với phân quyền chi tiết theo tính năng, giao diện responsive Tailwind, deploy Vercel + PlanetScale MySQL — minh hoạ khả năng thiết kế cơ sở dữ liệu quan hệ.",
        links: [["Repo", "https://github.com/NrocneK/my-hrms"]]
      },
      {
        name: "Communix", tag: "04/04",
        problemLabel: "Bài toán", problem: "Muốn thử sức với bài toán giao tiếp thời gian thực — khác hẳn các hệ thống quản lý CRUD thông thường.",
        solutionLabel: "Giải pháp", solution: "Xây dựng Communix — ứng dụng chat phong cách Zalo (Node.js, Express, TypeScript, MySQL). OTP email + reCAPTCHA khi đăng ký; JWT access/refresh. Chat realtime qua Socket.IO: reaction, thu hồi/sửa tin, ghim tối đa 3 tin/hội thoại, mute, tìm kiếm. Gọi thoại/video WebRTC mesh tối đa 4 người, tự host TURN server.",
        resultLabel: "Kết quả", result: "Trải qua 13 giai đoạn phát triển, 22 unit test (Jest) cho validate/xử lý dữ liệu, rate limiting cho endpoint nhạy cảm — mở rộng kỹ năng sang xử lý dữ liệu thời gian thực, ngoài phạm vi CRUD truyền thống.",
        links: [["Backend", "https://github.com/NrocneK/communix-backend"], ["Frontend", "https://github.com/NrocneK/communix-frontend"]]
      }
    ],
    contactHeading: "Kết nối",
    contactRows: [
      ["GitHub", "github.com/NrocneK", "https://github.com/NrocneK"],
      ["Email", "kdc.1110639@gmail.com", "mailto:kdc.1110639@gmail.com"],
      ["Điện thoại / Zalo", "+84 938 842 993", "tel:+84938842993"]
    ],
    contactLede: "Đang tìm cơ hội bắt đầu sự nghiệp lập trình viên fullstack. Rất vui nếu bạn muốn trao đổi thêm về cơ hội hợp tác hoặc công việc — qua GitHub, email hoặc Zalo ở trên.",
    cvDownloading: "Đang tải CV_NgoMinhNhut_VI.docx…",
    langSet: "Đã chuyển ngôn ngữ sang Tiếng Việt.",
    themeSet: theme => `Đã chuyển giao diện sang ${theme === "dark" ? "tối" : "sáng"}.`,
    clearedHint: "Đã xoá màn hình. Gõ \u201chelp\u201d để xem lại danh sách lệnh.",
    notFound: cmd => `command not found: ${cmd} — gõ \u201chelp\u201d để xem danh sách lệnh.`,
    projectNotFound: "Không tìm thấy dự án đó — dùng \u201cprojects\u201d để xem danh sách (1-4).",
    sudo: [
      "[sudo] password for ken: ********",
      "Xin lỗi, bạn không cần mật khẩu để làm điều này — chỉ cần một lời nhắn.",
      "Đang tìm cơ hội bắt đầu sự nghiệp lập trình viên fullstack. Liên hệ qua \u201ccontact\u201d ở trên nhé."
    ],
    exit: "Không có gì để thoát cả — nhưng nếu bạn muốn xem giao diện khác, có nút \u201cXem bản Dashboard\u201d / \u201cXem bản Story\u201d phía trên.",
    dateLabel: "Giờ hiện tại (GMT+7):",
    chips: ["help", "about", "skills", "projects", "thesis", "contact", "cv"]
  },
  en: {
    bootLines: [
      "Booting ops-console…",
      "Loading profile: Ngo Minh Nhut…",
      "Mounting /skills … OK",
      "Mounting /projects (4) … OK",
      "Establishing uplink Ho Chi Minh City · GMT+7 … OK",
      "Ready. Type \u201chelp\u201d for the command list, or tap a suggestion below."
    ],
    helpIntro: "Available commands:",
    help: [
      ["about", "short intro about me"],
      ["education", "education & thesis"],
      ["experience", "work experience"],
      ["thesis", "details on the VoIP/Asterisk thesis"],
      ["skills", "skills & tools"],
      ["projects [1-4]", "project list, or one project's detail"],
      ["contact", "contact info"],
      ["cv", "download CV (current language)"],
      ["lang vi|en", "switch language"],
      ["theme", "toggle dark/light"],
      ["clear", "clear the screen"]
    ],
    about: [
      "Ngo Minh Nhut — Fullstack Developer, Ho Chi Minh City.",
      "Graduated in Electronics & Telecommunications from Ho Chi Minh City University of Technology (2024). Currently a Warehouse Supervisor at Phuong Nam Retail, managing a team of five — while self-teaching and pivoting into web development.",
      "Every project here started from a real operational problem I faced at the warehouse, not a theoretical exercise."
    ],
    education: {
      heading: "Education",
      rows: [
        ["School", "Ho Chi Minh City University of Technology (HCMUT)"],
        ["Major", "Electronics & Telecommunications Engineering"],
        ["Graduated", "2024"],
        ["Thesis", "Researching and building a VoIP switchboard system based on Asterisk"]
      ],
      hint: "Type \u201cthesis\u201d for more detail."
    },
    experience: {
      heading: "Experience",
      body: [
        "Warehouse Supervisor — Phuong Nam Retail Co., Ltd (current)",
        "Manages a team of five, overseeing the full inbound–outbound–stocktaking process.",
        "While working, self-taught web development and applied that knowledge directly to warehouse operations — which is how WMS Pro and the other fullstack projects came to be."
      ]
    },
    thesis: [
      "Graduation thesis — Electronics & Telecommunications, HCMUT (2024)",
      "Topic: researching and building a VoIP switchboard system based on Asterisk.",
      "It shaped the systems-first way I approach problems now in web development: clear separation of layers, controlled handling of data/signal flow."
    ],
    skillsHeading: "Skills & Tools",
    skillGroups: [
      { label: "Languages & Frameworks", tags: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Next.js", "Node.js"], desc: "Used throughout all 4 projects built so far — from React/Next.js UIs to Node.js/Express backends." },
      { label: "Database & Tools", tags: ["MySQL", "Git & GitHub"], desc: "MySQL is the database of choice across all 4 projects (raw SQL via mysql2 in WMS Pro, Prisma ORM in My HRMS); Git/GitHub manages the entire codebase." },
      { label: "Backend & Realtime", tags: ["Express.js", "JWT", "Socket.IO", "WebRTC", "Prisma", "NextAuth.js"], desc: "JWT auth and role-based access across all 4 projects; Socket.IO/WebRTC power real-time messaging and video calls in Communix; Prisma ORM and NextAuth.js in My HRMS." },
      { label: "AI-Assisted", tags: ["Claude", "ChatGPT", "Gemini"], desc: "Uses AI to speed up writing code, debugging, and learning new tech while self-teaching." }
    ],
    projectsHeading: "Projects (4)",
    projectsHint: "Type \u201cprojects 1\u201d through \u201cprojects 4\u201d for a project's detail.",
    projects: [
      {
        name: "WMS Pro", tag: "01/04",
        problemLabel: "Problem", problem: "At the warehouse I supervise, the inbound–outbound–stocktaking process was mostly manual, wasting time and prone to error with a team of five.",
        solutionLabel: "Solution", solution: "Designed and built WMS Pro — a fullstack warehouse management system for bookstore/publishing operations (Node.js, Express, MySQL, React). JWT access+refresh tokens; role-based access — Admin (whole system) vs Warehouse Keeper (own warehouse only); real-time multi-warehouse stock; Excel import/export; auto-generated picking slips; audit log for every write.",
        resultLabel: "Result", result: "Significantly cut down process steps and handling time compared to the previous manual approach. Backend deployed on Render, MySQL on Aiven Cloud — the most treasured project because it came from a real problem, not a theoretical exercise.",
        links: [["Backend", "https://github.com/NrocneK/wms-pro-backend"], ["Frontend", "https://github.com/NrocneK/wms-pro-frontend"]]
      },
      {
        name: "My Shop (BagStore)", tag: "02/04",
        problemLabel: "Problem", problem: "Needed practice building a complete e-commerce flow, from product display to checkout.",
        solutionLabel: "Solution", solution: "Built BagStore — a bags & backpacks e-commerce site with a hybrid cart (guests use browser storage, logged-in users sync to DB), MoMo (QR/deep-link) and VietQR payment integration, public order tracking with no login, admin dashboard for revenue/orders/products with color/size variants.",
        resultLabel: "Result", result: "A system with 45+ API endpoints on a 13-table database, now at its 10th iteration (V10). Gained a solid grasp of the fullstack e-commerce flow, from the React UI to a real payment gateway integration.",
        links: [["Repo", "https://github.com/NrocneK/my-shop"]]
      },
      {
        name: "My HRMS", tag: "03/04",
        problemLabel: "Problem", problem: "A small business needed one central tool to track employee information instead of scattered spreadsheets.",
        solutionLabel: "Solution", solution: "Built My HRMS on Next.js 14 (App Router) + Prisma ORM + NextAuth.js, with 3-tier role-based access — Admin/HR/Employee, each with its own permission matrix per feature. Full CRUD for employee records, department management, clock-in/clock-out with history, employee self-service.",
        resultLabel: "Result", result: "A complete CRUD system with fine-grained, feature-level permissions, a responsive Tailwind UI, deployed on Vercel + PlanetScale MySQL — demonstrating relational database design skills.",
        links: [["Repo", "https://github.com/NrocneK/my-hrms"]]
      },
      {
        name: "Communix", tag: "04/04",
        problemLabel: "Problem", problem: "Wanted to take on real-time communication — a different challenge from typical CRUD management systems.",
        solutionLabel: "Solution", solution: "Built Communix — a Zalo-style chat app (Node.js, Express, TypeScript, MySQL). Email OTP + reCAPTCHA on sign-up; JWT access/refresh. Real-time chat over Socket.IO: reactions, message recall/edit, pinning up to 3 messages per conversation, muting, search. Voice/video calls over WebRTC, mesh topology up to 4 people, self-hosted TURN server.",
        resultLabel: "Result", result: "Went through 13 development phases, 22 unit tests (Jest) for validation/data handling, rate limiting on sensitive endpoints — extended skills into real-time data handling, beyond traditional CRUD.",
        links: [["Backend", "https://github.com/NrocneK/communix-backend"], ["Frontend", "https://github.com/NrocneK/communix-frontend"]]
      }
    ],
    contactHeading: "Contact",
    contactRows: [
      ["GitHub", "github.com/NrocneK", "https://github.com/NrocneK"],
      ["Email", "kdc.1110639@gmail.com", "mailto:kdc.1110639@gmail.com"],
      ["Phone / Zalo", "+84 938 842 993", "tel:+84938842993"]
    ],
    contactLede: "Looking to start a career as a fullstack developer. Happy to talk more about opportunities or work — via GitHub, email, or Zalo above.",
    cvDownloading: "Downloading CV_NgoMinhNhut_EN.docx…",
    langSet: "Language switched to English.",
    themeSet: theme => `Theme switched to ${theme}.`,
    clearedHint: "Screen cleared. Type \u201chelp\u201d to see the command list again.",
    notFound: cmd => `command not found: ${cmd} — type \u201chelp\u201d for the command list.`,
    projectNotFound: "Project not found — use \u201cprojects\u201d to see the list (1-4).",
    sudo: [
      "[sudo] password for ken: ********",
      "You don't actually need a password for this — just a message.",
      "Looking to start a career as a fullstack developer. Use \u201ccontact\u201d above to reach out."
    ],
    exit: "Nothing to exit here — but if you want a different view, use \u201cView Dashboard\u201d / \u201cView Story\u201d above.",
    dateLabel: "Current time (GMT+7):",
    chips: ["help", "about", "skills", "projects", "thesis", "contact", "cv"]
  }
};

/* ================= STATE ================= */
const state = { lang: "vi", history: [], historyIndex: -1 };
const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const outputEl = document.getElementById("termOutput");
const inputEl = document.getElementById("termInput");
const formEl = document.getElementById("termForm");
const chipsEl = document.getElementById("termChips");
const clockEl = document.getElementById("termClock");

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]));
}

function scrollToEnd() {
  outputEl.scrollTop = outputEl.scrollHeight;
}

function appendHTML(html) {
  const wrap = document.createElement("div");
  wrap.className = "term-block";
  wrap.innerHTML = html;
  outputEl.appendChild(wrap);
  scrollToEnd();
}

function appendEcho(cmdRaw) {
  appendHTML(`<div class="term-echo"><span class="term-prompt-inline">ken@fullstack:~$</span><span>${esc(cmdRaw)}</span></div>`);
}

/* ================= RENDER HELPERS ================= */
function renderLines(lines, cls) {
  return lines.map(l => `<div class="term-line ${cls || ""}">${esc(l)}</div>`).join("");
}

function renderTable(rows) {
  const dts = rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("");
  return `<dl class="term-table">${dts}</dl>`;
}

function renderProject(p) {
  return `<div class="term-project">
    <div class="term-muted" style="font-size:.78rem;margin-bottom:4px;">${p.tag}</div>
    <h3>${esc(p.name)}</h3>
    <div class="term-heading" style="font-size:.8rem;">${esc(p.problemLabel)}</div>
    <div class="term-line term-body-text">${esc(p.problem)}</div>
    <div class="term-heading" style="font-size:.8rem;margin-top:8px;">${esc(p.solutionLabel)}</div>
    <div class="term-line term-body-text">${esc(p.solution)}</div>
    <div class="term-heading" style="font-size:.8rem;margin-top:8px;">${esc(p.resultLabel)}</div>
    <div class="term-line term-body-text">${esc(p.result)}</div>
    <div class="term-chiprow">${p.links.map(([label, url]) => `<a class="term-tag term-link" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`).join("")}</div>
  </div>`;
}

/* ================= COMMANDS ================= */
function cmdHelp() {
  const c = T[state.lang];
  let html = `<div class="term-heading">${esc(c.helpIntro)}</div>`;
  html += `<dl class="term-table">` + c.help.map(([cmd, desc]) => `<dt>${esc(cmd)}</dt><dd>${esc(desc)}</dd>`).join("") + `</dl>`;
  appendHTML(html);
}

function cmdAbout() {
  appendHTML(renderLines(T[state.lang].about, "term-body-text"));
}

function cmdEducation() {
  const c = T[state.lang].education;
  appendHTML(`<div class="term-heading">${esc(c.heading)}</div>` + renderTable(c.rows) + `<div class="term-muted" style="font-size:.82rem;">${esc(c.hint)}</div>`);
}

function cmdExperience() {
  const c = T[state.lang].experience;
  appendHTML(`<div class="term-heading">${esc(c.heading)}</div>` + renderLines(c.body, "term-body-text"));
}

function cmdThesis() {
  appendHTML(renderLines(T[state.lang].thesis, "term-body-text"));
}

function cmdSkills() {
  const c = T[state.lang];
  let html = `<div class="term-heading">${esc(c.skillsHeading)}</div>`;
  c.skillGroups.forEach(g => {
    html += `<div class="term-line" style="color:var(--muted);font-size:.8rem;margin-top:8px;">${esc(g.label)}</div>`;
    html += `<div class="term-chiprow">${g.tags.map(t => `<span class="term-tag">${esc(t)}</span>`).join("")}</div>`;
    html += `<div class="term-line term-body-text">${esc(g.desc)}</div>`;
  });
  appendHTML(html);
}

function cmdProjects(arg) {
  const c = T[state.lang];
  if (arg) {
    const idx = parseInt(arg, 10) - 1;
    const byName = c.projects.findIndex(p => p.name.toLowerCase() === String(arg).toLowerCase());
    const p = c.projects[byName >= 0 ? byName : idx];
    if (!p) { appendHTML(`<div class="term-line term-error">${esc(c.projectNotFound)}</div>`); return; }
    appendHTML(renderProject(p));
    return;
  }
  let html = `<div class="term-heading">${esc(c.projectsHeading)}</div>`;
  c.projects.forEach(p => { html += renderProject(p); });
  html += `<div class="term-muted" style="font-size:.82rem;">${esc(c.projectsHint)}</div>`;
  appendHTML(html);
}

function cmdContact() {
  const c = T[state.lang];
  let html = `<div class="term-heading">${esc(c.contactHeading)}</div>`;
  html += `<dl class="term-table">` + c.contactRows.map(([k, v, url]) => `<dt>${esc(k)}</dt><dd><a class="term-link" href="${esc(url)}" target="_blank" rel="noopener">${esc(v)}</a></dd>`).join("") + `</dl>`;
  html += `<div class="term-line term-body-text">${esc(c.contactLede)}</div>`;
  appendHTML(html);
}

function cmdCv() {
  const c = T[state.lang];
  const file = state.lang === "vi" ? "CV_NgoMinhNhut_VI.docx" : "CV_NgoMinhNhut_EN.docx";
  appendHTML(`<div class="term-line term-muted">${esc(c.cvDownloading)}</div>`);
  const a = document.createElement("a");
  a.href = "./" + file;
  a.download = file;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function cmdLang(arg) {
  const next = (arg === "en" || arg === "vi") ? arg : (state.lang === "vi" ? "en" : "vi");
  state.lang = next;
  document.documentElement.lang = next;
  renderChips();
  appendHTML(`<div class="term-line term-amber">${esc(T[state.lang].langSet)}</div>`);
}

function cmdTheme() {
  const btn = document.getElementById("themeToggle");
  if (btn) btn.click();
  const theme = document.documentElement.getAttribute("data-theme") || "dark";
  appendHTML(`<div class="term-line term-amber">${esc(T[state.lang].themeSet(theme))}</div>`);
}

function cmdClear() {
  outputEl.innerHTML = "";
  appendHTML(`<div class="term-line term-muted">${esc(T[state.lang].clearedHint)}</div>`);
}

function cmdDate() {
  const c = T[state.lang];
  const now = new Date().toLocaleString(state.lang === "vi" ? "vi-VN" : "en-US", { timeZone: "Asia/Ho_Chi_Minh", dateStyle: "full", timeStyle: "medium" });
  appendHTML(`<div class="term-line term-body-text">${esc(c.dateLabel)} ${esc(now)}</div>`);
}

function cmdSudo(rest) {
  if (rest.trim() !== "hire-me") { appendHTML(`<div class="term-line term-error">${esc(T[state.lang].notFound("sudo " + rest))}</div>`); return; }
  appendHTML(renderLines(T[state.lang].sudo, "term-body-text"));
}

function cmdExit() {
  appendHTML(`<div class="term-line term-body-text">${esc(T[state.lang].exit)}</div>`);
}

const REGISTRY = {
  help: () => cmdHelp(),
  "?": () => cmdHelp(),
  ls: () => cmdHelp(),
  about: () => cmdAbout(),
  whoami: () => cmdAbout(),
  education: () => cmdEducation(),
  experience: () => cmdExperience(),
  work: () => cmdExperience(),
  thesis: () => cmdThesis(),
  skills: () => cmdSkills(),
  projects: arg => cmdProjects(arg),
  project: arg => cmdProjects(arg),
  contact: () => cmdContact(),
  cv: () => cmdCv(),
  resume: () => cmdCv(),
  lang: arg => cmdLang(arg),
  theme: () => cmdTheme(),
  clear: () => cmdClear(),
  cls: () => cmdClear(),
  date: () => cmdDate(),
  sudo: rest => cmdSudo(rest || ""),
  exit: () => cmdExit(),
  quit: () => cmdExit()
};

/* ================= INPUT HANDLING ================= */
function runCommand(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return;
  appendEcho(raw);
  state.history.push(raw);
  state.historyIndex = state.history.length;

  const spaceIdx = trimmed.indexOf(" ");
  const cmd = (spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx)).toLowerCase();
  const arg = spaceIdx === -1 ? "" : trimmed.slice(spaceIdx + 1).trim();

  const fn = REGISTRY[cmd];
  if (fn) {
    fn(arg);
  } else {
    appendHTML(`<div class="term-line term-error">${esc(T[state.lang].notFound(cmd))}</div>`);
  }
}

formEl.addEventListener("submit", e => {
  e.preventDefault();
  const val = inputEl.value;
  inputEl.value = "";
  runCommand(val);
});

inputEl.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (state.historyIndex > 0) { state.historyIndex--; inputEl.value = state.history[state.historyIndex] || ""; }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (state.historyIndex < state.history.length - 1) { state.historyIndex++; inputEl.value = state.history[state.historyIndex] || ""; }
    else { state.historyIndex = state.history.length; inputEl.value = ""; }
  }
});

document.querySelector(".term-app").addEventListener("click", e => {
  if (window.getSelection().toString()) return;
  if (e.target.closest("a")) return;
  inputEl.focus();
});

/* ================= CHIPS ================= */
function renderChips() {
  const c = T[state.lang];
  chipsEl.innerHTML = "";
  c.chips.forEach(cmd => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "term-chip";
    btn.textContent = cmd;
    btn.addEventListener("click", () => { runCommand(cmd); inputEl.focus(); });
    chipsEl.appendChild(btn);
  });
}

/* ================= CLOCK ================= */
function tickClock() {
  const now = new Date().toLocaleTimeString(state.lang === "vi" ? "vi-VN" : "en-US", { timeZone: "Asia/Ho_Chi_Minh", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  clockEl.textContent = `TP.HCM · GMT+7 · ${now}`;
}

/* ================= BOOT ================= */
function boot() {
  renderChips();
  tickClock();
  setInterval(tickClock, 1000);

  const lines = T[state.lang].bootLines;
  if (reduceMotion) {
    appendHTML(renderLines(lines, "term-boot"));
    inputEl.focus();
    return;
  }
  let i = 0;
  const step = () => {
    if (i >= lines.length) { inputEl.focus(); return; }
    appendHTML(`<div class="term-line term-boot">${esc(lines[i])}</div>`);
    i++;
    setTimeout(step, 260);
  };
  step();
}

/* ---- lang toggle button (top bar) ---- */
document.getElementById("langToggle").addEventListener("click", () => cmdLang());

if (typeof initThemeToggle === "function") initThemeToggle();
if (typeof bindRipples === "function") bindRipples();

boot();
