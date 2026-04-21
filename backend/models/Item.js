const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Links this item to the User who posted it
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Documents', 'Keys', 'Other'] // Restricts choices
  },
  type: {
    type: String,
    required: true,
    enum: ['lost', 'found'] // Is it a lost report or a found report?
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  contactInfo: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: '' // URL to uploaded image
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'returned']
  }
});

module.exports = mongoose.model('Item', itemSchema);