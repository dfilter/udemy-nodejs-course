const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
  description: {
    required: true,
    trim: true,
    type: String
  },
  completed: {
    default: false,
    type: Boolean
  },
  owner: {
    ref: 'User',
    required: true,
    type: mongoose.Schema.Types.ObjectId
  }
})

module.exports = Task
