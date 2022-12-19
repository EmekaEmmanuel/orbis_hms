const nodemailer = require("nodemailer")

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'devjs.nurudeen@gmail.com',
      pass: 'wmtbybyhjgjkicfj'
    }
  });