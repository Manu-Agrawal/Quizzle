import questions from './questions.js'

const nameInput = document.getElementById("name-input")
const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const backButton = document.getElementById("back-btn")
const questionElement = document.getElementById("quiz-question")
const quizContent = document.getElementById("quiz-content")
const currentQuestion = document.getElementById("current_question")
const currentScore = document.getElementById("current-score")
const answerElement = document.getElementById("quiz-answers")

questions.forEach((question) => {
    question.question = question.question
        .replace("your", `${author}'s`)
        .replace("do", "does")
        .replace("you", author)
})

questions.forEach((question, index) => {
    question.correct = quizData[index].value
});

startButton.addEventListener('click', handleStartQuiz);
nextButton.addEventListener('click', handleNextQuestion)
const data = {}

let INDEX = 0;

function handleStartQuiz(e) {
    if (nameInput.value.length < 3 || nameInput.value.length > 20) {
        return alert("name has to be 3 to 20 characters long!");
    }
    data.name = nameInput.value

    nameInput.classList.add('hide');
    startButton.classList.add('hide');

    quizContent.classList.remove('hide');

    handleNextQuestion();
}

function handleNextQuestion() {
    nextButton.classList.add('hide')
    let question = questions[INDEX]
    questionElement.innerText = question.question
    currentQuestion.innerText = INDEX + 1

    while (answerElement.children.length > 0) {
        answerElement.removeChild(answerElement.firstChild)
    }

    question.options.forEach((option) => {
        const newElement = document.createElement("button")
        newElement.innerText = option
        newElement.dataset.status = option == question.correct ? "correct" : "wrong"
        newElement.classList = "btn quiz_answer"
        newElement.dataset.key = question.key
        newElement.addEventListener('click', handleAnswer)
        answerElement.appendChild(newElement)
    })

    INDEX++
}

function handleAnswer(e) {
    if (e.target.classList.contains("correct") || e.target.classList.contains("wrong")) return;
    if (e.target.dataset.status == "correct") {
        currentScore.innerText = parseInt(currentScore.innerText) + 1
    }
    Array.from(answerElement.children).forEach((button) => {
        button.classList.add(button.dataset.status)
    });

    nextButton.classList.remove("hide")

    if (INDEX == questions.length) {
        nextButton.classList.add("hide")
        handleSubmitQuiz()
    }
}

async function handleSubmitQuiz() {
    const spinner = document.createElement('div')
    spinner.classList.add('spinner')
    quizContent.appendChild(spinner)

    data.result = currentScore.innerText

    const res = await fetch(`http://localhost:3000/quiz/${quizId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    spinner.remove()
    backButton.classList.remove('hide')

}