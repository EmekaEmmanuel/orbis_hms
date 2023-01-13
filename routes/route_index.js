const express = require('express');;
const app = express.Router();

// require('./endpoints/user')(app);
require('./endpoints/hospital')(app);
require('./endpoints/branch')(app);;
require('./endpoints/accounts')(app);
require('./endpoints/user')(app)
require('./endpoints/bedspace')(app)
require('./endpoints/department')(app)
require('./endpoints/drugGeneric')(app)
require('./endpoints/drugStore')(app)
require('./endpoints/patient')(app)
require('./endpoints/ward')(app)

module.exports = app;
