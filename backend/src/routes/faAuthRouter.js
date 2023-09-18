const router = require('express').Router();
const { handleLogin, handleRefreshToken, handleLogout, forgotPassword, resetPassword } = require('../controllers/faAuthController');

router.post('/login', handleLogin);
router.get('/refresh', handleRefreshToken);
router.post('/logout', handleLogout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);

module.exports = router;
