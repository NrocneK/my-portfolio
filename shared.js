/* ---- theme (dark/light) ---- */
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  const label = document.getElementById('themeLabel');
  const icon = document.getElementById('themeIcon');
  if(label) label.textContent = theme === 'dark' ? 'Dark' : 'Light';
  if(icon) icon.innerHTML = theme === 'dark'
    ? '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>'
    : '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path>';
  localStorage.setItem('portfolio-theme', theme);
}

function initThemeToggle(){
  let currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(currentTheme);
  const btn = document.getElementById('themeToggle');
  if(!btn) return;
  btn.addEventListener('click', (e)=>{
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
    e.currentTarget.classList.add('spin');
    setTimeout(()=> e.currentTarget.classList.remove('spin'), 400);
  });
}

/* ---- generic i18n text application ---- */
function applyI18nText(dict, lang){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(dict[lang] && dict[lang][key] !== undefined) el.textContent = dict[lang][key];
  });
}

/* ---- click ripple, auto-bound to any .btn / .toggle-btn on the page ---- */
function spawnRipple(e){
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const diameter = Math.max(rect.width, rect.height);
  const circle = document.createElement('span');
  circle.className = 'ripple';
  circle.style.width = circle.style.height = diameter + 'px';
  circle.style.left = (e.clientX - rect.left - diameter / 2) + 'px';
  circle.style.top = (e.clientY - rect.top - diameter / 2) + 'px';
  btn.appendChild(circle);
  setTimeout(()=> circle.remove(), 650);
}

function bindRipples(){
  document.querySelectorAll('.btn, .toggle-btn').forEach(btn=>{
    if(!btn.hasAttribute('data-ripple-bound')){
      btn.setAttribute('data-ripple-bound', '1');
      btn.addEventListener('click', spawnRipple);
    }
  });
}
