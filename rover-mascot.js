"use strict";

/* ============================================================
   ROVER MASCOT — phiên bản chibi
   Thú cưng nhỏ đuổi theo chuột lúc rảnh, dừng lại "nhìn" khi
   hover vào phần tử tương tác, giật lùi khi bị bấm trúng.

   Hình ảnh dùng 2 sprite sheet 3x3 theo chuẩn của page-mascot:
     directions: ↖ ↑ ↗ / ← ● → / ↙ ↓ ↘   (hướng nhìn)
     reactions : blink, heart, sparkle /
                 surprised, wink, bashful /
                 sleepy, dizzy, delighted  (biểu cảm)

   Chỉ chạy trên desktop có chuột thật (hover:hover, pointer:fine)
   và khi người dùng không bật prefers-reduced-motion.
   File này độc lập hoàn toàn với dashboard.js.

   Phần logic sprite (chọn hướng theo góc + hysteresis, chuỗi
   phản ứng khi bấm, "dizzy" khi bấm dồn) dựa trên page-mascot:
   https://github.com/nilbuild/page-mascot
   MIT License — Copyright (c) 2026 Kamran Ahmed
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

    const SIZE = 128;                // phải khớp width/height của .rover-mascot trong CSS

    const OFFSET_X = 72;             // mascot trailing lệch dưới-phải cursor
    const OFFSET_Y = 78;

    const EASE_CHASE = 0.10;
    const EASE_WANDER = 0.05;
    const EASE_SCAN = 0.17;
    const EASE_ROTATION = 0.15;

    const IDLE_TIMEOUT = 2200;       // ms không di chuột -> chuyển sang lang thang
    const WANDER_MIN_INTERVAL = 2200;
    const WANDER_MAX_INTERVAL = 4200;
    const SLEEP_AFTER = 14000;       // ms lang thang rồi thì đi ngủ (đặt 0 để tắt)

    const CLICK_HIT_RADIUS = 56;
    const KICK_DURATION = 420;

    const TRAIL_MIN_DIST = 16;       // px di chuyển trước khi bắn 1 vệt chấm
    const TRAIL_POOL_SIZE = 10;

    const INTERACTIVE_SELECTOR =
        "a, button, input, textarea, select, [role='button']";

    const SAFE_TOP = 140;
    const SAFE_BOTTOM = 72;
    const SAFE_SIDE = 56;

    // Sprite
    const DEAD_ZONE = 34;            // px; gần hơn mức này thì nhìn thẳng
    const HYSTERESIS = 0.12;         // chống giật khi sát biên giữa 2 hướng
    const SCAN_REACTION_GAP = 1800;  // ms tối thiểu giữa 2 lần "surprised" khi hover

    const PAYOFFS = ["heart", "sparkle", "delighted"];
    const BOOP_PAYOFF = 120;
    const BOOP_END = 560;
    const DIZZY_AFTER = 4;           // bấm dồn 4 lần -> chóng mặt
    const DIZZY_WINDOW = 1600;
    const DIZZY_END = 1100;

    const DIRECTIONS = [
        "up-left", "up", "up-right",
        "left", "center", "right",
        "down-left", "down", "down-right"
    ];

    const REACTIONS = [
        "blink", "heart", "sparkle",
        "surprised", "wink", "bashful",
        "sleepy", "dizzy", "delighted"
    ];

    // Theo chiều kim đồng hồ từ bên phải (khớp atan2 khi y hướng xuống)
    const CLOCKWISE = [
        "right", "down-right", "down", "down-left",
        "left", "up-left", "up", "up-right"
    ];

    const SECTOR = (Math.PI * 2) / CLOCKWISE.length;


    /* ------------------------------------------------------------
       DOM
       ------------------------------------------------------------ */

    const mascotEl = document.getElementById("roverMascot");
    const tiltEl = mascotEl?.querySelector(".rover-mascot__tilt");
    const dirLayer = mascotEl?.querySelector(".rover-mascot__layer--dir");
    const reactLayer = mascotEl?.querySelector(".rover-mascot__layer--react");
    const trailContainer = document.getElementById("roverTrail");

    if (!mascotEl || !tiltEl || !dirLayer || !reactLayer || !trailContainer) {
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

    let mode = "wander";             // 'wander' | 'chasing' | 'scanning' | 'sleeping'
    let lastMouseMoveAt = 0;
    let lastMouseX = pos.x;
    let lastMouseY = pos.y;

    let wanderAt = 0;
    let wanderStartedAt = performance.now();
    let hoveredEl = null;
    let scanPoint = { x: pos.x, y: pos.y };
    let lastTrailX = pos.x;
    let lastTrailY = pos.y;

    let sector = -1;
    let direction = "center";
    let reaction = null;
    let reactionTimers = [];
    let lastScanReactionAt = 0;
    let boops = { count: 0, at: 0 };


    /* ------------------------------------------------------------
       Helpers
       ------------------------------------------------------------ */

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function wrapAngle(angle) {
        return Math.atan2(Math.sin(angle), Math.cos(angle));
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

        const x = roomRight > SIZE + 60
            ? rect.right + SIZE / 2 + 10
            : Math.max(SAFE_SIDE, rect.left - SIZE / 2 - 10);

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
       Sprite: hướng nhìn + biểu cảm
       ------------------------------------------------------------ */

    // background-size 300% => mỗi ô là bước 0 / 50 / 100% trên cả 2 trục
    function setCell(layer, index) {
        layer.style.backgroundPosition =
            `${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%`;
    }

    function setDirection(dir) {
        if (dir === direction) {
            return;
        }
        direction = dir;
        setCell(dirLayer, DIRECTIONS.indexOf(dir));
    }

    function updateDirection(vx, vy) {
        if (Math.hypot(vx, vy) < DEAD_ZONE) {
            sector = -1;
            setDirection("center");
            return;
        }

        const angle = Math.atan2(vy, vx);

        // giữ nguyên hướng hiện tại cho tới khi vượt hẳn biên
        if (
            sector !== -1 &&
            Math.abs(wrapAngle(angle - sector * SECTOR)) < SECTOR / 2 + HYSTERESIS
        ) {
            return;
        }

        sector = (Math.round(angle / SECTOR) + CLOCKWISE.length) % CLOCKWISE.length;
        setDirection(CLOCKWISE[sector]);
    }

    function setReaction(name) {
        if (name === reaction) {
            return;
        }
        reaction = name;
        if (name) {
            setCell(reactLayer, REACTIONS.indexOf(name));
        }
        reactLayer.style.opacity = name ? "1" : "0";
        dirLayer.style.opacity = name ? "0" : "1";
    }

    function baseReaction() {
        return mode === "sleeping" ? "sleepy" : null;
    }

    function clearReactionTimers() {
        reactionTimers.forEach((t) => clearTimeout(t));
        reactionTimers = [];
    }

    function later(ms, name) {
        reactionTimers.push(setTimeout(() => {
            setReaction(name === undefined ? baseReaction() : name);
        }, ms));
    }

    function playReaction(name, ms) {
        clearReactionTimers();
        setReaction(name);
        later(ms);
    }

    function boop() {
        clearReactionTimers();

        const now = Date.now();
        boops.count = now - boops.at < DIZZY_WINDOW ? boops.count + 1 : 1;
        boops.at = now;

        if (boops.count >= DIZZY_AFTER) {
            boops.count = 0;
            setReaction("dizzy");
            later(DIZZY_END);
        } else {
            setReaction("blink");
            later(BOOP_PAYOFF, PAYOFFS[(boops.count - 1) % PAYOFFS.length]);
            later(BOOP_END);
        }
    }

    function fallAsleep() {
        mode = "sleeping";
        target = { x: pos.x, y: pos.y };
        clearReactionTimers();
        setReaction("sleepy");
    }


    /* ------------------------------------------------------------
       Events
       ------------------------------------------------------------ */

    document.addEventListener("mousemove", (event) => {
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        lastMouseMoveAt = performance.now();

        if (mode === "sleeping") {
            mode = "chasing";
            playReaction("surprised", 500);
        }

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

        const rect = el.getBoundingClientRect();
        scanPoint = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };

        const now = performance.now();
        if (now - lastScanReactionAt > SCAN_REACTION_GAP) {
            lastScanReactionAt = now;
            playReaction("surprised", 450);
        }
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
        mode = "chasing";
        target = { x: lastMouseX + OFFSET_X, y: lastMouseY + OFFSET_Y };
    });

    document.addEventListener("click", (event) => {
        const dx = event.clientX - pos.x;
        const dy = event.clientY - pos.y;
        if (Math.hypot(dx, dy) > CLICK_HIT_RADIUS) {
            return;
        }

        // restart animation giật lùi, cho phép bấm dồn nhiều lần
        mascotEl.classList.remove("is-kicked");
        void mascotEl.offsetWidth;
        mascotEl.classList.add("is-kicked");
        setTimeout(() => mascotEl.classList.remove("is-kicked"), KICK_DURATION);

        boop();

        if (mode === "sleeping") {
            mode = "wander";
            wanderStartedAt = performance.now();
        }

        const awayX = clamp(pos.x - dx * 0.7, SAFE_SIDE, window.innerWidth - SAFE_SIDE);
        const awayY = clamp(pos.y - dy * 0.7, SAFE_TOP, window.innerHeight - SAFE_BOTTOM);
        target = { x: awayX, y: awayY };
    }, { passive: true });

    document.addEventListener("mouseleave", () => {
        lastMouseMoveAt = 0;   // ép về trạng thái lang thang khi chuột rời trang
    });


    /* ------------------------------------------------------------
       Vòng lặp hoạt ảnh
       ------------------------------------------------------------ */

    function frame(now) {
        if (mode !== "scanning" && mode !== "sleeping") {
            const idleFor = now - lastMouseMoveAt;
            if (idleFor > IDLE_TIMEOUT) {
                if (mode !== "wander") {
                    mode = "wander";
                    wanderStartedAt = now;
                    pickWanderTarget();
                } else if (SLEEP_AFTER && now - wanderStartedAt > SLEEP_AFTER) {
                    fallAsleep();
                } else if (now >= wanderAt) {
                    pickWanderTarget();
                }
            }
        }

        const ease =
            mode === "scanning" ? EASE_SCAN :
                mode === "wander" ? EASE_WANDER :
                    mode === "sleeping" ? EASE_WANDER :
                        EASE_CHASE;

        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        pos.x += dx * ease;
        pos.y += dy * ease;

        pos.x = clamp(pos.x, SAFE_SIDE, window.innerWidth - SAFE_SIDE);
        pos.y = clamp(pos.y, SAFE_TOP, window.innerHeight - SAFE_BOTTOM);

        // Nhìn về đâu: chuột / phần tử đang quét / điểm đang đi tới
        if (mode === "sleeping") {
            updateDirection(0, 0);
        } else if (mode === "scanning") {
            updateDirection(scanPoint.x - pos.x, scanPoint.y - pos.y);
        } else if (mode === "chasing") {
            updateDirection(lastMouseX - pos.x, lastMouseY - pos.y);
        } else {
            updateDirection(target.x - pos.x, target.y - pos.y);
        }

        const targetRotation = clamp(dx * 0.4, -8, 8);
        rotation += (targetRotation - rotation) * EASE_ROTATION;

        mascotEl.style.transform =
            `translate3d(${pos.x - SIZE / 2}px, ${pos.y - SIZE / 2}px, 0)`;
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