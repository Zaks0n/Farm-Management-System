const router = require('express').Router();
const {
    createFarmer,
    getFarmers,
    getFarmer,
    updateFarmer
} = require('../controllers/farmerController');
const verifyJWT = require('../middlewares/verifyJWT');

router.post('/register', createFarmer);
router.get('/:email', getFarmer);
router.get(verifyJWT(), '/', getFarmers);
router.put('/:id', updateFarmer);

module.exports = router;
