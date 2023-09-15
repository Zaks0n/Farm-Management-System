const Customers = require('../models/customerModel');
const { hashPassword } = require('../utils/passwordHelber');


const createCustomer = async (req, res) => {
    try {
        const { fullName, address, phoneNo, email, password, image } = req.body;
        if (!fullName || !address || !phoneNo || !email || !password) {
            return res.status(400).json({
                message: 'Empty required feilds',
                feilds: {
                    fullName: fullName ? 'Valid' : 'Required',
                    address: address ? 'Valid' : 'Required',
                    phoneNo: phoneNo ? 'Valid' : 'Required',
                    email: email ? 'Valid' : 'Required',
                    password: password ? 'Valid' : 'Required',
                },
            });
        }
        const doublecate = await Customers.findOne({ email: email, phoneNo: phoneNo });
        if (doublecate) {
            return res.status(409).json({
                message: 'Customer already exists',
            });
        }
        const hashedPassword = await hashPassword(password);
        const customer = await Customers.create({
            fullName,
            address,
            phoneNo,
            email,
            password: hashedPassword,
            image,
        });
        res.status(201).json({
            message: 'Customer created successfully',
            data: customer,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

const getCustomers = async (req, res) => {
    try {
        const customers = await Customers.find();
        res.status(200).json({
            message: 'All customers',
            data: customers,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

const getCustomer = async (req, res) => {
    try {
        const { email } = req.params;
        const customer = await Customers.find({ email: email });
        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found',
            });
        }
        res.status(200).json({
            message: 'Customer',
            data: customer,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

const updateCustomer = async (req, res) => {
    try {
        const customer = await Customers.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found',
            });
        }
        const { fullName, address, phoneNo, email, password, image } = req.body;
        if (!fullName || !address || !phoneNo || !email || !password) {
            return res.status(400).json({
                message: 'Empty required required feild\\s',
                feilds: {
                    fullName: fullName ? 'Valid' : 'Required',
                    address: address ? 'Valid' : 'Required',
                    phoneNo: phoneNo ? 'Valid' : 'Required',
                    email: email ? 'Valid' : 'Required',
                    password: password ? 'Valid' : 'Required',
                },
            });
        }
        const hashedPassword = await hashPassword(password);
        const updatedCustomer = await Customers.findByIdAndUpdate(req.params.id, {
            fullName,
            address,
            phoneNo,
            email,
            password: hashedPassword,
            image,
        });
        res.status(200).json({
            message: 'Customer updated successfully',
            data: updatedCustomer,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customers.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found',
            });
        }
        await Customers.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Customer deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

module.exports = {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
}