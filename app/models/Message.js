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

var Message = mongoose.model("message", MessageSchema, "messages");

module.exports = Message;
