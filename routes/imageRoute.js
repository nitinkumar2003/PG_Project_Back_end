const express = require('express');
const Router = new express.Router();
const { imageUpload } = require('../controllers/imageController');
const  authVerify =require('../middleware/authVerify')

Router.post('/upload',authVerify, imageUpload);
module.exports = Router;