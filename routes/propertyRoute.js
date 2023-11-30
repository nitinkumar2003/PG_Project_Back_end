const express=require('express')
const Router=new express.Router()
const {basicDetails,ServicePostAns,getPropertyList} =require('../controllers/propertyController')

Router.post('/basicDetails',basicDetails)
Router.post('/answer',ServicePostAns)
Router.get('/get',getPropertyList)
module.exports=Router