const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Customer = require('../models/customerModel');

dotenv.config();

const ACCESS_TOKEN_SECRET = 'access-token-secret-example';

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    // console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: 'Forbidden',
                });
            }
            req.id = await Customer.findById(decoded.id);
            next();
        });
}

module.exports = verifyJWT;