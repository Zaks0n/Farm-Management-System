const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: 'Forbidden',
                });
            }
            req.userId = decoded.id;
            next();
        });
}

module.exports = verifyJWT;