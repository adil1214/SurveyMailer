const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

const { googleClientID, googleClientSecret } = keys;

module.exports = (passport) => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: googleClientID,
				clientSecret: googleClientSecret,
				callbackURL: '/auth/google/callback'
			},
			(accessToken, refreshToken, profile, done) => {
				User.findOne({ googleId: profile.id })
					.then((user) => {
						if (user) {
							console.log('user already exists in db');
							done(null, user);
						} else {
							new User({ googleId: profile.id })
								.save()
								.then((user) => {
									done(null, user);
								})
								.catch((err) => console.log(err));
						}
					})
					.catch((err) => console.log(err));
			}
		)
	);
};
