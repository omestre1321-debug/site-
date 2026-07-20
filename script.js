const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Mensagem enviada! Carlos e Augusto agradecem a visita. 🐴');
  form.reset();
});

const animatedItems = document.querySelectorAll('.card, .photos img');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.2
});

animatedItems.forEach((item) => observer.observe(item));
