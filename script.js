function createCarousel(root) {
    const slides = [...root.querySelectorAll('.slides img')];
    let idx = 0;
    const prev = root.querySelector('.prev'), next = root.querySelector('.next');
    function show(i) { slides[idx].classList.remove('active'); idx = (i + slides.length) % slides.length; slides[idx].classList.add('active'); }
    prev?.addEventListener('click', () => show(idx - 1));
    next?.addEventListener('click', () => show(idx + 1));
    if (root.dataset.auto === "true") setInterval(() => show(idx + 1), root.dataset.interval || 3000);
}
document.querySelectorAll('.slideshow').forEach(el => createCarousel(el));

const modal = document.getElementById('viewerModal');
const mTitle = modal.querySelector('.modal-title');
const mSlides = modal.querySelector('.modal-body .slides');

document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.project-card');
        const title = card.querySelector('h3').textContent;
        mTitle.textContent = title;
        const imgs = JSON.parse(card.dataset.images);
        mSlides.innerHTML = imgs.map((src, i) => `<img ${i === 0 ? "class='active'" : ""} src="${src}">`).join("");
        modal.classList.add('open');
        createCarousel(modal.querySelector('.modal-body'));
    });
});
modal.querySelector('.modal-close').onclick = () => modal.classList.remove('open');
modal.onclick = e => { if (e.target === modal) modal.classList.remove('open'); };
