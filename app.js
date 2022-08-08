const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
    exposedHeaders: ['auth-token'],
}))
//app.use(bodyParser.json());
app.use(express.json());

//Import Routes
const authRoute = require('./routes/auth');
const repairsRoute = require('./routes/repairs');
const clientRoute = require('./routes/clients');

//Middlewares
app.use('/api/auth', authRoute);
app.use('/api/repairs', repairsRoute);
app.use('/api/clients', clientRoute);

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