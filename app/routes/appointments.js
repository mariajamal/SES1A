const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

//router.get('/bookAppointment', forwardAuthenticated, (req, res) => res.render('bookAppointment'));

router.get('/doc/:userid',(req,res)=> {
  console.log(req.params.userid)
  var query = { doctor_id: req.params.userid};
  Appointment.find(query)
    .then((data) => {
      res.send(data);
      console.log("List of appointments", req.body);
    })
    .catch((err) => {
      res.send(err);
    });

});

router.get('/patient/:userid',(req,res)=> {
  console.log(req.params.userid)
  var query = { patient_id: req.params.userid};
  Appointment.find(query)
    .then((data) => {
      res.send(data);
      console.log("List of appointments", req.body);
    })
    .catch((err) => {
      res.send(err);
    });

});
/*
router.post('/bookAppointment', (req, res) => {
    const { doctorID, patientID,  date, timeSlot, doctorName, patientName } = req.body;
    let errors = [];

    Appointment.findOne({ date: date, timeSlot: timeSlot }).then(appointment => {
      if (appointment) {
        console.log(':c');
        errors.push({ msg: 'Someone else has already booked this appointment' });
      }else{
        console.log('hello');
        let newAppointment = new Appointment({
        patientName,
        doctorName,
        date,
        timeSlot,
        doctorID,
        patientID
          });
          newAppointment.save()
              .then(appointment => {
          console.log('Appointment Booked!');
          res.redirect('/bookAppointment');
         })
         .catch(err => console.log(err));
      }
      })
  })
*/
  router.post('/bookAppointment',(req, res) => {
    
    const { urgent, patientName, doctorName, date, timeSlot, doctor_id, patient_id } = req.body;
    console.log(req.body);
    let isUrgent = true;
    if (urgent === "on") {
       isUrgent = true;
    } else {
       isUrgent = false;
    }
    const newAppointment = new Appointment({
      isUrgent,
      patientName,
      doctorName,
      date,
      timeSlot,
      doctor_id,
      patient_id
    });
    newAppointment.save()
    .then(appointment => {
      console.log('Appointment Booked!');
      res.redirect('/dashboard');
     })
     .catch(err => console.log(err));
    
});
   


module.exports = router;

router.delete('/:appointmentid', (req, res)=> {
  Appointment.findByIdAndRemove(req.params.appointmentid)
      .then((data) => {
          res.send(data)
          console.log("Deleted");
      })
      .catch((err) => {
          res.send(err)
      })
})


//check for errors before posting

// post the data if no errors

// create get route for the data

// if the appointment alreadyt exists don't display it to the user

// if the appointment gets booked by somone else push that error