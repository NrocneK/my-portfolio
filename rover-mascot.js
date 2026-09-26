"use strict";

/* ============================================================
   ROVER MASCOT
   Thú cưng nhỏ đuổi theo chuột lúc rảnh, dừng lại "quét" khi
   hover vào phần tử tương tác, giật lùi khi bị bấm trúng.

   Chỉ chạy trên desktop có chuột thật (hover:hover, pointer:fine)
   và khi người dùng không bật prefers-reduced-motion.
   File này độc lập hoàn toàn với dashboard.js.
   ============================================================ */

(function () {

    const supportsRealMouse =
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const reducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsRealMouse || reducedMotion) {
        return;
    }


    /* ------------------------------------------------------------
       Cấu hình
       ------------------------------------------------------------ */

    const OFFSET_X = 30;              // rover trailing lệch dưới-phải cursor
    const OFFSET_Y = 36;

    const EASE_CHASE = 0.10;
    const EASE_WANDER = 0.05;
    const EASE_SCAN = 0.17;
    const EASE_ROTATION = 0.15;

    const IDLE_TIMEOUT = 2200;        // ms không di chuột -> chuyển sang lang thang
    const WANDER_MIN_INTERVAL = 2200;
    const WANDER_MAX_INTERVAL = 4200;

    const CLICK_HIT_RADIUS = 36;
    const KICK_DURATION = 420;

    const TRAIL_MIN_DIST = 16;        // px di chuyển trước khi bắn 1 vệt radar
    const TRAIL_POOL_SIZE = 10;

    const INTERACTIVE_SELECTOR =
        "a, button, input, textarea, select, [role='button']";

    const SAFE_TOP = 96;
    const SAFE_BOTTOM = 72;
    const SAFE_SIDE = 48;


    /* ------------------------------------------------------------
       DOM
       ------------------------------------------------------------ */

    const mascotEl = document.getElementById("roverMascot");
    const tiltEl = mascotEl?.querySelector(".rover-mascot__tilt");
    const trailContainer = document.getElementById("roverTrail");

    if (!mascotEl || !tiltEl || !trailContainer) {
        return;
    }

    const trailPool = [];
    for (let i = 0; i < TRAIL_POOL_SIZE; i++) {
        const dot = document.createElement("div");
        dot.className = "rover-trail-dot";
        trailContainer.appendChild(dot);
        trailPool.push(dot);
    }
    let trailIndex = 0;


    /* ------------------------------------------------------------
       State
       ------------------------------------------------------------ */

    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let target = { x: pos.x, y: pos.y };
    let rotation = 0;

    let mode = "wander";              // 'wander' | 'chasing' | 'scanning'
    let lastMouseMoveAt = 0;
    let lastMouseX = pos.x;
    let lastMouseY = pos.y;

    let wanderAt = 0;
    let hoveredEl = null;
    let kicked = false;
    let lastTrailX = pos.x;
    let lastTrailY = pos.y;


    /* ------------------------------------------------------------
       Helpers
       ------------------------------------------------------------ */

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function pickWanderTarget() {
        target = {
            x: clamp(
                Math.random() * window.innerWidth,
                SAFE_SIDE,
                window.innerWidth - SAFE_SIDE
            ),
            y: clamp(
                SAFE_TOP + Math.random() * (window.innerHeight - SAFE_TOP - SAFE_BOTTOM),
                SAFE_TOP,
                window.innerHeight - SAFE_BOTTOM
            )
        };
        wanderAt =
            performance.now() +
            WANDER_MIN_INTERVAL +
            Math.random() * (WANDER_MAX_INTERVAL - WANDER_MIN_INTERVAL);
    }

    function scanTargetFor(el) {
        const rect = el.getBoundingClientRect();
        const roomRight = window.innerWidth - rect.right;

        const x = roomRight > 90
            ? rect.right + 40
            : Math.max(SAFE_SIDE, rect.left - 40);

        const y = clamp(
            rect.top + rect.height / 2,
            SAFE_TOP,
            window.innerHeight - SAFE_BOTTOM
        );

        return { x, y };
    }

    function spawnTrailDot(x, y) {
        const dot = trailPool[trailIndex];
        trailIndex = (trailIndex + 1) % trailPool.length;

        dot.classList.remove("is-active");
        // buộc reflow để animation restart được từ đầu
        void dot.offsetWidth;

        dot.style.left = x + "px";
        dot.style.top = y + "px";
        dot.classList.add("is-active");
    }


    /* ------------------------------------------------------------
       Events
       ------------------------------------------------------------ */

    document.addEventListener("mousemove", (event) => {
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        lastMouseMoveAt = performance.now();

        if (mode !== "scanning") {
            mode = "chasing";
            target = {
                x: lastMouseX + OFFSET_X,
                y: lastMouseY + OFFSET_Y
            };
        }

        const dx = lastMouseX - lastTrailX;
        const dy = lastMouseY - lastTrailY;
        if (Math.hypot(dx, dy) >= TRAIL_MIN_DIST) {
            spawnTrailDot(lastMouseX, lastMouseY);
            lastTrailX = lastMouseX;
            lastTrailY = lastMouseY;
        }
    }, { passive: true });

    document.addEventListener("pointerover", (event) => {
        const el = event.target.closest(INTERACTIVE_SELECTOR);
        if (!el || el === hoveredEl) {
            return;
        }
        hoveredEl = el;
        mode = "scanning";
        target = scanTargetFor(el);
        mascotEl.classList.add("is-scanning");
    });

    document.addEventListener("pointerout", (event) => {
        if (!hoveredEl) {
            return;
        }
        const stillInside =
            event.relatedTarget && hoveredEl.contains(event.relatedTarget);
        if (stillInside) {
            return;
        }
        hoveredEl = null;
        mascotEl.classList.remove("is-scanning");
        mode = "chasing";
        target = { x: lastMouseX + OFFSET_X, y: lastMouseY + OFFSET_Y };
    });

    document.addEventListener("click", (event) => {
        const dx = event.clientX - pos.x;
        const dy = event.clientY - pos.y;
        if (Math.hypot(dx, dy) > CLICK_HIT_RADIUS || kicked) {
            return;
        }

        kicked = true;
        mascotEl.classList.add("is-kicked");

        const awayX = clamp(pos.x - dx * 0.7, SAFE_SIDE, window.innerWidth - SAFE_SIDE);
        const awayY = clamp(pos.y - dy * 0.7, SAFE_TOP, window.innerHeight - SAFE_BOTTOM);
        target = { x: awayX, y: awayY };

        setTimeout(() => {
            mascotEl.classList.remove("is-kicked");
            kicked = false;
        }, KICK_DURATION);
    }, { passive: true });

    document.addEventListener("mouseleave", () => {
        lastMouseMoveAt = 0;   // ép về trạng thái lang thang khi chuột rời trang
    });


    /* ------------------------------------------------------------
       Vòng lặp hoạt ảnh
       ------------------------------------------------------------ */

    function frame(now) {
        if (mode !== "scanning") {
            const idleFor = now - lastMouseMoveAt;
            if (idleFor > IDLE_TIMEOUT) {
                if (mode !== "wander") {
                    mode = "wander";
                    pickWanderTarget();
                } else if (now >= wanderAt) {
                    pickWanderTarget();
                }
            }
        }

        const ease =
            mode === "scanning" ? EASE_SCAN :
                mode === "wander" ? EASE_WANDER :
                    EASE_CHASE;

        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        pos.x += dx * ease;
        pos.y += dy * ease;

        pos.x = clamp(pos.x, SAFE_SIDE, window.innerWidth - SAFE_SIDE);
        pos.y = clamp(pos.y, SAFE_TOP, window.innerHeight - SAFE_BOTTOM);

        const targetRotation = clamp(dx * 0.6, -14, 14);
        rotation += (targetRotation - rotation) * EASE_ROTATION;

        mascotEl.style.transform =
            `translate3d(${pos.x - 32}px, ${pos.y - 22}px, 0)`;
        tiltEl.style.transform = `rotate(${rotation.toFixed(2)}deg)`;

        requestAnimationFrame(frame);
    }


    /* ------------------------------------------------------------
       Khởi động
       ------------------------------------------------------------ */

    pickWanderTarget();
    mascotEl.classList.add("is-active");
    trailContainer.classList.add("is-active");
    requestAnimationFrame(frame);

})();