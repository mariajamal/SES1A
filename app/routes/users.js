const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const User = require("../models/User");
const { forwardAuthenticated } = require("../config/auth");
const { db } = require("../models/User");

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

// get doctors
router.get("/doctors", (req, res) => {
  var query = { type: "doctor" };
  User.find(query)
    .then((data) => {
      res.send(data);
      console.log("List of doctors", req.body);
    })
    .catch((err) => {
      res.send(err);
    });
});

// get patients
router.get("/patients", (req, res) => {
  var query = { type: "patient" };
  User.find(query)
    .then((data) => {
      res.send(data);
      console.log("List of patients", req.body);
    })
    .catch((err) => {
      res.send(err);
    });
});

// Register
router.post("/register", (req, res) => {
  const { name, email, password, password2, type, providerID,addressLine1,  suburb, state, pincode } = req.body;
  console.log(req.body)
  let errors = [];

  if (!name || !email || !password || !password2 || !addressLine1 || !suburb || !state ||! pincode) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (type == "doctor" && !providerID) {
    errors.push({ msg: "Please enter providerID fields" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
      type,
      providerID,
      addressLine1,
      suburb,
      state,
      pincode,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
          type,
          providerID,
          addressLine1,
          suburb,
          state,
          pincode,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          type,
          providerID,
          addressLine1,
          suburb,
          state,
          pincode,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

router.put("/:userid", (req, res) => {
  const {
    MondayStart,
    MondayEnd,
    TuesdayStart,
    TuesdayEnd,
    WednesdayStart,
    WednesdayEnd,
    ThursdayStart,
    ThursdayEnd,
    FridayStart,
    FridayEnd,
    SaturdayStart,
    SaturdayEnd,
    SundayStart,
    SundayEnd,
  } = req.body;
  let values = Object.values(req.body);
  let errors = [];

  let j = 1;
  for (let i = 0; i < 13; i += 2, j += 2) {
    let startPeriod = values[i].slice(-2); // these are assigned am or pm
    let endPeriod = values[j].slice(-2);
    dayStart = parseInt(values[i]);
    dayEnd = parseInt(values[j]);
    if (startPeriod === "am" && dayStart === 12) dayStart = 0;
    if (endPeriod === "am" && dayEnd === 12) dayEnd = 0;

    if (startPeriod == "pm" && dayStart !== 12) dayStart += 12; //if a value is pm assign is 12 extra hours as to convert to 24 hour
    if (endPeriod == "pm" && dayEnd !== 12) dayEnd += 12;
    console.log(dayStart);
    console.log(dayEnd);
    if (!dayStart && dayStart !== 0) {
      dayStart = "N/A";
      startPeriod = "am";
      endPeriod = "pm";
    }
    if (!dayEnd && dayEnd !== 0) dayEnd = "N/A";
    //errors.push('hello');
    if (dayStart !== "N/A" || dayEnd !== "N/A") {
      if (dayStart >= dayEnd) {
        errors.push({
          msg: "Your  start time needs to be before the end time",
        });
      }
    }
    if (dayStart === "N/A" && dayEnd !== "N/A")
      errors.push({
        msg: "You have selected N/A for start time, but not the end time",
      });
    if (dayEnd === "N/A" && dayStart !== "N/A")
      errors.push({
        msg: "You have selected N/A for end time, but not the start time",
      });
  }
  if (errors.length > 0) {
    res.render("Availabilities", { user: req.user, errors });
  }
  console.log(errors);

  if (errors.length == 0) {
    console.log("3");
    User.findByIdAndUpdate(
      { _id: req.params.userid },
      {
        availability: {
          Monday: {
            Start: MondayStart,
            End: MondayEnd,
          },
          Tuesday: {
            Start: TuesdayStart,
            End: TuesdayEnd,
          },
          Wednesday: {
            Start: WednesdayStart,
            End: WednesdayEnd,
          },
          Thursday: {
            Start: ThursdayStart,
            End: ThursdayEnd,
          },
          Friday: {
            Start: FridayStart,
            End: FridayEnd,
          },
          Saturday: {
            Start: SaturdayStart,
            End: SaturdayEnd,
          },
          Sunday: {
            Start: SundayStart,
            End: SundayEnd,
          },
        },
      }
    ).then(() => {
      res.end();
      console.log("Update was successful");
      res.redirect("/Availabilities");
    });
  }
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
