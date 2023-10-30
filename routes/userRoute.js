const express = require('express')
const Router = new express.Router();
const { register, login,forgotPassword } = require('../controllers/userController')

Router.post('/register', register)
Router.post('/login', login)
Router.post('/password/Forgot',forgotPassword)

module.exports = Router;    