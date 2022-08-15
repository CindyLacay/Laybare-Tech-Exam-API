const User = require("../models/User")
const Product = require("../models/Product")
const Order = require("../models/Order")
const bcrypt = require("bcrypt")
const auth = require("../auth")

module.exports.registerUser = (reqBody) => {
    let newUser = new User({
        firstName : reqBody.firstName,
        lastName : reqBody.lastName,
        email : reqBody.email,
        mobileNumber : reqBody.mobileNumber,
        password : bcrypt.hashSync(reqBody.password, 10)
    })

    return newUser.save().then((user, error) => {
        if(error){
            return false;
        }
        else{
            return true;
        }
    })
}

module.exports.checkDuplicateEmail = (reqBody) => {
	return User.find({email : reqBody.email}).then(result => {
		if (result.length > 0) {
			return true;
		} else {
			return false;
		};
	});

};


module.exports.loginUser = (reqBody) => {
    return User.findOne({email : reqBody.email}).then(result => {
        if(result == null){
            return false;
        }
        else{
            const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)

            if(isPasswordCorrect){
                return { access : auth.createAccessToken(result)}
            }
            else{
                return false;
            }
        }
    })
}

module.exports.setAdmin = (data) => {

    if (data.isAdmin) {
        let updateAdminField = {
            isAdmin : true
        };

        return User.findByIdAndUpdate(data.userId, updateAdminField).then((user, error) => {
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

module.exports.getUser = (data) => {

	return User.findById(data.userId).then(result => {

		result.password = "";

		return result;

	});

};

module.exports.createOrder = async(data, admin) => {
    if(admin.isAdmin === false) {
        let userOrder = await Product.findById(data.productId).then(product =>{
            if(product.isActive == true){
                product.updateOne({$set : {stock : product.stock - data.quantity}}).then(product => {})

                let newOrder = new Order({
                    userId: data.userId,
                    email: data.email,
                    productId: data.productId,
                    title: data.title,
                    purchasedOn: new Date(),
                    quantity: data.quantity,
                    totalAmount: product.price * data.quantity,
                    status: "New"
                })

                return newOrder.save().then((product, error) => {
                    if(error){
                        return false
                    }
                    else {
                        return true
                    }
                })
            }
            else {
                return false
            }
        })

        let isProductUpdated = await Product.findById(data.productId).then(product =>{
            if(product.isActive == true){
                product.purchaseOrder.push({email : data.email})

                return product.save().then((product, error) => {
                    if(error){
                        return false;
                    }
                    else{
                        return true;
                    }
                })
            }
            else {
                return false
            }
        })

        let isUserCartUpdated = await User.findById(data.userId).then(user =>{
            user.userCart.push({productId : data.productId})
 
            return user.save().then((user, error) => {
                 if(error){
                     return false;
                 }
                 else{
                     return true;
                 }
             })
         })

         if(
            userOrder &&
            isProductUpdated &&
            isUserCartUpdated
         ){
            return "Order Processed!"
         }
         else {
            return "Cannot process order!"
         }
    }
    else{
        return Promise.resolve("Order cannot be processed! Admin user detected!");
    }
}

module.exports.getAllOrders = (data) => {
    if(data.isAdmin) {
        return Order.find({}).then(result => {
            return result
        })
    }
    else{
        return Promise.resolve("Access denied. Please contact your administrator.");
    }
}

module.exports.getMyOrders = (data) => {
    return Order.find({userId : data.userId}).then(order => {
        if(data.isAdmin == false){
            return order
        }
        else {
            return "Access denied"
        }
    })
}
