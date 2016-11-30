var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Email =  new Schema({
  title: String,
  content: String,
  sender: {
    type: String,
    required: true
  },
  receivers: [{
    email: String,
    category: String,
    isDeleted: Boolean,
    isImportant: Boolean
  }]
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

var User = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

export default {
  Email,
  User
};
