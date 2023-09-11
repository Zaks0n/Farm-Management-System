const express = require('express');
const dotenv = require('dotenv');
const dbConn = require('./src/db/dbConn');
const farmerRouter = require('./src/routes/farmerRouter');
const indexRouter = require('./src/routes/index');
const loginRouter = require('./src/routes/loginRouter');

const port = process.env.PORT || 3000;

dotenv.config('.env');

dbConn();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api/v1', indexRouter);
app.use('/api/v1/farmers', farmerRouter);
app.use('/api/v1/login', loginRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
