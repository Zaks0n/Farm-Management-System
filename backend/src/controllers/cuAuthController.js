const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const Customers = require('../models/customerModel');
const { comparePassword } = require('../utils/passwordHelber');
require('dotenv').config();

const ACCESS_TOKEN_SECRET = 'access-token-secret-example';
const REFRESH_TOKEN_SECRET = 'refresh-token-secret-example';

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
        // check if customer exists
        const customer = await Customers.find({ email: email });
        if (!customer[0]) {
            return res.status(404).json({
                message: 'customer not found',
            });
        }
        // check if password is correct
        const isPasswordCorrect = await comparePassword(password, customer[0].password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }
        // generate token
        const accessToken = jwt.sign(
            { id: customer[0]._id },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { id: customer[0]._id },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // save refreshToken in db
        await Customers.findByIdAndUpdate(customer[0]._id, { token: refreshToken });
        // send response
        res.cookie('farmtoken', refreshToken, { httpOnly: true, maxAge: 86400000, sameSite: 'none', secure: true });
        res.status(200).json({
            message: 'Login successful',
            accessToken,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

const handleRefreshToken = async (req, res) => {
    try {
        const cookie = req.cookies;
        if (!cookie?.farmtoken) {
            return res.sendStatus(401)
        }
        const refToken = cookie.farmtoken;
        jwt.verify(
            refToken,
            REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res.status(403).json({
                        message: 'Forbidden',
                    });
                }
                const customer = await Customers.findOne({ _id: decoded.id });
                if (!customer) {
                    return res.status(401).json({
                        message: 'Unauthorized',
                    });
                }
                const accessToken = jwt.sign(
                    { id: customer._id },
                    ACCESS_TOKEN_SECRET,
                    { expiresIn: '1h' }
                );
                return res.status(200).json({
                    message: 'Login successful',
                    accessToken,
                });
            });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

const handleLogout = async (req, res) => {
    try {
        const cookie = req.cookies;
        if (!cookie.farmtoken) {
            return res.sendStatus(204);
        }
        const refToken = cookie.farmtoken;
        const customer = await Customers.findOne({ token: refToken });
        if (!customer) {
            res.clearCookie('farmtoken', { httpOnly: true, maxAge: 86400000, secure: true, sameSite: 'none' });
            return res.sendStatus(204);
        }
        const customerId = customer._id;
        await Customers.findByIdAndUpdate(customerId, { token: '' });
        res.clearCookie('farmtoken', { httpOnly: true, secure: true, sameSite: 'none' });
        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

const handleForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: 'Email is required',
            });
        }
        const farmer = await Customers.findOne({ email: email });
        if (!farmer) {
            return res.status(404).json({
                message: 'Email not found',
            });
        }
        const resetToken = jwt.sign(
            { id: farmer._id },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        await Customers.findByIdAndUpdate(farmer._id, { resetToken });
        const resetUrl = `http://localhost:3000/api/v1/farmer/auth/reset-password/${resetToken}`;
        const message = `Click on the link to reset your password:\n\n ${resetUrl}
        \n\nthis email valid for 1 hour.\n\nIf you didn't request this, please ignore this email.`;
        await sendEmail({
            email: farmer.email,
            subject: 'Reset Password',
            message,
        });
        res.status(200).json({
            message: `Reset link sent to email: ${farmer.email}`,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;
        const { resetToken } = req.params;
        if (!password || !confirmPassword) {
            return res.status(400).json({
                message: 'All feilds are required',
                feilds: {
                    password: password ? 'Valid' : 'Required',
                    confirmPassword: confirmPassword ? 'Valid' : 'Required',
                },
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Password and confirm password must be same',
            });
        }
        jwt.verify(
            resetToken,
            ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res.status(403).json({
                        message: 'Forbidden',
                    });
                }
                const farmer = await Customers.findOne({ _id: decoded.id });
                if (!farmer) {
                    return res.status(401).json({
                        message: 'Unauthorized',
                    });
                }
                const hashedPassword = await hashPassword(password);
                await Customers.findByIdAndUpdate(farmer._id, { password: hashedPassword, resetToken: '' });
                return res.status(200).json({
                    message: 'Password reset successful',
                });
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
    handleRefreshToken,
    handleLogout,
    handleForgotPassword,
    resetPassword,
};