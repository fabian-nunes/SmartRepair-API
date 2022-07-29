const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors())
app.use(bodyParser.json());

//Import Routes
const repairsRoute = require('./routes/repairs');
const clientRoute = require('./routes/clients');

//Middlewares
app.use('/repairs', repairsRoute);
app.use('/clients', clientRoute);

//Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true } ,() => {
   console.log("Connected to DB");
});

//Listen
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});