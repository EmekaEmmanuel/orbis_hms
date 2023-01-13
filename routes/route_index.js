const express = require('express');;
const app = express.Router();

// require('./endpoints/user')(app);
require('./endpoints/hospital')(app);
require('./endpoints/branch')(app);;
require('./endpoints/accounts')(app);
require('./endpoints/appointment')(app)
require('./endpoints/bedspace')(app)
require('./endpoints/department')(app)
require('./endpoints/drug_generic')(app)
require('./endpoints/drug_store')(app)
require('./endpoints/patient')(app)
require('./endpoints/ward')(app)
require('./endpoints/waiting')(app)

module.exports = app;
