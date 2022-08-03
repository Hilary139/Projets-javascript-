// importing react 
const express = require('express');
const workoutRouter = require('./routes/workouts')
const mongoose = require('mongoose')

require('dotenv').config()

// express app
const app = express();

// midddle ware
app.use(express.json())

app.use((req, res, next) => {
    console.log("new request: ")
    console.log("method: ", req.method)
    next();
})


// routes
 app.use('/api/workouts', workoutRouter)


// connect to db 
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
// port
    app.listen(process.env.PORT, () =>{
    console.log('Connected to DB & running on port 4000')
})
    })
    .catch((error) => {
    console.log(error)
    })  