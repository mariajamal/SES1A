const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const socket = require('socket.io');
const app = express();
const Message= require('./app/models/Message');


//method-override
app.use(methodOverride('_method'));

// Passport Config
require('./app/config/passport')(passport);

//method-override
app.use(methodOverride('_method'));

// DB Config
const db = require('./app/config/keys').mongoURI;
// const chatDb = require('./app/config/keys').chatURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected :)'))
  .catch(err => console.log(err));

  
// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

app.use( express.static( "public" ) );

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./app/routes/index.js'));
app.use('/users', require('./app/routes/users.js'));
app.use('/appointments',require('./app/routes/appointments.js'));
app.use('/message', require('./app/routes/message.js'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

let sock = socket(server);
sock.on('connection', function(socket){
  console.log('connection', socket.id);
    socket.on('joinRoom', function(data){
      let rm = "";
      if(data.type == "doctor"){
        rm = data.name + data.rooms;
        socket.join(rm);
      }    
      else{
        rm = data.rooms + data.name
        socket.join(rm);
      }

      Message.find({room: rm}, function(err,doc){
        if(err) throw err;
        else{
          sock.to(rm).emit('msgHistory', {data: doc});
        }});
            
  
      socket.on('chat', function(d){
        sock.to(rm).emit('chat', d);
        const newMessage = new Message({
          name: d.name,
          message: d.message,
          room: rm
        });

      
        newMessage.save()
        .then(result => {console.log(result)})
        .catch(err => {console.log(err)})
      
      });
    });
});
