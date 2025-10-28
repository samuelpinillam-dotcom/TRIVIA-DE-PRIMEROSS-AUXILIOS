const questions = [
  {
    q: "¿Cuál es el primer paso al llegar a una emergencia?",
    c: ["Asegurar la zona", "Correr a ayudar", "Llamar al 911 sin mirar", "Ignorar la situación"],
    a: 0
  },
  {
    q: "¿Qué se debe hacer si una persona no respira?",
    c: ["Dar RCP", "Ofrecer agua", "Moverla", "Esperar a que despierte"],
    a: 0
  },
  {
    q: "¿Cómo se controla una hemorragia?",
    c: ["Presión directa", "Agua fría", "Cubrir con tierra", "Esperar"],
    a: 0
  },
  {
    q: "¿Qué no se debe hacer en una quemadura grave?",
    c: ["Aplicar pomadas", "Cubrir con gasa limpia", "Usar agua fría", "Buscar atención médica"],
    a: 0
  }
];

let current = 0;
let score = 0;
let answered = false;

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

  const q = questions[current];
  question.textContent = q.q;
  choices.innerHTML = "";

  q.c.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.className = "choice";
    btn.onclick = () => selectAnswer(index);
    choices.appendChild(btn);
  });
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const correct = questions[current].a;
  const buttons = document.querySelectorAll(".choice");

  buttons.forEach((btn, i) => {
    if (i === correct) btn.classList.add("correct");
    else if (i === index) btn.classList.add("wrong");
    btn.disabled = true;
  });

  if (index === correct) {
    score++;
    points.textContent = score;
  }

  if (current < questions.length - 1) {
    nextBtn.classList.remove("hidden");
  } else {
    setTimeout(showFinalResult, 600);
  }
}

function nextQuestion() {
  current++;
  showQuestion();
}

function showFinalResult() {
  trivia.classList.add("hidden");
  resultSection.classList.remove("hidden");

  const total = questions.length;
  const percent = Math.round((score / total) * 100);

  if (percent >= 75) {
    resultTitle.textContent = "¡Felicidades, ganaste! 🏆";
    resultMessage.textContent = `Tu puntaje fue de ${score}/${total} (${percent}%). 
    ¡Demostraste que sabes cómo actuar ante una emergencia!`;
  } else {
    resultTitle.textContent = "No te rindas 😅";
    resultMessage.textContent = `Tu puntaje fue de ${score}/${total} (${percent}%). 
    Aún puedes mejorar tus conocimientos de primeros auxilios.`;
  }
}
