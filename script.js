const ORACAO_MENINA_IZALDINHA = `Menina Izildinha, anjo do Senhor, minha bondosa irmãzinha. Junto a Vós faço humildemente meu pedido cheia de devoção e Fé, para que me concedas a Graça (Fazer o pedido).

Que o Pai, seu Divino Filho Jesus e Maria vos cubram de benção e poder para que possais diminuir o sofrimento a todo aquele que invoque o vosso abençoado Nome. Prometo pagar-vos com boa Fé e crença no Pai, em Jesus, em Maria e em Vós. Serei resignado ás provações que sejam impostas por Deus como remissão das minhas faltas. Tornar-me-ei despido de vaidade, de orgulho e de inveja como estarei sempre pronto a perdoar o mal que de outros receba e dedicar fraternal amor ao próximo.

Que o Pai favoreça a saúde e felicidade de meu lar. Que pelo trabalho honesto do meu esforço obtenha o necessário para a minha manutenção e de meus entes queridos. Que o Pão ganho assim com o suor de meu rosto não baste só para o nosso lar, mas sim sobre para que possamos repartir com os verdadeiros pobres e necessitados que encontramos em nosso caminho ou batam à nossa morada em busca de auxílio.

(Rezar um Pai Nosso e uma Ave Maria).`;

const atividades = [
  { icon: '🎮', text: 'Que tal jogar alguma coisa por alguns minutos?' },
  { icon: '📺', text: 'Que tal colocar um episódio daquela série que você gosta?' },
  { icon: '📖', text: 'Que tal ler algumas páginas de um livro?' },
  { icon: '✍️', text: 'Que tal escrever um pouco? Pode ser até um artigo.' },
  { icon: '🎵', text: 'Coloque uma música que você gosta e relaxe um pouco.' },
  { icon: '🧩', text: 'Que tal fazer alguma coisa que ocupe a cabeça?' },
  { icon: '💻', text: 'Que tal mexer em algum projeto ou aprender alguma coisa nova?' },
  { icon: '💬', text: 'Que tal chamar alguém para conversar?' }
];

const mensagens = [
  'Iniciando varredura...',
  'Analisando campo energético...',
  'Verificando o ambiente...',
  'Procurando alterações...',
  'Finalizando análise...'
];

const screens = document.querySelectorAll('.screen');
const startButton = document.querySelector('#start-button');
const restartButton = document.querySelector('#restart-button');
const progressBar = document.querySelector('#progress-bar');
const progressPercent = document.querySelector('#scan-percent');
const scanMessage = document.querySelector('#scan-message');
const prayerText = document.querySelector('#prayer-text');
const activityIcon = document.querySelector('#activity-icon');
const activityText = document.querySelector('#activity-text');
let scanTimer;
let previousActivity = -1;

prayerText.textContent = ORACAO_MENINA_IZALDINHA;

function showScreen(name) {
  screens.forEach((screen) => {
    const active = screen.dataset.screen === name;
    screen.classList.toggle('is-active', active);
    screen.setAttribute('aria-hidden', String(!active));
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function chooseActivity() {
  let nextActivity;
  do {
    nextActivity = Math.floor(Math.random() * atividades.length);
  } while (atividades.length > 1 && nextActivity === previousActivity);
  previousActivity = nextActivity;
  const activity = atividades[nextActivity];
  activityIcon.textContent = activity.icon;
  activityText.textContent = activity.text;
}

function runScan() {
  window.clearInterval(scanTimer);
  progressBar.style.width = '0%';
  progressPercent.textContent = '0%';
  scanMessage.textContent = mensagens[0];
  showScreen('scan');

  const duration = 7000;
  const startedAt = Date.now();
  scanTimer = window.setInterval(() => {
    const progress = Math.min((Date.now() - startedAt) / duration, 1);
    const percentage = Math.round(progress * 100);
    const messageIndex = Math.min(Math.floor(progress * mensagens.length), mensagens.length - 1);
    progressBar.style.width = `${percentage}%`;
    progressPercent.textContent = `${percentage}%`;
    scanMessage.textContent = mensagens[messageIndex];

    if (progress >= 1) {
      window.clearInterval(scanTimer);
      chooseActivity();
      showScreen('result');
    }
  }, 100);
}

startButton.addEventListener('click', runScan);
restartButton.addEventListener('click', runScan);
