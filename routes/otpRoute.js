const express = require('express')
const Router = new express.Router()
const {create,verify}=require('../controllers/otpController.js')
Router.post('/sent',create)
Router.post('/verify',verify)
module.exports=Router
