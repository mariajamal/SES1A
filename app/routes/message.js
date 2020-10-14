const express = require('express');
const router = express.Router();
const { forwardAuthenticated } = require('../config/auth');
const { db } = require('../models/Appointment');
const Message = require('../models/Message');

router.get('/',(req,res)=> {
    
    Message.find()
    .then((data) => {
        res.send(data)
        console.log("List of messages", req.body)
    })
    .catch((err) => {
        res.send(err)
    })
});

module.exports = router;