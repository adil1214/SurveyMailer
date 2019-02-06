const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.StripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
const surveys = require('./surveyRoutes');

// @route   GET api/logout
// @desc    Logout route
// @access  Public
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

// @route   GET api/current_user
// @desc   	Get the current user
// @access  Public
router.get('/current_user', (req, res) => {
	res.send(req.user);
});

// @route   GET api/stripe
// @desc    Stripe charges creation endpoint
// @access  Private
router.post('/stripe', requireLogin, (req, res) => {
	stripe.charges
		.create({
			amount: 500,
			currency: 'usd',
			source: req.body.id,
			description: 'Charge for SurveyMailer'
		})
		.then((charge) => {
			req.user.credits += 5;
			return req.user.save();
		})
		.then((newUser) => res.send(newUser))
		.catch((err) => console.log(err));
});

router.use('/surveys', surveys);

module.exports = router;
