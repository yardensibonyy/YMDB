const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/movies');

const app = express();

mongoose.connect(keys.mongoURI);
app.use(bodyParser.json());

require('./routes/apiRoutes')(app);

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});