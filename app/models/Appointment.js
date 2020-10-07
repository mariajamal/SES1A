const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({

    date: {
        type: String,
        // required: true
    },
    time: {
        type: String,
        // required: true,
    },
    doctorID: {
        type: String,
        // required: true,
    },
    patientID: {
        type: String,
        // required: true,
    },
    doctorName: {
        type: String,
        // required: true
    },
    urgent:{
        type:Boolean,
        // required: true,
        default:false
    }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
