const express=require('express')
const Router=new express.Router()
const {home,living,share,price} =require('../controllers/masterController');



Router.get('/homeType',home)
Router.get('/livingtype',living)
Router.get('/shareType',share)
Router.get('/priceType',price)
module.exports=Router