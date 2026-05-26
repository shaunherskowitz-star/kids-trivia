const questions = [
  {
    category: "Animals",
    question: "Which animal is known as the king of the jungle?",
    answers: ["Elephant", "Lion", "Penguin", "Rabbit"],
    correct: "Lion"
  },
  {
    category: "Space",
    question: "What planet do we live on?",
    answers: ["Mars", "Jupiter", "Earth", "Venus"],
    correct: "Earth"
  },
  {
    category: "Food",
    question: "Which fruit is yellow and monkeys love to eat?",
    answers: ["Banana", "Apple", "Grape", "Blueberry"],
    correct: "Banana"
  },
  {
    category: "Science",
    question: "What do plants need from the sun to grow?",
    answers: ["Moonlight", "Sunlight", "Snow", "Sand"],
    correct: "Sunlight"
  },
  {
    category: "Sports",
    question: "In soccer, what do players try to kick into the goal?",
    answers: ["A puck", "A baseball", "A ball", "A frisbee"],
    correct: "A ball"
  }
];

let currentIndex = 0;
let score = 0;
let answered = false;

const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");
const progressEl = document.getElementById("progress");
const categoryEl = document.getElementById("category");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const endScreen = document.getElementById("endScreen");
const game = document.getElementById("game");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

function startGame() {
  currentIndex = 0;
  score = 0;
  answered = false;
  totalEl.textContent = questions.length;
  scoreEl.textContent = score;
  endScreen.classList.add("hidden");
  game.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  answered = false;
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");
  answersEl.innerHTML = "";

  const q = questions[currentIndex];
  categoryEl.textContent = q.category;
  questionEl.textContent = q.question;
  progressEl.style.width = `${(currentIndex / questions.length) * 100}%`;

  q.answers.forEach(answer => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer;
    button.addEventListener("click", () => chooseAnswer(button, answer));
    answersEl.appendChild(button);
  });
}

function chooseAnswer(button, selectedAnswer) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const buttons = document.querySelectorAll(".answer");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === q.correct) {
      btn.classList.add("correct");
    }
  });

  if (selectedAnswer === q.correct) {
    score++;
    scoreEl.textContent = score;
    feedbackEl.textContent = "Correct! Nice job ⭐";
  } else {
    button.classList.add("wrong");
    feedbackEl.textContent = `Good try! The answer was ${q.correct}.`;
  }

  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentIndex++;

  if (currentIndex >= questions.length) {
    progressEl.style.width = "100%";
    game.classList.add("hidden");
    endScreen.classList.remove("hidden");
    finalScore.textContent = `You scored ${score} out of ${questions.length}.`;
  } else {
    showQuestion();
  }
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startGame);

startGame();
