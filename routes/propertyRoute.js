const express=require('express')
const Router=new express.Router()
const {basicDetails,ServicePostAns,getPropertyList} =require('../controllers/propertyController')
const  authVerify =require('../middleware/authVerify')

Router.post('/basicDetails',authVerify,basicDetails)
Router.post('/answer',authVerify,ServicePostAns)
Router.get('/get',getPropertyList)
module.exports=Router