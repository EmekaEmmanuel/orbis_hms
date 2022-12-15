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


    app.post("/register", async (req, res) => {
        let { username, phone_number, email, password } = req.body
        try {
            let user = await User.findOne({ username })
            if (user) {
                return res.status(200).send({user, msg:"User alrady exist"})
            }
            
            // const hashPassword = await bcrypt.hash(password, 12)
            user = new User({
                username,
                phone_number,
                email,
                password
            })
            await user.save()
            res.status(200).send({msg:"User created"})
            // const newUser = await user.save()
            // const payload = {user: {_id: newUser._id} }
            // const token = jwt.sign(payload, "iammanuelka", { expiration: "1hr" })
            // res.send({ msg: "User created", code: 200, token })
        } catch (err) {
            console.log(err)
            res.status(400).send({msg: "Server error"})
        }
    })


    app.post("/login", async(req,res)=>{
        const {username, password} = req.body
    	try{
            let user = await User.findOne({ username })

            if (!user) {
                return res.status(200).send({ msg: "Invalid credentils"})
            }

            // const isMatch = await bcrypt.compare(password, user.password)
            let isMatch = await user.password === password
            if (!isMatch) {
                return res.status(200).send({ msg: "Invalid credentials"})
            }

            await user.save()
            res.status(200).send({ user, msg: "Login succesful" })

            // const payload = {user: {_id: user._id} }
            // const token = jwt.sign(payload, "iammanuelka", { expiration: "1hr" })
            // res.send({ msg: "User created", code: 200, token })

    	}catch(err){
    		console.log(err)
    		res.status(500).send({ msg: "Server error", code: 500})
    	}
    })


//     _id
// username
// phone_number
// email
// password





    app.put("/updateuser/:_id", async (req, res) => {
        try {
            let { _id } = req.params
            let { body } = req;
            let userUpdate = await User.findById(_id)
            if (!userUpdate) return res.json({ msg: "User not found", code: 404})

            let data = userUpdate._doc;
            userUpdate.overwrite({ ...data, ...body })
           const user = await userUpdate.save()
            res.status(200).send({user, msg: "Post updated"})
        } catch (err) {
            console.log(err)
            res.send("Server error")
        }
    })

    // app.put("/updateuser/:_id", async (req, res) => {
    //     try {
    //         let { _id } = req.params
    //         let { body } = req;
    //         let userUpdate = await User.findById(_id)
    //         if (!userUpdate) return res.json({ msg: "User not found", code: 404})

    //         let data = userUpdate._doc;
    //         userUpdate.overwrite({ ...data, ...body })
    //        const user = await userUpdate.save()
    //         res.status(200).send({user, msg: "Post updated"})
    //     } catch (err) {
    //         console.log(err)
    //         res.send("Server error")
    //     }
    // })

    app.delete("/deleteuser/:_id", async (req, res) => {
        try {
            let { _id } = req.params
            let deleteuser = await User.findById(_id)

            if (!deleteuser) return res.status(200).send({ msg: "User doesn't exist"})

            deleteuser.remove();

            res.status(200).send({ msg: "User deleted"})
        } catch (err) {
            console.log(err)
            res.send("Server error")
        }
    })

   
}

module.exports = routes