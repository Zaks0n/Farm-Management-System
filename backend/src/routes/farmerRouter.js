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
router.put('/:id', updateFarmer);
router.delete('/:id', deleteFarmer);

module.exports = router;
