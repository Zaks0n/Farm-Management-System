const router = require('express').Router();
const {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
} = require('../controllers/customerController');
const {
    handleForgotPassword,
    resetPassword
} = require('../controllers/cuAuthController');
const verifyJWT = require('../middlewares/faVerifyJWT');

router.post('/register', createCustomer);
router.get('/:email', getCustomer);
router.get('/', getCustomers);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);
router.post('/forgot-password', handleForgotPassword);
router.post('/reset-password/:resetToken', resetPassword);

module.exports = router;