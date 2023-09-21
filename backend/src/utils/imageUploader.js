const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/uploads/user_images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        const upload = multer({ storage }).single(image);
        upload(req, res, (err) => {
            if (err) {
                reject(err);
            }
            resolve(req.file);
        });
    });
}

const deleteImage = (image) => {
    return new Promise((resolve, reject) => {
        fs.unlink(path.join(__dirname, `../uploads/user_images/${image}`), (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

module.exports = {
    uploadImage,
    deleteImage
}