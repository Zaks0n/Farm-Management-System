import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import RequireAuth from './redux/features/auth/requireAuth';


import { Home, Product, Products, AboutPage, ContactPage, Cart, Login, Register, AddProduct, Checkout, PageNotFound } from "./pages"
import { ProductList } from './redux/features/products/productList';
import Layout from './components/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        
        <Route element={<RequireAuth/>}>
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/addproduct" element={<AddProduct />} />
        </Route>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);