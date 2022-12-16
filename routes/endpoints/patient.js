const { json } = require('express');
const User = require('../../models/users')
const config = require("config")
const bcypt = require("bcrypt.js")
const jwt = require("jsonwebtoken");
const User = require('../../models/accounts');
const Patient = require('../../models/patient');
const upload = require('../../middleware/multer');
const { transporter } = require('../../middleware/mailer');

const routes = function (app) {

  // GET ALL PATIENTS IN THE SYSTEM
  app.get("/patients", async (req, res) => {
    const { branch_id } = req.query
    try {
      let patient = await Patient.find()
      res.status(200).send({
        data: patient,
        msg: "Gotten Patients succesfully"
      })
    } catch (error) {
      res.status(500).send({ msg: "Server error occurs" })
    }
  })

  // GET ALL PATIENTS REGISTERED WITH THIS HOSPITAL
  app.get("/patients/hospital", async (req, res) => {
    const { hospital_id } = req.query
    try {
      let patient = await Patient.find({ hospital_id })
      if (!patient) {
        return res.status(404).send({
          msg: "No patient found in hospital",
        });
      }
      res.status(200).send({
        data: patient,
        msg: "Gotten Patients succesfully"
      })
    } catch (error) {
      res.status(500).send({ msg: "Server error occurs" })
    }
  })

  // GET ALL PATIENTS IN THE BRANCH
  app.get("/patients/branch", async (req, res) => {
    const { branch_id } = req.query
    try {
      let patient = await Patient.find({ branch_id })
      if (!patient) {
        return res.status(404).send({
          msg: "No patient found in branch",
        });
      }
      res.status(200).send({
        data: patient,
        msg: "Gotten Patients succesfully"
      })
    } catch (error) {
      res.status(500).send({ msg: "Server error occurs" })
    }
  })

  // GET PATIENTS DETAILS REGISTERED WITH BRANCH
  app.get("/patients/inbranch", async (req, res) => {

    try {

      let { branch_id, card_no, _ } = req.body
      let patient = await Patient.findOne({ branch_id, card_no })
      if (!patient) {
        return res.status(404).send({
          msg: "PATIENT NOT REGISTERED WITH BRANCH",
        });
      }
      res.status(200).send({
        data: patient,
        msg: "Gotten Patient Data succesfully"
      })

    } catch (error) {
      res.status(500).send({ msg: "Server error occurs" })
    }
  })

  // GET PATIENTS DETAILS NOT REGISTERED WITH BRANCH
  app.get("/patients/insystem", async (req, res) => {
    let { card_no, access_key } = req.body
    try {

      let patient = await Patient.findOne({ access_key, card_no })
      if (!patient) {
        return res.status(404).send({
          msg: "PATIENT NOT FOUND",
        });
      }
      res.status(200).send({
        data: patient,
        msg: "Gotten Patient Data succesfully"
      })
    }
    catch (error) {
      res.status(500).send({ msg: "Server error occurs" })
    }
  }
  )

  // REGISTER PATIENT ACCOUNT USING CREATEDBY AND ROLE AS DIFFERENCE
  app.post('/patients', upload.any(), async (req, res) => {

    let { card_no, first_name, surname, img, other_name, address, email, password, access_key, phone_number, gender, age, language_spoken, bloodgroup, genotype, kin, kin_phone, bed_id, ward_id, department_id, branch_id, hospital_id, created_by, role } = req.body

    try {

      if (role === "PATIENT") {
        // PATIENT CAN CREATE ACCOUNT
        const pass = Math.floor(Math.random() * (999999 - 100000) + 100000)
        const hash_password = await bcrypt.hash(pass, 12)
        req.body.password = hash_password;
        const mailOptions = {
          from: 'devjs.nurudeen@gmail.com',
          to: req.body.email,
          subject: 'Your Password',
          text: JSON.stringify(hashPassword)
        };

        let new_patient = new Patient({ card_no, first_name, surname, img, other_name, address, email, password, access_key, phone_number, gender, age, language_spoken, bloodgroup, genotype, kin, kin_phone, bed_id, ward_id, department_id, branch_id, hospital_id, created_by, role })

        req.files.map(e => {
          switch (e.fieldname) {
            case "image": new_patient.img = e.filename
              break;
          }
        })

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        const patient = await new_patient.save()
        const payload = { new_patient: { _id: patient._id } }
        const token = jwt.sign(payload, "iammanuelka", { expiration: "1hr" })
        res.send({ msg: "Patient created", code: 200, token })
      }
      else {

        // STAFF CAN CREATE ACCOUNT       
        const pass = 1234
        const hash_password = await bcrypt.hash(pass, 12)
        req.body.password = hash_password;

        let new_patient = new Patient({ card_no, first_name, surname, img, other_name, address, email, password, access_key, phone_number, gender, age, language_spoken, bloodgroup, genotype, kin, kin_phone, bed_id, ward_id, department_id, branch_id, hospital_id, created_by, role })

        req.files.map(e => {
          switch (e.fieldname) {
            case "image": new_patient.img = e.filename
              break;
          }
        })

        const patient = await new_patient.save()
        const payload = { new_patient: { _id: patient._id } }
        const token = jwt.sign(payload, "iammanuelka", { expiration: "1hr" })
        res.send({ msg: "Patient created", code: 200, token })

      }
    } catch (error) {
      res.status(500).send({ msg:"Server error occurs" })
    }
  });

  // LOGIN PATIENT DATA
  app.post("/patients/login", async (req, res) => {
    const { card_no, password } = req.body
    try {
      let patient = await Patient.findOne({ card_no })

      if (!patient) {
        return res.status(200).send({ msg: "Invalid credentils" })
      }

      const isMatch = await bcrypt.compare(password, patient.password)

      if (!isMatch) {
        return res.status(200).send({ msg: "Invalid credentials" })
      }

      await patient.save()
      res.status(200).send({ data: patient, msg: "Patient Login succesful" })
      const payload = { patient: { _id: patient._id } }
      const token = jwt.sign(payload, "iammanuelka", { expiration: "1hr" })
      res.send({ msg: "User created", code: 200, token })
    } catch (err) { 
      res.status(500).send({ msg: "Server error" })
    }
  })


  // CHANGE PASSWORD DATA ON FIRST LOGIN 
  app.put("/patients/login", async (req, res) => {
    const { card_no, password, new_password } = req.body
    try {
      let patient = await Patient.findOne({ card_no })

      if (!patient) {
        return res.status(200).send({ msg: "Invalid credentils" })
      }

      const isMatch = await bcrypt.compare(password, patient.password)

      if (!isMatch) {
        return res.status(200).send({ msg: "Invalid credentials" })
      }

      const pass = new_password
      const hash_password = await bcrypt.hash(pass, 12) 

      let data = patient._doc;
      patient.overwrite({ ...data, password:hash_password })
      const patient_new_pass = await patient.save()
      res.status(200).send({ data: patient_new_pass, msg: "Password updated" })

    } catch (error) { 
      res.status(500).send({ msg: "Server error", code: 500 })
    }
  })


  // EDIT PATIENT DATA
  app.put('/patients/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      let patient_update = await Patient.findById(id);
      if (!patient_update) return res.status(404).json({ message: 'Patient not found' });

      req.files.map(e => {
        switch (e.fieldname) {
          case "image": patient_update.img = e.filename
            break;
        }
      })

      let data = patient_update._doc;
      patient_update.overwrite({ ...data, ...body })
      const patient = await patient_update.save()
      res.status(200).send({ data: patient, msg: "Bedspace updated" })
    } catch (err) {
      res.status(500).json({
        msg: 'Server error occured',
      });
    }
  });


  // DELETE PATIENT DATA
  app.delete('/patients/:id', async (req, res) => {
    const { id } = req.params;
    let deletedpatient = await Patient.findById(id);
    if (!deletedpatient) return res.status(404).json({ msg: 'Patient not found' });
    deletebedspace.remove();

    res.status(200).send({ msg: "Patient deleted" })

  });

  // SOFT-DELETE PATIENT DATA
  app.delete('/patients/:id', async (req, res) => {
    const { id } = req.params;
    let deletedpatient = await Patient.findById(id);
    if (!deletedpatient) return res.status(404).send({ msg: 'Patient not found' });
    const deleted = { ...deletedpatient, deleted: true };
    await deleted.save();
    res.status(200).send({ msg: "Patient deleted" });
  });


  module.exports = routes;































  // CREATE BED SPACE
  app.post("/bedspaces", async (req, res) => {
    let { bed_number, ward_id, department_id, branch_id, card_no, phone_number, is_occupied } = req.body
    try {
      let bedspace = await BedSpace.findOne({ bed_number })
      if (bedspace) {
        return res.status(404).send({ data: bedspace, msg: "Bedspace already exist" })
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
      res.status(200).send({ data: bedspace, msg: "Bedspace created" })
    } catch (error) {
      res.status(500).send({ msg: "Server error occurs" })
    }
  })

  // EDIT BEDSPACE INFORMATION
  app.put("/bedspaces/:id", async (req, res) => {
    try {
      let { id } = req.params
      let { body } = req;
      let bedspaceUpdate = await BedSpace.findById(id)
      if (!bedspaceUpdate) return res.status(404).send({ msg: "Bed space not found" })
      let data = bedspaceUpdate._doc;
      bedspaceUpdate.overwrite({ ...data, ...body })
      const bedspace = await bedspaceUpdate.save()
      res.status(200).send({ data: bedspace, msg: "Bedspace updated" })
    } catch (error) {
      res.status(500).send({ msg: "Server error occurs" })
    }
  })

  // DELETE BEDSPACE
  app.delete("/bedspaces/:id", async (req, res) => {
    try {
      let { id } = req.params
      let deletebedspace = await BedSpace.findById(id)
      if (!deletebedspace) return res.status(404).send({ msg: "Bedspace doesn't exist" })

      deletebedspace.remove();

      res.status(200).send({ msg: "Bedspace deleted" })
    } catch (error) {
      res.send({ msg: "Server error occurs" })
    }
  })


  app.post("/register", async (req, res) => {
    let { username, phone_number, email, password } = req.body
    try {
      let user = await User.findOne({ username })
      if (user) {
        return res.status(200).send({ user, msg: "User alrady exist" })
      }

      // const hashPassword = await bcrypt.hash(password, 12)
      user = new User({
        username,
        phone_number,
        email,
        password
      })
      await user.save()
      res.status(200).send({ msg: "User created" })
      // const newUser = await user.save()
      // const payload = {user: {_id: newUser._id} }
      // const token = jwt.sign(payload, "iammanuelka", { expiration: "1hr" })
      // res.send({ msg: "User created", code: 200, token })
    } catch (err) {
      console.log(err)
      res.status(400).send({ msg: "Server error" })
    }
  })


  app.post("/login", async (req, res) => {
    const { username, password } = req.body
    try {
      let user = await User.findOne({ username })

      if (!user) {
        return res.status(200).send({ msg: "Invalid credentils" })
      }

      // const isMatch = await bcrypt.compare(password, user.password)
      let isMatch = await user.password === password
      if (!isMatch) {
        return res.status(200).send({ msg: "Invalid credentials" })
      }

      await user.save()
      res.status(200).send({ user, msg: "Login succesful" })

      // const payload = {user: {_id: user._id} }
      // const token = jwt.sign(payload, "iammanuelka", { expiration: "1hr" })
      // res.send({ msg: "User created", code: 200, token })

    } catch (err) {
      console.log(err)
      res.status(500).send({ msg: "Server error", code: 500 })
    }
  })

  app.put("/updateuser/:_id", async (req, res) => {
    try {
      let { _id } = req.params
      let { body } = req;
      let userUpdate = await User.findById(_id)
      if (!userUpdate) return res.json({ msg: "User not found", code: 404 })

      let data = userUpdate._doc;
      userUpdate.overwrite({ ...data, ...body })
      const user = await userUpdate.save()
      res.status(200).send({ user, msg: "Post updated" })
    } catch (err) {
      console.log(err)
      res.send("Server error")
    }
  })



  app.delete("/deleteuser/:_id", async (req, res) => {
    try {
      let { _id } = req.params
      let deleteuser = await User.findById(_id)

      if (!deleteuser) return res.status(200).send({ msg: "User doesn't exist" })

      deleteuser.remove();

      res.status(200).send({ msg: "User deleted" })
    } catch (err) {
      console.log(err)
      res.send("Server error")
    }
  })


}

module.exports = routes