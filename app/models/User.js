const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age:{
    type: Number
  },
  type:{
    type:String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  providerID:{
    type: Number,
  },
  address:{
    type:String
  },
  phone:{
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now
  },
  availability:{
    type: Object,
    default: {
      Monday: {
        Start: 'N/A',
        End: 'N/A'
        }, 
      Tuesday: {
        Start: 'N/A',
        End: 'N/A'
      }, 
      Wednesday: {
        Start: 'N/A',
        End: 'N/A'
      }, 
      Thursday: {
        Start: 'N/A',
        End: 'N/A'
      }, 
      Friday: {
        Start: 'N/A',
        End: 'N/A'
      }, 
      Saturday: {
        Start: 'N/A',
        End: 'N/A'
      },
      Sunday: {
        Start: 'N/A',
        End: 'N/A'
      } 
    } 
  }

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
