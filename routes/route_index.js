const express = require('express');
const app = express.Router();

require('./endpoints/accounts')(app);

module.exports = app;
