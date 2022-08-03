const Workout = require('../models/workoutmodels')
const mongoose = require('mongoose')

// create new workout 
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }
   
    // Add document to database 
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)

    }catch (error) {
        res.status(400).json({error: error.message})
    }
} 


// get all workouts 
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}



// get a single workout 
const getWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}



// delete a workout 
const deleteWorkout = async (req, res) => {
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(400).json({error:'No such workout'})
    }

    res.status(200).json(workout)

}


// update a workout 
const updateWorkout = async (req, res) => {
    const {id} = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!workout){
        return res.status(400).json({error:'No such workout'})
    }

    res.status(200).json(workout)

}


// export files
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}