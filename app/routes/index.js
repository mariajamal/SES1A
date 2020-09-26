const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

//Chat room selection
router.get('/room', ensureAuthenticated,  (req, res) => {
  if(req.user.type == "patient"){
    User.find({type: 'doctor'}, function(err,doc){
      if(err) throw err;
      else{
        res.render('room', {
          user: req.user,
          us: doc
        })
      }
    });
  }
  else{
    User.find({type: 'patient'}, function(err,doc){
      if(err) throw err;
      else{
        res.render('room', {
          user: req.user,
          us: doc
        })
      }
    });
  }
  
  });

  router.get('/chat', ensureAuthenticated,  (req, res) => {
    res.render('chat', {
      user: req.user,
    })
  });


module.exports = router;
