import mongoose from "mongoose";

const quizSchema = mongoose.Schema({
    quizId: String,
    title: {
        type: String,
        default: "Untitled"
    },
    author: {
        type: String,
        default: "Unknown"
    },
    quizData: {
        type: Array,
        default: []
    },
    results: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    }

});

const quizModel = mongoose.model('quiz', quizSchema);

export default quizModel;