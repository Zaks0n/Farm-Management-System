const { ObjectId } = require('mongodb');
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

class CategoryController {
  static async getCategories (request, response) {
    try {
      const categories = await Category.find({});
      return response.status(200).json(categories);
    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async getCategory (request, response) {
    try {
      const categoryId = request.params.categoryId;
      const category = await Category.findOne({ _id: ObjectId(categoryId) });
  
      if (!category) {
        return response.status(404).json({ error: 'Category Not Found' });
      }

      return response.status(200).json(category);
    } catch (error) {
      return response.status(500).json({
        message: 'Something Not Found',
        error: error.message
      });
    }
  }

  static async createCategory (request, response) {
    try {
      const { categoryName } = request.body;
      let category = await Category.findOne({ categoryName });
  
      if (!categoryName) {
        return response.status(400).json({
          message: 'Requirement fields not found',
          fileds: { categoryName: categoryName ? 'Valid' : 'Required' }
        });
      }

      if (category) {
        return response.status(404).json({ error: 'Category already exists' });
      }
      
      category = await Category.create({
        categoryName
      });

      category.save();

      return response.status(201).json({
        error: 'Category created Successfully',
        data: category
      });

    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async updateCategory (request, response) {
    try {
      const { categoryName } = request.body;
      const categoryId = request.params.categoryId;
      const category = await Category.findOne({ _id: ObjectId(categoryId) });
  
      if (!category) {
        return response.status(404).json({ error: 'Category Not Found' });
      }

      const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
        categoryName,
        updatedAt: Date.now()
      }, { new: true });

      return response.status(200).json({
        message: 'Category updated successfully',
        data: updatedCategory
      });

    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async deleteCategory (request, response) {
    try {
      const categoryId = request.params.categoryId;
      const category = await Category.findOne({ _id: ObjectId(categoryId) });
  
      if (!category) {
        return response.status(404).json({ message: 'Category Not Found' });
      }

      await Category.findByIdAndDelete(categoryId);

      return response.status(200).json({
        message: 'Category deleted successfully',
        data: {}
      });

    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async getProductsFromCategory (request, response) {
    try {
      const categoryId = request.params.categoryId;
      const category = await Category.findOne({ _id: ObjectId(categoryId) });
  
      if (!category) {
        return response.status(404).json({ error: 'Category Not Found' });
      }

      const categoryProducts = await Category.findById(categoryId).populate('products');

      return response.status(200).json({
        data: categoryProducts.products
      });

    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async addProductToCategory (request, response) {
    try {
      const categoryId = request.params.categoryId;
      const productId = request.params.productId;
      let category = await Category.findOne({ _id: ObjectId(categoryId) });
      const product = await Product.findOne({ _id: ObjectId(productId) });
  
      if (!category) {
        return response.status(404).json({ error: 'Category Not Found' });
      } else if (!product) {
        return response.status(404).json({ error: 'Product Not Found' });
      }

      // Check if the product already exists on the category.
      if (category.products.indexOf(product._id) !== -1) {
        return response.status(400).json({
          message: 'Product already exists on the category'
        });
      }

      category = await Category.findByIdAndUpdate(categoryId, { $push: {
        products: [ ObjectId(productId) ]
      },
        $set: {
          updatedAt: Date.now()
        }
      }, { new: true });

      return response.status(200).json({
        message: 'Product added to category successfully',
        data: category
      });

    } catch (error) {
      return response.status(500).json({
        message: 'Something Went Wrong',
        error: error.message
      });
    }
  }

  static async removeProductFromCategory (request, response) {
    try {
      const categoryId = request.params.categoryId;
      const productId = request.params.productId;
      const category = await Category.findOne({ _id: ObjectId(categoryId) });
      const product = await Product.findOne({ _id: ObjectId(productId) });
  
      if (!category) {
        return response.status(404).json({ error: 'Category Not Found' });
      } else if (!product) {
        return response.status(404).json({ error: 'Product Not Found' });
      }

      await Category.findByIdAndUpdate(categoryId, { $pull: {
        products: ObjectId(productId)
      },
        $set: {
          updatedAt: Date.now()
        }
      });

      return response.status(200).json({
        message: 'Product removed successfully from category',
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

module.exports = CategoryController;
