const { Questions, Answers, masterAnswer, questionAnswerSchema } = require('../modals/questionsModal')
const tryCatchMiddleware = require('../middleware/tryCatchMiddleware')
const questions_get = async (req, res) => {

    const property_id = req.params.property_id;
    console.log('userIduserIduserId', property_id);

    const questions = await Questions.find({}, { question_id: 1, question_label: 1, isAnswer: 1, isSubQuestion: 1, _id: 0 });
    // console.log('questionsquestions',questions)
    const answer = await masterAnswer.find({}, { answer_id: 1, answer_label: 1, _id: 0 });

    let merge = questions.map(question => question.isAnswer ? { ...question._doc, answer_options: answer } : question);
    
    let returnData = [...merge];

if (property_id) {
    const userAnswer = await questionAnswerSchema.find({ property_id: property_id }, {});
    if (userAnswer.length > 0) {
        const questionAns = userAnswer[0].quesAns;
        console.log('questionAns', questionAns);

        returnData = returnData.map(question => {
            return {
                ...question,
                answer_options: question.answer_options.map(option => {
                    const matchingAnswer = questionAns.find(item =>
                        item.question_id === question.question_id && item.answer_id === option.answer_id
                    );
                    return {
                        ...option,
                        answer_id: option.answer_id,
                        answer_label:option.answer_label,
                        isChecked:matchingAnswer ? true:false,


                    };
                }),
            };
        });
    }
}

console.log('returnData', returnData);


    const data = returnData.map(item => {
        return {
            question_id: item.question_id,
            question_label: item.question_label,
            isAnswer: item.isAnswer,
            isSubQuestion: item.isSubQuestion,
            answer_options: item.answer_options.map(option => ({
                answer_id: option.answer_id,
                answer_label: option.answer_label,
                isChecked: option.isChecked || false
            }))
        };
    });
    res.status(201).json({ message: 'Data Get successfully', data });

}

module.exports = {
    getAllQuestions: tryCatchMiddleware(questions_get)
}
