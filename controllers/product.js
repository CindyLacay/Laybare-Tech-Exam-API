const Product = require("../models/Product")
const bcrypt = require("bcrypt");
const auth = require("../auth");

module.exports.addBook = (data) => { 
    if(data.isAdmin){
        let newProduct = new Product({
            title : data.product.title,
            author : data.product.author,
            image: data.product.image,
            description : data.product.description,
            price : data.product.price,
            stock : data.product.stock
        })

        return newProduct.save().then((product, error) =>{
            if(error){
                return false;
            }
            else{
                return true;
            }
        })
    }
    else{
        return Promise.resolve("Access denied. Please contact your administrator.");
    }
}

module.exports.getActiveBooks = () => {
    return Product.find({isActive : true}).then(result => {
        return result
    })
}

module.exports.getAllBooks = (data) => {
    if(data.isAdmin){
        return Product.find({}).then(result => {
            return result
        })
    }
    else {
        return Promise.resolve("Access denied. Please contact your administrator.");
    }
    
}

module.exports.getBook = (reqParams) => {
    return Product.findById(reqParams.bookId).then(result => {
        return result
    })
}

module.exports.updateBook = (data) => {
    if(data.isAdmin){
        let updatedProduct = {
            title : data.product.title,
            author : data.product.author,
            image : data.product.image,
            description : data.product.description,
            price : data.product.price,
            stock: data.product.stock
        }

        return Product.findByIdAndUpdate(data.bookId, updatedProduct).then((product, error) => {
            if(error){
                return false
            }
            else{
                return true
            }
        })
    }
    else{
        return Promise.resolve("Access denied. Please contact your administrator.");
    }
}

module.exports.archiveBook = (data) => {
    if (data.isAdmin) {
        let updateActiveField = {
            isActive : false
        };

        return Product.findByIdAndUpdate(data.bookId, updateActiveField).then((product, error) => {
            if (error) {
                return false;
            } 
            else {

                return true;

            }

        })
    } 
    else {
		return Promise.resolve("Access denied. Please contact your administrator.");
	}

}

module.exports.activateBook = (data) => {
    if (data.isAdmin) {
        let updateActiveField = {
            isActive : true
        };

        return Product.findByIdAndUpdate(data.bookId, updateActiveField).then((product, error) => {
            if (error) {
                return false;
            } 
            else {

                return true;

            }

        })
    } 
    else {
		return Promise.resolve("Access denied. Please contact your administrator.");
	}

}

module.exports.deleteBook = (data) => {
    if (data.isAdmin) {
        return Product.findByIdAndDelete(data.bookId).then((product, error) => {
            if (error) {
                return false;
            } 
            else {

                return true;

            }

        })
    } 
    else {
		return Promise.resolve("Access denied. Please contact your administrator.");
	}

}