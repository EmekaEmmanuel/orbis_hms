const express = require('express');;
const app = express.Router();

// require('./endpoints/user')(app);
require('./endpoints/hospital')(app);
require('./endpoints/branch')(app);;

require('./endpoints/accounts')(app);

module.exports = app;
