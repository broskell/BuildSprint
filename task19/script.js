const QUIZ_DATA = [
  {
    question: "Which HTML tag is used for navigation?",
    options: ["<header>", "<nav>", "<section>", "<aside>"],
    answer: 1
  },
  {
    question: "Which keyword declares a variable that cannot be reassigned?",
    options: ["var", "let", "const", "static"],
    answer: 2
  },
  {
    question: "Which CSS property aligns items along the cross axis in Flexbox?",
    options: ["justify-content", "align-items", "flex-direction", "gap"],
    answer: 1
  },
  {
    question: "What does fetch() return?",
    options: ["A JSON string", "An XMLHttpRequest", "A Promise", "An HTML document"],
    answer: 2
  },
  {
    question: "Which JavaScript object stores unique values?",
    options: ["Array", "Map", "WeakMap", "Set"],
    answer: 3
  },
  {
    question: "Which HTTP status code means Not Found?",
    options: ["200", "403", "404", "500"],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;
let time = 60;
let timer;

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionTracker = document.getElementById("question-tracker");
const liveScoreBadge = document.getElementById("live-score-badge");
const timerCount = document.getElementById("timer-count");
const feedbackBanner = document.getElementById("feedback-banner");
const feedbackTitle = document.getElementById("feedback-title");

const showScreen = (screen) => {
    [startScreen, quizScreen, resultsScreen].forEach((item) => {
        item.hidden = item !== screen;
        item.classList.toggle("active", item === screen);
    });
};

const startQuiz = () => {
    currentQuestion = 0;
    score = 0;
    showScreen(quizScreen);
    loadQuestion();
};

const loadQuestion = () => {
    clearInterval(timer);
    time = 60;

    const q = QUIZ_DATA[currentQuestion];

    questionTracker.textContent = `Question ${currentQuestion + 1} of ${QUIZ_DATA.length}`;
    questionText.textContent = q.question;
    liveScoreBadge.textContent = `Score: ${score}`;
    timerCount.textContent = time;
    optionsContainer.innerHTML = "";
    feedbackBanner.hidden = true;
    nextBtn.hidden = true;

    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option-btn";

        button.addEventListener("click", () => {
        clearInterval(timer);

        document.querySelectorAll(".option-btn").forEach((btn) => {
            btn.disabled = true;
        });

        if (index === q.answer) {
            score += 5;
            button.classList.add("correct");
            feedbackTitle.textContent = "Correct!";
        } else {
            button.classList.add("wrong");
            feedbackTitle.textContent = `Wrong! Correct answer: ${q.options[q.answer]}`;
            optionsContainer.children[q.answer].classList.add("correct");
        }

        liveScoreBadge.textContent = `Score: ${score}`;
        feedbackBanner.hidden = false;
        nextBtn.hidden = false;
    });
        optionsContainer.appendChild(button);
    });

    timer = setInterval(() => {
        time--;
        timerCount.textContent = time;

        if (time === 0) {
            clearInterval(timer);
            score -= 5;

            liveScoreBadge.textContent = `Score: ${score}`;
            feedbackTitle.textContent = `Time's up! Correct answer: ${q.options[q.answer]}`;
            optionsContainer.children[q.answer].classList.add("correct");

            document.querySelectorAll(".option-btn").forEach((btn) => {
                btn.disabled = true;
            });

            feedbackBanner.hidden = false;
            nextBtn.hidden = false;
        }
    }, 1000);
};

const nextQuestion = () => {
    currentQuestion++;

    if (currentQuestion < QUIZ_DATA.length) {
        loadQuestion();
    } else {
        clearInterval(timer);
        showScreen(resultsScreen);
        document.getElementById("final-score-val").textContent = score;
        document.getElementById("final-max-score").textContent = `/ ${QUIZ_DATA.length * 5} pts`;
  }
};

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);