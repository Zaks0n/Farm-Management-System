const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

class CartController {
  static async getCarts (request, response) {
    try {
      const carts = await Cart.find({});
      return response.status(200).json({
        message: 'All carts',
        data: carts
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async getCart (request, response) {
    try {
      const cartId = request.params.cartId;
      const cart = await Cart.findById(cartId);

      if (!cart) {
        return response.status(404).json({
          error: 'Cart Not Found'
        });
      }

      return response.status(200).json({
        message: 'Cart Found',
        data: cart
      });

    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async createCart (request, response) {
    try {
      const { customerId } = request.body;

      if (!customerId) {
        return response.status(400).json({
          message: 'Empty Required fileds',
          fileds: {
            customerId: customerId ? 'Valid' : 'Required',
          }
        })
      }

      let cart = await Cart.findOne({ customerId });

      if (cart) {
        return response.status(400).json({ error: 'Cart Already Exists' });
      }

      cart = await Cart.create({
        customerId,
      });

      cart.save();

      return response.status(200).json({
        message: 'Cart Created Successfully',
        data: cart
      });

    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async updateCart (request, response) {
    try {
      const { totalPrice, customerId, products } = request.body;
      const cartId = request.params.cartId;
      const cart = await Cart.findById(cartId);

      if (!cart) {
        return response.status(404).json({ error: 'Cart Not Found' });
      }

      const updatedCart = await Cart.findByIdAndUpdate(cartId, {
        totalPrice,
        customerId,
        products
      }, { new: true });

      return response.status(200).json({
        message: 'Cart updated Successfully',
        data: updatedCart
      });

    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async deleteCart (request, response) {
    try {
      const cartId = request.params.cartId;
      const cart = await Cart.findById(cartId);

      if (!cart) {
        return response.status(404).json({ error: 'Cart Not Found' });
      }

      await Cart.findByIdAndDelete(cartId);

      return response.status(200).json({
        message: 'Cart Deleted Successfully'
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async getCartProducts (request, response) {
    try {
      const cartId = request.params.cartId;
      const cart = await Cart.findById(cartId);

      if (!cart) {
        return response.status(404).json({ error: 'Cart Not Found' });
      }

      const products = await Cart.findById(cartId).populate('products');

      return response.status(200).json(products.products);

    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async addProductToCart(request, response) {
    try {
      const cartId = request.params.cartId;
      const productId = request.params.productId;
      let cart = await Cart.findById(cartId);
      const product = await Product.findById(productId);

      if (!cart) {
        return response.status(404).json({
          error: 'Cart Not Found'
        });
      } else if (!product) {
        return response.status(404).json({
          error: 'Product Not Found'
        });
      }

      cart = await Cart.findByIdAndUpdate(cartId, { $push: {
        products: [ productId ]
      },
        $set: {
          updatedAt: Date.now(),
          totalPrice: cart.totalPrice + product.price
      }
      }, { new: true });

      return response.status(200).json({
        message: 'Added to cart',
        data: cart
      });

    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async deleteProductFromCart (request, response) {
    try {
      const cartId = request.params.cartId;
      const productId = request.params.productId;
      let cart = await Cart.findById(cartId);
      const product = await Product.findById(productId);

      if (!cart) {
        return response.status(404).json({
          error: 'Cart Not Found'
        });
      } else if (!product) {
        return response.status(404).json({
          error: 'Product Not Found'
        });
      }

      cart = await Cart.findByIdAndUpdate(cartId, { $pull: {
        products: productId
      },
        $set: {
          updatedAt: Date.now(),
          totalPrice: cart.totalPrice - product.price
        }
      }, { new: true });

      return response.status(200).json({
        message: 'Item deleted from cart',
        data: {}
      });

    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }
}

module.exports = CartController;
