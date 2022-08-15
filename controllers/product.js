const Product = require("../models/Product")
const bcrypt = require("bcrypt");
const auth = require("../auth");

module.exports.addProduct = (data) => { 
    if(data.isAdmin){
        let newProduct = new Product({
            name : data.product.name,
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

module.exports.getActiveProducts = () => {
    return Product.find({isActive : true}).then(result => {
        return result
    })
}

module.exports.getAllProducts = (data) => {
    if(data.isAdmin){
        return Product.find({}).then(result => {
            return result
        })
    }
    else {
        return Promise.resolve("Access denied. Please contact your administrator.");
    }
    
}

module.exports.getProduct = (reqParams) => {
    return Product.findById(reqParams.productId).then(result => {
        return result
    })
}

module.exports.updateProduct = (data) => {
    if(data.isAdmin){
        let updatedProduct = {
            name : data.product.name,
            image : data.product.image,
            description : data.product.description,
            price : data.product.price,
            stock: data.product.stock
        }

        return Product.findByIdAndUpdate(data.productId, updatedProduct).then((product, error) => {
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

module.exports.archiveProduct = (data) => {
    if (data.isAdmin) {
        let updateActiveField = {
            isActive : false
        };

        return Product.findByIdAndUpdate(data.productId, updateActiveField).then((product, error) => {
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

module.exports.activateProduct = (data) => {
    if (data.isAdmin) {
        let updateActiveField = {
            isActive : true
        };

        return Product.findByIdAndUpdate(data.productId, updateActiveField).then((product, error) => {
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

module.exports.deleteProduct = (data) => {
    if (data.isAdmin) {
        return Product.findByIdAndDelete(data.productId).then((product, error) => {
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