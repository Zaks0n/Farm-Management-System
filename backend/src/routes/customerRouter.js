const router = require('express').Router();
const {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
} = require('../controllers/customerController');
const verifyJWT = require('../middlewares/verifyJWT');

router.post('/register', createCustomer);
router.get('/:email', getCustomer);
router.get('/', getCustomers);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;