const express = require('express')
const roomNumbers=[
    {courseName: 'CEG4166',roomNumber:201},
    {courseName: 'SEG2105',roomNumber:202},
    {courseName: 'CHG4361',roomNumber:203},
    {courseName: 'CSI2110',roomNumber:204},
    {courseName: 'MAT1341',roomNumber:205}
]
module.exports = {
    getRoomNumbers: (req, res) => { //typically would be fetching information from a database, but in this scenario, it is defined below
        return res.status(200).json({ roomNumbers: roomNumbers}) //if status is okay, then send the menu, first
    },
    getRoomNumber: (req, res) => { //typically would be fetching information from a database, but in this scenario, it is defined below
        const roomNumber = roomNumbers.find(c => c.courseName ===(req.params.courseName));
        
        if(!roomNumber){
            res.status(404).send('<h2>Oops... Cant find what you are looking for!</h2>');
        }
        return res.status(200).json({ roomNumber: roomNumber}) //if status is okay, then send the roomNumber corresponding to the course
    },
}