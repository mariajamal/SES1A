const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  room:{
    type: String,
  }
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
