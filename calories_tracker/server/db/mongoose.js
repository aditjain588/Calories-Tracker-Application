const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/Calories_tracker'
mongoose.connect(connectionURL)
console.log("Connected to MongoDB")