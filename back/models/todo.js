const mongoose = require('mongoose');
const validator = require('validator');

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '"Name" is required'],
    minlength: [2, 'Min. "name" length - 2'],
    maxlength: [30, 'Max. "name" length - 30'],
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('todo', todoSchema);
