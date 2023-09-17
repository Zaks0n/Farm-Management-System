const Farmers = require('../models/farmerModel');
const { hashPassword } = require('../utils/passwordHelber');


const createFarmer = async (req, res) => {
    try {
        const { fullName, address, phoneNo, email, password, image, farmName, farmSize, farmLocation } = req.body;
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
        const doublecate = await Farmers.findOne({ email: email, phoneNo: phoneNo });
        if (doublecate) {
            return res.status(409).json({
                message: 'Farmer already exists',
            });
        }
        const hashedPassword = await hashPassword(password);
        const farmer = await Farmers.create({
            fullName,
            address,
            phoneNo,
            email,
            password: hashedPassword,
            image,
            farmName,
            farmSize,
            farmLocation,
        });
        res.status(201).json({
            message: 'Farmer created successfully',
            data: farmer,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

const getFarmers = async (req, res) => {
    try {
        const farmers = await Farmers.find();
        res.status(200).json({
            message: 'All farmers',
            data: farmers,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

const getFarmer = async (req, res) => {
    try {
        const farmer = await Farmers.find({ email: req.params.email });
        if (!farmer) {
            return res.status(404).json({
                message: 'Farmer not found',
            });
        }
        res.status(200).json({
            message: 'Farmer',
            data: farmer,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

const updateFarmer = async (req, res) => {
    try {
        const farmer = await Farmers.findById(req.params.id);
        if (!farmer) {
            return res.status(404).json({
                message: 'Farmer not found',
            });
        }
        const { fullName, address, phoneNo, email, password, image, farmName, farmSize, farmLocation } = req.body;
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
        const updatedFarmer = await Farmers.findByIdAndUpdate(req.params.id, {
            fullName,
            address,
            phoneNo,
            email,
            password: hashedPassword,
            image,
            farmName,
            farmSize,
            farmLocation,
        }, { new: true });
        res.status(200).json({
            message: 'Farmer updated successfully',
            data: updatedFarmer,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

const deleteFarmer = async (req, res) => {
    try {
        const farmer = await Farmers.findById(req.params.id);
        if (!farmer) {
            return res.status(404).json({
                message: 'Farmer not found',
            });
        }
        await Farmers.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Farmer deleted successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

module.exports = {
    createFarmer,
    getFarmers,
    getFarmer,
    updateFarmer,
    deleteFarmer,
}
