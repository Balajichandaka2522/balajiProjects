const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  biography: {
    type: String,
    trim: true
  },
  nationality: {
    type: String,
    trim: true
  },
  birthDate: {
    type: Date
  },
  website: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Author', authorSchema); 