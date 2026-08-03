const form = document.getElementById('quizForm');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let pontos = 0;

    const respostas = ['q1', 'q2', 'q3'];

    respostas.forEach(q => {
      const selecionada = document.querySelector(`input[name="${q}"]:checked`);
      if (selecionada && selecionada.value === 'certo') {
        pontos++;
      }
    });

    const resultado = document.getElementById('resultado');

    if (pontos === 3) {
      resultado.innerHTML = '🏆 Excelente! Você reconhece atitudes importantes para prevenir o cyberbullying.';
    } else if (pontos === 2) {
      resultado.innerHTML = '👍 Muito bem! Você já sabe bastante, mas ainda pode aprender mais.';
    } else {
      resultado.innerHTML = '📚 Continue aprendendo. Identificar o cyberbullying é essencial para ajudar outras pessoas.';
    }
  });
}

// Animação suave ao rolar
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const alvo = document.querySelector(this.getAttribute('href'));
    if (alvo) {
      e.preventDefault();
      alvo.scrollIntoView({ behavior: 'smooth' });
    }
  });
});