import express from 'express';
import quizModel from "../Models/q.js";
import { v4 } from 'uuid'
const router = express.Router()

router.post('/', async (req, res) => {
    const { info, data } = req.body
    const quiz = await quizModel.create({
        quizId: v4().slice(0, 8),
        author: JSON.parse(info).author,
        title: JSON.parse(info).title,
        quizData: JSON.parse(data)
    })

    if (quiz) {

        res.status(201).json({ id: quiz.quizId })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const quiz = await quizModel.findOne({ quizId: id });

    if (quiz) {
        res.render('quiz.ejs', {
            quizId: quiz.quizId,
            title: quiz.title,
            author: quiz.author,
            quizData: JSON.stringify(quiz.quizData)
        })
    }
    else {
        res.redirect(`/message/?type=not-found&id=${id}`);
    }
})


router.patch("/:id", async (req, res) => {
    const { id } = req.params
    const { name, result } = req.body

    const oldQuiz = await quizModel.findOne({ quizId: id })

    const updatedQuiz = await quizModel.findOneAndUpdate(
        { quizId: id },
        { results: [...oldQuiz.results, { [name]: result }] })
    // why [] in name

    res.status(200).json({ message: "Quiz saved!" })
})

router.get("/delete", async (req, res) => {
    const { id } = req.query

    console.log(id)

    // await quizModel.findOneAndDelete({ quizId: id })
})

router.get('/:id/results', async (req, res) => {
    const { id } = req.params

    const quiz = await quizModel.findOne({ quizId: id })

    if (quiz) {
        res.render('results.ejs', {
            results: quiz.results
        })
    }
    else {
        res.redirect(`/message/?type=not-found&id=${id}`)
    }
})
export default router