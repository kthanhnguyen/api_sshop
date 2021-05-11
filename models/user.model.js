const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String
  },
  email: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    default: "user" //  0 = user , 1 = admin
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});



module.exports = mongoose.model('Users', UserSchema);