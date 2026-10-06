"use strict";

/* ============================================================
   ROVER MASCOT — phiên bản chibi
   Thú cưng nhỏ sống trên trang:
     - Đứng yên khi chuột ở gần; chỉ chạy theo khi chuột đi xa,
       và dừng lại ngay khi tới gần (không bám theo một vị trí cố định)
     - Chạy tới nơi thì vẫy tay chào
     - Để yên một lúc thì lần lượt: đi vòng vòng, làm việc vặt (gõ laptop, đọc
       sách, cà phê, nghĩ ngợi...), tập thái cực quyền, đứng nghỉ một chút,
       rồi ngáp và ngủ gật. Di chuột / chạm thì tỉnh dậy, lần rảnh sau lặp lại.
     - Rê chuột lên người nó: nhìn theo, ngại ngùng, rồi thả tim
     - Bấm: nhảy lên; bấm dồn 4 lần: chóng mặt rồi bực bội
     - Nhấn giữ và kéo: nhấc nó lên; lắc mạnh: chóng mặt; thả nhanh: bị ném đi
     - Rê vào link/nút: chỉ tay vào đó; bấm link/nút: giơ ngón cái
     - Cuộn tới cuối trang: cầm cúp ăn mừng

   Hình ảnh dùng 5 sprite sheet 3x3 (2 sheet đầu theo chuẩn page-mascot):
     directions: ↖ ↑ ↗ / ← ● → / ↙ ↓ ↘   (hướng nhìn)
     reactions : blink, heart, sparkle /
                 surprised, wink, bashful /
                 sleepy, dizzy, delighted  (biểu cảm)
     walk      : 8 khung đi bộ nhìn nghiêng sang phải (hướng trái = lật gương)
     actions   : vẫy x2, thumbs up, vỗ tay, hô vang, ngồi xuống, nhảy, nhún vai, chỉ tay
     work      : gõ laptop x2, suy nghĩ, ý tưởng, cà phê, đọc sách, ngáp, bực bội, cầm cúp
     taichi    : lưới 8x6, 48 khung một bài thái cực quyền tay không (lặp được)
   Các sheet sau được tải trễ sau khi trang load xong; chưa tải xong thì
   mascot vẫn chạy bình thường bằng 2 sheet đầu.

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

    // Điện thoại / máy tính bảng: không có chuột -> điều khiển bằng chạm
    const isTouch = !supportsRealMouse &&
        (navigator.maxTouchPoints > 0 || "ontouchstart" in window);

    const reducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || (!supportsRealMouse && !isTouch)) {
        return;
    }


    /* ------------------------------------------------------------
       Cấu hình
       ------------------------------------------------------------ */

    // Kích thước: 128px trên desktop; trên điện thoại nhỏ lại theo cạnh ngắn của màn hình
    const SIZE = isTouch
        ? Math.round(Math.min(108, Math.max(80, Math.min(window.innerWidth, window.innerHeight) * 0.24)))
        : 128;
    const S = SIZE / 128;            // hệ số co giãn cho mọi khoảng cách tính bằng px

    // Đuổi theo chuột
    const FOLLOW_START = (isTouch ? 150 : 240) * S;        // px: chuột xa hơn mức này thì mascot mới chạy theo
    const STOP_DIST = 92 * S;            // px: tới gần chuột đến mức này thì dừng
    const EASE_CHASE = 0.07;
    const MAX_SPEED = 20 * S;            // px / frame (60fps), giới hạn tốc độ chạy
    const STUCK_FRAMES = 25;         // bị kẹt ở mép màn hình quá lâu thì thôi đuổi
    const ARRIVE_WAVE_MIN_TRAVEL = 350 * S; // chạy xa hơn mức này tới nơi mới vẫy tay chào

    // Hành vi khi để yên:
    //   "routine" = theo thứ tự: đi vòng vòng -> việc vặt -> thái cực quyền -> nghỉ -> ngáp -> ngủ
    //   "wander"  = đi dạo và làm việc vặt ngẫu nhiên mãi, sau SLEEP_AFTER thì ngáp rồi ngủ
    //   "taichi"  = đứng tại chỗ tập thái cực quyền liên tục (không đi dạo, không ngủ)
    const IDLE_BEHAVIOR = "routine";
    const ROUTINE = {
        strolls: [1, 2],             // số đoạn đi dạo đầu tiên (đi tới điểm ngẫu nhiên rồi đi tiếp)
        chores: [1, 2],              // số lần đi tới một điểm rồi làm việc vặt
        rest: [2500, 3500]           // ms đứng nghỉ sau khi tập xong, trước khi ngáp
    };
    const TAICHI_LOOPS = [2, 3];     // số vòng liên tục mỗi lượt tập
    const TAICHI_REST = [1200, 2200]; // ms đứng nghỉ giữa hai lượt (chỉ khi IDLE_BEHAVIOR = "taichi")

    // Lang thang / ngủ (kiểu "wander")
    const EASE_WANDER = 0.04;
    const WANDER_MAX_SPEED = 1.6 * S;
    const WANDER_MAX_WALK_TIME = 9000; // ms tối đa cho một đoạn đi dạo
    const WANDER_ARRIVE_DIST = 10 * S;
    const IDLE_TIMEOUT = 4000;       // ms không di chuột / chạm -> bắt đầu hành vi lúc rảnh
    const SLEEP_AFTER = 14000;       // ms đi dạo rồi thì ngáp + ngủ gật (đặt 0 để tắt)
    const YAWN_MS = 1700;
    const GREETING_MS = 2400;        // lúc mới vào trang đứng vẫy tay chào

    // Đi bộ (sprite sheet walk)
    const WALK_STRIDE = 3.4 * S;          // px di chuyển / 1 khung hình đi bộ
    const WALK_MAX_PHASE = 0.34;     // tối đa khung / tick, tránh nhấp nháy khi chạy nhanh
    const WALK_ON_SPEED = 1.0;       // px / tick: nhanh hơn mức này thì chuyển sang sprite đi bộ
    const WALK_OFF_SPEED = 0.5;

    // Tương tác với chuột
    const HIT_RX = 38 * S;               // vùng "người" của mascot (hình elip quanh tâm)
    const HIT_RY = 58 * S;
    const PET_BASHFUL_AFTER = 650;   // ms rê chuột lên người -> ngại ngùng
    const PET_HEART_AFTER = 2400;    // ms -> thả tim
    const DRAG_THRESHOLD = isTouch ? 9 : 5;        // px phải kéo xa hơn mức này mới tính là kéo
    const DRAG_EASE = 0.35;
    const FLING_MIN_SPEED = 4;       // px / frame: thả nhanh hơn mức này thì bị ném
    const FLING_MAX_SPEED = 26;
    const FLING_FRICTION = 0.93;
    const FLING_BOUNCE = 0.55;
    const SHAKE_REVERSALS = 4;       // đảo chiều 4 lần trong cửa sổ này -> chóng mặt
    const SHAKE_WINDOW = 900;
    const COOLDOWN_AFTER_DROP = 1200; // ms mascot nghỉ, không chạy ngay lại chỗ chuột

    // Chạm (điện thoại)
    const TAP_MAX_MS = 320;          // chạm nhanh hơn mức này mới tính là "bấm"
    const TAP_SLOP = 12;             // px: ngón tay lướt xa hơn mức này là cuộn, không phải bấm
    const TOUCH_LINGER = 6000;       // ms mascot còn "nhớ" điểm chạm cuối rồi mới đi dạo

    const TRAIL_MIN_DIST = 16;       // px di chuyển trước khi bắn 1 vệt chấm
    const TRAIL_POOL_SIZE = 10;

    const INTERACTIVE_SELECTOR =
        "a, button, input, textarea, select, label, [role='button']";

    const SAFE_TOP = 66 * S;
    const SAFE_BOTTOM = 66 * S;
    const SAFE_SIDE = 56 * S;

    // Sprite
    const DEAD_ZONE = 34 * S;            // px; gần hơn mức này thì nhìn thẳng
    const HYSTERESIS = 0.12;         // chống giật khi sát biên giữa 2 hướng
    const GESTURE_GAP = 1800;        // ms tối thiểu giữa 2 lần chỉ tay khi hover link/nút
    const THUMBS_GAP = 2500;

    const DIZZY_AFTER = 4;           // bấm dồn 4 lần -> chóng mặt
    const DIZZY_WINDOW = 1600;
    const DIZZY_END = 1100;
    const FRUSTRATED_END = 1100;

    // Tên ô trong từng sprite sheet (thứ tự đọc: trái -> phải, trên -> dưới)
    const DIRECTIONS = [
        "up-left", "up", "up-right",
        "left", "center", "right",
        "down-left", "down", "down-right"
    ];

    const REACT = {
        blink: 0, heart: 1, sparkle: 2,
        surprised: 3, wink: 4, bashful: 5,
        sleepy: 6, dizzy: 7, delighted: 8
    };

    const ACT = {
        waveA: 0, waveB: 1, thumbsUp: 2,
        clap: 3, cheer: 4, crouch: 5,
        jump: 6, shrug: 7, point: 8
    };

    const WORK = {
        typeA: 0, typeB: 1, think: 2,
        idea: 3, coffee: 4, read: 5,
        yawn: 6, frustrated: 7, victory: 8
    };

    // Sheet walk: 16 khung = một chu kỳ đầy đủ hai bước (chân này rồi chân kia vượt lên),
    // dựng bằng code từ chính pixel của nhân vật (xem walk_rig2.py), lặp liên tục là thành đi bộ.
    const WALK_SEQUENCE = Array.from({ length: 16 }, (_, i) => i);
    const WALK_BOB = 0;            // px nhún lên xuống mỗi bước
    const WALK_WADDLE = 0;         // độ nghiêng lắc lư trái phải khi bước

    // Theo chiều kim đồng hồ từ bên phải (khớp atan2 khi y hướng xuống)
    const CLOCKWISE = [
        "right", "down-right", "down", "down-left",
        "left", "up-left", "up", "up-right"
    ];

    const SECTOR = (Math.PI * 2) / CLOCKWISE.length;

    // Phần thưởng sau cú nhảy khi bấm vào mascot (xoay vòng)
    const PAYOFFS = [
        { sheet: "react", cell: REACT.heart },
        { sheet: "react", cell: REACT.sparkle },
        { sheet: "actions", cell: ACT.cheer },
        { sheet: "react", cell: REACT.delighted },
        { sheet: "actions", cell: ACT.clap }
    ];

    // Sheet tải trễ (đường dẫn tính từ trang index.html); delay = ms sau khi trang load xong
    const EXTRA_SHEETS = {
        walk: { src: "assets/mascot/nhut-walk.webp", delay: 600 },
        actions: { src: "assets/mascot/nhut-actions.webp", delay: 600 },
        work: { src: "assets/mascot/nhut-work.webp", delay: 600 },
        taichi: { src: "assets/mascot/nhut-taichi.webp", delay: 1000 }
    };

    // Số cột/hàng của từng sheet (mặc định 3x3)
    const GRID = { taichi: { cols: 8, rows: 6 }, walk: { cols: 4, rows: 4 } };
    const gridOf = (sheet) => GRID[sheet] || { cols: 3, rows: 3 };

    // 16 khung gốc + 2 khung nội suy giữa mỗi cặp = 48 khung -> chuyển động mượt hơn
    const TAICHI_FRAMES = 48;
    const TAICHI_PERIOD = 47;        // ms / khung -> một vòng khoảng 2,25 giây


    // Việc vặt khi đi dạo xong một đoạn: w = độ ưu tiên, ms = [ngắn nhất, dài nhất]
    const ACTIVITIES = [
        { sheet: "work", frames: [WORK.typeA, WORK.typeB], period: 420, w: 4, ms: [3500, 5500] },
        { sheet: "work", frames: [WORK.think], w: 2, ms: [2500, 3500] },
        { sheet: "work", frames: [WORK.coffee], w: 2, ms: [3500, 5000] },
        { sheet: "work", frames: [WORK.read], w: 2, ms: [3500, 5000] },
        { sheet: "work", frames: [WORK.idea], w: 1.5, ms: [1800, 2400] },
        { sheet: "actions", frames: [ACT.shrug], w: 1, ms: [1400, 1800] },
        { sheet: "actions", frames: [ACT.waveA, ACT.waveB], period: 280, w: 1, ms: [1600, 2200] },
        {
            sheet: "taichi",
            frames: Array.from({ length: TAICHI_FRAMES }, (_, i) => i),
            period: TAICHI_PERIOD, w: 2.5, loops: [2, 3]
        }
    ];

    /* ------------------------------------------------------------
       DOM
       ------------------------------------------------------------ */

    const root = document.documentElement;
    const mascotEl = document.getElementById("roverMascot");
    const tiltEl = mascotEl?.querySelector(".rover-mascot__tilt");
    const kickEl = mascotEl?.querySelector(".rover-mascot__kick");
    const dirLayer = mascotEl?.querySelector(".rover-mascot__layer--dir");
    const reactLayer = mascotEl?.querySelector(".rover-mascot__layer--react");
    const trailContainer = document.getElementById("roverTrail");

    if (!mascotEl || !tiltEl || !kickEl || !dirLayer || !reactLayer || !trailContainer) {
        return;
    }

    // Mỗi sheet là một lớp chồng lên nhau, mỗi lúc chỉ hiện đúng một lớp
    mascotEl.style.width = SIZE + "px";
    mascotEl.style.height = SIZE + "px";

    const layers = { dir: dirLayer, react: reactLayer };
    const ready = { dir: true, react: true, walk: false, actions: false, work: false, taichi: false };

    Object.keys(EXTRA_SHEETS).forEach((key) => {
        const layer = document.createElement("span");
        layer.className = `rover-mascot__layer rover-mascot__layer--${key}`;
        layer.style.opacity = "0";
        layer.style.backgroundSize = `${gridOf(key).cols * 100}% ${gridOf(key).rows * 100}%`;
        kickEl.appendChild(layer);
        layers[key] = layer;
    });

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

    // mode: 'idle' | 'chasing' | 'taichi' | 'wander' | 'drowsy' | 'sleeping' | 'dragging' | 'flung'
    let mode = "wander";

    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let target = { x: pos.x, y: pos.y };
    let vel = { x: 0, y: 0 };
    let rotation = 0;

    let mouseInside = false;         // chưa biết chuột ở đâu cho tới lần di chuột đầu tiên
    let lastMouseX = pos.x;
    let lastMouseY = pos.y;
    let lastMouseMoveAt = 0;

    // đi dạo: 'walking' (đang đi tới điểm đến) hoặc 'doing' (đang làm việc vặt)
    let wanderPhase = "doing";
    let activityUntil = 0;
    let taichiRestUntil = 0;
    let routineSteps = [];
    let routineIndex = 0;
    let lastActivity = -1;
    let wanderStartedAt = 0;
    let wanderWalkUntil = 0;
    let drowsyUntil = 0;
    let noChaseUntil = 0;
    let noWanderUntil = 0;
    let stillFrames = 0;
    let chaseStart = { x: pos.x, y: pos.y };
    let greeted = false;

    let hoveredEl = null;            // link / nút đang được chuột trỏ vào
    let lastGestureAt = 0;
    let lastThumbsAt = 0;
    let victoryDone = false;

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

    let walkPhase = 0;
    let walkSpeed = 0;
    let walking = false;
    let facingLeft = false;

    let bobPhase = 0;
    let bobAmp = 0;

    let sector = -1;
    let directionCell = 4;           // ô "center"
    let pose = { sheet: "dir", cell: 4, flip: false };
    let cues = [];                   // phản ứng / cử chỉ đang chạy
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

    function rand(min, max) {
        return min + Math.random() * (max - min);
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

    function distToCursor() {
        return mouseInside
            ? Math.hypot(lastMouseX - pos.x, lastMouseY - pos.y)
            : Infinity;
    }

    function pickWanderTarget(now) {
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
        wanderWalkUntil = now + WANDER_MAX_WALK_TIME;
    }

    function startWander(now) {
        mode = "wander";
        wanderPhase = "walking";
        wanderStartedAt = now;
        pickWanderTarget(now);
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
       Tải trễ các sheet phụ
       ------------------------------------------------------------ */

    function loadSheet(key) {
        const img = new Image();
        img.onload = () => {
            layers[key].style.backgroundImage = `url("${EXTRA_SHEETS[key].src}")`;
            ready[key] = true;
            if (key === "actions") {
                greet(performance.now());
            }
        };
        img.src = EXTRA_SHEETS[key].src;
    }

    function loadExtraSheets() {
        // tiết kiệm dữ liệu / mạng chậm: bỏ qua sheet phụ, mascot vẫn chạy bằng 2 sheet đầu
        const conn = navigator.connection;
        if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ""))) {
            return;
        }
        Object.keys(EXTRA_SHEETS).forEach((key) => {
            setTimeout(() => loadSheet(key), EXTRA_SHEETS[key].delay);
        });
    }

    if (document.readyState === "complete") {
        loadExtraSheets();
    } else {
        window.addEventListener("load", loadExtraSheets);
    }


    /* ------------------------------------------------------------
       Sprite: chọn ô trong sheet
       ------------------------------------------------------------ */

    // Lưới cols x rows: background-size = cols*100% x rows*100% => mỗi ô là một bước chia đều
    function setCell(layer, index, sheet) {
        const { cols, rows } = gridOf(sheet);
        layer.style.backgroundPosition =
            `${((index % cols) / (cols - 1)) * 100}% ${(Math.floor(index / cols) / (rows - 1)) * 100}%`;
    }

    function setPose(sheet, cell, flip) {
        // sheet chưa tải xong -> dùng tạm hướng nhìn
        if (!ready[sheet]) {
            sheet = "dir";
            cell = directionCell;
            flip = false;
        }

        if (sheet === pose.sheet && cell === pose.cell && flip === pose.flip) {
            return;
        }

        const switching = sheet !== pose.sheet;
        if (switching) {
            layers[pose.sheet].style.opacity = "0";
            layers[pose.sheet].style.transform = "";
            layers[sheet].style.opacity = "1";
        }
        if (switching || cell !== pose.cell) {
            setCell(layers[sheet], cell, sheet);
        }
        if (switching || flip !== pose.flip) {
            layers[sheet].style.transform = flip ? "scaleX(-1)" : "";
        }
        pose = { sheet, cell, flip };
    }

    function updateDirection(vx, vy) {
        if (Math.hypot(vx, vy) < DEAD_ZONE) {
            sector = -1;
            directionCell = DIRECTIONS.indexOf("center");
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
        directionCell = DIRECTIONS.indexOf(CLOCKWISE[sector]);
    }


    /* ------------------------------------------------------------
       Cue: phản ứng (react), cử chỉ (gesture), việc vặt (activity)
         react    : biểu cảm + cú nhảy khi bấm; không bị cắt khi mascot di chuyển
         gesture  : vẫy tay, chỉ tay, giơ ngón cái, ngáp...; dừng ngay khi mascot đi
         activity : việc vặt lúc đi dạo; dừng ngay khi mascot đi
       ------------------------------------------------------------ */

    function makeCue(kind, at, ms, sheet, frames, period, flip) {
        return {
            kind, at, until: at + ms, sheet,
            frames: Array.isArray(frames) ? frames : [frames],
            period: period || 1e9,
            flip: !!flip
        };
    }

    function reactCue(name, ms, now) {
        cues = [makeCue("react", now, ms, "react", REACT[name])];
    }

    function activeCue(now) {
        cues = cues.filter((cue) => cue.until > now);
        const cue = cues.find((c) => c.at <= now);
        if (!cue) {
            return null;
        }
        const i = Math.floor((now - cue.at) / cue.period) % cue.frames.length;
        return { sheet: cue.sheet, cell: cue.frames[i], flip: cue.flip };
    }

    function dropMovingCues() {
        cues = cues.filter((cue) => cue.kind === "react");
    }

    // Chuỗi cue nối tiếp nhau: steps = [{ ms, sheet, frames, period }]
    function sequence(kind, now, steps) {
        let t = now;
        cues = steps.map((s) => {
            const cue = makeCue(kind, t, s.ms, s.sheet, s.frames, s.period, s.flip);
            t += s.ms;
            return cue;
        });
    }

    // Biểu cảm nền theo trạng thái (khi không có cue nào đang chạy)
    function ambientPose(now) {
        if (mode === "sleeping") {
            return { sheet: "react", cell: REACT.sleepy, flip: false };
        }
        if (mode === "dragging") {
            return { sheet: "react", cell: REACT.surprised, flip: false };
        }
        if (hovered) {
            const dwell = now - hoverSince;
            if (dwell > PET_HEART_AFTER) {
                return { sheet: "react", cell: REACT.heart, flip: false };
            }
            if (dwell > PET_BASHFUL_AFTER) {
                return { sheet: "react", cell: REACT.bashful, flip: false };
            }
        }
        return null;
    }

    function boop(now) {
        boops.count = now - boops.at < DIZZY_WINDOW ? boops.count + 1 : 1;
        boops.at = now;

        // bấm dồn -> chóng mặt, rồi bực bội
        if (boops.count >= DIZZY_AFTER) {
            boops.count = 0;
            const steps = [{ ms: DIZZY_END, sheet: "react", frames: REACT.dizzy }];
            if (ready.work) {
                steps.push({ ms: FRUSTRATED_END, sheet: "work", frames: WORK.frustrated });
            }
            sequence("react", now, steps);
            return;
        }

        const payoff = PAYOFFS[(boops.count - 1) % PAYOFFS.length];

        if (ready.actions) {
            // ngồi xuống -> nhảy -> chạm đất -> ăn mừng
            sequence("react", now, [
                { ms: 90, sheet: "actions", frames: ACT.crouch },
                { ms: 300, sheet: "actions", frames: ACT.jump },
                { ms: 110, sheet: "actions", frames: ACT.crouch },
                { ms: 450, sheet: payoff.sheet, frames: payoff.cell }
            ]);
        } else {
            playAnimation("is-hop", 460);
            sequence("react", now, [
                { ms: 120, sheet: "react", frames: REACT.blink },
                { ms: 440, sheet: payoff.sheet, frames: payoff.cell }
            ]);
        }
    }


    /* ------------------------------------------------------------
       Việc vặt, chào hỏi, ngáp
       ------------------------------------------------------------ */

    function pickActivity(onlyChores) {
        const options = ACTIVITIES
            .map((a, i) => ({ a, i }))
            .filter(({ a, i }) =>
                ready[a.sheet] && i !== lastActivity && (!onlyChores || !a.loops));
        if (!options.length) {
            return null;
        }
        let roll = Math.random() * options.reduce((sum, o) => sum + o.a.w, 0);
        for (const o of options) {
            roll -= o.a.w;
            if (roll <= 0) {
                lastActivity = o.i;
                return o.a;
            }
        }
        return options[options.length - 1].a;
    }

    function beginActivity(now, act) {
        const ms = act.loops
            ? act.frames.length * act.period * Math.round(rand(act.loops[0], act.loops[1]))
            : rand(act.ms[0], act.ms[1]);
        cues = [makeCue("activity", now, ms, act.sheet, act.frames, act.period)];
        wanderPhase = "doing";
        activityUntil = now + ms;
    }

    function greet(now) {
        // chỉ chào một lần, và chỉ khi mascot đang đứng chờ lúc mới vào trang
        if (greeted) {
            return;
        }
        const startsIdle = IDLE_BEHAVIOR !== "wander";
        const waiting = startsIdle
            ? mode === "idle" && now < noWanderUntil
            : mode === "wander" && wanderPhase === "doing";
        if (!waiting) {
            return;
        }
        greeted = true;
        const until = startsIdle ? noWanderUntil : activityUntil;
        const ms = Math.max(600, until - now);
        cues = [makeCue("activity", now, ms, "actions", [ACT.waveA, ACT.waveB], 280)];
    }

    function randInt(min, max) {
        return Math.round(rand(min, max));
    }

    // Một lượt rảnh: đi vòng vòng -> việc vặt -> thái cực quyền -> nghỉ -> ngáp -> ngủ
    function startRoutine(now) {
        routineSteps = [];
        for (let i = randInt(ROUTINE.strolls[0], ROUTINE.strolls[1]); i > 0; i--) {
            routineSteps.push({ type: "walk" });
        }
        for (let i = randInt(ROUTINE.chores[0], ROUTINE.chores[1]); i > 0; i--) {
            routineSteps.push({ type: "chore" });
        }
        routineSteps.push({ type: "taichi" }, { type: "rest" });
        routineIndex = 0;
        lastActivity = -1;

        mode = "wander";
        wanderPhase = "doing";
        wanderStartedAt = now;
    }

    function advanceRoutine() {
        routineIndex++;
    }

    function updateRoutine(now) {
        const step = routineSteps[routineIndex];

        if (!step) {
            beginDrowsy(now);                 // hết các bước -> ngáp rồi ngủ
            return;
        }

        if (step.type === "walk" || step.type === "chore") {
            if (!step.started) {
                step.started = true;
                step.phase = "walk";
                wanderPhase = "walking";
                pickWanderTarget(now);
                return;
            }
            if (step.phase === "walk") {
                const left = Math.hypot(target.x - pos.x, target.y - pos.y);
                if (left < WANDER_ARRIVE_DIST || now >= wanderWalkUntil) {
                    if (step.type === "walk") {
                        advanceRoutine();
                    } else {
                        const act = pickActivity(true);
                        if (act) {
                            beginActivity(now, act);
                            step.phase = "chore";
                        } else {
                            advanceRoutine();
                        }
                    }
                }
            } else if (now >= activityUntil) {
                advanceRoutine();
            }
            return;
        }

        if (step.type === "taichi") {
            if (!step.started) {
                step.started = true;
                if (!ready.taichi) {
                    advanceRoutine();
                    return;
                }
                wanderPhase = "doing";
                target = { x: pos.x, y: pos.y };
                const ms = TAICHI_FRAMES * TAICHI_PERIOD * randInt(TAICHI_LOOPS[0], TAICHI_LOOPS[1]);
                cues = [makeCue(
                    "activity", now, ms, "taichi",
                    Array.from({ length: TAICHI_FRAMES }, (_, i) => i), TAICHI_PERIOD
                )];
                step.until = now + ms;
            } else if (now >= step.until) {
                advanceRoutine();
            }
            return;
        }

        // "rest": đứng nghỉ một chút
        if (!step.started) {
            step.started = true;
            wanderPhase = "doing";
            target = { x: pos.x, y: pos.y };
            step.until = now + rand(ROUTINE.rest[0], ROUTINE.rest[1]);
        } else if (now >= step.until) {
            advanceRoutine();
        }
    }

    // Tập thái cực quyền tại chỗ: mỗi lượt vài vòng liên tục, nghỉ chút rồi tập tiếp
    function startTaichiRound(now) {
        const rounds = Math.round(rand(TAICHI_LOOPS[0], TAICHI_LOOPS[1]));
        const ms = TAICHI_FRAMES * TAICHI_PERIOD * rounds;
        cues = [makeCue(
            "activity", now, ms, "taichi",
            Array.from({ length: TAICHI_FRAMES }, (_, i) => i), TAICHI_PERIOD
        )];
        taichiRestUntil = now + ms + rand(TAICHI_REST[0], TAICHI_REST[1]);
    }

    function startTaichi(now) {
        if (!ready.taichi) {
            return;                        // sheet chưa tải xong: đứng chờ, thử lại ở frame sau
        }
        mode = "taichi";
        target = { x: pos.x, y: pos.y };
        startTaichiRound(now);
    }

    function beginDrowsy(now) {
        mode = "drowsy";
        target = { x: pos.x, y: pos.y };
        if (ready.work) {
            drowsyUntil = now + YAWN_MS;
            cues = [makeCue("gesture", now, YAWN_MS, "work", WORK.yawn)];
        } else {
            drowsyUntil = now;
        }
    }

    function fallAsleep() {
        mode = "sleeping";
        target = { x: pos.x, y: pos.y };
        cues = [];
    }


    /* ------------------------------------------------------------
       Trạng thái: thức / hover / kéo
       ------------------------------------------------------------ */

    function wakeUp(now) {
        mode = distToCursor() > FOLLOW_START ? "chasing" : "idle";
        if (mode === "chasing") {
            chaseStart = { x: pos.x, y: pos.y };
        }
        reactCue("surprised", 500, now);
    }

    function updateGrabCursor() {
        if (isTouch) {
            return;
        }
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
            } else if (mode === "chasing" || mode === "wander" || mode === "drowsy" || mode === "taichi") {
                mode = "idle";            // đang được vuốt ve thì đứng yên
                dropMovingCues();
            }
        }
        updateGrabCursor();
    }

    function startDrag() {
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
        lastMouseMoveAt = now;
        root.classList.remove("rover-dragging");
        suppressClickUntil = now + 80;
        noChaseUntil = now + COOLDOWN_AFTER_DROP;

        const speed = Math.hypot(dragVel.x, dragVel.y);
        if (speed > FLING_MIN_SPEED) {
            const scale = Math.min(1.1, FLING_MAX_SPEED / speed);
            vel = { x: dragVel.x * scale, y: dragVel.y * scale };
            mode = "flung";
            reactCue("dizzy", 900, now);
        } else {
            mode = "idle";
            playAnimation("is-land", 380);
            reactCue("delighted", 700, now);
        }
    }


    /* ------------------------------------------------------------
       Events
       Các hàm dùng chung cho chuột và cảm ứng; phần nối sự kiện ở dưới.
       ------------------------------------------------------------ */

    // Con trỏ (chuột hoặc ngón tay đang đè lên mascot) vừa di chuyển
    function handleMove(x, y, now) {
        lastMouseX = x;
        lastMouseY = y;
        lastMouseMoveAt = now;
        mouseInside = true;

        // nhấn giữ rồi kéo xa quá ngưỡng -> bắt đầu nhấc mascot lên
        if (press && !press.dragging && !press.onInteractive) {
            if (Math.hypot(x - press.x, y - press.y) > DRAG_THRESHOLD) {
                startDrag();
            }
        }

        if (mode === "dragging" || mode === "flung") {
            return;
        }

        if (mode === "sleeping") {
            wakeUp(now);
        } else if (mode === "wander" || mode === "drowsy" || mode === "taichi") {
            mode = distToCursor() > FOLLOW_START ? "chasing" : "idle";
            if (mode === "chasing") {
                chaseStart = { x: pos.x, y: pos.y };
            }
            dropMovingCues();
        }

        if (hovered) {
            updateGrabCursor();
        }
    }

    // Bắt đầu nhấn / chạm vào người mascot
    function handlePressStart(x, y, onInteractive, now) {
        lastMouseMoveAt = now;
        press = { x, y, onInteractive, dragging: false, at: now };
    }

    // Thả chuột / nhấc ngón tay
    function handlePressEnd(x, y, now) {
        const wasPress = press;
        press = null;
        lastMouseMoveAt = now;

        if (mode === "dragging") {
            endDrag(now);
            return;
        }

        // bấm thường (không kéo) trúng người mascot -> nhảy lên
        // (cảm ứng: giữ lâu là vuốt ve, không tính là bấm)
        const quick = !isTouch || (wasPress && now - wasPress.at < TAP_MAX_MS);
        if (wasPress && quick && inHit(x, y)) {
            boop(now);
            if (mode === "sleeping" || mode === "drowsy" || mode === "wander" || mode === "taichi") {
                mode = "idle";
            }
        }
    }

    // Người dùng bấm link/nút khi mascot đứng gần -> giơ ngón cái
    document.addEventListener("click", (event) => {
        const el = event.target.closest?.(INTERACTIVE_SELECTOR);
        if (!el || !ready.actions || inHit(event.clientX, event.clientY)) {
            return;
        }
        const now = performance.now();
        const near =
            Math.hypot(event.clientX - pos.x, event.clientY - pos.y) <= FOLLOW_START * 1.3;
        if (near && mode === "idle" && now - lastThumbsAt > THUMBS_GAP) {
            lastThumbsAt = now;
            cues = [makeCue("gesture", now, 1100, "actions", ACT.thumbsUp)];
        }
    });

    // Cuộn tới cuối trang (một lần) -> cầm cúp ăn mừng
    window.addEventListener("scroll", () => {
        if (victoryDone || !ready.work || mode === "dragging" || mode === "flung") {
            return;
        }
        const doc = document.documentElement;
        if (doc.scrollHeight < window.innerHeight * 1.5) {
            return;
        }
        if (window.innerHeight + window.scrollY >= doc.scrollHeight - 24) {
            victoryDone = true;
            const now = performance.now();
            mode = "idle";
            noChaseUntil = now + 2800;
            noWanderUntil = now + 2800;
            cues = [makeCue("gesture", now, 2600, "work", WORK.victory)];
        }
    }, { passive: true });

    window.addEventListener("blur", () => {
        press = null;
        tap = null;
        endDrag(performance.now());
    });


    /* ---------------- Chuột (desktop) ---------------- */

    if (!isTouch) {

        document.addEventListener("mousemove", (event) => {
            const now = performance.now();
            handleMove(event.clientX, event.clientY, now);

            if (mode === "dragging" || mode === "flung") {
                return;
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

            handlePressStart(event.clientX, event.clientY, onInteractive, performance.now());

            // không cản click thật vào link/nút; vùng trống thì chặn bôi đen chữ
            if (!onInteractive) {
                event.preventDefault();
            }
        });

        document.addEventListener("mouseup", (event) => {
            handlePressEnd(event.clientX, event.clientY, performance.now());
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

            // chỉ "tò mò" chỉ tay vào link/nút khi mascot đang ở gần và đứng rảnh
            const now = performance.now();
            const near = distToCursor() <= FOLLOW_START * 1.3;
            if (near && mode === "idle" && now - lastGestureAt > GESTURE_GAP) {
                lastGestureAt = now;
                if (ready.actions) {
                    const rect = el.getBoundingClientRect();
                    const elementIsLeft = rect.left + rect.width / 2 < pos.x;
                    cues = [makeCue("gesture", now, 1400, "actions", ACT.point, 0, elementIsLeft)];
                } else {
                    reactCue("surprised", 450, now);
                }
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
    }


    /* ---------------- Cảm ứng (điện thoại / máy tính bảng) ----------------
       - Chạm nhanh vào chỗ trống: mascot chạy tới đó (như gọi thú cưng)
       - Chạm nhanh vào mascot: nhảy; đè giữ: ngại ngùng rồi thả tim
       - Đè lên mascot rồi kéo: nhấc nó lên; kéo nhanh rồi thả: bị ném đi
       - Lướt để cuộn trang: mascot không phản ứng, trang cuộn bình thường
       Chỉ khi ngón tay đặt lên người mascot (và bên dưới không phải link/nút)
       cử chỉ mới thuộc về mascot; còn lại để trình duyệt xử lý như thường. */

    let tap = null;                  // { x, y, t, moved } cho cú chạm hiện tại
    let lingerTimer = 0;

    function summonTo(x, y, now) {
        lastMouseX = x;
        lastMouseY = y;
        lastMouseMoveAt = now;
        mouseInside = true;

        clearTimeout(lingerTimer);
        lingerTimer = setTimeout(() => { mouseInside = false; }, TOUCH_LINGER);

        if (mode === "dragging" || mode === "flung") {
            return;
        }
        if (mode === "sleeping") {
            wakeUp(now);
        } else if (mode === "wander" || mode === "drowsy" || mode === "taichi") {
            mode = distToCursor() > FOLLOW_START ? "chasing" : "idle";
            if (mode === "chasing") {
                chaseStart = { x: pos.x, y: pos.y };
            }
            dropMovingCues();
        }
    }

    if (isTouch) {

        document.addEventListener("touchstart", (event) => {
            if (event.touches.length !== 1) {
                press = null;
                tap = null;
                return;
            }

            const t = event.touches[0];
            const now = performance.now();
            tap = { x: t.clientX, y: t.clientY, t: now, moved: false };

            if (!inHit(t.clientX, t.clientY)) {
                return;
            }

            const under = document.elementFromPoint(t.clientX, t.clientY);
            const onInteractive = !!(under && under.closest(INTERACTIVE_SELECTOR));

            lastMouseX = t.clientX;
            lastMouseY = t.clientY;
            handlePressStart(t.clientX, t.clientY, onInteractive, now);

            // giữ cử chỉ cho mascot (không cuộn trang, không bôi đen); link/nút thì để yên
            if (!onInteractive && event.cancelable) {
                event.preventDefault();
            }
        }, { passive: false });

        document.addEventListener("touchmove", (event) => {
            const t = event.touches[0];
            if (!t) {
                return;
            }

            if (tap && Math.hypot(t.clientX - tap.x, t.clientY - tap.y) > TAP_SLOP) {
                tap.moved = true;
            }

            // chỉ khi đang đè lên mascot mới theo dõi ngón tay; lướt cuộn trang thì bỏ qua
            if (press && !press.onInteractive) {
                handleMove(t.clientX, t.clientY, performance.now());
                if (event.cancelable) {
                    event.preventDefault();
                }
            }
        }, { passive: false });

        document.addEventListener("touchend", (event) => {
            const t = event.changedTouches[0];
            if (!t) {
                return;
            }
            const now = performance.now();
            const wasPress = press;
            const wasTap = tap;
            tap = null;

            if (wasPress) {
                handlePressEnd(t.clientX, t.clientY, now);
                return;
            }

            // chạm nhanh vào chỗ trống -> gọi mascot tới đó
            if (wasTap && !wasTap.moved && now - wasTap.t < TAP_MAX_MS) {
                const el = event.target.closest?.(INTERACTIVE_SELECTOR);
                if (!el) {
                    summonTo(wasTap.x, wasTap.y, now);
                }
            }
        }, { passive: true });

        document.addEventListener("touchcancel", () => {
            press = null;
            tap = null;
            endDrag(performance.now());
        }, { passive: true });
    }


    /* ------------------------------------------------------------
       Vòng lặp hoạt ảnh
       ------------------------------------------------------------ */

    function frame(now) {
        const dtScale = Math.min(3, lastFrame ? (now - lastFrame) / 16.667 : 1);
        lastFrame = now;

        const W = window.innerWidth;
        const H = window.innerHeight;

        // --- chuột có đang nằm trên người mascot không?
        // (cảm ứng: "hover" = ngón tay đang đè lên người mascot mà chưa kéo)
        const over = mode !== "dragging" && mode !== "flung" && (
            isTouch
                ? !!press && !press.dragging && inHit(lastMouseX, lastMouseY)
                : mouseInside && inHit(lastMouseX, lastMouseY)
        );
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
                reactCue("dizzy", DIZZY_END, now);
            }

            rotation += (clamp((tx - pos.x) * 1.1 + dragVel.x * 1.6, -28, 28) - rotation)
                * easeFor(0.25, dtScale);

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
                reactCue("delighted", 600, now);
            }

        } else {
            // --- quyết định chuyển trạng thái
            const d = distToCursor();

            if (mode === "idle") {
                if (!hovered) {
                    if (mouseInside && d > FOLLOW_START && now > noChaseUntil) {
                        mode = "chasing";
                        stillFrames = 0;
                        chaseStart = { x: pos.x, y: pos.y };
                    } else if (
                        now - lastMouseMoveAt > IDLE_TIMEOUT &&
                        now > noWanderUntil &&
                        !cues.some((c) => c.until > now)
                    ) {
                        if (IDLE_BEHAVIOR === "taichi") {
                            startTaichi(now);
                        } else if (IDLE_BEHAVIOR === "routine") {
                            startRoutine(now);
                        } else {
                            startWander(now);
                        }
                    }
                }
            }

            if (mode === "chasing") {
                if (!mouseInside || hovered || d <= STOP_DIST + 6) {
                    // tới gần rồi -> dừng; chạy xa mới tới thì vẫy tay chào
                    const traveled = Math.hypot(pos.x - chaseStart.x, pos.y - chaseStart.y);
                    mode = "idle";
                    if (mouseInside && !hovered && ready.actions && traveled > ARRIVE_WAVE_MIN_TRAVEL) {
                        cues = [makeCue("gesture", now, 1300, "actions", [ACT.waveA, ACT.waveB], 280)];
                    }
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

            if (mode === "taichi" && now >= taichiRestUntil) {
                startTaichiRound(now);       // hết lượt + nghỉ -> tập lượt mới
            }

            if (mode === "wander" && IDLE_BEHAVIOR === "routine") {
                updateRoutine(now);
            } else if (mode === "wander") {
                if (wanderPhase === "doing") {
                    if (now >= activityUntil) {
                        wanderPhase = "walking";
                        pickWanderTarget(now);
                    }
                } else {
                    const left = Math.hypot(target.x - pos.x, target.y - pos.y);
                    if (SLEEP_AFTER && now - wanderStartedAt > SLEEP_AFTER) {
                        beginDrowsy(now);           // đi dạo đã lâu -> ngáp rồi ngủ
                    } else if (left < WANDER_ARRIVE_DIST || now >= wanderWalkUntil) {
                        const act = pickActivity();
                        if (act) {
                            beginActivity(now, act);
                        } else {
                            pickWanderTarget(now);
                        }
                    }
                }
            }

            if (mode === "drowsy" && now >= drowsyUntil) {
                fallAsleep();
            }

            // --- di chuyển
            const walkingNow =
                mode === "chasing" || (mode === "wander" && wanderPhase === "walking");
            if (walkingNow) {
                const ease = mode === "chasing" ? EASE_CHASE : EASE_WANDER;
                const k = easeFor(ease, dtScale);
                stepX = (target.x - pos.x) * k;
                stepY = (target.y - pos.y) * k;

                const len = Math.hypot(stepX, stepY);
                const maxStep = (mode === "chasing" ? MAX_SPEED : WANDER_MAX_SPEED) * dtScale;
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
                        if (ready.actions) {
                            cues = [makeCue("gesture", now, 1200, "actions", ACT.shrug)];
                        }
                    }
                }
            }

            pos.x = clamp(pos.x, SAFE_SIDE, W - SAFE_SIDE);
            pos.y = clamp(pos.y, SAFE_TOP, H - SAFE_BOTTOM);

            // bắt đầu đi thì cử chỉ / việc vặt phải dừng lại
            if (moving > 1.2) {
                dropMovingCues();
            }
        }

        // --- đi bộ: bật/tắt sprite đi bộ, lật theo hướng đi
        walkSpeed += (moving - walkSpeed) * easeFor(0.3, dtScale);
        if (!walking && walkSpeed > WALK_ON_SPEED) {
            walking = true;
        } else if (walking && walkSpeed < WALK_OFF_SPEED) {
            walking = false;
        }
        if (Math.abs(stepX) > 0.3) {
            facingLeft = stepX < 0;
        }
        const useWalkSprite = walking && ready.walk;
        if (useWalkSprite) {
            // đuổi chuột thì bước nhanh hơn (chạy), đi dạo thì bước thong thả
            const maxPhase = mode === "chasing" ? 0.5 : WALK_MAX_PHASE;
            walkPhase += Math.min(maxPhase, moving / WALK_STRIDE) * dtScale;
        }

        // --- nghiêng người
        if (mode !== "dragging" && mode !== "flung") {
            const tilt = useWalkSprite
                ? Math.sin((walkPhase / WALK_SEQUENCE.length) * Math.PI * 2) * WALK_WADDLE
                : clamp(stepX * 1.2, -8, 8);
            rotation += (tilt - rotation) * easeFor(useWalkSprite ? 0.35 : 0.15, dtScale);
        }

        // --- nhìn về đâu (dùng khi đứng yên)
        let lookX = pos.x;
        let lookY = pos.y;
        if (mode === "sleeping" || mode === "drowsy" || mode === "taichi") {
            // nhìn thẳng
        } else if (mode === "wander") {
            lookX = target.x;
            lookY = target.y;
        } else if (hoveredEl && !hovered && mouseInside && mode === "idle"
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

        // --- chọn tư thế: cue > biểu cảm nền > đi bộ > hướng nhìn
        const cue = activeCue(now);
        const ambient = cue ? null : ambientPose(now);
        if (cue) {
            setPose(cue.sheet, cue.cell, cue.flip);
        } else if (ambient) {
            setPose(ambient.sheet, ambient.cell, ambient.flip);
        } else if (useWalkSprite) {
            setPose("walk", WALK_SEQUENCE[Math.floor(walkPhase) % WALK_SEQUENCE.length], facingLeft);
        } else {
            setPose("dir", directionCell, false);
        }

        // --- nhún nhẹ theo nhịp bước
        const bobbing = moving > 1.2;
        bobAmp += ((bobbing ? 1 : 0) - bobAmp) * easeFor(0.15, dtScale);
        bobPhase += moving * dtScale * 0.16;
        const bob = useWalkSprite
            ? Math.abs(Math.sin((walkPhase / WALK_SEQUENCE.length) * Math.PI * 2)) * WALK_BOB * bobAmp
            : Math.abs(Math.sin(bobPhase)) * 6 * bobAmp;

        mascotEl.style.transform =
            `translate3d(${(pos.x - SIZE / 2).toFixed(2)}px, ${(pos.y - SIZE / 2).toFixed(2)}px, 0)`;
        tiltEl.style.transform =
            `translateY(${(-bob).toFixed(2)}px) rotate(${rotation.toFixed(2)}deg)`;

        requestAnimationFrame(frame);
    }


    /* ------------------------------------------------------------
       Khởi động
       ------------------------------------------------------------ */

    // Lúc mới vào trang: đứng chờ một chút (để vẫy tay chào khi sheet "actions" tải xong)
    {
        const now = performance.now();
        if (IDLE_BEHAVIOR !== "wander") {
            mode = "idle";
            lastMouseMoveAt = now;               // đếm thời gian rảnh từ lúc vào trang
            noWanderUntil = now + GREETING_MS;
        } else {
            mode = "wander";
            wanderPhase = "doing";
            wanderStartedAt = now;
            activityUntil = now + GREETING_MS;
        }
    }

    mascotEl.classList.add("is-active");
    trailContainer.classList.add("is-active");
    requestAnimationFrame(frame);

})();