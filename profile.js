/* ================= THEME (reuse shared.js) ================= */
if (typeof initThemeToggle === "function") initThemeToggle();
if (typeof bindRipples === "function") bindRipples();

/* ================= SMOOTH SCROLL + DOCK ================= */
const dockBtns = Array.from(document.querySelectorAll(".pf-dock-btn"));
const sections = dockBtns.map(b => document.getElementById(b.dataset.target)).filter(Boolean);

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

dockBtns.forEach(btn => {
  btn.addEventListener("click", () => scrollToId(btn.dataset.target));
});

document.querySelectorAll("[data-scroll]").forEach(a => {
  a.addEventListener("click", e => {
    const href = a.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      scrollToId(href.slice(1));
    }
  });
});

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      dockBtns.forEach(b => b.classList.toggle("active", b.dataset.target === id));
    }
  });
}, { threshold: 0.4, rootMargin: "-10% 0px -10% 0px" });
sections.forEach(s => sectionObserver.observe(s));

/* ================= REVEAL ON SCROLL ================= */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ================= TECH MARQUEE ================= */
const TECH = [
  ["html5.svg", "HTML"], ["css3.svg", "CSS"], ["javascript.svg", "JavaScript"],
  ["typescript.svg", "TypeScript"], ["react.svg", "React.js"], ["nextjs.svg", "Next.js"],
  ["nodejs.svg", "Node.js"], ["mysql.svg", "MySQL"], ["git.svg", "Git"]
];
const track = document.getElementById("pfMarqueeTrack");
if (track) {
  const set = TECH.map(([file, label]) => `<img src="./icons/${file}" alt="${label}" title="${label}">`).join("");
  track.innerHTML = set + set; // duplicate for seamless loop
}

/* ================= COUNT-UP STATS ================= */
const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateCount(el) {
  const target = parseFloat(el.dataset.count || "0");
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  if (reduceMotion) { el.textContent = prefix + target + suffix; return; }
  const duration = 1100;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll(".pf-stat-num").forEach(el => statObserver.observe(el));

/* ================= SPOTLIGHT CARDS ================= */
document.querySelectorAll(".pf-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  });
});

/* ================= TIMELINE GLOW ================= */
const timelineEl = document.getElementById("pfTimeline");
const glowEl = document.getElementById("pfTimelineGlow");
if (timelineEl && glowEl) {
  function updateGlow() {
    const rect = timelineEl.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.min(Math.max((vh * 0.6 - rect.top) / rect.height, 0), 1);
    glowEl.style.top = `${progress * 100}%`;
  }
  window.addEventListener("scroll", updateGlow, { passive: true });
  window.addEventListener("resize", updateGlow);
  updateGlow();
}

/* ================= DRAGGABLE ID BADGE ================= */
const card = document.getElementById("pfIdCard");
if (card && !reduceMotion) {
  let dragging = false;
  let startX = 0, startY = 0;
  let curX = 0, curY = 0;

  function setTransform(x, y, animated) {
    const rotate = Math.max(Math.min(x * 0.12, 22), -22);
    card.style.transition = animated ? "transform .6s cubic-bezier(.22,1.6,.36,1)" : "none";
    card.style.transform = `translate(${x}px, ${Math.max(y, 0) * 0.4}px) rotate(${rotate}deg)`;
  }

  function pointerDown(e) {
    dragging = true;
    card.classList.add("dragging");
    const p = e.touches ? e.touches[0] : e;
    startX = p.clientX - curX;
    startY = p.clientY - curY;
  }

  function pointerMove(e) {
    if (!dragging) return;
    const p = e.touches ? e.touches[0] : e;
    curX = p.clientX - startX;
    curY = p.clientY - startY;
    setTransform(curX, curY, false);
  }

  function pointerUp() {
    if (!dragging) return;
    dragging = false;
    card.classList.remove("dragging");
    curX = 0; curY = 0;
    setTransform(0, 0, true);
  }

  card.addEventListener("mousedown", pointerDown);
  window.addEventListener("mousemove", pointerMove);
  window.addEventListener("mouseup", pointerUp);
  card.addEventListener("touchstart", pointerDown, { passive: true });
  window.addEventListener("touchmove", pointerMove, { passive: true });
  window.addEventListener("touchend", pointerUp);

  card.addEventListener("click", () => {
    if (curX !== 0) return;
    setTransform(0, 0, true);
    card.style.transform = "rotate(-8deg)";
    setTimeout(() => setTransform(0, 0, true), 90);
  });
}

/* ================= CONTACT FORM (mailto fallback, no backend) ================= */
const contactForm = document.getElementById("pfContactForm");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    const subject = encodeURIComponent(`Liên hệ từ ${name} — qua portfolio`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:kdc.1110639@gmail.com?subject=${subject}&body=${body}`;
  });
}
