const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = (passport) => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.googleClientID,
				clientSecret: process.env.googleClientSecret,
				callbackURL: '/auth/google/callback',
				proxy: true
			},
			async (accessToken, refreshToken, profile, done) => {
				const existingUser = await User.findOne({ googleId: profile.id });
				if (existingUser) {
					return done(null, existingUser);
				}
				const createdUser = await new User({ googleId: profile.id }).save();
				done(null, createdUser);
			}
		)
	);
};
