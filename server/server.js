const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/movies');

const app = express();

app.use(bodyParser.json());

mongoose.connect(keys.mongoURI);

require('./routes/apiRoutes')(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});