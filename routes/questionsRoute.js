const express=require('express')
const Router=new express.Router()
const {getAllQuestions,}=require('../controllers/questionsController')
//GET all questions
Router.get('/questions/:property_id',getAllQuestions)
module.exports=Router
