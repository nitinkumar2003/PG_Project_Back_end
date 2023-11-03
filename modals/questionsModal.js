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
    isAnswer:{
        type:Boolean,
        default:true
    },
    isSubQuestion:{
        type:Boolean,
        default:false
    }
})

const masterAnswerSchema=new Schema({
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
    question_id: Number,
    answer_id: Number,
    user_id: String
   });

const Questions=mongoose.model('Question',questionSchema)
// const Answers=mongoose.model('Answers',answerSchema)
const masterAnswer=mongoose.model('Answers',masterAnswerSchema)
exports.Questions=Questions
exports.masterAnswer=masterAnswer