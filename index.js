console.log('Hello World');
const express = require('express');
const cors = require("cors");
app = express();
app.use(express.json());
menuitemAPI = require('./routes/menuitemAPI.js');
app.use('/menuitemAPI', menuitemAPI);
app.use(cors());

//testing git push comment