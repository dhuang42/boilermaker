// create the app and import middleware
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('express').Router();

// listen for requests
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function () {
  console.log("Knock, knock");
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});

// logging middleware
app.use(morgan('dev'));

// static file serving middleware
app.use(express.static(path.join(__dirname, './path/to/static/assets')));

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api routes
app.use('/api', require('./api')); // matches all requests to /api

// handle 404 errors
router.use('/users', require('./users')); // Users? Check.
router.use('/puppies', require('./puppies')); // Puppies? Check.
router.use('/kittens', require('./kittens')); // Kittens? Check.

// Sloths?!?! Get outta town!
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

// send index.html for any requests that don't match an api route
// this is an SPA so we don't need to send any other html page
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
});

// handle 500 errors
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = router;
