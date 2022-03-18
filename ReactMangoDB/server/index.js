const express = require('express');
const app = express();
const path = require('path');

require('./models/user');
require('./models/bug');
const mongoose = require('mongoose');

// handle form and json post body
app.use(express.urlencoded());
app.use(express.json());

// handle routes
app.use('/', express.static(path.join(__dirname, '../build')));
app.use('/api/user', require('./controllers/user'));
app.use('/api/bug', require('./controllers/bug'));

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops, something when wrong!');
});

// start server
const port = Number(process.env.PORT || 3000);

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/assignment3')
  .then(() => {
    console.log('mongo connected');
    app.listen(port, function () {
      console.log(`We are listening on port ${port}!`);
    });
  })
  .catch(err => {
    throw err;
  });
