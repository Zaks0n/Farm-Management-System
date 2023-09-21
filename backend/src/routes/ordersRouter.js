const express = require('express');
const OrderController = require('../controllers/ordersController');

const orderRouter = express.Router();

orderRouter.get('/orders', (request, response) => {
  OrderController.getOrders(request, response);
});

orderRouter.get('/orders/:orderId', (request, response) => {
  OrderController.getOrder(request, response);
});

orderRouter.post('/orders', (request, response) => {
  OrderController.createOrder(request, response);
});

orderRouter.put('/orders/:orderId', (request, response) => {
  OrderController.updateOrder(request, response);
});

orderRouter.delete('/orders/:orderId', (request, response) => {
  OrderController.deleteOrder(request, response);
});

orderRouter.get('/orders/:orderId/cart', (request, response) => {
  OrderController.getOrderedCart(request, response);
});

module.exports = orderRouter;
