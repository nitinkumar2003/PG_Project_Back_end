const express = require("express");
const Router = new express.Router()
const { postAddress } = require('../controllers/addressController')
Router.post('/add', postAddress)

module.exports = Router
