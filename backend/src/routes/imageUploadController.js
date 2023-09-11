const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Farmers = require('../models/farmerModel');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/uploads/user_images');
    },
    filename: (req, file, cb) => {
        cb(null, `farmer_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {
    try {
        const { file } = req;
        if (!file) {
            res.status(400).json({
                message: 'Please upload an image',
            });
        }
        Farmers.findByIdAndUpdate(req.params.id, { image: file.filename })
        .then(rs => res.json(rs))
        .catch(err => res.status(400).json('Error: ' + err));
        res.status(201).json({
            message: 'Image uploaded successfully',
            data: file,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
});

router.get('/images/:image', (req, res) => {
    try {
        const { image } = req.params;
        Farmers.findById(req.params.id)
        .then(rs => res.json(rs))
        .catch(err => res.status(400).json('Error: ' + err));
        const imageLocation = path.join(__dirname, `../uploads/user_images/${image}`);
        const imageAsBase64 = fs.readFileSync(imageLocation, 'base64');
        res.status(200).json({
            message: 'Image retrived successfully',
            data: imageAsBase64,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
});

        // const imageLocation = path.join(__dirname, `../uploads/user_images/${image}`);
        // const imageAsBase64 = fs.readFileSync(imageLocation, 'base64');
        // res.status(200).json({
        //     message: 'Image retrived successfully',
        //     data: imageAsBase64,
        // });
        



// const uploadImage = (image, req, res) => {
//     return new Promise((resolve, reject) => {
//         const upload = multer({ storage }).single(image);
//         upload(req, res, (err) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(req.file);
//         });
//     });
// }

// const deleteImage = (image) => {
//     return new Promise((resolve, reject) => {
//         fs.unlink(path.join(__dirname, `../uploads/user_images/${image}`), (err) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve();
//         });
//     });
// }