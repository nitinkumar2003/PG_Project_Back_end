const express = require('express');
const Router = new express.Router();
const { imageUpload } = require('../controllers/imageController');


Router.post('/upload', imageUpload);
module.exports = Router;