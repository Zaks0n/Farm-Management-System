const Product = require('../models/productModel');

class ProductController {
  static async getProducts (request, response) {
    try {
      const products = await Product.find({});
      return response.status(200).json({
        message: 'All products',
        data: products
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async getProduct (request, response) {
    try {
      const productId = request.params.id;
      const product = await Product.findById(productId);

      if (!product) {
        return response.status(404).json({ error: 'Product Not Found' });
      }
  
      return response.status(200).json(product);

    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async addProduct (request, response) {
    try {
      const {productName, price, farmerId, description} = request.body;
      if (!productName || !price || !farmerId || !description) {
        return response.status(400).json({
          error: {
            productName: productName ? 'Valid' : 'Required',
            price: price ? 'Valid' : 'Required',
            farmerId: farmerId ? 'Valid' : 'Required',
            description: description ? 'Valid' : 'Required'
          },
        });
      }

      const product = await Product.create({
        productName,
        price,
        farmerId: ObjectId(farmerId),
        description
      });

      product.save();

      return response.status(201).json({
        message: 'Product Created Successfully',
        data: product
      });

    } catch (error) {
      return response.status(500).json({
        message: 'Something went wrong',
        error: error.message
      });
    }
  }

  static async updateProduct (request, response) {
    try {
      const productId = request.params.id;
      const {productName, price, description} = request.body;
      const product = await Product.findById(productId);

      if (!product) {
        return response.status(404).json({ error: 'Product Not Found' });
      }

      if (!productName || !price || !description) {
        return response.status(400).json({
          productName: productName ? 'Valid' : 'Required',
          price: price ? 'Valid' : 'Required',
          description: description ? 'Valid' : 'Required'
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(productId, {
        productName,
        price,
        description,
        updatedAt: Date.now()
      }, { new: true });

      return response.status(200).json({
        message: 'Product Updated Successfully',
        data: updatedProduct
      });

    } catch (error) {
      return response.status(500).json({
        message: 'Something went wrong',
        error: error.message
      });
    }
  }

  static async deleteProduct (request, response) {
    try {
      const productId = request.params.id;
      const product = await Product.findById(productId);
  
      if (!product) {
        return response.status(404).json({
          error: 'Product Not Found'
        });
      }

      await Product.findByIdAndDelete(productId);

      return response.status(200).json({
        message: 'Product deleted successfully',
        data: {}
      });

    } catch (error) {
      return response.status(500).json({
        message: 'Something went wrong',
        error: error.message
      });
    }
  }
}

module.exports = ProductController;
