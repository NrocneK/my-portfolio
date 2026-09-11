const dict = {
  vi: {
    "ctrl.dashboard": "Xem bản Dashboard", "ctrl.terminal": "Xem bản Terminal",
    "hero.cta1": "Tải CV",
    "footer.role": "Lập trình viên Fullstack",
    "projects.link.backend": "Backend", "projects.link.frontend": "Frontend", "projects.link.repo": "Repo",
    "skills.g1": "Ngôn ngữ & Framework", "skills.g2": "Cơ sở dữ liệu & Công cụ", "skills.g3": "Hỗ trợ bởi AI",
    "skills.aiDesc": "dùng AI hỗ trợ viết code, debug và tăng tốc học công nghệ mới.",
    "skills.g4": "Backend & Realtime",
    "skills.g4Desc": "xác thực JWT, phân quyền theo vai trò, Socket.IO và WebRTC cho nhắn tin/gọi video thời gian thực, Prisma ORM và NextAuth.js.",
    "story.hero.l1": "Xin chào,", "story.hero.l2": "tôi là Ngô Minh Nhựt.",
    "story.hero.role": "Lập trình viên Fullstack — TP. Hồ Chí Minh",
    "story.hero.scroll": "Cuộn xuống",
    "story.journey.title": "Hành trình",
    "story.journey.i1.title": "Tốt nghiệp Điện tử Viễn thông",
    "story.journey.i1.body": "Tốt nghiệp Đại học Bách Khoa TP.HCM với đề tài nghiên cứu và xây dựng tổng đài VoIP trên nền tảng Asterisk.",
    "story.journey.i2.title": "Quản lý kho vận, tự học lập trình song song",
    "story.journey.i2.body": "Đảm nhiệm vai trò Quản lý kho vận tại Phương Nam Retail, phụ trách một đội ngũ 5 người — trong lúc tự học để chuyển hướng hẳn sang lập trình web.",
    "story.journey.i3.when": "Hiện tại",
    "story.journey.i3.title": "Xây dựng phần mềm từ vấn đề vận hành có thật",
    "story.journey.i3.body": "Vận dụng hiểu biết CNTT vào công việc kho vận để hình thành và xây dựng các dự án fullstack, trong đó WMS Pro là tâm đắc nhất.",
    "story.skills.title": "Kỹ năng",
    "story.cases.title": "Dự án",
    "story.case.problem": "Bài toán", "story.case.solution": "Giải pháp", "story.case.result": "Kết quả",
    "story.wms.problem": "Tại kho hàng nơi tôi quản lý, quy trình nhập – xuất – kiểm kê phần lớn xử lý thủ công, gây mất thời gian và dễ sai sót khi làm việc với một đội 5 người.",
    "story.wms.solution": "Tự thiết kế và xây dựng WMS Pro — hệ thống quản lý kho vận fullstack cho nghiệp vụ nhà sách/xuất bản, tách riêng backend (Node.js, Express, MySQL) và frontend (React). Xác thực bằng JWT access + refresh token; phân quyền theo vai trò — Admin quản lý toàn hệ thống, Thủ kho chỉ thao tác trong phạm vi kho được giao. Theo dõi tồn kho nhiều kho theo thời gian thực, nhập/xuất dữ liệu qua Excel, tự động sinh phiếu xuất kho, và ghi lại audit log cho mọi thao tác thay đổi dữ liệu (ai, khi nào, làm gì).",
    "story.wms.result": "Rút gọn đáng kể quy trình và thời gian thao tác so với cách làm thủ công trước đó. Backend triển khai trên Render, cơ sở dữ liệu MySQL trên Aiven Cloud — dự án tâm đắc nhất vì sinh ra từ vấn đề thật, không phải bài tập lý thuyết.",
    "story.shop.problem": "Cần thực hành xây dựng một luồng thương mại điện tử hoàn chỉnh, từ trưng bày sản phẩm đến giỏ hàng.",
    "story.shop.solution": "Xây dựng BagStore — website bán túi xách & balo với giỏ hàng lai (khách vãng lai lưu tạm ở trình duyệt, người đã đăng nhập đồng bộ vào cơ sở dữ liệu), tích hợp thanh toán qua MoMo (QR/deep-link) và VietQR (chuyển khoản ngân hàng), theo dõi đơn hàng công khai không cần đăng nhập, cùng dashboard quản trị doanh thu, đơn hàng và sản phẩm theo biến thể màu/size.",
    "story.shop.result": "Một hệ thống hơn 45 API endpoint trên cơ sở dữ liệu 13 bảng, đã trải qua 10 phiên bản lặp lại (V10). Nắm vững luồng e-commerce fullstack, từ giao diện React đến tích hợp cổng thanh toán thật.",
    "story.hrms.problem": "Doanh nghiệp nhỏ cần một công cụ tập trung để theo dõi thông tin nhân sự, thay vì quản lý rời rạc trên bảng tính.",
    "story.hrms.solution": "Xây dựng My HRMS trên Next.js 14 (App Router) với Prisma ORM và NextAuth.js, phân quyền 3 cấp Admin / HR / Employee — mỗi cấp có ma trận quyền hạn riêng cho từng tính năng. Hỗ trợ CRUD hồ sơ nhân viên, quản lý phòng ban, chấm công vào/ra kèm lịch sử, và trang tự phục vụ để nhân viên xem hồ sơ/chấm công của chính mình.",
    "story.hrms.result": "Một hệ thống CRUD hoàn chỉnh với phân quyền chi tiết theo từng tính năng, giao diện responsive bằng Tailwind CSS, triển khai trên Vercel với MySQL trên PlanetScale — minh hoạ khả năng thiết kế cơ sở dữ liệu quan hệ và kiến trúc phân quyền.",
    "story.communix.problem": "Muốn thử sức với bài toán giao tiếp thời gian thực — khác hẳn các hệ thống quản lý CRUD thông thường.",
    "story.communix.solution": "Xây dựng Communix — ứng dụng chat phong cách Zalo, tách riêng backend (Node.js, Express, TypeScript, MySQL) và frontend. Đăng ký xác thực qua OTP email và reCAPTCHA; JWT access/refresh token. Nhắn tin thời gian thực qua Socket.IO, hỗ trợ reaction, thu hồi/sửa tin nhắn, ghim tối đa 3 tin nhắn mỗi hội thoại, mute thông báo và tìm kiếm tin nhắn. Gọi thoại/video bằng WebRTC theo mô hình mesh, tối đa 4 người mỗi cuộc gọi, tự host TURN server để duy trì kết nối qua các mạng khác nhau.",
    "story.communix.result": "Trải qua 13 giai đoạn phát triển, có 22 unit test (Jest) cho phần validate và xử lý dữ liệu, cùng rate limiting cho các endpoint nhạy cảm — mở rộng kỹ năng sang xử lý dữ liệu thời gian thực, ngoài phạm vi CRUD truyền thống.",
    "story.contact.title": "Liên hệ",
    "story.contact.lede": "Đang tìm cơ hội bắt đầu sự nghiệp lập trình viên fullstack."
  },
  en: {
    "ctrl.dashboard": "View Dashboard version", "ctrl.terminal": "View Terminal version",
    "hero.cta1": "Download CV",
    "footer.role": "Fullstack Web Developer",
    "projects.link.backend": "Backend", "projects.link.frontend": "Frontend", "projects.link.repo": "Repo",
    "skills.g1": "Languages & Frameworks", "skills.g2": "Database & Tools", "skills.g3": "AI-Assisted",
    "skills.aiDesc": "use AI to speed up writing code, debugging, and learning new tech faster.",
    "skills.g4": "Backend & Realtime",
    "skills.g4Desc": "JWT auth, role-based access, Socket.IO and WebRTC for real-time messaging/video calls, Prisma ORM and NextAuth.js.",
    "story.hero.l1": "Hello,", "story.hero.l2": "I'm Ngo Minh Nhut.",
    "story.hero.role": "Fullstack Web Developer — Ho Chi Minh City",
    "story.hero.scroll": "Scroll down",
    "story.journey.title": "Journey",
    "story.journey.i1.title": "Graduated in Electronics & Telecommunications",
    "story.journey.i1.body": "Graduated from Ho Chi Minh City University of Technology with a thesis on researching and building a VoIP switchboard system based on Asterisk.",
    "story.journey.i2.title": "Warehouse supervisor, self-taught developer in parallel",
    "story.journey.i2.body": "Took on the Warehouse Supervisor role at Phuong Nam Retail, managing a team of five — while self-teaching to fully pivot into web development.",
    "story.journey.i3.when": "Now",
    "story.journey.i3.title": "Building software from real operational problems",
    "story.journey.i3.body": "Applying IT know-how to warehouse work to shape and build fullstack projects, with WMS Pro as the most treasured one.",
    "story.skills.title": "Skills",
    "story.cases.title": "Projects",
    "story.case.problem": "Problem", "story.case.solution": "Solution", "story.case.result": "Result",
    "story.wms.problem": "At the warehouse I supervise, the inbound–outbound–stocktaking process was mostly manual, wasting time and prone to error with a team of five.",
    "story.wms.solution": "Designed and built WMS Pro — a fullstack warehouse management system for bookstore/publishing operations, with a separate backend (Node.js, Express, MySQL) and frontend (React). Authentication via JWT access + refresh tokens; role-based access — Admins manage the whole system, Warehouse Keepers are scoped to their own warehouse. Real-time multi-warehouse stock tracking, Excel import/export, auto-generated picking slips, and an audit log for every write operation (who, when, what).",
    "story.wms.result": "Significantly cut down process steps and handling time compared to the previous manual approach. Backend deployed on Render, MySQL on Aiven Cloud — the most treasured project because it came from a real problem, not a theoretical exercise.",
    "story.shop.problem": "Needed practice building a complete e-commerce flow, from product display to checkout.",
    "story.shop.solution": "Built BagStore — a bags & backpacks e-commerce site with a hybrid cart (guests use browser storage, logged-in users sync to the database), MoMo (QR/deep-link) and VietQR (bank transfer) payment integration, public order tracking with no login required, and an admin dashboard for revenue, orders, and products with color/size variants.",
    "story.shop.result": "A system with 45+ API endpoints on a 13-table database, now at its 10th iteration (V10). Gained a solid grasp of the fullstack e-commerce flow, from the React UI to a real payment gateway integration.",
    "story.hrms.problem": "A small business needed one central tool to track employee information instead of scattered spreadsheets.",
    "story.hrms.solution": "Built My HRMS on Next.js 14 (App Router) with Prisma ORM and NextAuth.js, with 3-tier role-based access — Admin / HR / Employee, each with its own permission matrix per feature. Supports full CRUD for employee records, department management, clock-in/clock-out with history, and an employee self-service page.",
    "story.hrms.result": "A complete CRUD system with fine-grained, feature-level permissions, a responsive Tailwind CSS UI, deployed on Vercel with MySQL on PlanetScale — demonstrating relational database design and access-control architecture.",
    "story.communix.problem": "Wanted to take on real-time communication — a different challenge from typical CRUD management systems.",
    "story.communix.solution": "Built Communix — a Zalo-style chat app with a separate backend (Node.js, Express, TypeScript, MySQL) and frontend. Sign-up via email OTP and reCAPTCHA; JWT access/refresh tokens. Real-time messaging over Socket.IO, with reactions, message recall/edit, pinning up to 3 messages per conversation, muting, and message search. Voice/video calls over WebRTC using a mesh topology, up to 4 people per call, with a self-hosted TURN server to keep calls connected across different networks.",
    "story.communix.result": "Went through 13 development phases, with 22 unit tests (Jest) covering validation and data handling, plus rate limiting on sensitive endpoints — extended skills into real-time data handling, beyond traditional CRUD.",
    "story.contact.title": "Contact",
    "story.contact.lede": "Looking to start a career as a fullstack developer."
  }
};

let currentLang = localStorage.getItem('portfolio-lang') || 'vi';

function applyLang(lang) {
  document.documentElement.lang = lang;
  applyI18nText(dict, lang);
  document.title = lang === 'vi'
    ? 'Ngô Minh Nhựt — Lập trình viên Fullstack'
    : 'Ngo Minh Nhut — Fullstack Web Developer';
  const cvFile = lang === 'vi' ? './CV_NgoMinhNhut_VI.docx' : './CV_NgoMinhNhut_EN.docx';
  document.querySelectorAll('.cv-download-link').forEach(el => el.setAttribute('href', cvFile));
  localStorage.setItem('portfolio-lang', lang);
}

document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'vi' ? 'en' : 'vi';
  applyLang(currentLang);
});

applyLang(currentLang);
initThemeToggle();
bindRipples();

/* ---- reveal-on-enter, scoped to the paged scroller ---- */
const storyScroller = document.getElementById('storyScroller');
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { root: storyScroller, threshold: 0.2 });
reveals.forEach(el => revealObserver.observe(el));

/* ---- page dots: one per full-screen page, click to jump, highlight active ---- */
const pages = Array.from(document.querySelectorAll('.story-page'));
const pageDots = document.getElementById('pageDots');

pages.forEach((page, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot-btn' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', page.id.replace('page-', ''));
  dot.addEventListener('click', () => {
    page.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  pageDots.appendChild(dot);
});

const dotEls = Array.from(pageDots.children);
const pageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
      const idx = pages.indexOf(entry.target);
      dotEls.forEach((d, i) => d.classList.toggle('active', i === idx));
    }
  });
}, { root: storyScroller, threshold: [0.6] });
pages.forEach(page => pageObserver.observe(page));