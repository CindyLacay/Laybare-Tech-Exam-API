const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const auth = require("../auth");
const { trusted } = require("mongoose");

router.post("/addBook", auth.verify, (req, res) => {
    const data = {
        product : req.body,
        isAdmin : auth.decode(req.headers.authorization).isAdmin
    }

    productController.addBook(data).then(resultFromController => res.send(resultFromController))
})

router.get("/", (req, res) => {
    productController.getActiveBooks().then(resultFromController => res.send(resultFromController))
})

router.get("/all", auth.verify, (req, res) => {
    const data = {
        isAdmin : auth.decode(req.headers.authorization).isAdmin
    }
    productController.getAllBooks(data).then(resultFromController => res.send(resultFromController))
})

router.get("/:bookId", (req, res) => {
    productController.getBook(req.params).then(resultFromController => res.send(resultFromController))
})

router.put("/:bookId/update", auth.verify, (req, res) =>{
    const data = {
        product : req.body,
        bookId : req.params.bookId,
        isAdmin : auth.decode(req.headers.authorization).isAdmin    
    }
    productController.updateBook(data).then(resultFromController => res.send(resultFromController))
});

router.put("/:bookId/archive", auth.verify, (req, res) => {
    const data = {
        bookId : req.params.bookId,
        isAdmin : auth.decode(req.headers.authorization).isAdmin    
    }
	productController.archiveBook(data).then(resultFromController => res.send(resultFromController));
});

router.put("/:bookId/activate", auth.verify, (req, res) => {
    const data = {
        bookId : req.params.bookId,
        isAdmin : auth.decode(req.headers.authorization).isAdmin    
    }
	productController.activateBook(data).then(resultFromController => res.send(resultFromController));
});

router.delete("/:bookId/delete", auth.verify, (req, res) => {
    const data = {
        bookId : req.params.bookId,
        isAdmin : auth.decode(req.headers.authorization).isAdmin    
    }
	productController.deleteBook(data).then(resultFromController => res.send(resultFromController));
});


module.exports = router;