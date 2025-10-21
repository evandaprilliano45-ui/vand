// Tombol kembali
function goBack() {
  window.history.back();
}

// Efek animasi kartu 
const cards = document.querySelectorAll('.blog-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));

// Efek klik opsional
cards.forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h3').textContent;
    alert(`You selected: ${title}`);
  });
});
