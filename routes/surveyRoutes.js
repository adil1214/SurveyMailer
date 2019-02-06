const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');

// @route   POST /api/surveys
// @desc    Create a survey
// @access  Private
router.post('/', requireLogin, requireCredits, (req, res) => {
	const { title, subject, body, recipients } = req.body;
	const survey = new Survey({
		title,
		subject,
		body,
		recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
		_user: req.user.id
	});
});

module.exports = router;
