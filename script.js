/* =============================================
   NGÔ MINH NHỰT — Portfolio Cyberpunk
   script.js
   ============================================= */

/* ------------------------------------------
   1. BACKGROUND ANIMATION — Neural Network Particles
   Canvas toàn màn hình, z-index thấp nhất
   ------------------------------------------ */
function initBackground() {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  canvas.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 0;
    pointer-events: none;
  `;
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');

  // Màu neon lấy từ CSS variables
  const CYAN   = 'rgba(0, 255, 231,';
  const PINK   = 'rgba(255, 45, 120,';
  const PURPLE = 'rgba(185, 103, 255,';

  let W, H, particles, mouse;
  mouse = { x: -9999, y: -9999 };

  // Track chuột để particles phản ứng nhẹ
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = -9999; mouse.y = -9999;
  });

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initParticles();
  }

  function randomColor() {
    const cols = [CYAN, PINK, PURPLE];
    return cols[Math.floor(Math.random() * cols.length)];
  }

  function initParticles() {
    const count = Math.floor((W * H) / 14000); // mật độ vừa phải
    particles = Array.from({ length: count }, () => ({
      x:    Math.random() * W,
      y:    Math.random() * H,
      vx:   (Math.random() - 0.5) * 0.4,
      vy:   (Math.random() - 0.5) * 0.4,
      r:    Math.random() * 1.8 + 0.6,
      col:  randomColor(),
      pulse: Math.random() * Math.PI * 2, // phase lệch nhau
    }));
  }

  const CONNECTION_DIST = 130; // px — khoảng cách tối đa để vẽ line
  const MOUSE_DIST      = 160; // px — chuột kéo particles

  function draw() {
    // Nền tối trong suốt — dùng rgba để tạo motion blur nhẹ
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(10, 22, 40, 0.92)';
    ctx.fillRect(0, 0, W, H);

    // Grid mờ (thay thế grid CSS cũ, nhưng động hơn — nhẹ nhàng)
    ctx.strokeStyle = 'rgba(0,255,231,0.03)';
    ctx.lineWidth = 0.5;
    const gridSize = 40;
    for (let x = 0; x < W; x += gridSize) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += gridSize) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    const now = Date.now() / 1000;

    particles.forEach((p, i) => {
      // Pulse alpha — hạt lúc sáng lúc mờ
      const alpha = 0.4 + 0.35 * Math.sin(now * 1.2 + p.pulse);

      // Di chuyển
      p.x += p.vx;
      p.y += p.vy;

      // Bounce ở biên
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      // Kéo nhẹ về phía chuột
      const mdx = mouse.x - p.x;
      const mdy = mouse.y - p.y;
      const md  = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < MOUSE_DIST) {
        const force = (MOUSE_DIST - md) / MOUSE_DIST * 0.012;
        p.vx += mdx * force;
        p.vy += mdy * force;
        // Giới hạn tốc độ
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.8) { p.vx /= speed * 0.6; p.vy /= speed * 0.6; }
      }

      // Vẽ hạt (dot)
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col + alpha + ')';
      ctx.fill();

      // Glow nhỏ quanh hạt
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
      grd.addColorStop(0, p.col + alpha * 0.4 + ')');
      grd.addColorStop(1, p.col + '0)');
      ctx.fillStyle = grd;
      ctx.fill();

      // Vẽ đường nối giữa các hạt gần nhau
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const lineAlpha = (1 - dist / CONNECTION_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = p.col + lineAlpha + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();

  // Đảm bảo các element khác nằm trên canvas
  document.querySelectorAll('nav, section, footer, .scanlines, .lang-btn').forEach(el => {
    if (!el.style.position || el.style.position === 'static') {
      el.style.position = 'relative';
    }
    el.style.zIndex = el.style.zIndex || '1';
  });
}

/* ------------------------------------------
   2. CODE RAIN — project featured card
   ------------------------------------------ */
function initCodeRain() {
  const rain = document.getElementById('codeRain');
  if (!rain) return;
  const cols = ['01001', '10110', '00101', '11010', '01110', '10001', '01101'];
  rain.innerHTML = cols.map(c => {
    const opacity = (Math.random() * 0.4 + 0.15).toFixed(2);
    return `<div style="writing-mode:vertical-rl;letter-spacing:4px;opacity:${opacity}">${c.repeat(9)}</div>`;
  }).join('');
}

/* ------------------------------------------
   3. SKILL BARS
   ------------------------------------------ */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill[data-w]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.w + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => observer.observe(bar));
}

/* ------------------------------------------
   4. SEND BUTTON
   ------------------------------------------ */
function initSendButton() {
  const btn = document.getElementById('sendBtn');
  if (!btn) return;
  const isEN = document.documentElement.lang === 'en';
  btn.addEventListener('click', () => {
    btn.textContent = isEN ? 'SENT ✓' : 'ĐÃ GỬI ✓';
    btn.style.background = 'var(--neon-purple)';
    btn.style.color = '#fff';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = isEN ? 'SEND MESSAGE →' : 'GỬI TIN NHẮN →';
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
    }, 3000);
  });
}

/* ------------------------------------------
   5. NAV HIGHLIGHT
   ------------------------------------------ */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => { l.style.color = ''; });
        const a = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (a) a.style.color = 'var(--neon-cyan)';
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
}

/* ------------------------------------------
   6. AVATAR UPLOAD
   ------------------------------------------ */
function initAvatarUpload() {
  const frame       = document.querySelector('.avatar-frame');
  const img         = document.querySelector('.avatar-img');
  const placeholder = document.querySelector('.avatar-placeholder');
  if (!frame || !img) return;

  const STORAGE_KEY = 'nmn_avatar';

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      img.src = saved;
      img.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
    }
  } catch(e) {}

  const fileInput = document.createElement('input');
  fileInput.type   = 'file';
  fileInput.accept = 'image/*';
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);

  const overlay = document.createElement('div');
  overlay.className = 'avatar-overlay';
  overlay.innerHTML = `
    <div class="avatar-overlay-inner">
      <span class="avatar-overlay-icon">📷</span>
      <span class="avatar-overlay-text">CHANGE PHOTO</span>
    </div>`;
  frame.appendChild(overlay);

  const delBtn = document.createElement('button');
  delBtn.className = 'avatar-del-btn';
  delBtn.innerHTML = '✕';
  delBtn.title = 'Xóa ảnh';
  frame.appendChild(delBtn);

  function syncDelBtn() {
    const src = img.getAttribute('src') || '';
    delBtn.style.display = (img.style.display !== 'none' && src.startsWith('data:')) ? 'flex' : 'none';
  }
  syncDelBtn();

  overlay.addEventListener('click', e => { e.stopPropagation(); fileInput.click(); });
  if (placeholder) placeholder.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast('⚠ Ảnh quá lớn! Vui lòng chọn ảnh dưới 5MB.', 'warn');
      fileInput.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      const data = e.target.result;
      img.src = data;
      img.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
      try {
        localStorage.setItem(STORAGE_KEY, data);
        showToast('✓ Ảnh đại diện đã được cập nhật!', 'success');
      } catch {
        showToast('⚠ Ảnh quá lớn để lưu lâu dài. Vẫn hiển thị trong phiên này.', 'warn');
      }
      syncDelBtn();
    };
    reader.readAsDataURL(file);
    fileInput.value = '';
  });

  delBtn.addEventListener('click', e => {
    e.stopPropagation();
    localStorage.removeItem(STORAGE_KEY);
    const test = new Image();
    test.onload = () => {
      img.src = 'avatar.jpg'; img.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
    };
    test.onerror = () => {
      img.src = ''; img.style.display = 'none';
      if (placeholder) placeholder.style.display = 'flex';
    };
    test.src = 'avatar.jpg?' + Date.now();
    syncDelBtn();
    showToast('✓ Đã xóa ảnh đại diện.', 'success');
  });
}

/* ------------------------------------------
   7. TOAST
   ------------------------------------------ */
function showToast(msg, type = 'success') {
  document.querySelector('.nmn-toast')?.remove();
  const t = document.createElement('div');
  t.className = 'nmn-toast';
  t.textContent = msg;
  t.dataset.type = type;
  document.body.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3000);
}

/* ------------------------------------------
   8. INJECT STYLES
   ------------------------------------------ */
function injectStyles() {
  const s = document.createElement('style');
  s.textContent = `
    body { background-color: #0a1628; }

    .avatar-frame { cursor: pointer; }

    .avatar-overlay {
      position: absolute; inset: 0; z-index: 10;
      background: rgba(0,0,0,0.6);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.25s ease;
      backdrop-filter: blur(3px);
    }
    .avatar-frame:hover .avatar-overlay { opacity: 1; }
    .avatar-overlay-inner {
      display: flex; flex-direction: column; align-items: center; gap: 10px;
    }
    .avatar-overlay-icon {
      font-size: 28px;
      filter: drop-shadow(0 0 10px rgba(0,255,231,0.9));
    }
    .avatar-overlay-text {
      font-family: 'Share Tech Mono', monospace;
      font-size: 11px; letter-spacing: 3px; color: #00ffe7;
      text-shadow: 0 0 14px rgba(0,255,231,0.9);
    }
    .avatar-placeholder { cursor: pointer; }
    .avatar-placeholder:hover { border-color: rgba(0,255,231,0.5) !important; }

    .avatar-del-btn {
      position: absolute; top: -11px; right: -11px;
      width: 26px; height: 26px;
      background: #ff2d78; color: #fff;
      border: 2px solid #0a1628; border-radius: 50%;
      font-size: 10px; font-weight: 700; line-height: 1;
      cursor: pointer; display: none;
      align-items: center; justify-content: center;
      z-index: 20;
      box-shadow: 0 0 12px rgba(255,45,120,0.7);
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .avatar-del-btn:hover {
      transform: scale(1.2);
      box-shadow: 0 0 20px rgba(255,45,120,0.9);
    }

    .nmn-toast {
      position: fixed; bottom: 32px; right: 32px; z-index: 9999;
      font-family: 'Share Tech Mono', monospace;
      font-size: 12px; letter-spacing: 2px;
      padding: 13px 20px;
      border-left: 3px solid #00ffe7;
      background: rgba(10,22,40,0.97); color: #00ffe7;
      box-shadow: 0 0 28px rgba(0,255,231,0.2), 0 4px 20px rgba(0,0,0,0.5);
      opacity: 0; transform: translateY(14px);
      transition: opacity 0.3s ease, transform 0.3s ease;
      max-width: 340px; pointer-events: none;
    }
    .nmn-toast.show { opacity: 1; transform: translateY(0); }
    .nmn-toast[data-type="warn"] {
      border-color: #ffe600; color: #ffe600;
      box-shadow: 0 0 28px rgba(255,230,0,0.2), 0 4px 20px rgba(0,0,0,0.5);
    }
  `;
  document.head.appendChild(s);
}

/* ------------------------------------------
   9. INIT
   ------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  injectStyles();
  initBackground();  // Canvas animation chạy trước
  initCodeRain();
  initSkillBars();
  initSendButton();
  initNavHighlight();
  initAvatarUpload();
});
