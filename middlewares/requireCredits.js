module.exports = (req, res, next) => {
	if (req.user.credits < 1) {
		return res.status(402).json({ error: 'You dont have enough credits!' });
	}
	next();
};
