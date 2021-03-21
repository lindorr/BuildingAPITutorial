//this is a controller which will operate on models to retreiver
const express = require('express')
const router=express.Router() //create a route that will handle get requests or creating a router object
const courseService=require('../services/courses.service.js') //imported the menu.service

router.get('/', courseService.getCourses) //the browser sends the service a get request
//technical term: you are servicing a get request
router.get('/:id',courseService.getCourse)
router.post('/', courseService.addCourse)
router.put('/:id',courseService.updateCourse)
router.delete('/:id',courseService.deleteCourse)

module.exports=router