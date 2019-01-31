const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	googleId: {
    type: String,
    required: true,
    // unique: true
  },
  credits: {
    type: Number,
    default: 0
  }
});

module.exports = User = mongoose.model('users', UserSchema);