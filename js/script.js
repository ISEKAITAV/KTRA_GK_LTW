document.addEventListener('DOMContentLoaded', () => {
    const s = window.STUDENT || {};
    document.querySelectorAll('.student-name').forEach((el) => { el.textContent = s.name || ''; });
    document.querySelectorAll('.student-id').forEach((el) => { el.textContent = s.id || ''; });

    // Nếu chưa có ảnh kết quả thì hiện khung nhắc thay vì ảnh lỗi
    document.querySelectorAll('img[data-shot]').forEach((img) => {
        img.addEventListener('error', () => {
            const box = document.createElement('div');
            box.className = 'shot-missing';
            box.textContent = 'Chưa có ảnh. Hãy thêm file ' + img.getAttribute('src');
            img.replaceWith(box);
        });
    });
});
