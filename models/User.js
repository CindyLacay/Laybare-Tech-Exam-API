const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true, "First name is required."]
    },
    lastName : {
        type : String,
        required : [true, "Last name is required."]
    },
    mobileNumber : {
        type : String,
        required : [true, "Mobile number is required."]
    },
    email : {
        type : String,
        required : [true, "Email is required."]
    },
    password : {
        type : String,
        required : [true, "Password is required."]
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    userCart : [
        {
        productId : {
            type : String,
            required : [true, "Book ID is required."]
        },
        purchasedOn : {
            type : Date,
            default : new Date()
        }
        }
    ]
})

module.exports = mongoose.model("User", userSchema);