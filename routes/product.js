const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const auth = require("../auth");
const { trusted } = require("mongoose");

router.post("/addProduct", auth.verify, (req, res) => {
    const data = {
        product : req.body,
        isAdmin : auth.decode(req.headers.authorization).isAdmin
    }

    productController.addProduct(data).then(resultFromController => res.send(resultFromController))
})

router.get("/", (req, res) => {
    productController.getActiveProducts().then(resultFromController => res.send(resultFromController))
})

router.get("/all", auth.verify, (req, res) => {
    const data = {
        isAdmin : auth.decode(req.headers.authorization).isAdmin
    }
    productController.getAllProducts(data).then(resultFromController => res.send(resultFromController))
})

router.get("/:productId", (req, res) => {
    productController.getProduct(req.params).then(resultFromController => res.send(resultFromController))
})

router.put("/:productId/update", auth.verify, (req, res) =>{
    const data = {
        product : req.body,
        productId : req.params.productId,
        isAdmin : auth.decode(req.headers.authorization).isAdmin    
    }
    productController.updateProduct(data).then(resultFromController => res.send(resultFromController))
});

router.put("/:productId/archive", auth.verify, (req, res) => {
    const data = {
        productId : req.params.productId,
        isAdmin : auth.decode(req.headers.authorization).isAdmin    
    }
	productController.archiveProduct(data).then(resultFromController => res.send(resultFromController));
});

router.put("/:productId/activate", auth.verify, (req, res) => {
    const data = {
        bookId : req.params.ProductId,
        isAdmin : auth.decode(req.headers.authorization).isAdmin    
    }
	productController.activateProduct(data).then(resultFromController => res.send(resultFromController));
});

router.delete("/:productId/delete", auth.verify, (req, res) => {
    const data = {
        productId : req.params.productId,
        isAdmin : auth.decode(req.headers.authorization).isAdmin    
    }
	productController.deleteProduct(data).then(resultFromController => res.send(resultFromController));
});


module.exports = router;