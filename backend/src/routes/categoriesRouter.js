const express = require('express');
const CategoryController = require('../controllers/categoriesController');

const categoryRouter = express.Router();

categoryRouter.get('/categories', (request, response) => {
  CategoryController.getCategories(request, response);
});

categoryRouter.get('/categories/:categoryId', (request, response) => {
  CategoryController.getCategory(request, response);
});

categoryRouter.post('/categories', (request, response) => {
  CategoryController.createCategory(request, response);
});

categoryRouter.put('/categories/:categoryId', (request, response) => {
  CategoryController.updateCategory(request, response);
});

categoryRouter.delete('/categories/:categoryId', (request, response) => {
  CategoryController.deleteCategory(request, response);
});

categoryRouter.get('/categories/:categoryId/products', (request, response) => {
  CategoryController.getProductsFromCategory(request, response);
});

categoryRouter.post('/categories/:categoryId/products/:productId', (request, response) => {
  CategoryController.addProductToCategory(request, response);
});

categoryRouter.delete('/categories/:categoryId/products/:productId', (request, response) => {
  CategoryController.removeProductFromCategory(request, response);
});

module.exports = categoryRouter;
