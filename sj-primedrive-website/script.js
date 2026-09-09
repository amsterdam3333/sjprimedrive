const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
document.getElementById('year').textContent = new Date().getFullYear();

const progress = document.createElement('div');
progress.className = 'reading-progress';
document.body.append(progress);
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
}, { passive: true });

const visual = document.querySelector('.hero-visual');
if (visual && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  visual.addEventListener('pointermove', (event) => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    visual.style.setProperty('--tilt-x', `${x * 7}deg`);
    visual.style.setProperty('--tilt-y', `${y * -5}deg`);
  });
  visual.addEventListener('pointerleave', () => { visual.style.setProperty('--tilt-x', '0deg'); visual.style.setProperty('--tilt-y', '0deg'); });
}
