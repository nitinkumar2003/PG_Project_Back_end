const express = require('express')
const Router = new express.Router()
const {create,verify}=require('../controllers/otpController.js')
const  authVerify =require('../middleware/authVerify')
Router.post('/sent',authVerify,create)
Router.post('/verify',authVerify,verify)
module.exports=Router
