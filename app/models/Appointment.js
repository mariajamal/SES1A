const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({

    doctor_id: {
        type: String,
        required: true,
    },
    patient_id: {
        type: String,
        // required: true,
    },
    date: {
        type: String,
        required: true
    },
    timeSlot: {
        type: String,
         required: true,
    },
    doctorName: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
