const router = require('express').Router();
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const Farmer = require('../models/farmerModel');
const verifyJWT = require('../middlewares/faVerifyJWT');

router.use(verifyJWT);

router.post('/upload', fileUpload({ createParentPath: true }), async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({
                message: 'No file uploaded',
            });
        }
        Object.keys(req.files).forEach(async (key) => {
            const file = req.files[key];
            const fileName = `${Date.now()}_${file.name}`;
            const uploadPath = path.join(__dirname, `../uploads/${fileName}`);
            file.mv(uploadPath, async (err) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Something went wrong',
                        error: err.message,
                    });
                }
                const farmer = await Farmer.findById(req.id._id);
                console.log(farmer._id);
                if (farmer.image) {
                    const deletePath = path.join(__dirname, `../uploads/${farmer.image}`);
                    fs.unlink(deletePath, (err) => {
                        if (err) {
                            return res.status(500).json({
                                message: 'Something went wrong',
                                error: err.message,
                            });
                        }
                    });
                }
                const basePath = `${req.protocol}://${req.get('host')}/uploads/`;
                farmer.image = `${basePath}${fileName}`;
                await farmer.save();
                // await Farmer.findByIdAndUpdate(req.user.id, { image: fileName });
                return res.status(200).json({
                    message: 'File uploaded successfully',
                    data: {
                        name: file.name,
                        mimetype: file.mimetype,
                        size: file.size,
                    }
                });
            });
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
});


module.exports = router;