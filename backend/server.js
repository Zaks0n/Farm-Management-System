/* eslint-disable indent */
/* eslint-disable jest/require-hook */
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const dbConn = require('./src/db/dbConn');
const farmerRouter = require('./src/routes/farmerRouter');
const customerRouter = require('./src/routes/customerRouter');
const indexRouter = require('./src/routes/index');
const faAuthRouter = require('./src/routes/faAuthRouter');
const cuAuthRouter = require('./src/routes/cuAuthRouter');
const uploadImgRouter = require('./src/routes/imageUploadRouter');
const productsRouter = require('./src/routes/productsRouter');
const cartsRouter = require('./src/routes/cartsRouter');
const categoriesRouter = require('./src/routes/categoriesRouter');
const ordersRouter = require('./src/routes/ordersRouter2');
const prodImageRouter = require('./src/routes/prodImgUploadRouter');

const port = process.env.PORT || 8000;

dotenv.config('.env');

dbConn();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
app.use('/public/ProdUploads', express.static(path.join(__dirname, '/public/ProdUploads')));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/', indexRouter);
app.use('/api/v1/farmer/auth', faAuthRouter);
app.use('/api/v1/customer/auth', cuAuthRouter);
app.use('/api/v1/farmers', farmerRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/faimage', uploadImgRouter);
app.use('/api/v1/prodImage', prodImageRouter);
app.use('/api/v1', productsRouter);
app.use('/api/v1', cartsRouter);
app.use('/api/v1', categoriesRouter);
app.use('/api/v1', ordersRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
