const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        // validate(value){
        //     if(value.includes("password")){
        //         throw new Error("Password cannot be password")
        //     }
        // }
    }
})

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({username})
    
    if(!user){
        throw new Error("No user found")
    }

    console.log("user is: ", user)
    if(!username) {
        throw new Error('Unable to login')
    }

    const isMatch = (password === user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

const User = mongoose.model("users", userSchema)

module.exports = User