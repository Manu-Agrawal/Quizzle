import express from 'express'
import mongoose from "mongoose"
import indexRouter from "./routes/index.js"//indexRouter is whatever is exported. 
import quizRouter from "./routes/quiz.js"
import expressEjsLayouts from 'express-ejs-layouts';

mongoose.connect('mongodb://127.0.0.1:27017/my-project-database')
    .then(() => console.log("Connected to mongoose!!"))

const app = express();

app.use(express.static("public"))//what is this?
app.use(expressEjsLayouts)
app.use(express.json())

app.set("view engine", "ejs")
app.use("/", indexRouter)//index router will run after /.
app.use("/quiz", quizRouter)

app.listen(3000, () => {
    console.log("Connected to server!!!");
})