const express = require('express')
var Regex = require("regex");
const courses = [
    {id:1, courseName: 'CEG4166'},
    {id:2, courseName: 'SEG2105'},
    {id:3, courseName: 'CHG4361'},
    {id:4, courseName: 'CSI2110'},
    {id:5, courseName: 'MAT1341'}
]
module.exports = {
    getCourses: (req, res) => { //typically would be fetching information from a database, but in this scenario, it is defined directly above
        return res.status(200).json({ courses: courses}) //if status is okay, then send the menu, first
    },
    getCourse: (req, res) => { 
        const course = courses.find(c => c.id === parseInt(req.params.id));
        
        if(!course){
            res.status(404).send('<h2>Oops... Cant find what you are looking for!</h2>');
        }
        return res.status(200).json({ course: course}); //if status is okay, then send the course
    },
    addCourse:(req, res)=>{
        //need to create a new course object to add to the array

        if(!req.body.courseName||/^([a-zA-Z0-9-]+)$/.test(req.body.courseName)==false||req.body.courseName.length<7){//can replace this validation by using joi framework
            return res.status(400).send('<h2> Error 400: Course name is required and needs to be at least 7 valid characters</h2>');
        }
        const course={
            id: courses.length+1,
            courseName: req.body.courseName
        };
        courses.push(course);
        res.send(course);
    },
    updateCourse:(req,res)=>{
        //look up the course, if it does not exist, need to return 404
        const course = courses.find(c => c.id === parseInt(req.params.id));
        
        if(!course){
            res.status(404).send('<h2>Oops... course name does not exist</h2>');
        }
        //make sure updated course name is valid
        if(!req.body.courseName||/^([a-zA-Z0-9-]+)$/.test(req.body.courseName)==false||req.body.courseName.length<7){//can replace this validation by using joi framework
            return res.status(400).send('<h2> Error 400: Course name is required and needs to be at least 7 characters</h2>');
        }
        //update course
        course.courseName=req.body.courseName;
        //return the updates course
        res.send(course);
    },
    deleteCourse:(req,res)=>{
         //look up the course, if it does not exist, need to return 404
         const course = courses.find(c => c.id === parseInt(req.params.id));
        
         if(!course){
             res.status(404).send('<h2>Oops... course name does not exist</h2>');
         }
         //delete course by finding index of the array first
         const indexNumber=courses.indexOf(course);
         courses.splice(indexNumber,1); //second arguement is how many objects to remove
         res.send(course)
    }
}