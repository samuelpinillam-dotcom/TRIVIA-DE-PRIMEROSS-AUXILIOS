
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


const questions = [
  {
    q: "¿Cuál es la secuencia correcta al atender a una persona inconsciente?",
    c: [
      "Verificar seguridad, comprobar respuesta, pedir ayuda, evaluar respiración",
      "Moverlo y darle agua",
      "Tomar una foto y esperar ayuda",
      "Cubrirlo con una manta y no tocarlo"
    ],
    a: 0
  },
  {
    q: "Si una persona está sangrando mucho por una herida en el brazo, ¿qué debes hacer primero?",
    c: [
      "Aplicar presión directa sobre la herida con un paño limpio",
      "Lavar con alcohol o agua oxigenada",
      "Quitar cualquier objeto dentro de la herida",
      "Colocar hielo sobre la herida"
    ],
    a: 0
  },
  {
    q: "En caso de quemadura por agua caliente, ¿qué acción es la más adecuada?",
    c: [
      "Enfriar con agua a temperatura ambiente durante 10-20 minutos",
      "Aplicar crema dental o mantequilla",
      "Romper las ampollas",
      "Cubrir con un plástico ajustado"
    ],
    a: 0
  },
  {
    q: "Si una persona se atraganta y no puede hablar ni respirar, ¿qué maniobra se debe realizar?",
    c: [
      "Maniobra de Heimlich",
      "Reanimación cardiopulmonar (RCP)",
      "Golpes en la cabeza",
      "Colocar hielo en el pecho"
    ],
    a: 0
  },
  {
    q: "¿Cada cuánto se debe evaluar el pulso y respiración durante una RCP efectiva?",
    c: [
      "Cada 2 minutos o después de 5 ciclos de compresiones",
      "Cada 10 segundos",
      "Solo al principio",
      "Cada 5 minutos"
    ],
    a: 0
  },
  {
    q: "¿Cuál es la proporción correcta entre compresiones y respiraciones en un adulto durante la RCP?",
    c: [
      "30 compresiones por 2 respiraciones",
      "15 compresiones por 1 respiración",
      "20 compresiones por 5 respiraciones",
      "10 compresiones por 2 respiraciones"
    ],
    a: 0
  },
  {
    q: "Si alguien tiene un objeto clavado en el cuerpo, ¿qué se debe hacer?",
    c: [
      "No retirarlo y mantenerlo inmóvil mientras se pide ayuda médica",
      "Quitar el objeto lentamente",
      "Empujar el objeto hacia adentro",
      "Aplicar alcohol para desinfectar"
    ],
    a: 0
  },
  {
    q: "Ante una fractura visible, ¿qué es lo más adecuado?",
    c: [
      "Inmovilizar la zona con una férula improvisada y no mover al herido",
      "Intentar enderezar el hueso con fuerza",
      "Aplicar hielo directamente sobre la fractura abierta",
      "Cubrir con una venda muy apretada"
    ],
    a: 0
  },
  {
    q: "Si una persona sufre una descarga eléctrica, ¿qué se debe hacer antes de tocarla?",
    c: [
      "Cortar la corriente o desconectar la fuente eléctrica",
      "Llevar agua para enfriar el cuerpo",
      "Tocar a la persona para ver si reacciona",
      "Aplicar RCP inmediatamente"
    ],
    a: 0
  },
  {
    q: "¿Cuál es la posición correcta para una persona inconsciente pero que respira?",
    c: [
      "Posición lateral de seguridad",
      "Boca arriba con las piernas levantadas",
      "De pie apoyado en una pared",
      "Boca abajo con los brazos extendidos"
    ],
    a: 0
  }
];


let current = 0;
let score = 0;
let answered = false;
let randomizedQuestions = [];

const startBtn = document.getElementById("start-btn");
const trivia = document.getElementById("trivia");
const intro = document.getElementById("intro");
const question = document.getElementById("question");
const choices = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreBox = document.getElementById("score");
const points = document.getElementById("points");
const resultSection = document.getElementById("result");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");

startBtn.onclick = startTrivia;
nextBtn.onclick = nextQuestion;
restartBtn.onclick = startTrivia;



function startTrivia() {
  intro.classList.add("hidden");
  trivia.classList.remove("hidden");
  resultSection.classList.add("hidden");

 
  randomizedQuestions = shuffle([...questions]);
  randomizedQuestions.forEach(q => q.c = shuffle(q.c));

  current = 0;
  score = 0;
  points.textContent = score;
  scoreBox.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  answered = false;
  nextBtn.classList.add("hidden");
  restartBtn.classList.add("hidden");

  const q = randomizedQuestions[current];
  question.textContent = q.q;
  choices.innerHTML = "";

  q.c.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.className = "choice";
    btn.onclick = () => selectAnswer(btn, index);
    choices.appendChild(btn);
  });
}

function selectAnswer(btn, index) {
  if (answered) return;
  answered = true;

  const q = randomizedQuestions[current];
  const correctIndex = q.c.indexOf(q.c[q.a]);
  const correctText = q.c[q.a];


  const buttons = document.querySelectorAll(".choice");
  buttons.forEach(b => {
    if (b.textContent === correctText) b.classList.add("correct");
    else if (b === btn) b.classList.add("wrong");
    b.disabled = true;
  });

  if (btn.textContent === correctText) {
    score++;
    points.textContent = score;
  }

  if (current < randomizedQuestions.length - 1) {
    nextBtn.classList.remove("hidden");
  } else {
    setTimeout(showFinalResult, 800);
  }
}

function nextQuestion() {
  current++;
  showQuestion();
}

function showFinalResult() {
  trivia.classList.add("hidden");
  resultSection.classList.remove("hidden");

  const total = randomizedQuestions.length;
  const percent = Math.round((score / total) * 100);

  if (percent >= 75) {
    resultTitle.textContent = "¡Excelente trabajo! 🏆";
    resultMessage.textContent = `Tu puntaje fue de ${score}/${total} (${percent}%). 
    ¡Demostraste un gran conocimiento en primeros auxilios!`;
  } else if (percent >= 50) {
    resultTitle.textContent = "Vas por buen camino 👍";
    resultMessage.textContent = `Tu puntaje fue de ${score}/${total} (${percent}%). 
    Revisa algunos conceptos y vuelve a intentarlo.`;
  } else {
    resultTitle.textContent = "No te rindas 💪";
    resultMessage.textContent = `Tu puntaje fue de ${score}/${total} (${percent}%). 
    Aprende un poco más y repite la trivia para mejorar.`;
  }
}
