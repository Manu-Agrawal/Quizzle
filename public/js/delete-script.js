
const allQuizes = document.getElementById('all-quizes')

quizs.forEach(element => {
    const quiz = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const quizId = document.createElement('p')
    const seeResults = document.createElement('button')
    const deleteQuiz = document.createElement('button')
    const id = element.quizId

    title.innerText = `title: ${element.title}`
    author.innerText = `author: ${element.author}`
    quizId.innerText = `quiz id: ${element.quizId}`
    seeResults.innerText = "see"
    deleteQuiz.innerText = "delete"

    seeResults.addEventListener('click', async () => {
        window.location.href = `/quiz/${id}/results`;

    })
    deleteQuiz.addEventListener('click', async () => {

        alert(`Deleted quiz with id: ${id}`)

        const resp = await fetch('http://localhost:3000/quiz/delete', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: JSON.stringify(id)
            })
        })
            .then(window.location.href = "/")
    })

    quiz.appendChild(title)
    quiz.appendChild(author)
    quiz.appendChild(quizId)
    quiz.appendChild(seeResults)
    quiz.appendChild(deleteQuiz)
    quiz.classList.add('quiz_elements')
    allQuizes.appendChild(quiz)


});

