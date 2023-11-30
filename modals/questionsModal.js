const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question_id: {
        type: Number,
        required: true,
        unique: true,
    },
    question_label: {
        type: String,
        required: true,
        unique: true
    },
    isAnswer: {
        type: Boolean,
        default: true
    },
    isSubQuestion: {
        type: Boolean,
        default: false
    }
})

const masterAnswerSchema = new Schema({
    answer_id: {
        type: Number,
        required: true,
        unique: true,
    },
    answer_label: {
        type: String,
        required: true,
        unique: true
    },
})

const answerSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    property_id:{
        type:String,
        required:true
    },
    quesAns: [
        {
            question_id: {
                type: Number,
                required: true,
            },
            answer_id: {
                type: Number,
                required: true,
            }
        }]
});


const Questions = mongoose.model('Question', questionSchema)
const questionAnswerSchema = mongoose.model('ansSchema', answerSchema)
// const Answers=mongoose.model('Answers',answerSchema)
const masterAnswer = mongoose.model('Answers', masterAnswerSchema)
exports.Questions = Questions
exports.masterAnswer = masterAnswer
exports.questionAnswerSchema = questionAnswerSchema