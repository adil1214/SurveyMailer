const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const moment = require('moment');
const Path = require('path-parser').default;
const { URL } = require('url');
const _ = require('lodash');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('./../services/emailTemplates/surveyTemplate');

// @route   GET /api/surveys/thanks
// @desc    Static thank you message.   // TODO: to be replaced later by a react component.
// @access  Public
router.get('/:surveyId/:response', (req, res) => {
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

// @route   GET /api/surveys/webhooks
// @desc    To test if the endpoint is tunneled proprely
// @access  Private
router.get('/webhooks', (req, res) => {
	// TODO: remove this endpoint later
	console.log('GET /api/surveys/webhooks');
	res.status(201).send('hi there im public');
});

// @route   POST /api/surveys/webhooks
// @desc    Sendgrid webhooks endpoint
// @access  Private
router.post('/webhooks', (req, res) => {
	console.log('webhook request coming through');

	// fs.writeFileSync(
	// 	`./playground/WebhookEvents/${moment().format('YYYYMMDD_hhmmss')}.json`,
	// 	JSON.stringify(req.body, null, 2)
	// );

	const p = new Path('/api/surveys/:surveyId/:response');

	const events = _.chain(req.body)
		.map(({ url, email }) => {
			const match = p.test(new URL(url).pathname);
			if (match) {
				return { ...match, email };
			}
		})
		.compact()
		.uniqBy('email', 'surveyId')
		.each(({ surveyId, response, email }) => {
			Survey.updateOne(
				{
					_id: surveyId,
					recipients: {
						$elemMatch: {
							email,
							clicked: false
						}
					}
				},
				{
					$inc: {
						[response]: 1
					},
					$set: { 'recipients.$.clicked': true },
					lastResponded: new Date()
				}
			).exec();
		})
		.value();

	console.log(events);

	res.send({});
});

module.exports = router;
