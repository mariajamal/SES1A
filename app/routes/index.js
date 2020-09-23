const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/bookAppointment', (req, res) => res.render('bookAppointment'));
router.get('/bookAppointment2', (req, res) => res.render('bookAppointment2'));
router.get('/Availabilities', ensureAuthenticated, (req, res) => 
  res.render('Availabilities', {
    user: req.user
  }));

module.exports = router;
