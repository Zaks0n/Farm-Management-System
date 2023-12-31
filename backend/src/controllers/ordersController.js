const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

class OrderController {
  static async getOrders (request, response) {
    try {
      const orders = await Order.find({});
      return response.status(200).json({
        message: 'All orders',
        data: orders
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async getOrder (request, response) {
    try {
      const orderId = request.params.orderId;
      const order = await Order.findById(orderId);
  
      if (!order) {
        return response.status(404).json({ error: 'Order Not Found' });
      }

      return response.status(200).json({
        message: 'Order Found',
        data: order
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async createOrder (request, response) {
    try {
      const { orderStatus, customerId, cartId } = request.body;
      let order = await Order.findOne({ customerId });

      if (order) {
        return order.status(400).json({
          message: 'The customer already ordered'
        });
      }

      if (!orderStatus || !customerId || !cartId) {
        return response.status(400).json({
          message: 'Requirement fields not found',
          fields: {
            orderStatus: orderStatus ? 'Valid' : 'Required',
            customerId: customerId ? 'Valid' : 'Required',
            cartId: cartId ? 'Valid' : 'Required'
          }
        });
      }

      order = await Order.create({
        orderStatus,
        customerId,
        cartId
      });

      order.save();

      return response.status(201).json({
        message: 'Order Created Successfully',
        data: order
      });

    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async updateOrder (request, response) {
    try {
      const { orderStatus, customerId, cartId} = request.body;
      const orderId = request.params.orderId;
      const order = await Order.findById(orderId);

      if (!order) {
        return response.status(404).json({ error: 'Order Not Found' });
      }

      const updatedOrder = await Order.findByIdAndUpdate(orderId, {
        orderStatus,
        customerId,
        cartId,
        updatedAt: Date.now()
      }, { new: true });

      return response.status(200).json({
        message: 'Order Updated Successfully',
        data: updatedOrder
      });

    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async deleteOrder (request, response) {
    try {
      const orderId = request.params.orderId;
      const order = await Order.findById(orderId);

      if (!order) {
        return response.status(404).json({ error: 'Order Not Found' });
      }

      await Order.findByIdAndDelete(orderId);
      return response.status(200).json({
        message: 'Order Deleted Successfully',
        data: {}
      });

    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async getOrderedCart (request, response) {
    try {
      const orderId = request.params.orderId;
      const order = await Order.findById(orderId);
  
      if (!order) {
        return response.status(404).json({ error: 'Order Not Found' });
      }

      const cartOrder = await Order.findById(orderId).populate('cartId');
      const cart = await Cart.findById(cartOrder.cartId).populate('products');

      return response.status(200).json({ data: cart });
    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }
}

module.exports = OrderController;
