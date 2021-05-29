const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const cryptoRandomString = require('crypto-random-string');


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  surname: {
    type: String,
  },

  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },


  password: {
    type: String,
 
    minlength: 6,

  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },

  branchId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Branch',
  },

});



module.exports = mongoose.model('User', UserSchema);
