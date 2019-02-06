const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recepientShema = new Schema({
	email: String,
	clicked: {
		type: Boolean,
		default: false
	}
});

module.exports = recepientShema;
