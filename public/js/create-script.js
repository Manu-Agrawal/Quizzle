import questions from "./questions.js";

const startButton = document.getElementById('start-btn');
const nameInput = document.getElementById('name-input');
const titleInput = document.getElementById('title-input');
const quizContent = document.getElementById('quiz-content');
const questionElement = document.getElementById('quiz-question');
const answersElement = document.getElementById('quiz-answers');
const currentQuestion = document.getElementById('current_question');

startButton.addEventListener('click', handleStartQuiz);

const quiz = {
    info: {},
    data: []
};

let INDEX = 0;//whats this for?


function handleStartQuiz(e) {
    if (nameInput.value.length < 3 || nameInput.value.length > 20) {
        return alert("name has to be 3 to 20 characters long!");
    }
    if (titleInput.value.length < 6 || titleInput.value.length > 25) {
        return alert("title has to be 6 to 25 characters long!");
    }
    quiz.info = {
        author: nameInput.value,
        title: titleInput.value
    }
    nameInput.classList.add('hide');
    titleInput.classList.add('hide');
    startButton.classList.add('hide');
    quizContent.classList.remove('hide');

    handleNextQuestion();
}

function handleNextQuestion() {
    if (INDEX == questions.length) return handleSubmitQuiz();

    let question = questions[INDEX];

    questionElement.innerText = question.question;

    currentQuestion.innerText = INDEX + 1;

    while (answersElement.children.length > 0) {
        answersElement.removeChild(answersElement.firstChild);
    }

    question.options.forEach((option) => {

        // console.log(`${option}`)

        const newBtn = document.createElement("button");

        newBtn.innerText = option;

        newBtn.classList = 'btn quiz_answer';

        newBtn.dataset.key = question.key;
        //dataset is a property which can be used to add attributes to an element and we can read these attributes 
        //whenever we have acces to the element.

        newBtn.addEventListener('click', handleAnswer);

        answersElement.appendChild(newBtn);

    })
    INDEX++;
}

function handleAnswer(e) {
    quiz.data.push({
        // logs in the previous answer i.e the value and key of newBtn when it is clicked.
        value: e.target.innerText,
        key: e.target.dataset.key
    })
    handleNextQuestion();
}

async function handleSubmitQuiz() {
    answersElement.remove()

    const spinner = document.createElement('div')

    spinner.classList.add('spinner')

    quizContent.appendChild(spinner)

    const res = await fetch('http://localhost:3000/quiz', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            info: JSON.stringify(quiz.info),
            data: JSON.stringify(quiz.data)
        })

    })

    const response = await res.json(); // convert the res (declared at fetch)(res contains the response from post router in quiz.js) to json and store in response.

    window.location.href = `/message/?type=created&id=${response.id}`; // for redirecting 

}