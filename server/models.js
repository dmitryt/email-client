import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var EmailSchema = new Schema({
  title: String,
  content: String,
  sender: {
    email: String,
    firstName: String,
    lastName: String
  },
  receivers: [{
    email: String,
    firstName: String,
    lastName: String,
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

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  sex: String,
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
  Email: mongoose.model('Email', EmailSchema),
  User: mongoose.model('User', UserSchema),
};
