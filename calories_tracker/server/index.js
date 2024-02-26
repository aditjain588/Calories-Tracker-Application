const express = require('express');
const app = express()
const FoodCaloriesRoute = require('./Routes/FoodCaloriesRoute')
const UserRoute = require('./Routes/UserRoute')
const cors=require("cors");
const path = require("path")
require('./db/mongoose')

const port = process.env.PORT || 8080;

const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }

app.use(express.static(path.join(__dirname, "client/build")))
app.use(cors(corsOptions)) 
app.use(express.json())
app.use(FoodCaloriesRoute)
app.use(UserRoute)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})