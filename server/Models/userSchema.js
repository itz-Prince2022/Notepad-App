const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // You could also store an array of notes here, but we will reference them instead
  // notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
  // For this design, we will query for notes by user id, so this field is not needed.
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('users', UserSchema);