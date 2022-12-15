// const { json } = require('express');
const { findById } = require('../../models/accounts');
const User = require('../../models/accounts');
const { post } = require('../route_index');
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
        branch_id,
        deleted: false,
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
  app.post('/accounts', (req, res) => {
    const data = req.body;
    User.create(data)
      .then((user) => {
        res.status(200).json({
          status: 'Success',
          message: 'User Created',
          data: user,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 'Failed',
          message: 'Server error Occured',
          stack: err,
        });
      });
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
