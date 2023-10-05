const router = require('express').Router();
const {
    createFarmer,
    getFarmers,
    getFarmer,
    updateFarmer,
    deleteFarmer,
} = require('../controllers/farmerController');
const verifyJWT = require('../middlewares/faVerifyJWT');

router.post('/register', createFarmer);
router.get('/:email', getFarmer);
router.get('/', getFarmers);
router.put('/:id', verifyJWT, updateFarmer);
router.delete('/:id', verifyJWT, deleteFarmer);

module.exports = router;
