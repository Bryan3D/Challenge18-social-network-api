const mongoose = require('mongoose');
const express = require('express');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// This option is used to control whether Mongoose applies strict validation to query parameters that are passed to find, findOne, and findById methods on a Mongoose model.

mongoose.set('strictQuery', true)

app.use(require('./routes'));
// This code snippet connects a Node.js application to a MongoDB database using the Mongoose library. The mongoose.connect() method is used to establish a connection to the database and configure the options for the connection.

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNet', {
  
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);
// The Node.js server listening on the specified port PORT and logs a message to the console indicating that the server is running and listening for incoming requests.

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));