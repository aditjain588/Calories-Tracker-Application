const express = require('express')
const router = new express.Router()
const User = require('../db/userModel')

// adds new user to database
router.post('/users', async(req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send({user})
    }catch(e){
        console.log(e)
        res.send(e)
    }
})

// user login
router.post('/users/login', async (req, res) => {
    try{
        console.log("user: ", req.body.username)
        console.log("password: ", req.body.password)
        const user = await User.findByCredentials(req.body.username, req.body.password)
        console.log("User siis", user)
        res.send({user})
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;