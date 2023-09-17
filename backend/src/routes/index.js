const router = require('express').Router();
const path = require('path');


router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Farm Management System API',
    });
});

module.exports = router;