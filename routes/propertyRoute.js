const express=require('express')
const Router=new express.Router()
const {basicDetails} =require('../controllers/propertyController')

Router.post('/basicDetails',basicDetails)
module.exports=Router