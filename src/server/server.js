const express = require('express');
const app = express(),
    bodyParser = require("body-parser");
    port = 3080;
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/user.route')(app);
require('./routes/permission.route')(app);

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});