const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load Patient model
const Patient = require('../models/Patient');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ patientnameField: 'email' }, (email, password, done) => {
      // Match patient
      Patient.findOne({
        email: email
      }).then(patient => {
        if (!patient) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, patient.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, patient);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(patient, done) {
    done(null, patient.id);
  });

  passport.deserializeUser(function(id, done) {
    Patient.findById(id, function(err, patient) {
      done(err, patient);
    });
  });
};