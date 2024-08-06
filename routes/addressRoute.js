const express = require("express");
const Router = new express.Router()
const { postAddress } = require('../controllers/addressController')
const  authVerify =require('../middleware/authVerify')
Router.post('/add',authVerify, postAddress)

module.exports = Router
