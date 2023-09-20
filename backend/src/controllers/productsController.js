const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

class ProductController {
  static async getProducts(request, response) {
    try {
      let filter = {};
      if (request.query.category) {
        filter = { categoryId: request.query.category };
      }
      const products = await Product.find(filter).populate('categoryId', 'categoryName -_id').exec();
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

  static async getProduct(request, response) {
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

  // static async getProductsByCategory(request, response) {
  //   try {
  //     let category = request.query.category;
  //     if (category) {
  //       category = category.split(',');
  //     }
  //     const products = await Product.find({ categoryId: { $in: category } }).populate('categoryId', 'categoryName -_id').exec();
  //     return response.status(200).json({
  //       message: 'All products',
  //       data: products
  //     });
  //   } catch (error) {
  //     return response.status(500).json({
  //       message: 'Something Went Wrong',
  //       error: error.message
  //     });
  //   }
  // }

  static async addProduct(request, response) {
    try {
      const { productName, price, description, stock, categoryId } = request.body;
      if (!productName || !price || !description || !stock || !categoryId) {
        return response.status(400).json({
          message: 'All fields are required',
          error: {
            productName: productName ? 'Valid' : 'Required',
            price: price ? 'Valid' : 'Required',
            farmerId: farmerId ? 'Valid' : 'Required',
            description: description ? 'Valid' : 'Required'
          },
        });
      }
      const category = await Category.findById(categoryId);
      if (!category) {
        return response.status(404).json({
          message: 'Category Not Found',
          error: 'Category Not Found'
        });
      }
      const { farmerId } = request.id;
      const product = await Product.create({
        productName,
        price,
        farmerId,
        description,
        stock,
        categoryId
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

  static async updateProduct(request, response) {
    try {
      const productId = request.params.id;
      const { productName, price, description } = request.body;
      const product = await Product.findById(productId);

      if (!product) {
        return response.status(404).json({ error: 'Product Not Found' });
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

  static async deleteProduct(request, response) {
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
