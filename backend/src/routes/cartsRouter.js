const express = require('express');
const CartController = require('../controllers/cartsController');
const verifyJWT = require('../middlewares/cusVerifyJWT');

const cartRouter = express.Router();

cartRouter.get('/carts', (request, response) => {
  CartController.getCarts(request, response);
});

cartRouter.get('/carts/:cartId', (request, response) => {
  CartController.getCart(request, response);
});

cartRouter.get('/carts/:cartId/products', (request, response) => {
  CartController.getCartProducts(request, response);
});

cartRouter.post('/carts', verifyJWT, (request, response) => {
  CartController.createCart(request, response);
});

cartRouter.post('/carts/:cartId/products/:productId', verifyJWT, (request, response) => {
  CartController.addProductToCart(request, response);
});

cartRouter.put('/carts/:cartId', verifyJWT, (request, response) => {
  CartController.updateCart(request, response);
});

cartRouter.delete('/carts/:cartId', verifyJWT, (request, response) => {
  CartController.deleteCart(request, response);
});

cartRouter.delete('/carts/:cartId/products/:productId', verifyJWT, (request, response) => {
  CartController.deleteProductFromCart(request, response);
});

module.exports = cartRouter;
