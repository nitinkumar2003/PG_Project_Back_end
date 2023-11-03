const { Questions, Answers, masterAnswer } = require('../modals/questionsModal')
const tryCatchMiddleware = require('../middleware/tryCatchMiddleware')
const questions_get = async (req, res) => {

    const questions = await Questions.find({}, { question_id: 1, question_label: 1, isAnswer: 1, isSubQuestion: 1, _id: 0 });
    const answer = await masterAnswer.find({}, { answer_id: 1, answer_label: 1, _id: 0 })
    let merge = questions.map(question => question.isAnswer ? { ...question, answer_options: answer } : question);

    let data = merge.map(item => {
        return { question_id: item._doc.question_id, question_label: item._doc.question_label, isAnswer: item._doc.isAnswer, isSubQuestion: item._doc.isSubQuestion, answer_options: item.answer_options };
    });
    res.status(201).json({ message: 'Data Get successfully', data });

}

module.exports = {
    getAllQuestions: tryCatchMiddleware(questions_get)
}
