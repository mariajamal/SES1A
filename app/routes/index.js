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
router.get('/list',ensureAuthenticated,(req,res)=>
res.render('list',{
  user: req.user,
  lists: req.lists
})
)

// Availability
router.get('/availability', ensureAuthenticated, (req, res) =>
  res.render('availability', {
    user: req.user
  })
);

router.get('/Availabilities', ensureAuthenticated, (req, res) =>
 res.render('Availabilities', {
   user: req.user
  })
);

router.get('/bookAppointment', (req, res) => 
res.render('bookAppointment', {
  user: req.user
  })
  
);

module.exports = router;
