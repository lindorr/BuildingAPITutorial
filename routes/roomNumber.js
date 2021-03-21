//this is a controller which will operate on models to retreiver
const express = require('express')
const router=express.Router() //create a route that will handle get requests or creating a router object
const roomNumberService=require('../services/roomNumber.service.js') //imported roomNumber.service

router.get('/', roomNumberService.getRoomNumbers) //the browser sends the service a get request
//technical term: you are servicing a get request
router.get('/:courseName',roomNumberService.getRoomNumber)

module.exports=router