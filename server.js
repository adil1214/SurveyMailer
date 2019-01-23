require('./config/config');

const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

const app = express();
require('./models/User');
const User = mongoose.model('users');
// const cookieKey = require('./config/keys').cookieKey;

const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/SurveyMailer';
const port = process.env.PORT;

app.use(
	cookieSession({
		maxAge: 1000 * 3600 * 24 * 30,
		keys: [ process.env.cookieKey ]
	})
);
app.use(passport.initialize());
app.use(passport.session());

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('Connected to database.'))
	.catch((err) => console.log(err));

mongoose.set('useCreateIndex', true);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then((user) => {
			done(null, user);
		})
		.catch((err) => console.log(err));
});

require('./config/passport')(passport);
require('./routes/authRoutes')(app);

app.listen(port, () => {
	console.log(`server started on port ${port}`);
});
