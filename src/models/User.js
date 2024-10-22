const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:String,
    PhoneNumber:Number,
    Password:String,

    Todo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
    }],
    // Profile:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Profile"
    // }
})

module.exports = mongoose.model("User",userSchema);