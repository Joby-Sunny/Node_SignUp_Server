const express = require('express');
var bodyParser = require('body-parser');
var router = require('./routes/routes');
var cors = require('cors');

const app = express();

const port = 8000;

app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.listen(port,()=> {
    console.log(`Server running on http://localhost:${port}/`);
})