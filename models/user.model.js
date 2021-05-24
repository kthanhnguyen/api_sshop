const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: { type: String, required: true },
  password: { type: String },
  email: { type: String, required: true },
  role: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Users', UserSchema);