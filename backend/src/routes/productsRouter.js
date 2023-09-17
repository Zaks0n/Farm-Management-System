const express = require('express');
const  ProductController = require('../controllers/productsController');

const productRouter = express.Router();

productRouter.get('/products', (request, response) => {
  ProductController.getProducts(request, response);
})

productRouter.get('/products/:id', (request, response) => {
  ProductController.getProduct(request, response);
});

productRouter.post('/products', (request, response) => {
  ProductController.addProduct(request, response);
});

productRouter.put('/products/:id', (request, response) => {
  ProductController.updateProduct(request, response);
});

productRouter.delete('/products/:id', (request, response) => {
  ProductController.deleteProduct(request, response);
});

module.exports = productRouter;
