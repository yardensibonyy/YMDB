const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/movies');

const app = express();

app.use(bodyParser.json());

mongoose.connect(keys.mongoURI);

require('./routes/apiRoutes')(app);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('/*', (req, res) => {
        res.setHeader('content-type', 'text/javascript');
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});