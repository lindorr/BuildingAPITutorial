const express=require('express')
const app = express()
const courses=require('./routes/courses')
const roomnumbers=require('./routes/roomNumber')

app.use(express.urlencoded({ extended: true })) //use urlencoded module in order for express to understand web forms ie login forms
app.use(express.json()) //use urlencoded module (from front end to API)

app.get('/',(req,res)=>{res.send('Welcome to local host:3000')})

app.use('/courses', courses)//creating an endpoint for courses available
app.use('/roomnumbers', roomnumbers) //creating another endpoint for room numbers

module.exports = app 