const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();


//Create Server
const app = express();

//DB Connection
dbConnection();

//Public Index
app.use(express.static('public'));

//CORS Settings
app.use(cors());

//Read and parse json
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${ process.env.PORT }`);
})