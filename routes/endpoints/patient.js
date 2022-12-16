// const { json } = require('express');
const User = require('../../models/users')
// const config = require ("config")
// const bcypt = require ("bcrypt.js")
// const jwt = require("jsonwebtoken");
const User = require('../../models/accounts');
const upload = require('../../middleware/multer'); 
const {transporter} = require('../../middleware/mailer');

const routes = function (app) {

    app.get("/users", async (req, res) => {
        try {
            let users = await User.find();
            res.status(200).send({users, msg:"Gotten Users succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })









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




























     // GET ALL BEDSPACES IN THE BRANCH
     app.get("/bedspaces", async (req, res) => {
        const { branch_id } = req.query
        try {
            let bedspace = await BedSpace.find({ branch_id })
            if (!bedspace) { 
                return res.status(404).send({ 
                    msg: "Bedspace does not exist in the branch",
                  });
            }
            res.status(200).send({
                data:bedspace,
                msg:"Gotten Branch Bedspaces succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET  ONE BEDSPACE IN THE BRANCH
    app.get("/bedspaces/branch/one", async (req, res) => {
        let { bed_number, branch_id } = req.query
        try {
            let bedspace = await BedSpace.findOne({ bed_number, branch_id })
            if (!bedspace) {
                return res.status(404).send({msg:"Bedspace does not exist in the branch"})
            }
            res.status(200).send({data:bedspace, msg:"Gotten Bedspace succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET ALL BEDSPACES IN A BRANCH WARD
    app.get("/bedspaces/ward", async (req, res) => {
        let { branch_id, ward_id } = req.query
        try {
            let bedspace = await BedSpace.find({ branch_id, ward_id })
            if (!bedspace) {
                return res.status(404).send({msg:"Bedspace does not exist in the branch"})
            }
            res.status(200).send({data:bedspace, msg:"Gotten Bedspace succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET  ONE BEDSPACE IN THE WARD
    app.get("/bedspaces/ward/one", async (req, res) => {
        let { bed_number, ward_id } = req.query
        try {
            let bedspace = await BedSpace.findOne({ bed_number, ward_id })
            if (!bedspace) {
                return res.status(404).send({msg:"Bedspace does not exist in the branch"})
            }
            res.status(200).send({data:bedspace, msg:"Gotten Bedspace succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    }) 

    // CREATE BED SPACE
    app.post("/bedspaces", async (req, res) => {
        let { bed_number, ward_id, department_id, branch_id, card_no, phone_number, is_occupied } = req.body
        try {
            let bedspace = await BedSpace.findOne({ bed_number })
            if (bedspace) {
                return res.status(404).send({data:bedspace, msg:"Bedspace already exist"})
            }
            bedspace = new BedSpace({ 
                bed_number, 
                ward_id, 
                department_id, 
                branch_id, 
                card_no, 
                phone_number,
                is_occupied
            })
            await bedspace.save()
            res.status(200).send({data:bedspace, msg:"Bedspace created"}) 
        } catch (error) { 
            res.status(500).send({msg: "Server error occurs"})
        }
    })

    // EDIT BEDSPACE INFORMATION
    app.put("/bedspaces/:id", async (req, res) => {
        try {
            let { id } = req.params
            let { body } = req;
            let bedspaceUpdate = await BedSpace.findById(id)
            if (!bedspaceUpdate) return res.status(404).send({ msg: "Bed space not found"})
            let data = bedspaceUpdate._doc;
            bedspaceUpdate.overwrite({ ...data, ...body })
           const bedspace = await bedspaceUpdate.save()
            res.status(200).send({data:bedspace, msg: "Bedspace updated"})
        } catch (error) { 
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // DELETE BEDSPACE
    app.delete("/bedspaces/:id", async (req, res) => {
        try {
            let { id } = req.params
            let deletebedspace = await BedSpace.findById(id)
            if (!deletebedspace) return res.status(404).send({ msg: "Bedspace doesn't exist"})

            deletebedspace.remove();

            res.status(200).send({ msg: "Bedspace deleted"})
        } catch (error) { 
            res.send({msg:"Server error occurs"})
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