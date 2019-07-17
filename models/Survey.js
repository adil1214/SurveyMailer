const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recepientShema = require('./Recipients');

const SurveySchema = new Schema({
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	subject: {
		type: String,
		required: true
	},
	recipients: [recepientShema],
	yes: {
		type: Number,
		default: 0
	},
	no: {
		type: Number,
		default: 0
	},
	dateSent: {
		type: Date,
		default: Date.now
	},
	lastResponded: {
		type: Date
	}
});

module.exports = Survey = mongoose.model('surveys', SurveySchema);
