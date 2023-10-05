const express = require('express');
const OrderController = require('../controllers/ordersController');
const verifyJWT = require('../middlewares/cusVerifyJWT');

const orderRouter = express.Router();

orderRouter.get('/orders', (request, response) => {
  OrderController.getOrders(request, response);
});

orderRouter.get('/orders/:orderId', (request, response) => {
  OrderController.getOrder(request, response);
});

orderRouter.post('/orders', verifyJWT, (request, response) => {
  OrderController.createOrder(request, response);
});

orderRouter.put('/orders/:orderId', verifyJWT, (request, response) => {
  OrderController.updateOrder(request, response);
});

orderRouter.delete('/orders/:orderId', verifyJWT, (request, response) => {
  OrderController.deleteOrder(request, response);
});

orderRouter.get('/orders/:orderId/cart', (request, response) => {
  OrderController.getOrderedCart(request, response);
});

module.exports = orderRouter;
