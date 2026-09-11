const dict = {
  vi: {
    "ctrl.story": "Xem bản Story", "ctrl.terminal": "Xem bản Terminal", "ctrl.back": "Quay lại",
    "hero.hello": "Xin chào, tôi là", "hero.role": "Lập trình viên Fullstack",
    "hero.tag": "Xây dựng phần mềm từ những vấn đề vận hành có thật.",
    "hero.cta1": "Tải CV", "hero.cta2": "Liên hệ",
    "detail.hero.p1": "Kỹ sư Điện tử Viễn thông (tốt nghiệp Đại học Bách Khoa TP.HCM, 2024) chuyển hướng sang lập trình web, hiện tự học và xây dựng các dự án fullstack với React, Next.js, Node.js và MySQL.",
    "detail.hero.p2": "Trong gần 2 năm làm Quản lý kho vận tại Công ty TNHH Bán lẻ Phương Nam, phụ trách một đội ngũ 5 người, tôi trực tiếp thấy những điểm nghẽn trong vận hành thực tế — động lực để tự học lập trình và xây dựng WMS Pro.",
    "detail.hero.p3": "Đề tài tốt nghiệp của tôi là nghiên cứu và xây dựng tổng đài VoIP trên nền tảng Asterisk — nơi bắt đầu thói quen tự học để giải quyết vấn đề kỹ thuật cụ thể.",
    "detail.fact.location": "Nơi ở", "detail.fact.background": "Xuất phát điểm",
    "detail.fact.ops": "Kinh nghiệm vận hành", "detail.fact.status": "Tình trạng",
    "detail.fact.locationValue": "TP. Hồ Chí Minh, Việt Nam",
    "detail.fact.backgroundValue": "Điện tử Viễn thông, HCMUT 2024",
    "detail.fact.opsValue": "~2 năm, quản lý đội 5 người",
    "detail.fact.statusValue": "Sẵn sàng nhận việc",
    "projects.title": "Dự án nổi bật", "projects.featuredTag": "Tâm đắc nhất",
    "projects.wms.desc": "Hệ thống quản lý kho vận, xây dựng từ nhu cầu thực tế nơi làm việc.",
    "projects.shop.desc": "Website bán hàng thương mại điện tử.",
    "projects.hrms.desc": "Hệ thống quản lý nhân sự.",
    "projects.communix.desc": "Ứng dụng chat thời gian thực.",
    "projects.link.backend": "Backend", "projects.link.frontend": "Frontend", "projects.link.repo": "Repo",
    "story.case.problem": "Bài toán", "story.case.solution": "Giải pháp", "story.case.result": "Kết quả",
    "story.wms.problem": "Tại kho hàng nơi tôi quản lý, quy trình nhập – xuất – kiểm kê phần lớn xử lý thủ công, gây mất thời gian và dễ sai sót khi làm việc với một đội 5 người.",
    "story.wms.solution": "Tự thiết kế và xây dựng WMS Pro — hệ thống quản lý kho vận fullstack cho nghiệp vụ nhà sách/xuất bản, tách riêng backend (Node.js, Express, MySQL) và frontend (React). Xác thực bằng JWT access + refresh token; phân quyền theo vai trò — Admin quản lý toàn hệ thống, Thủ kho chỉ thao tác trong phạm vi kho được giao. Theo dõi tồn kho nhiều kho theo thời gian thực, nhập/xuất dữ liệu qua Excel, tự động sinh phiếu xuất kho, và ghi lại audit log cho mọi thao tác thay đổi dữ liệu (ai, khi nào, làm gì).",
    "story.wms.result": "Rút gọn đáng kể quy trình và thời gian thao tác so với cách làm thủ công trước đó. Backend triển khai trên Render, cơ sở dữ liệu MySQL trên Aiven Cloud — dự án tâm đắc nhất vì sinh ra từ vấn đề thật, không phải bài tập lý thuyết.",
    "story.shop.problem": "Cần thực hành xây dựng một luồng thương mại điện tử hoàn chỉnh, từ trưng bày sản phẩm đến giỏ hàng.",
    "story.shop.solution": "Xây dựng BagStore — website bán túi xách &amp; balo với giỏ hàng lai (khách vãng lai lưu tạm ở trình duyệt, người đã đăng nhập đồng bộ vào cơ sở dữ liệu), tích hợp thanh toán qua MoMo (QR/deep-link) và VietQR (chuyển khoản ngân hàng), theo dõi đơn hàng công khai không cần đăng nhập, cùng dashboard quản trị doanh thu, đơn hàng và sản phẩm theo biến thể màu/size.",
    "story.shop.result": "Một hệ thống hơn 45 API endpoint trên cơ sở dữ liệu 13 bảng, đã trải qua 10 phiên bản lặp lại (V10). Nắm vững luồng e-commerce fullstack, từ giao diện React đến tích hợp cổng thanh toán thật.",
    "story.hrms.problem": "Doanh nghiệp nhỏ cần một công cụ tập trung để theo dõi thông tin nhân sự, thay vì quản lý rời rạc trên bảng tính.",
    "story.hrms.solution": "Xây dựng My HRMS trên Next.js 14 (App Router) với Prisma ORM và NextAuth.js, phân quyền 3 cấp Admin / HR / Employee — mỗi cấp có ma trận quyền hạn riêng cho từng tính năng. Hỗ trợ CRUD hồ sơ nhân viên, quản lý phòng ban, chấm công vào/ra kèm lịch sử, và trang tự phục vụ để nhân viên xem hồ sơ/chấm công của chính mình.",
    "story.hrms.result": "Một hệ thống CRUD hoàn chỉnh với phân quyền chi tiết theo từng tính năng, giao diện responsive bằng Tailwind CSS, triển khai trên Vercel với MySQL trên PlanetScale — minh hoạ khả năng thiết kế cơ sở dữ liệu quan hệ và kiến trúc phân quyền.",
    "story.communix.problem": "Muốn thử sức với bài toán giao tiếp thời gian thực — khác hẳn các hệ thống quản lý CRUD thông thường.",
    "story.communix.solution": "Xây dựng Communix — ứng dụng chat phong cách Zalo, tách riêng backend (Node.js, Express, TypeScript, MySQL) và frontend. Đăng ký xác thực qua OTP email và reCAPTCHA; JWT access/refresh token. Nhắn tin thời gian thực qua Socket.IO, hỗ trợ reaction, thu hồi/sửa tin nhắn, ghim tối đa 3 tin nhắn mỗi hội thoại, mute thông báo và tìm kiếm tin nhắn. Gọi thoại/video bằng WebRTC theo mô hình mesh, tối đa 4 người mỗi cuộc gọi, tự host TURN server để duy trì kết nối qua các mạng khác nhau.",
    "story.communix.result": "Trải qua 13 giai đoạn phát triển, có 22 unit test (Jest) cho phần validate và xử lý dữ liệu, cùng rate limiting cho các endpoint nhạy cảm — mở rộng kỹ năng sang xử lý dữ liệu thời gian thực, ngoài phạm vi CRUD truyền thống.",
    "connect.title": "Kết nối", "connect.email": "Email", "connect.phone": "Điện thoại / Zalo", "connect.hire": "Thuê tôi",
    "detail.connect.lede": "Đang tìm cơ hội bắt đầu sự nghiệp lập trình viên fullstack. Rất vui nếu bạn muốn trao đổi thêm về cơ hội hợp tác hoặc công việc — qua GitHub, email hoặc Zalo ở trên.",
    "skills.title": "Kỹ năng & Công cụ",
    "skills.rowFrontend": "Frontend", "skills.rowBackend": "Backend", "skills.rowAI": "AI",
    "skills.g1": "Ngôn ngữ & Framework", "skills.g2": "Cơ sở dữ liệu & Công cụ", "skills.g3": "Hỗ trợ bởi AI",
    "skills.g1Desc": "Dùng xuyên suốt trong cả 4 dự án đã xây dựng — từ giao diện React/Next.js đến backend Node.js/Express.",
    "skills.g2Desc": "MySQL là lựa chọn cơ sở dữ liệu cho cả 4 dự án (dùng trực tiếp qua mysql2 ở WMS Pro, qua Prisma ORM ở My HRMS); Git/GitHub quản lý toàn bộ mã nguồn (xem hoạt động thực tế ở mục Hoạt động GitHub).",
    "skills.aiDesc": "Dùng AI hỗ trợ viết code, debug và tăng tốc học công nghệ mới trong quá trình tự học và xây dựng các dự án ở trên.",
    "skills.g4": "Backend & Realtime",
    "skills.g4Desc": "Xác thực JWT và phân quyền theo vai trò trong cả 4 dự án; Socket.IO và WebRTC để xây dựng nhắn tin và gọi video thời gian thực trong Communix; Prisma ORM và NextAuth.js trong My HRMS.",
    "activity.title": "Hoạt động GitHub",
    "activity.caption": "Đóng góp thực tế trên GitHub",
    "activity.view": "Xem trên GitHub →",
    "activity.fallback": "Không tải được biểu đồ (cần kết nối internet). Xem trực tiếp trên GitHub.",
    "detail.activity.note": "Biểu đồ hiển thị lịch sử đóng góp thực tế trên GitHub của tài khoản NrocneK, lấy trực tiếp từ dữ liệu công khai — không phải số liệu minh hoạ.",
    "map.title": "Vị trí", "map.caption": "TP. Hồ Chí Minh, Việt Nam",
    "detail.map.tzLabel": "Múi giờ", "detail.map.tzValue": "GMT+7 (Giờ Đông Dương)",
    "footer.role": "Lập trình viên Fullstack"
  },
  en: {
    "ctrl.story": "View Story version", "ctrl.terminal": "View Terminal version", "ctrl.back": "Back",
    "hero.hello": "Hello, I'm", "hero.role": "Fullstack Web Developer",
    "hero.tag": "Building software from real operational problems.",
    "hero.cta1": "Download CV", "hero.cta2": "Get in touch",
    "detail.hero.p1": "Electronics & Telecommunications Engineering graduate (HCMUT, 2024) who pivoted into web development, self-taught and building fullstack projects with React, Next.js, Node.js and MySQL.",
    "detail.hero.p2": "Over nearly 2 years as Warehouse Supervisor at Phuong Nam Retail, managing a team of five, I saw operational bottlenecks firsthand — the motivation to teach myself programming and build WMS Pro.",
    "detail.hero.p3": "My graduation thesis researched and built a VoIP switchboard system on Asterisk — where the habit of self-teaching to solve concrete technical problems began.",
    "detail.fact.location": "Based in", "detail.fact.background": "Background",
    "detail.fact.ops": "Ops experience", "detail.fact.status": "Status",
    "detail.fact.locationValue": "Ho Chi Minh City, Vietnam",
    "detail.fact.backgroundValue": "Electronics & Telecom, HCMUT 2024",
    "detail.fact.opsValue": "~2 years, team of 5",
    "detail.fact.statusValue": "Open to opportunities",
    "projects.title": "Featured Projects", "projects.featuredTag": "Most treasured",
    "projects.wms.desc": "Warehouse management system, built from real needs at work.",
    "projects.shop.desc": "An e-commerce website for online shopping.",
    "projects.hrms.desc": "A human resource management system.",
    "projects.communix.desc": "A real-time chat application.",
    "projects.link.backend": "Backend", "projects.link.frontend": "Frontend", "projects.link.repo": "Repo",
    "story.case.problem": "Problem", "story.case.solution": "Solution", "story.case.result": "Result",
    "story.wms.problem": "At the warehouse I supervise, the inbound–outbound–stocktaking process was mostly manual, wasting time and prone to error with a team of five.",
    "story.wms.solution": "Designed and built WMS Pro — a fullstack warehouse management system for bookstore/publishing operations, with a separate backend (Node.js, Express, MySQL) and frontend (React). Authentication via JWT access + refresh tokens; role-based access — Admins manage the whole system, Warehouse Keepers are scoped to their own warehouse. Real-time multi-warehouse stock tracking, Excel import/export, auto-generated picking slips, and an audit log for every write operation (who, when, what).",
    "story.wms.result": "Significantly cut down process steps and handling time compared to the previous manual approach. Backend deployed on Render, MySQL on Aiven Cloud — the most treasured project because it came from a real problem, not a theoretical exercise.",
    "story.shop.solution": "Built BagStore — a bags & backpacks e-commerce site with a hybrid cart (guests use browser storage, logged-in users sync to the database), MoMo (QR/deep-link) and VietQR (bank transfer) payment integration, public order tracking with no login required, and an admin dashboard for revenue, orders, and products with color/size variants.",
    "story.shop.result": "A system with 45+ API endpoints on a 13-table database, now at its 10th iteration (V10). Gained a solid grasp of the fullstack e-commerce flow, from the React UI to a real payment gateway integration.",
    "story.hrms.solution": "Built My HRMS on Next.js 14 (App Router) with Prisma ORM and NextAuth.js, with 3-tier role-based access — Admin / HR / Employee, each with its own permission matrix per feature. Supports full CRUD for employee records, department management, clock-in/clock-out with history, and an employee self-service page.",
    "story.hrms.result": "A complete CRUD system with fine-grained, feature-level permissions, a responsive Tailwind CSS UI, deployed on Vercel with MySQL on PlanetScale — demonstrating relational database design and access-control architecture.",
    "story.communix.solution": "Built Communix — a Zalo-style chat app with a separate backend (Node.js, Express, TypeScript, MySQL) and frontend. Sign-up via email OTP and reCAPTCHA; JWT access/refresh tokens. Real-time messaging over Socket.IO, with reactions, message recall/edit, pinning up to 3 messages per conversation, muting, and message search. Voice/video calls over WebRTC using a mesh topology, up to 4 people per call, with a self-hosted TURN server to keep calls connected across different networks.",
    "story.communix.result": "Went through 13 development phases, with 22 unit tests (Jest) covering validation and data handling, plus rate limiting on sensitive endpoints — extended skills into real-time data handling, beyond traditional CRUD.",
    "connect.title": "Connect", "connect.email": "Email", "connect.phone": "Phone / Zalo", "connect.hire": "Hire me",
    "detail.connect.lede": "Looking to start a career as a fullstack developer. Happy to hear from you about opportunities or collaboration — via GitHub, email or Zalo above.",
    "skills.title": "Skills & Tools",
    "skills.rowFrontend": "Frontend", "skills.rowBackend": "Backend", "skills.rowAI": "AI",
    "skills.g1": "Languages & Frameworks", "skills.g2": "Database & Tools", "skills.g3": "AI-Assisted",
    "skills.g1Desc": "Used throughout all 4 projects built — from the React/Next.js UI to the Node.js/Express backend.",
    "skills.g2Desc": "MySQL is the database choice across all 4 projects (raw queries via mysql2 in WMS Pro, via Prisma ORM in My HRMS); Git/GitHub manages the full source history (see real activity in the GitHub Activity card).",
    "skills.aiDesc": "Used to speed up writing code, debugging, and learning new tech while self-teaching and building the projects above.",
    "skills.g4": "Backend & Realtime",
    "skills.g4Desc": "JWT auth and role-based access across all 4 projects; Socket.IO and WebRTC power real-time messaging and video calls in Communix; Prisma ORM and NextAuth.js in My HRMS.",
    "activity.title": "GitHub Activity",
    "activity.caption": "Real contributions on GitHub",
    "activity.view": "View on GitHub →",
    "activity.fallback": "Chart failed to load (needs internet). View it directly on GitHub.",
    "detail.activity.note": "This chart shows the real contribution history of the NrocneK GitHub account, pulled directly from public data — not illustrative numbers.",
    "map.title": "Location", "map.caption": "Ho Chi Minh City, Vietnam",
    "detail.map.tzLabel": "Timezone", "detail.map.tzValue": "GMT+7 (Indochina Time)",
    "footer.role": "Fullstack Web Developer"
  }
};

/* ================= LANG / THEME ================= */
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

/* ================= EXPAND-IN-PLACE (click a card to focus it; animated via FLIP) ================= */
const bento = document.getElementById('bento');
const closeExpandBtn = document.getElementById('closeExpand');
const cards = document.querySelectorAll('.card');
const cardsInOrder = Array.from(cards); // remember original order

function isDesktop() {
  return window.matchMedia('(min-width:901px)').matches;
}

/* FLIP: measure First rects, run the mutation, measure Last rects, then
   play an inverted-transform animation from First to Last so the move/resize
   is a smooth, visible motion instead of an instant jump. */
function withFlip(mutate) {
  const first = new Map();
  cardsInOrder.forEach(c => first.set(c, c.getBoundingClientRect()));

  mutate();

  cardsInOrder.forEach(c => {
    const f = first.get(c);
    const l = c.getBoundingClientRect();
    const dx = f.left - l.left;
    const dy = f.top - l.top;
    const sx = l.width ? f.width / l.width : 1;
    const sy = l.height ? f.height / l.height : 1;
    if (dx === 0 && dy === 0 && sx === 1 && sy === 1) return;
    c.style.transformOrigin = 'top left';
    c.style.transition = 'none';
    c.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
  });

  // force a reflow so the inverted transform above is actually painted once,
  // before we release it into an animated transition on the next frame
  bento.getBoundingClientRect();

  requestAnimationFrame(() => {
    cardsInOrder.forEach(c => {
      c.style.transition = 'transform 560ms cubic-bezier(.4,0,.2,1)';
      c.style.transform = '';
    });
    setTimeout(() => {
      cardsInOrder.forEach(c => { c.style.transition = ''; c.style.transformOrigin = ''; });
    }, 600);
  });
}

/* Capture the grid's own bounding box (the area between header and footer) BEFORE
   we touch any card's position, so the expanded layout always stays within it —
   this is the "khung đỏ" reference frame: header/footer never get covered, and
   nothing spills past where the grid itself already sits. */
function layoutExpanded(activeKey) {
  const box = bento.getBoundingClientRect();
  const active = cardsInOrder.find(c => c.dataset.key === activeKey);
  const others = cardsInOrder.filter(c => c !== active);

  const stripH = 84, gap = 10;

  Object.assign(active.style, {
    position: 'fixed',
    top: box.top + 'px',
    left: box.left + 'px',
    width: box.width + 'px',
    height: (box.height - stripH - gap) + 'px',
    right: 'auto', bottom: 'auto', transform: 'none', maxHeight: 'none',
  });

  const stripTop = box.top + box.height - stripH;
  const n = others.length;
  const itemW = (box.width - gap * (n - 1)) / n;
  others.forEach((c, i) => {
    Object.assign(c.style, {
      position: 'fixed',
      top: stripTop + 'px',
      left: (box.left + i * (itemW + gap)) + 'px',
      width: itemW + 'px',
      height: stripH + 'px',
      right: 'auto', bottom: 'auto', transform: 'none',
    });
  });
}

function expandCard(key) {
  if (!isDesktop()) return;
  const active = cardsInOrder.find(c => c.dataset.key === key);
  if (!active) return;
  currentExpandedKey = key;
  withFlip(() => {
    document.body.classList.add('expanded-mode');
    cardsInOrder.forEach(c => c.classList.toggle('is-active', c === active));
    layoutExpanded(key);
  });
}

function collapseExpand() {
  if (!document.body.classList.contains('expanded-mode')) return;
  currentExpandedKey = null;
  withFlip(() => {
    document.body.classList.remove('expanded-mode');
    cardsInOrder.forEach(c => {
      c.classList.remove('is-active');
      ['position', 'top', 'left', 'right', 'bottom', 'width', 'height', 'transform', 'maxHeight'].forEach(p => {
        c.style[p] = '';
      });
    });
  });
}

closeExpandBtn.addEventListener('click', collapseExpand);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') collapseExpand(); });

// if the viewport crosses from desktop to mobile while expanded, drop back to the normal layout;
// otherwise, re-run the layout (no FLIP) so it stays glued to the grid box on resize
let currentExpandedKey = null;
window.addEventListener('resize', () => {
  if (!isDesktop() && document.body.classList.contains('expanded-mode')) {
    collapseExpand();
  } else if (document.body.classList.contains('expanded-mode') && currentExpandedKey) {
    layoutExpanded(currentExpandedKey);
  }
});

cards.forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    if (e.target.closest('.case-nav')) return;
    const projRow = e.target.closest('[data-project]');
    expandCard(card.dataset.key);
    if (projRow) {
      const idx = caseKeys.indexOf(projRow.getAttribute('data-project'));
      if (idx > -1) showCase(idx);
    }
  });
});

/* ================= PROJECT PAGER (one case study at a time) ================= */
const caseKeys = ['wms', 'shop', 'hrms', 'communix'];
const caseBlocks = Array.from(document.querySelectorAll('.case-block'));
const casePagerDots = document.getElementById('casePagerDots');
let currentCaseIndex = 0;

caseKeys.forEach((k, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot-btn' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', k);
  dot.addEventListener('click', () => showCase(i));
  casePagerDots.appendChild(dot);
});
const caseDotEls = Array.from(casePagerDots.children);

function showCase(i) {
  currentCaseIndex = (i + caseBlocks.length) % caseBlocks.length;
  caseBlocks.forEach((b, idx) => b.classList.toggle('active', idx === currentCaseIndex));
  caseDotEls.forEach((d, idx) => d.classList.toggle('active', idx === currentCaseIndex));
}

document.querySelector('.case-nav-prev').addEventListener('click', (e) => {
  e.stopPropagation();
  showCase(currentCaseIndex - 1);
});
document.querySelector('.case-nav-next').addEventListener('click', (e) => {
  e.stopPropagation();
  showCase(currentCaseIndex + 1);
});

/* ================= HOVER / DIM (desktop only, disabled while expanded — CSS also gates this) ================= */
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    bento.classList.add('has-hover');
    card.classList.add('is-hover');
  });
  card.addEventListener('mouseleave', () => {
    bento.classList.remove('has-hover');
    card.classList.remove('is-hover');
  });
});

/* ================= REVEAL ON LOAD ================= */
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
cardsInOrder.forEach((el, i) => {
  el.style.transitionDelay = Math.min(i * 70, 280) + 'ms';
  cardObserver.observe(el);
});

/* ================= MOBILE SWIPE CAROUSEL (dots + active tracking) ================= */
const dotsContainer = document.getElementById('carouselDots');

cardsInOrder.forEach((card, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot-btn' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Card ' + (i + 1));
  dot.addEventListener('click', () => {
    card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  });
  dotsContainer.appendChild(dot);
});

const dotEls = Array.from(dotsContainer.children);
const carouselObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
      const idx = cardsInOrder.indexOf(entry.target);
      dotEls.forEach((d, i) => d.classList.toggle('active', i === idx));
    }
  });
}, { root: bento, threshold: [0.6] });
cardsInOrder.forEach(card => carouselObserver.observe(card));