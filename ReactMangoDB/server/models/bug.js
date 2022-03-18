const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the bug schema for mongoose
const BugSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  DueAfterDays: {
    type: Number,
    default: 3,
  },
  Assignee: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  Notes: [String]
});


mongoose.model('Bug', BugSchema);
