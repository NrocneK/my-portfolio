const dict = {
  vi: {
    "ctrl.story": "Xem bản Story", "ctrl.back": "Quay lại",
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
    "story.wms.solution": "Tự thiết kế và xây dựng WMS Pro — hệ thống quản lý kho vận fullstack, tách riêng backend và frontend, số hoá các bước nhập, xuất và kiểm kê.",
    "story.wms.result": "Rút gọn đáng kể quy trình và thời gian thao tác so với cách làm thủ công trước đó — dự án tâm đắc nhất vì sinh ra từ vấn đề thật.",
    "story.shop.problem": "Cần thực hành xây dựng một luồng thương mại điện tử hoàn chỉnh, từ trưng bày sản phẩm đến giỏ hàng.",
    "story.shop.solution": "Xây dựng website bán túi xách & balo với danh mục sản phẩm, giỏ hàng và quản lý đơn hàng.",
    "story.shop.result": "Nắm vững luồng e-commerce fullstack, từ giao diện React đến cơ sở dữ liệu MySQL.",
    "story.hrms.problem": "Doanh nghiệp nhỏ cần một công cụ tập trung để theo dõi thông tin nhân sự, thay vì quản lý rời rạc trên bảng tính.",
    "story.hrms.solution": "Xây dựng hệ thống quản lý nhân sự (HRMS) hỗ trợ lưu trữ và tra cứu hồ sơ nhân viên.",
    "story.hrms.result": "Một hệ thống CRUD hoàn chỉnh, minh hoạ khả năng thiết kế cơ sở dữ liệu quan hệ.",
    "story.communix.problem": "Muốn thử sức với bài toán giao tiếp thời gian thực — khác hẳn các hệ thống quản lý CRUD thông thường.",
    "story.communix.solution": "Xây dựng Communix — ứng dụng chat, tách riêng backend và frontend, xử lý tin nhắn theo thời gian thực.",
    "story.communix.result": "Mở rộng kỹ năng sang xử lý dữ liệu thời gian thực, ngoài phạm vi CRUD truyền thống.",
    "connect.title": "Kết nối", "connect.email": "Email", "connect.phone": "Điện thoại / Zalo", "connect.hire": "Thuê tôi",
    "detail.connect.lede": "Đang tìm cơ hội bắt đầu sự nghiệp lập trình viên fullstack. Rất vui nếu bạn muốn trao đổi thêm về cơ hội hợp tác hoặc công việc — qua GitHub, email hoặc Zalo ở trên.",
    "skills.title": "Kỹ năng & Công cụ",
    "skills.rowFrontend": "Frontend", "skills.rowBackend": "Backend", "skills.rowAI": "AI",
    "skills.g1": "Ngôn ngữ & Framework", "skills.g2": "Cơ sở dữ liệu & Công cụ", "skills.g3": "Hỗ trợ bởi AI",
    "skills.g1Desc": "Dùng xuyên suốt trong cả 4 dự án đã xây dựng — từ giao diện React/Next.js đến backend Node.js.",
    "skills.g2Desc": "MySQL là lựa chọn cơ sở dữ liệu cho cả 4 dự án; Git/GitHub dùng để quản lý toàn bộ mã nguồn (xem hoạt động thực tế ở mục Hoạt động GitHub).",
    "skills.aiDesc": "Dùng AI hỗ trợ viết code, debug và tăng tốc học công nghệ mới trong quá trình tự học và xây dựng các dự án ở trên.",
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
    "ctrl.story": "View Story version", "ctrl.back": "Back",
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
    "story.wms.solution": "Designed and built WMS Pro — a fullstack warehouse management system with separate backend and frontend, digitizing inbound, outbound and stocktaking steps.",
    "story.wms.result": "Significantly cut down process steps and handling time compared to the manual approach — the most treasured project because it came from a real problem.",
    "story.shop.problem": "Needed practice building a complete e-commerce flow, from product display to checkout.",
    "story.shop.solution": "Built a bags & backpacks e-commerce website with product catalog, cart, and order management.",
    "story.shop.result": "Gained a solid grasp of the fullstack e-commerce flow, from the React UI to the MySQL database.",
    "story.hrms.problem": "A small business needed one central tool to track employee information instead of scattered spreadsheets.",
    "story.hrms.solution": "Built a human resource management system (HRMS) for storing and looking up employee records.",
    "story.hrms.result": "A complete CRUD system, demonstrating relational database design skills.",
    "story.communix.problem": "Wanted to take on real-time communication — a different challenge from typical CRUD management systems.",
    "story.communix.solution": "Built Communix — a chat app with separate backend and frontend, handling messages in real time.",
    "story.communix.result": "Extended skills into real-time data handling, beyond traditional CRUD.",
    "connect.title": "Connect", "connect.email": "Email", "connect.phone": "Phone / Zalo", "connect.hire": "Hire me",
    "detail.connect.lede": "Looking to start a career as a fullstack developer. Happy to hear from you about opportunities or collaboration — via GitHub, email or Zalo above.",
    "skills.title": "Skills & Tools",
    "skills.rowFrontend": "Frontend", "skills.rowBackend": "Backend", "skills.rowAI": "AI",
    "skills.g1": "Languages & Frameworks", "skills.g2": "Database & Tools", "skills.g3": "AI-Assisted",
    "skills.g1Desc": "Used throughout all 4 projects built — from the React/Next.js UI to the Node.js backend.",
    "skills.g2Desc": "MySQL is the database choice across all 4 projects; Git/GitHub manages the full source history (see real activity in the GitHub Activity card).",
    "skills.aiDesc": "Used to speed up writing code, debugging, and learning new tech while self-teaching and building the projects above.",
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

function layoutCollapsedRow(activeCard) {
  const others = cardsInOrder.filter(c => c !== activeCard);
  const margin = 20, gap = 12;
  const totalW = window.innerWidth - margin * 2 - gap * (others.length - 1);
  const itemW = totalW / others.length;
  others.forEach((c, i) => {
    c.style.left = (margin + i * (itemW + gap)) + 'px';
    c.style.width = itemW + 'px';
    c.style.right = 'auto';
  });
}

function expandCard(key) {
  if (!isDesktop()) return;
  const active = cardsInOrder.find(c => c.dataset.key === key);
  if (!active) return;
  withFlip(() => {
    document.body.classList.add('expanded-mode');
    cardsInOrder.forEach(c => c.classList.toggle('is-active', c === active));
    active.style.left = ''; active.style.width = ''; active.style.right = '';
    layoutCollapsedRow(active);
  });
}

function collapseExpand() {
  if (!document.body.classList.contains('expanded-mode')) return;
  withFlip(() => {
    document.body.classList.remove('expanded-mode');
    cardsInOrder.forEach(c => {
      c.classList.remove('is-active');
      c.style.left = ''; c.style.width = ''; c.style.right = ''; c.style.top = ''; c.style.bottom = '';
    });
  });
}

closeExpandBtn.addEventListener('click', collapseExpand);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') collapseExpand(); });

// if the viewport crosses from desktop to mobile while expanded, drop back to the normal layout
window.addEventListener('resize', () => {
  if (!isDesktop() && document.body.classList.contains('expanded-mode')) collapseExpand();
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