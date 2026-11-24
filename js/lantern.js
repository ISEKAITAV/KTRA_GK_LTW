/* Đèn kéo quân: 6 mặt, quay tròn bằng JavaScript, rê chuột vào hình thì dừng */
(function () {
    const lantern = document.getElementById('lantern');
    const faces = Array.from(lantern.querySelectorAll('.face'));
    const status = document.getElementById('status');
    const toggle = document.getElementById('toggle');
    const N = faces.length;           // 6 mặt
    const step = 360 / N;             // 60 độ mỗi mặt
    const SPEED = 40;                 // độ / giây

    let angle = 0;
    let radius = 0;
    let hoverPaused = false;          // dừng do rê chuột
    let manualPaused = false;         // dừng do bấm nút
    let last = null;

    function layout() {
        const w = faces[0].offsetWidth;
        radius = w / 2 / Math.tan(Math.PI / N);   // bán kính của hình lục giác
        faces.forEach((f, i) => {
            f.style.transform = 'rotateY(' + i * step + 'deg) translateZ(' + radius + 'px)';
        });
    }

    function render() {
        lantern.style.transform = 'translateZ(' + -radius + 'px) rotateY(' + angle + 'deg)';
    }

    function updateStatus() {
        const paused = hoverPaused || manualPaused;
        status.textContent = paused ? 'Đèn đang dừng' : 'Đèn đang quay';
        toggle.textContent = manualPaused ? 'Cho đèn quay' : 'Dừng đèn';
    }

    function tick(now) {
        if (last === null) last = now;
        const dt = Math.min(now - last, 100) / 1000;
        last = now;
        if (!hoverPaused && !manualPaused) angle = (angle - SPEED * dt) % 360;
        render();
        requestAnimationFrame(tick);
    }

    faces.forEach((f) => {
        f.addEventListener('pointerenter', () => { hoverPaused = true; updateStatus(); });
        f.addEventListener('pointerleave', () => { hoverPaused = false; updateStatus(); });
    });

    toggle.addEventListener('click', () => { manualPaused = !manualPaused; updateStatus(); });
    window.addEventListener('resize', () => { layout(); render(); });

    layout();
    updateStatus();
    requestAnimationFrame(tick);
})();
