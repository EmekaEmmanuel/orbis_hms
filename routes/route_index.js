const express = require('express')
const app = express.Router()

require('./endpoints/user')(app)

module.exports = app