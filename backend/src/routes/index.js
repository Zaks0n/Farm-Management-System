const router = require('express').Router();


router.get('/', (req, res) => {
    res.send('Welcome to the farmer API');
});

module.exports = router;