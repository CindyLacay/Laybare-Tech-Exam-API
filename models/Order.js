const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : [true, "User ID is required."]
    },
    email: {
        type: String,
        required: [true, "User email is required."]
    },
    productId : {
        type : String,
        required : [true, "Book ID is required."]
    },
    title : {
        type : String,
        required : [true, "Book title is required."]
    },
    purchasedOn : {
        type : Date,
        default : new Date()
    },
    quantity : {
        type : Number,
        required : [true, "Quantity is required."]
    },
    totalAmount : {
        type : Number,
        required : [true, "Total amount is required."]
    },
    status : {
        type : String,
        default : "New"
    }
})

module.exports = mongoose.model("Order", orderSchema);