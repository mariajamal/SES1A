const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Appointment = require('../models/Appointment');
const { forwardAuthenticated } = require('../config/auth');
const { db } = require('../models/Appointment');

router.get('/',(req,res)=> {
    
    Appointment.find()
    .then((data) => {
        res.send(data)
        console.log("List of appointmets", req.body)
    })
    .catch((err) => {
        res.send(err)
    })
});
router.post('/',(req, res) => {
    
    const { date, time,doctorID, patientID,doctorName,urgent } = req.body;
    const newAppointment = new Appointment({
        date, time,doctorID, patientID,doctorName,urgent
    });
    newAppointment.save();
    
    res.json('New Appointment added');
    
});
   

module.exports = router;