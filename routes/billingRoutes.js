const stripe = require('stripe')(process.env.StripeSecretKey);
const requireLogin = require('./../middlewares/requireLogin');
// const fs = require('fs');

module.exports = (app) => {
	app.post('/api/stripe', requireLogin, (req, res) => {
		stripe.charges
			.create({
				amount: 500,
				currency: 'usd',
				source: req.body.id,
				description: 'Charge for SurveyMailer'
			})
			.then((charge) => {
				// fs.writeFileSync('playground/charge.json', JSON.stringify(charge, undefined, 2));
				// fs.writeFileSync('playground/req.json', customStringify(req));
				req.user.credits += 5;
				return req.user.save();
			})
			.then((newUser) => res.send(newUser))
			.catch((err) => console.log(err));
	});
};

// const customStringify = function(v) {
// 	const cache = new Set();
// 	return JSON.stringify(
// 		v,
// 		function(key, value) {
// 			if (typeof value === 'object' && value !== null) {
// 				if (cache.has(value)) {
// 					return;
// 				}
// 				cache.add(value);
// 			}
// 			return value;
// 		},
// 		2
// 	);
// };
