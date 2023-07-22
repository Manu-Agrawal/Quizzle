import express from "express"
import quizModel from "../Models/q.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const quizs = await quizModel.find()
    res.render("index.ejs", { quizs: JSON.stringify(quizs) })
});

router.get("/create", (req, res) => {
    res.render("create.ejs")
});

router.get("/message", (req, res) => {
    const { id, type } = req.query

    res.render("message.ejs", { id, type })
})

export default router
