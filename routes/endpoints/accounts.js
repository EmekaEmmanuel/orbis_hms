// const { json } = require('express');
const { findById } = require('../../models/accounts');
const User = require('../../models/accounts');
const upload = require('../../middleware/multer');
const { post } = require('../route_index');
const {transporter} = require('../../middleware/mailer');
// const config = require ("config")
// const bcypt = require ("bcrypt.js")
// const jwt = require("jsonwebtoken");

const routes = function (app) {
  // Get one Professional
  app.get('/accounts/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await findById(id);
      if (user) {
        res.status(202).json({
          status: 'Success',
          data: user,
        });
      }
      res.status(404).json({
        status: 'Not found',
        message: `User with ID does not exist`,
      });
    } catch (err) {
      res.status(500).json({
        status: 'Failed',
        message: 'Server error',
      });
    }
  });

  // Get Single Profession
  app.get('/accounts', async (req, res) => {
    try {
      const { type, branch_id, p } = req.query;
      const singleView = 15;
      const currentPage = p || 0;
      let users = await User.find({
        role: type.toLowerCase(),
        // branch_id : branch_id
      })
        .skip(currentPage * singleView)
        .limit(singleView);
      res.status(200).json({
        status: 'Success',
        data: users,
      });
    } catch (error) {
      res.status(500).json({ status: 'Failed', message: 'Server error' });
    }
  });

  // Create account
  app.post('/accounts', upload.any(), (req, res) => {
    const pass = Math.floor(Math.random() * (999999 - 100000) + 100000)
    req.body.password = pass;
    const mailOptions = {
      from: 'devjs.nurudeen@gmail.com',
      to: req.body.email,
      subject: 'Your Password',
      text: JSON.stringify(pass)
    };
    try {
      const data = req.body;
      const newUser = new User(data)
      req.files.map(e=>{
        switch (e.fieldname) {
          case "image":newUser.image = e.filename
            break; 
        }
      })

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      newUser.save();
      res.send(newUser)
    } catch (err) {
      res.send({ error: err })
    }
  });

  // Update User
  app.put('/accounts/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const user = await User.findById(id);
      if (!user) res.status(404).json({ message: 'User not found' });
      const data = await user._doc;
      user.overwrite({ ...data, ...body });
      res.status(202).json({
        status: 'Updation completed',
      });
      await user.save();
    } catch (err) {
      res.status(500).json({
        message: 'Server error occured',
      });
    }
  });

  app.delete('/accounts/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) res.status(404).json({ message: 'User not found' });
    const deleted = { ...user, deleted: true };
    res.status();
    await deleted.save();
  });
};

module.exports = routes;