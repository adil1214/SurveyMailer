const express = require('express');
const router = express.Router();
const passport = require('passport');

// @route   GET auth/google
// @desc    Google auth route
// @access  Private
router.get('/google', passport.authenticate('google', { scope: [ 'profile', 'email' ] }));

// @route   GET auth/google/callback
// @desc    Google auth callback route
// @access  Private
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
	res.redirect('/surveys');
});

module.exports = router;
