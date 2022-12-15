// const { json } = require('express'); 
const Department = require('../../models/department')
// const config = require ("config")
// const bcypt = require ("bcrypt.js")
// const jwt = require("jsonwebtoken");

const routes = function (app) { 

     // GET ALL DEPARTMENTS
     app.get("/departments", async (req, res) => {
        try {
            let department = await Department.find();
            res.status(200).send({department, msg:"Gotten departments succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET ONE DEPARTMENT
    app.get("/department", async (req, res) => {
        let { name } = req.body
        try {
            let department = await Department.findOne({ number })
            if (!department) {
                return res.status(200).send({msg:"Department does not exist"})
            }
            res.status(200).send({department, msg:"Gotten Department succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // CREATE DEPARTMETNTS
    app.post("/createdepartment", async (req, res) => {
        let {  name, branch_id, contact_number } = req.body
        try {
            let department = await Department.findOne({ name })
            if (department) {
                return res.status(200).send({bedspace, msg:"Bedspace alrady exist"})
            }
            department = new Department({ 
                name,
                branch_id, 
                contact_number
            })
            await department.save()
            res.status(200).send({department, msg:"Department created"}) 
        } catch (err) {
            console.log(err)
            res.status(400).send({msg: "Server error"})
        }
    })

    // EDIT DEPARTMENT INFORMATION
    app.put("/updatedepartment/:_id", async (req, res) => {
        try {
            let { _id } = req.params
            let { body } = req;
            let departmentUpdate = await Department.findById(_id)
            if (!departmentUpdate) return res.json({ msg: "Department not found", code: 404})

            let data = departmentUpdate._doc;
            departmentUpdate.overwrite({ ...data, ...body })
           const department = await departmentUpdate.save()
            res.status(200).send({department, msg: "Department updated"})
        } catch (err) {
            console.log(err)
            res.send("Server error")
        }
    })

    // DELETE DEPARTMENT
    app.delete("/deletedepartment/:_id", async (req, res) => {
        try {
            let { _id } = req.params
            let deletedepartment = await Department.findById(_id)

            if (!deletedepartment) return res.status(200).send({ msg: "Department doesn't exist"})

            deletedepartment.remove();

            res.status(200).send({ msg: "Department deleted"})
        } catch (err) {
            console.log(err)
            res.send("Server error")
        }
    })
   
}

module.exports = routes