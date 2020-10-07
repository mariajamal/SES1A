const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Appointment = require('../models/Appointment');
const { forwardAuthenticated } = require('../config/auth');

router.post('/bookAppointment',(req, res) => {
    const { data } = req.body;
console.log(data);
});
   

module.exports = router;