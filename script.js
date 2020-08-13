var quizButtons = quiz.querySelectorAll("button");
var timeDisplay = document.getElementById("timer");
var startSection = document.getElementById("startPage");
var quiz = document.getElementById("quizPage");
var question = document.getElementById("question");
var result = document.getElementById("result");
var questionIndex = 0;
var timer = 60;
var restartButton = document.getElementById("restartBtn");
var startButton = startSection.querySelector("button");
var endQuiz = document.getElementById("endPage");
var finalScore = document.getElementById("finalScore");
var saveButton = document.getElementById("saveBtn");s
var allScores = document.getElementById("scorePage");
var scoreList = document.getElementById("scoreList");
var userInitials = document.getElementById("userInitials");
var viewScores = document.getElementById("viewScores");
var replayButton = document.getElementById("playAgain");
var questionArray = [
    { question: "Which is not a basic value type?", answers: ["Strings", "Numbers", "Booleans", "Objects"], correct: "Objects" },
    { question: "Which is a set of characters within quotation marks?", answers: ["Strings", "Numbers", "Booleans", "Text"], correct: "Strings" },
    { question: "What value type is a list of key-value pairs?", answers: ["Strings", "Functions", "Objects", "Arrays"], correct: "Objects" },
    { question: "What do you assign values to for use later?", answers: ["Variables", "Functions", "Objects", "Arrays"], correct: "Variables" },
    { question: "What enable value manipulation?", answers: ["Strings", "Operators", "Objects", "Arrays"], correct: "Operators" },
    { question: "What does this operator do? % ", answers: ["Turns numbers into a percentage.", "Divides by 2.", "Gives the remainder", "Denotes a sale item."], correct: "Gives the remainder" },
    { question: "Values and operators can combine to form what? Hint: it evaluates to a single value.", answers: ["Functions", "Arguments", "Expressions", "Objects"], correct: "Expressions" },
    { question: "What are > < != and what do they do?", answers: ["They eat numbers.", "They are arithmetic operators", "Comparison operators that give either true or false", "Objects that make faces"], correct: "Comparison operators that give either true or false" },
    { question: "Which of these are Logical Operators?", answers: ["@ ^ *", "&& || !", "$$ ()", ";-)"], correct: "&& || !" },
    { question: "What accesses elements in arrays and/or properties in objects?", answers: ["Accessors", "Maps", "Booleans", "Logical Operators"], correct: "Accessors" },
];





var userScores = [];
init();

replayButton.addEventListener("click", restartQuiz);
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
viewScores.addEventListener("click", showScorePage);
saveButton.addEventListener("click", saveScore);

quizButtons.forEach((button) => {
    button.addEventListener("click", function() {
        var answer = questionArray[questionIndex].correct;
        if (button.textContent === answer) {
            result.textContent = "correct!";
        } else {
            timer = timer - 10;
            result.textContent = "wrong!";
        }
        questionIndex++;
        showQuestion();
    });
})
function init() {
    var tempScores = JSON.parse(localStorage.getItem("scores"));
    if (tempScores !== null) {
        userScores = tempScores;
        renderScores();
    }
}
function startQuiz() {
    result.textContent = "";
    quiz.style.display = "flex";
    startSection.style.display = "none";
    showQuestion();
    startTimer();
}

function startTimer() {
    timeDisplay.textContent = timer;
    var countdown = setInterval(function() {
        timer--;
        timeDisplay.textContent = timer;
        if ((timer <= 0) || (questionIndex >= questionArray.length)) {
            clearInterval(countdown);
            showScore();
        }
    }, 1000);
}

function showQuestion() {
    if (questionIndex < questionArray.length) {
        question.textContent = questionArray[questionIndex].question;
        for (var i = 0; i < quizButtons.length; i++) {
            quizButtons[i].textContent = questionArray[questionIndex].answers[i];
        }
    }
}

function showScore() {
    finalScore.textContent = timer;
    quiz.style.display = "none";
    endQuiz.style.display = "flex";
}

function saveScore() {
    var userObject = { initials: userInitials.value, score: finalScore.textContent };
    userScores.push(userObject);
    userInitials.value = "";
    setToLocal();
    showScorePage();
}

function setToLocal() {
    localStorage.setItem("scores", JSON.stringify(userScores));
}

function showScorePage() {
    init();
    startSection.style.display = "none";
    endQuiz.style.display = "none";
    allScores.style.display = "flex";
}

function renderScores() {
    scoreList.innerHTML = "";

    userScores.forEach(function (obj) {
        var userRecord = document.createElement("li");
        userRecord.textContent = obj.initials + ": " + obj.score;
        scoreList.appendChild(userRecord);
    });
}

function restartQuiz() {
    questionIndex = 0;
    timer = 60;
    endQuiz.style.display = "none";
    allScores.style.display = "none";
    startSection.style.display = "block";
}