const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../auth");

router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
})

router.post("/checkEmail", (req, res) => {
	userController.checkDuplicateEmail(req.body).then(resultFromController => res.send(resultFromController));
});

router.post("/login", (req, res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
})

router.put("/:userId/setAsAdmin", auth.verify, (req, res) => {

    const data = {
        userId : req.params.userId,
        isAdmin : auth.decode(req.headers.authorization).isAdmin
    }

	userController.setAdmin(data).then(resultFromController => res.send(resultFromController));
})

router.get("/details", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);

	userController.getUser({userId : userData.id}).then(resultFromController => res.send(resultFromController));

});

router.post("/checkout", auth.verify, (req, res) => {

    const data = {
        productId: req.body.productId,
        title : req.body.title,
        quantity : req.body.quantity,
        userId : auth.decode(req.headers.authorization).id,
        email: auth.decode(req.headers.authorization).email
    }

    const admin = {
        isAdmin : auth.decode(req.headers.authorization).isAdmin
    }

	userController.createOrder(data, admin).then(resultFromController => res.send(resultFromController));
})

router.get("/orders", auth.verify, (req, res) => {

    const data = {
        isAdmin : auth.decode(req.headers.authorization).isAdmin
    }

	userController.getAllOrders(data).then(resultFromController => res.send(resultFromController));
})

router.get("/myOrders", auth.verify, (req, res) => {

    const data = {
        userId : auth.decode(req.headers.authorization).id,
        isAdmin : auth.decode(req.headers.authorization).isAdmin
    }

	userController.getMyOrders(data).then(resultFromController => res.send(resultFromController));
})

module.exports = router;