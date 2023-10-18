const express = require('express')
const Router =  new express.Router();
const {register} = require('../controllers/userController')

Router.post('/register',register)

module.exports = Router;    