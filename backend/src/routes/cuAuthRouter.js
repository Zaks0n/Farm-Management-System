const router = require('express').Router();
const { handleLogin, handleRefreshToken, handleLogout } = require('../controllers/cuAuthController');

router.post('/login', handleLogin);
router.get('/refresh', handleRefreshToken);
router.post('/logout', handleLogout);

module.exports = router;
