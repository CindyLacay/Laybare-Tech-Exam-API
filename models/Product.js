const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "Book title is required."]
    },
    author : {
        type : String,
        required : [true, "Author is required."]
    },
    image : {
        type : String,
        required : [true, "Image is required."]
    },
    description : {
        type : String,
        required : [true, "Description is required."]
    },
    price : {
        type : Number,
        required : [true, "Price is required."]
    },
    stock : {
        type : Number,
        required : [true, "Stock is required."]
    },
    isActive : {
        type : Boolean,
        default : true
    },
    createdOn : {
        type : Date,
        default : new Date()
    },
    purchaseOrder : [
        {
            email: {
                type: String,
                required: [true, "User email is required."]
            },
            purchasedOn : {
                type : Date,
                default : new Date()
            }
        }
    ]
})

module.exports = mongoose.model("Product", productSchema);