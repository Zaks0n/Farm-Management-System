const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Farmers = require('../models/farmerModel');
const { comparePassword } = require('../utils/passwordHelber');

dotenv.config();


const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'All feilds are required',
                feilds: {
                    email: email ? 'Valid' : 'Required',
                    password: password ? 'Valid' : 'Required',
                },
            });
        }
        // check if farmer exists
        const farmer = await Farmers.find({ email: email });
        if (!farmer[0]) {
            return res.status(404).json({
                message: 'Farmer not found',
            });
        }
        // check if password is correct
        const isPasswordCorrect = await comparePassword(password, farmer[0].password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }
        // generate token
        const accessToken = jwt.sign(
            { id: farmer[0]._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '2m' }
        );
        const refreshToken = jwt.sign(
            { id: farmer[0]._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // save refreshToken in db
        await Farmers.findByIdAndUpdate(farmer[0]._id, { token: refreshToken });
        // send response
        res.cookie('farmtoken', refreshToken, { httpOnly: true, maxAge: 86400000 });
        res.status(200).json({
            message: 'Login successful',
            accessToken,
            data: farmer,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

module.exports = {
    handleLogin,
};