// const { json } = require('express');
const User = require('../../models/users')
// const config = require ("config")
// const bcypt = require ("bcrypt.js")
// const jwt = require("jsonwebtoken");

const routes = function (app) {

    app.get("/users", async (req, res) => {
        try {
            let users = await User.find();
            res.status(200).send({users, msg:"Gotten Users succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })
   
}

module.exports = routes