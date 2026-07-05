const express = require('express');
const router = express.Router();

const { registerUser, authUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');

const passport = require('passport'); 
const jwt = require('jsonwebtoken');

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, authUser);
router.get('/profile', protect, getUserProfile);

router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'], 
    session: false 
}));

router.get('/google/callback', passport.authenticate('google', { 
    session: false, 
    failureRedirect: `${process.env.FRONTEND_URL}/login` 
}), (req, res) => {
    
    const token = jwt.sign(
        { id: req.user._id, role: req.user.role },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
    
    const userData = encodeURIComponent(JSON.stringify({
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role
    }));

    res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${token}&user=${userData}`);
});

module.exports = router;