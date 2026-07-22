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
      agua: 'Carlos bebeu água fresquinha e fez cara de influencer fitness!',
      comida: 'Carlos atacou o feno como se fosse rodízio!',
      escovar: 'Carlos ficou tão bonito que pediu um espelho!',
      baia: 'A baia do Carlos está tão limpa que dá até para receber visita da sogra!',
      passeio: 'Carlos caminhou no campo e fingiu que era protagonista de filme!'
    }
  },
  Augusto: {
    emoji: '🐎',
    happiness: 50,
    messages: {
      agua: 'Augusto bebeu água e falou: hidratação é tudo, meu chapa!',
      comida: 'Augusto comeu uma maçã como se fosse sobremesa de restaurante chique!',
      escovar: 'Augusto ficou tão elegante que quase pediu gravata borboleta!',
      baia: 'A baia do Augusto ficou organizada igual quarto antes da visita chegar!',
      passeio: 'Augusto correu e jurou que ganhou as Olimpíadas do pasto!'
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

const funEmoji = document.querySelector('#funEmoji');
const funTitle = document.querySelector('#funTitle');
const funText = document.querySelector('#funText');
const funCard = document.querySelector('.fun-card');
const jokeButton = document.querySelector('#jokeButton');
const nicknameButton = document.querySelector('#nicknameButton');
const dramaButton = document.querySelector('#dramaButton');
const danceButton = document.querySelector('#danceButton');

const jokes = [
  'Por que o cavalo entrou no Wi-Fi? Porque queria uma conexão estável no estábulo!',
  'Carlos tentou virar cantor, mas só sabia relinchar no refrão.',
  'Augusto não corre atrás de fofoca... ele galopa.',
  'O cavalo foi ao psicólogo porque estava com muitos problemas de sela-estima.',
  'Carlos disse que vai começar dieta amanhã. Hoje ainda tem feno ilimitado.'
];

const nicknames = [
  'Carlos, o Relincho Supremo',
  'Augusto, o Turbo do Pasto',
  'Carlos Cenourinha 3000',
  'Augusto Cascos de Ouro',
  'Carlos, o Fiscal do Feno',
  'Augusto, o Galã da Baia'
];

const dramas = [
  'Carlos viu a cenoura acabar e ficou olhando para o horizonte por 3 horas.',
  'Augusto perdeu uma corrida para uma borboleta e pediu revanche.',
  'Carlos descobriu que banho não é passeio e ficou profundamente decepcionado.',
  'Augusto queria dormir, mas uma galinha fez reunião em cima da cerca.',
  'Carlos foi escovado do lado errado e agora exige indenização em maçãs.'
];

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function showFun(emoji, title, text) {
  funEmoji.textContent = emoji;
  funTitle.textContent = title;
  funText.textContent = text;
  funCard.classList.remove('dance');
}

jokeButton.addEventListener('click', () => {
  showFun('😂', 'Piada diretamente do estábulo', randomItem(jokes));
});

nicknameButton.addEventListener('click', () => {
  showFun('🏆', 'Novo apelido desbloqueado', randomItem(nicknames));
});

dramaButton.addEventListener('click', () => {
  showFun('🎭', 'Drama rural urgente', randomItem(dramas));
});

danceButton.addEventListener('click', () => {
  showFun('🐴', 'Modo dancinha ativado', 'Carlos e Augusto estão dançando como se ninguém estivesse olhando!');
  funCard.classList.add('dance');
});

const memeStage = document.querySelector('#memeStage');
const memeHorse = document.querySelector('#memeHorse');
const memeTitle = document.querySelector('#memeTitle');
const memeText = document.querySelector('#memeText');
const memeButton = document.querySelector('#memeButton');
const soundRelincho = document.querySelector('#soundRelincho');
const soundBoing = document.querySelector('#soundBoing');
const soundDrama = document.querySelector('#soundDrama');
const soundTurbo = document.querySelector('#soundTurbo');
const chaosButton = document.querySelector('#chaosButton');

const memes = [
  { emoji: '🐴', title: 'Carlos vendo a ração acabar', text: 'Ele olhou para o pote vazio e disse: fui traído pelo sistema.' },
  { emoji: '🐎', title: 'Augusto modo turbo', text: 'Saiu correndo para buscar nada em lugar nenhum. Missão concluída.' },
  { emoji: '🥕', title: 'Cenoura lendária apareceu', text: 'Carlos desbloqueou +99 de felicidade e +3 de fofoca no estábulo.' },
  { emoji: '🧹', title: 'Fiscal da baia chegou', text: 'Augusto inspecionou a limpeza e deu nota: relincho aprovado.' },
  { emoji: '🤠', title: 'Haras News urgente', text: 'Cavalo local descobre que maçã não nasce no balde. Entenda o caso.' },
  { emoji: '🐴', title: 'Carlos filosófico', text: 'Se o feno é seco, por que minha vontade de comer ele é molhada de emoção?' }
];

function createAudioContext() {
  return new (window.AudioContext || window.webkitAudioContext)();
}

function beep(frequency, duration, type = 'sine', volume = 0.12) {
  const audioContext = createAudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  gain.gain.setValueAtTime(volume, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

function playRelinchoFake() {
  beep(520, .12, 'sawtooth');
  setTimeout(() => beep(760, .16, 'sawtooth'), 110);
  setTimeout(() => beep(430, .22, 'square'), 240);
}

function playBoing() {
  beep(260, .10, 'sine');
  setTimeout(() => beep(680, .18, 'sine'), 90);
}

function playDrama() {
  beep(220, .25, 'triangle');
  setTimeout(() => beep(180, .35, 'triangle'), 260);
  setTimeout(() => beep(140, .45, 'triangle'), 620);
}

function playTurbo() {
  [180, 240, 320, 430, 560, 720].forEach((freq, index) => {
    setTimeout(() => beep(freq, .08, 'square', .08), index * 70);
  });
}

memeButton.addEventListener('click', () => {
  const meme = randomItem(memes);
  memeHorse.textContent = meme.emoji;
  memeTitle.textContent = meme.title;
  memeText.textContent = meme.text;
  playBoing();
});

soundRelincho.addEventListener('click', playRelinchoFake);
soundBoing.addEventListener('click', playBoing);
soundDrama.addEventListener('click', playDrama);
soundTurbo.addEventListener('click', playTurbo);

chaosButton.addEventListener('click', () => {
  memeStage.classList.toggle('chaos');
  memeHorse.textContent = memeStage.classList.contains('chaos') ? '🐎' : '🐴';
  memeTitle.textContent = memeStage.classList.contains('chaos') ? 'MODO CAOS ATIVADO' : 'Caos desligado';
  memeText.textContent = memeStage.classList.contains('chaos')
    ? 'Augusto hackeou o pasto. Carlos está negociando com uma cenoura.'
    : 'O haras voltou ao normal... por enquanto.';
  playTurbo();
});
