const contactForm = document.querySelector('#contato form');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Mensagem enviada! Carlos e Augusto agradecem a visita. 🐴');
  contactForm.reset();
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

const horseName = document.querySelector('#horseName');
const horseMood = document.querySelector('#horseMood');
const horseAvatar = document.querySelector('#horseAvatar');
const happinessValue = document.querySelector('#happinessValue');
const happinessFill = document.querySelector('#happinessFill');
const careMessage = document.querySelector('#careMessage');
const horseButtons = document.querySelectorAll('.select-horse');
const careButtons = document.querySelectorAll('[data-care]');
const resetCare = document.querySelector('#resetCare');

const horses = {
  Carlos: {
    emoji: '🐴',
    happiness: 50,
    messages: {
      agua: 'Carlos bebeu água fresquinha e ficou mais animado!',
      comida: 'Carlos adorou o feno fresco!',
      escovar: 'Carlos ficou bonito e relaxado depois da escovação!',
      baia: 'A baia do Carlos está limpinha agora!',
      passeio: 'Carlos caminhou no campo e ficou muito feliz!'
    }
  },
  Augusto: {
    emoji: '🐎',
    happiness: 50,
    messages: {
      agua: 'Augusto recuperou a energia com água limpa!',
      comida: 'Augusto comeu uma maçã e adorou!',
      escovar: 'Augusto ficou elegante depois da escovação!',
      baia: 'A baia do Augusto ficou organizada!',
      passeio: 'Augusto correu um pouco e ficou empolgado!'
    }
  }
};

const carePoints = {
  agua: 10,
  comida: 15,
  escovar: 12,
  baia: 10,
  passeio: 18
};

let selectedHorse = 'Carlos';

function updateSimulator(message) {
  const horse = horses[selectedHorse];
  horseName.textContent = selectedHorse;
  horseAvatar.textContent = horse.emoji;
  happinessValue.textContent = `${horse.happiness}%`;
  happinessFill.style.width = `${horse.happiness}%`;

  if (horse.happiness >= 100) {
    horseMood.textContent = `${selectedHorse} está extremamente feliz!`;
    careMessage.textContent = `Parabéns! ${selectedHorse} chegou a 100% de felicidade! 🎉`;
  } else if (message) {
    horseMood.textContent = message;
    careMessage.textContent = 'Continue cuidando para aumentar a felicidade.';
  } else {
    horseMood.textContent = `${selectedHorse} está esperando seus cuidados.`;
    careMessage.textContent = 'Dica: cuide bem para chegar a 100% de felicidade!';
  }
}

horseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedHorse = button.dataset.horse;
    horseButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    updateSimulator();
  });
});

careButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const care = button.dataset.care;
    const horse = horses[selectedHorse];
    horse.happiness = Math.min(100, horse.happiness + carePoints[care]);
    updateSimulator(horse.messages[care]);
  });
});

resetCare.addEventListener('click', () => {
  horses.Carlos.happiness = 50;
  horses.Augusto.happiness = 50;
  updateSimulator(`${selectedHorse} voltou para 50% de felicidade.`);
});

updateSimulator();

const letterForm = document.querySelector('#letterForm');
const letterHorse = document.querySelector('#letterHorse');
const letterAuthor = document.querySelector('#letterAuthor');
const letterText = document.querySelector('#letterText');
const letterPreview = document.querySelector('#letterPreview');
const lettersList = document.querySelector('#lettersList');
const clearLetters = document.querySelector('#clearLetters');

const savedLettersKey = 'cartinhas-carlos-augusto';
let savedLetters = JSON.parse(localStorage.getItem(savedLettersKey)) || [];

function saveLetters() {
  localStorage.setItem(savedLettersKey, JSON.stringify(savedLetters));
}

function renderSavedLetters() {
  lettersList.innerHTML = '';

  if (savedLetters.length === 0) {
    lettersList.innerHTML = '<p class="empty-letters">Nenhuma cartinha salva ainda.</p>';
    return;
  }

  savedLetters.slice().reverse().forEach((letter) => {
    const card = document.createElement('article');
    card.className = 'saved-letter-card';

    const title = document.createElement('strong');
    title.textContent = `Para ${letter.horse} — de ${letter.author}`;

    const text = document.createElement('p');
    text.textContent = letter.message;

    const date = document.createElement('small');
    date.textContent = letter.date;

    card.append(title, text, date);
    lettersList.appendChild(card);
  });
}

letterForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const horse = letterHorse.value;
  const author = letterAuthor.value.trim();
  const message = letterText.value.trim();
  const emoji = horse === 'Carlos' ? '🐴' : '🐎';

  letterPreview.innerHTML = `
    <div class="stamp">${emoji}</div>
    <p class="letter-to">Para ${horse}</p>
    <h3>Querido ${horse},</h3>
    <p class="letter-message"></p>
    <p class="letter-from"></p>
  `;

  letterPreview.querySelector('.letter-message').textContent = message;
  letterPreview.querySelector('.letter-from').textContent = `Com carinho, ${author}`;
  letterPreview.classList.add('pop');
  setTimeout(() => letterPreview.classList.remove('pop'), 450);

  savedLetters.push({
    horse,
    author,
    message,
    date: new Date().toLocaleString('pt-BR')
  });

  saveLetters();
  renderSavedLetters();
  letterForm.reset();
});

clearLetters.addEventListener('click', () => {
  const confirmed = confirm('Tem certeza que deseja apagar todas as cartinhas salvas?');

  if (confirmed) {
    savedLetters = [];
    saveLetters();
    renderSavedLetters();
  }
});

renderSavedLetters();
