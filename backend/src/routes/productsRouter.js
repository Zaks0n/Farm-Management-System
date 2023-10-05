/* eslint-disable jest/require-hook */
const express = require('express');
const fileUpload = require('express-fileupload');
const ProductController = require('../controllers/productsController');
const verifyJWT = require('../middlewares/verifyJWT');

const productRouter = express.Router();

productRouter.get('/products', ProductController.getProducts);
productRouter.get('/products/:id', ProductController.getProduct);
productRouter.post('/products', verifyJWT, ProductController.addProduct);
productRouter.put('/products/:id', verifyJWT, ProductController.updateProduct);
productRouter.delete('/products/:id', verifyJWT, ProductController.deleteProduct);
productRouter.put('/products/:id/images', verifyJWT, fileUpload({ createParentPath: true }), ProductController.uploadProductImage);
// productRouter.get('/public/ProdUploads/:filename', ProductController.getProductImage);

module.exports = productRouter;
