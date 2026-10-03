"use strict";

/* ============================================================
   ROVER MASCOT — phiên bản chibi
   Thú cưng nhỏ sống trên trang:
     - Đứng yên khi chuột ở gần; chỉ chạy theo khi chuột đi xa,
       và dừng lại ngay khi tới gần (không bám theo một vị trí cố định)
     - Rảnh thì đi dạo, lâu hơn nữa thì ngủ gật
     - Rê chuột lên người nó: nhìn theo, ngại ngùng, rồi thả tim
     - Bấm: nhún nhảy; bấm dồn 4 lần: chóng mặt
     - Nhấn giữ và kéo: nhấc nó lên; lắc mạnh: chóng mặt; thả nhanh: bị ném đi

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

    // Đuổi theo chuột
    const FOLLOW_START = 240;        // px: chuột xa hơn mức này thì mascot mới chạy theo
    const STOP_DIST = 92;            // px: tới gần chuột đến mức này thì dừng
    const EASE_CHASE = 0.07;
    const MAX_SPEED = 20;            // px / frame (60fps), giới hạn tốc độ chạy
    const STUCK_FRAMES = 25;         // bị kẹt ở mép màn hình quá lâu thì thôi đuổi

    // Lang thang / ngủ
    const EASE_WANDER = 0.04;
    const IDLE_TIMEOUT = 5000;       // ms không di chuột -> đi dạo
    const WANDER_MIN_INTERVAL = 2200;
    const WANDER_MAX_INTERVAL = 4200;
    const SLEEP_AFTER = 14000;       // ms đi dạo rồi thì ngủ gật (đặt 0 để tắt)

    // Tương tác với chuột
    const HIT_RX = 38;               // vùng "người" của mascot (hình elip quanh tâm)
    const HIT_RY = 58;
    const PET_BASHFUL_AFTER = 650;   // ms rê chuột lên người -> ngại ngùng
    const PET_HEART_AFTER = 2400;    // ms -> thả tim
    const DRAG_THRESHOLD = 5;        // px phải kéo xa hơn mức này mới tính là kéo
    const DRAG_EASE = 0.35;
    const FLING_MIN_SPEED = 4;       // px / frame: thả nhanh hơn mức này thì bị ném
    const FLING_MAX_SPEED = 26;
    const FLING_FRICTION = 0.93;
    const FLING_BOUNCE = 0.55;
    const SHAKE_REVERSALS = 4;       // đảo chiều 4 lần trong cửa sổ này -> chóng mặt
    const SHAKE_WINDOW = 900;
    const COOLDOWN_AFTER_DROP = 1200; // ms mascot nghỉ, không chạy ngay lại chỗ chuột

    const TRAIL_MIN_DIST = 16;       // px di chuyển trước khi bắn 1 vệt chấm
    const TRAIL_POOL_SIZE = 10;

    const INTERACTIVE_SELECTOR =
        "a, button, input, textarea, select, label, [role='button']";

    const SAFE_TOP = 66;
    const SAFE_BOTTOM = 66;
    const SAFE_SIDE = 56;

    // Sprite
    const DEAD_ZONE = 34;            // px; gần hơn mức này thì nhìn thẳng
    const HYSTERESIS = 0.12;         // chống giật khi sát biên giữa 2 hướng
    const SCAN_REACTION_GAP = 1800;  // ms tối thiểu giữa 2 lần "surprised" khi hover link/nút

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

    const root = document.documentElement;
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

    // mode: 'idle' | 'chasing' | 'wander' | 'sleeping' | 'dragging' | 'flung'
    let mode = "wander";

    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let target = { x: pos.x, y: pos.y };
    let vel = { x: 0, y: 0 };
    let rotation = 0;

    let mouseInside = false;         // chưa biết chuột ở đâu cho tới lần di chuột đầu tiên
    let lastMouseX = pos.x;
    let lastMouseY = pos.y;
    let lastMouseMoveAt = 0;

    let wanderAt = 0;
    let wanderStartedAt = 0;
    let noChaseUntil = 0;
    let stillFrames = 0;

    let hoveredEl = null;            // link / nút đang được chuột trỏ vào
    let lastScanReactionAt = 0;

    let hovered = false;             // chuột đang nằm trên người mascot
    let hoverSince = 0;

    let press = null;                // { x, y, onInteractive, dragging }
    let dragOffset = { x: 0, y: 0 };
    let dragVel = { x: 0, y: 0 };
    let reversals = [];
    let lastSignX = 0;
    let suppressClickUntil = 0;

    let lastTrailX = pos.x;
    let lastTrailY = pos.y;

    let bobPhase = 0;
    let bobAmp = 0;

    let sector = -1;
    let direction = "center";
    let reaction = null;
    let cues = [];                   // phản ứng ngắn: { at, until, name }
    let boops = { count: 0, at: 0 };
    let lastFrame = 0;


    /* ------------------------------------------------------------
       Helpers
       ------------------------------------------------------------ */

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function wrapAngle(angle) {
        return Math.atan2(Math.sin(angle), Math.cos(angle));
    }

    // Hệ số làm mượt không phụ thuộc tốc độ khung hình (60Hz hay 144Hz đều như nhau)
    function easeFor(ease, dtScale) {
        return 1 - Math.pow(1 - ease, dtScale);
    }

    function inHit(x, y) {
        const dx = (x - pos.x) / HIT_RX;
        const dy = (y - pos.y) / HIT_RY;
        return dx * dx + dy * dy <= 1;
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

    function startWander(now) {
        mode = "wander";
        wanderStartedAt = now;
        pickWanderTarget();
    }

    function distToCursor() {
        return mouseInside
            ? Math.hypot(lastMouseX - pos.x, lastMouseY - pos.y)
            : Infinity;
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

    function playAnimation(className, ms) {
        mascotEl.classList.remove("is-hop", "is-land");
        void mascotEl.offsetWidth;
        mascotEl.classList.add(className);
        setTimeout(() => mascotEl.classList.remove(className), ms);
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

    // Biểu cảm nền theo trạng thái (khi không có phản ứng ngắn nào đang chạy)
    function ambientReaction(now) {
        if (mode === "sleeping") {
            return "sleepy";
        }
        if (mode === "dragging") {
            return "surprised";
        }
        if (hovered) {
            const dwell = now - hoverSince;
            if (dwell > PET_HEART_AFTER) {
                return "heart";
            }
            if (dwell > PET_BASHFUL_AFTER) {
                return "bashful";
            }
        }
        return null;
    }

    function activeCue(now) {
        cues = cues.filter((cue) => cue.until > now);
        const cue = cues.find((c) => c.at <= now);
        return cue ? cue.name : null;
    }

    function playReaction(name, ms, now) {
        cues = [{ at: now, until: now + ms, name }];
    }

    function boop(now) {
        boops.count = now - boops.at < DIZZY_WINDOW ? boops.count + 1 : 1;
        boops.at = now;

        if (boops.count >= DIZZY_AFTER) {
            boops.count = 0;
            cues = [{ at: now, until: now + DIZZY_END, name: "dizzy" }];
        } else {
            cues = [
                { at: now, until: now + BOOP_PAYOFF, name: "blink" },
                {
                    at: now + BOOP_PAYOFF,
                    until: now + BOOP_END,
                    name: PAYOFFS[(boops.count - 1) % PAYOFFS.length]
                }
            ];
        }
    }


    /* ------------------------------------------------------------
       Trạng thái: ngủ / thức / hover / kéo
       ------------------------------------------------------------ */

    function fallAsleep() {
        mode = "sleeping";
        target = { x: pos.x, y: pos.y };
    }

    function wakeUp(now) {
        mode = distToCursor() > FOLLOW_START ? "chasing" : "idle";
        playReaction("surprised", 500, now);
    }

    function updateGrabCursor() {
        if (!hovered || mode === "dragging") {
            root.classList.remove("rover-grab");
            return;
        }
        // chỉ đổi con trỏ khi bên dưới không phải link/nút (để không cản thao tác thật)
        const under = document.elementFromPoint(lastMouseX, lastMouseY);
        const interactive = under && under.closest(INTERACTIVE_SELECTOR);
        root.classList.toggle("rover-grab", !interactive);
    }

    function setHovered(over, now) {
        hovered = over;
        hoverSince = now;
        if (over) {
            if (mode === "sleeping") {
                wakeUp(now);
            } else if (mode === "chasing" || mode === "wander") {
                mode = "idle";            // đang được vuốt ve thì đứng yên
            }
        }
        updateGrabCursor();
    }

    function startDrag(now) {
        mode = "dragging";
        dragOffset = { x: press.x - pos.x, y: press.y - pos.y };
        dragVel = { x: 0, y: 0 };
        reversals = [];
        lastSignX = 0;
        cues = [];
        press.dragging = true;
        root.classList.add("rover-dragging");
        root.classList.remove("rover-grab");
    }

    function endDrag(now) {
        if (mode !== "dragging") {
            return;
        }
        root.classList.remove("rover-dragging");
        suppressClickUntil = now + 80;
        noChaseUntil = now + COOLDOWN_AFTER_DROP;

        const speed = Math.hypot(dragVel.x, dragVel.y);
        if (speed > FLING_MIN_SPEED) {
            const scale = Math.min(1.1, FLING_MAX_SPEED / speed);
            vel = { x: dragVel.x * scale, y: dragVel.y * scale };
            mode = "flung";
            playReaction("dizzy", 900, now);
        } else {
            mode = "idle";
            playAnimation("is-land", 380);
            playReaction("delighted", 700, now);
        }
    }


    /* ------------------------------------------------------------
       Events
       ------------------------------------------------------------ */

    document.addEventListener("mousemove", (event) => {
        const now = performance.now();

        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        lastMouseMoveAt = now;
        mouseInside = true;

        // nhấn giữ rồi kéo xa quá ngưỡng -> bắt đầu nhấc mascot lên
        if (press && !press.dragging && !press.onInteractive) {
            if (Math.hypot(lastMouseX - press.x, lastMouseY - press.y) > DRAG_THRESHOLD) {
                startDrag(now);
            }
        }

        if (mode === "dragging" || mode === "flung") {
            return;
        }

        if (mode === "sleeping") {
            wakeUp(now);
        } else if (mode === "wander") {
            mode = distToCursor() > FOLLOW_START ? "chasing" : "idle";
        }

        if (hovered) {
            updateGrabCursor();
        }

        const dx = lastMouseX - lastTrailX;
        const dy = lastMouseY - lastTrailY;
        if (Math.hypot(dx, dy) >= TRAIL_MIN_DIST) {
            spawnTrailDot(lastMouseX, lastMouseY);
            lastTrailX = lastMouseX;
            lastTrailY = lastMouseY;
        }
    }, { passive: true });

    document.addEventListener("mousedown", (event) => {
        if (event.button !== 0 || !inHit(event.clientX, event.clientY)) {
            return;
        }

        const under = document.elementFromPoint(event.clientX, event.clientY);
        const onInteractive = !!(under && under.closest(INTERACTIVE_SELECTOR));

        press = { x: event.clientX, y: event.clientY, onInteractive, dragging: false };

        // không cản click thật vào link/nút; vùng trống thì chặn bôi đen chữ
        if (!onInteractive) {
            event.preventDefault();
        }
    });

    document.addEventListener("mouseup", (event) => {
        const now = performance.now();
        const wasPress = press;
        press = null;

        if (mode === "dragging") {
            endDrag(now);
            return;
        }

        // bấm thường (không kéo) trúng người mascot -> nhún nhảy
        if (wasPress && inHit(event.clientX, event.clientY)) {
            playAnimation("is-hop", 460);
            boop(now);
            if (mode === "sleeping") {
                mode = "idle";
            }
        }
    });

    // Sau khi kéo-thả, không để trang nhận thêm cú click ngoài ý muốn
    document.addEventListener("click", (event) => {
        if (performance.now() < suppressClickUntil) {
            event.stopPropagation();
            event.preventDefault();
        }
    }, true);

    document.addEventListener("pointerover", (event) => {
        const el = event.target.closest(INTERACTIVE_SELECTOR);
        if (!el || el === hoveredEl) {
            return;
        }
        hoveredEl = el;

        // chỉ "tò mò" nhìn vào link/nút khi mascot đang ở gần và đang rảnh
        const now = performance.now();
        const near = distToCursor() <= FOLLOW_START * 1.3;
        if (
            near &&
            (mode === "idle" || mode === "chasing") &&
            now - lastScanReactionAt > SCAN_REACTION_GAP
        ) {
            lastScanReactionAt = now;
            playReaction("surprised", 450, now);
        }
    });

    document.addEventListener("pointerout", (event) => {
        if (!hoveredEl) {
            return;
        }
        const stillInside =
            event.relatedTarget && hoveredEl.contains(event.relatedTarget);
        if (!stillInside) {
            hoveredEl = null;
        }
    });

    root.addEventListener("mouseleave", () => {
        mouseInside = false;           // chuột rời trang -> mascot tự do đi dạo
        if (hovered) {
            setHovered(false, performance.now());
        }
    });

    window.addEventListener("blur", () => {
        press = null;
        endDrag(performance.now());
    });


    /* ------------------------------------------------------------
       Vòng lặp hoạt ảnh
       ------------------------------------------------------------ */

    function frame(now) {
        const dtScale = Math.min(3, lastFrame ? (now - lastFrame) / 16.667 : 1);
        lastFrame = now;

        const W = window.innerWidth;
        const H = window.innerHeight;

        // --- chuột có đang nằm trên người mascot không?
        const over =
            mouseInside && mode !== "dragging" && mode !== "flung" &&
            inHit(lastMouseX, lastMouseY);
        if (over !== hovered) {
            setHovered(over, now);
        }

        let stepX = 0;
        let stepY = 0;
        let moving = 0;

        if (mode === "dragging") {
            // nhấc lên: bám theo chuột, đung đưa như con lắc
            const tx = clamp(lastMouseX - dragOffset.x, SAFE_SIDE * 0.7, W - SAFE_SIDE * 0.7);
            const ty = clamp(lastMouseY - dragOffset.y, SAFE_TOP, H - SAFE_BOTTOM * 0.6);
            const k = easeFor(DRAG_EASE, dtScale);
            const px = pos.x;
            const py = pos.y;
            pos.x += (tx - pos.x) * k;
            pos.y += (ty - pos.y) * k;

            const vx = (pos.x - px) / dtScale;
            const vy = (pos.y - py) / dtScale;
            dragVel.x += (vx - dragVel.x) * 0.5;
            dragVel.y += (vy - dragVel.y) * 0.5;

            // lắc mạnh = đảo chiều liên tục -> chóng mặt
            const sign = Math.abs(vx) > 5 ? Math.sign(vx) : 0;
            if (sign !== 0 && sign !== lastSignX) {
                if (lastSignX !== 0) {
                    reversals.push(now);
                }
                lastSignX = sign;
            }
            reversals = reversals.filter((t) => now - t < SHAKE_WINDOW);
            if (reversals.length >= SHAKE_REVERSALS) {
                reversals = [];
                playReaction("dizzy", DIZZY_END, now);
            }

            rotation += (clamp((tx - pos.x) * 1.1 + dragVel.x * 1.6, -28, 28) - rotation)
                * easeFor(0.25, dtScale);
            moving = 0;

        } else if (mode === "flung") {
            // bị ném: lướt đi, ma sát dần, nảy khi chạm mép
            pos.x += vel.x * dtScale;
            pos.y += vel.y * dtScale;
            const f = Math.pow(FLING_FRICTION, dtScale);
            vel.x *= f;
            vel.y *= f;

            const minX = SAFE_SIDE * 0.7, maxX = W - SAFE_SIDE * 0.7;
            const minY = SAFE_TOP, maxY = H - SAFE_BOTTOM * 0.6;
            let bounced = false;
            if (pos.x < minX) { pos.x = minX; vel.x = Math.abs(vel.x) * FLING_BOUNCE; bounced = true; }
            if (pos.x > maxX) { pos.x = maxX; vel.x = -Math.abs(vel.x) * FLING_BOUNCE; bounced = true; }
            if (pos.y < minY) { pos.y = minY; vel.y = Math.abs(vel.y) * FLING_BOUNCE; bounced = true; }
            if (pos.y > maxY) { pos.y = maxY; vel.y = -Math.abs(vel.y) * FLING_BOUNCE; bounced = true; }
            if (bounced && Math.hypot(vel.x, vel.y) > 3) {
                playAnimation("is-land", 380);
            }

            rotation += (clamp(vel.x * 2.5, -30, 30) - rotation) * easeFor(0.2, dtScale);

            if (Math.hypot(vel.x, vel.y) < 0.6) {
                mode = "idle";
                noChaseUntil = now + 600;
                playAnimation("is-land", 380);
                playReaction("delighted", 600, now);
            }

        } else {
            // --- quyết định chuyển trạng thái
            const d = distToCursor();

            if (mode === "idle") {
                if (!hovered) {
                    if (mouseInside && d > FOLLOW_START && now > noChaseUntil) {
                        mode = "chasing";
                        stillFrames = 0;
                    } else if (!mouseInside || now - lastMouseMoveAt > IDLE_TIMEOUT) {
                        startWander(now);
                    }
                }
            }

            if (mode === "chasing") {
                if (!mouseInside || hovered || d <= STOP_DIST + 6) {
                    mode = "idle";               // tới gần rồi -> dừng, không đứng cố định một góc
                } else {
                    // đi về phía chuột, nhưng dừng cách STOP_DIST (đứng ngay phía mình đi tới)
                    const ux = (pos.x - lastMouseX) / d;
                    const uy = (pos.y - lastMouseY) / d;
                    target = {
                        x: clamp(lastMouseX + ux * STOP_DIST, SAFE_SIDE, W - SAFE_SIDE),
                        y: clamp(lastMouseY + uy * STOP_DIST, SAFE_TOP, H - SAFE_BOTTOM)
                    };
                }
            }

            if (mode === "wander") {
                if (SLEEP_AFTER && now - wanderStartedAt > SLEEP_AFTER) {
                    fallAsleep();
                } else if (now >= wanderAt) {
                    pickWanderTarget();
                }
            }

            // --- di chuyển
            if (mode === "chasing" || mode === "wander") {
                const ease = mode === "chasing" ? EASE_CHASE : EASE_WANDER;
                const k = easeFor(ease, dtScale);
                stepX = (target.x - pos.x) * k;
                stepY = (target.y - pos.y) * k;

                const len = Math.hypot(stepX, stepY);
                const maxStep = MAX_SPEED * dtScale;
                if (len > maxStep) {
                    stepX *= maxStep / len;
                    stepY *= maxStep / len;
                }
                pos.x += stepX;
                pos.y += stepY;
                moving = Math.hypot(stepX, stepY) / dtScale;

                if (mode === "chasing") {
                    stillFrames = moving < 0.2 ? stillFrames + 1 : 0;
                    if (stillFrames > STUCK_FRAMES) {
                        mode = "idle";               // kẹt ở mép màn hình
                        noChaseUntil = now + 600;
                    }
                }
            }

            pos.x = clamp(pos.x, SAFE_SIDE, W - SAFE_SIDE);
            pos.y = clamp(pos.y, SAFE_TOP, H - SAFE_BOTTOM);

            rotation += (clamp(stepX * 1.2, -8, 8) - rotation) * easeFor(0.15, dtScale);
        }

        // --- nhìn về đâu
        let lookX = pos.x;
        let lookY = pos.y;
        if (mode === "sleeping") {
            // nhìn thẳng
        } else if (mode === "wander") {
            lookX = target.x;
            lookY = target.y;
        } else if (hoveredEl && !hovered && mouseInside && (mode === "idle" || mode === "chasing")
            && distToCursor() <= FOLLOW_START * 1.3) {
            const rect = hoveredEl.getBoundingClientRect();
            lookX = rect.left + rect.width / 2;
            lookY = rect.top + rect.height / 2;
        } else if (mouseInside) {
            lookX = lastMouseX;
            lookY = lastMouseY;
        } else {
            lookX = target.x;
            lookY = target.y;
        }
        updateDirection(lookX - pos.x, lookY - pos.y);

        // --- biểu cảm: phản ứng ngắn ưu tiên, không thì theo trạng thái
        setReaction(activeCue(now) || ambientReaction(now));

        // --- nhún nhẹ theo nhịp bước khi đang di chuyển
        bobAmp += ((moving > 1.2 ? 1 : 0) - bobAmp) * easeFor(0.15, dtScale);
        bobPhase += moving * dtScale * 0.16;
        const bob = Math.abs(Math.sin(bobPhase)) * 6 * bobAmp;

        mascotEl.style.transform =
            `translate3d(${(pos.x - SIZE / 2).toFixed(2)}px, ${(pos.y - SIZE / 2).toFixed(2)}px, 0)`;
        tiltEl.style.transform =
            `translateY(${(-bob).toFixed(2)}px) rotate(${rotation.toFixed(2)}deg)`;

        requestAnimationFrame(frame);
    }


    /* ------------------------------------------------------------
       Khởi động
       ------------------------------------------------------------ */

    startWander(performance.now());
    mascotEl.classList.add("is-active");
    trailContainer.classList.add("is-active");
    requestAnimationFrame(frame);

})();