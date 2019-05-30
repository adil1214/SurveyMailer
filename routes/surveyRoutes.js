const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('./../services/emailTemplates/surveyTemplate');


// @route   GET /api/surveys/thanks
// @desc    Static thank you message.   // TODO: to be replaced later by a react component.
// @access  Public
router.get('/thanks', (req, res) => {
  res.send('Thank you for voting.');
});


// @route   POST /api/surveys
// @desc    Create a survey, send it to recipients.
// @access  Private
router.post('/', requireLogin, requireCredits, async (req, res) => {
	const { title, subject, body, recipients } = req.body;
	let survey = new Survey({
		title,
		subject,
		body,
		recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
		_user: req.user.id
	});

	// send email
	const mailer = new Mailer(survey, surveyTemplate(survey));
	try {
		let a = await mailer.send();
		// res.send(a);

		await survey.save();
		req.user.credits -= 1;
		const user = await req.user.save();

		res.send(user);
	} catch (err) {
    res.status(422).send(err);
  }
});

module.exports = router;
