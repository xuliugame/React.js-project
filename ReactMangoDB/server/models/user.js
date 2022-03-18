const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the user schema for mongoose
const UserSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Admin: {
    type: Boolean,
    required: true,
  },
});

mongoose.model('User', UserSchema);
