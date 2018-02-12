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

// if(process.env.NODE_ENV === 'production') {
//     //Express will serve up production assests like main.js or main.css file.
//     app.use(express.static('client/build'));

//     //Express will serve up index.html file if it doesn't recognize the route (e.g react route)
//     app.get('/*', (req, res) => {
//         //res.send({bodt: "Gdfdfg"});
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});