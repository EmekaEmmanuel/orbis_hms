// const { json } = require('express');
const User = require('../../models/users')
const Ward = require('../../models/ward')
// const config = require ("config")
// const bcypt = require ("bcrypt.js")
// const jwt = require("jsonwebtoken");

const routes = function (app) { 

     // GET ALL WARDS IN THE BRANCH
     app.get("/wards", async (req, res) => {
        const { branch_id } = req.query
        try {
            let ward = await Ward.find({ branch_id }) 
            res.status(200).send({
                data:ward,
                msg:"Gotten Wards succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

     // GET A WARD IN THE BRANCH VIA WARD NAME
     app.get("/wards/wardname", async (req, res) => {
        const { branch_id, ward_name } = req.query
        try {
            let ward = await Ward.find({ ward_name, branch_id })
            if (!ward) { 
                return res.status(404).send({ 
                    msg: "Ward does not exist in the branch",
                  });
            }
            res.status(200).send({
                data:ward,
                msg:"Gotten Ward succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

     // GET A WARD IN THE BRANCH VIA PREFIX
     app.get("/wards/wardprefix", async (req, res) => {
        const { branch_id, ward_prefix } = req.query
        try {
            let ward = await Ward.find({ ward_prefix, branch_id })
            if (!ward) { 
                return res.status(404).send({ 
                    msg: "Ward does not exist in the branch",
                  });
            }
            res.status(200).send({
                data:ward,
                msg:"Gotten Ward succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // CREATE WARD
    app.post("/wards", async (req, res) => {
        let { ward_name, ward_prefix, bedcount, branch_id, contact_number, created_ward } = req.body
        try {
            let ward = await Ward.findOne({ ward_name, ward_prefix })
            if (ward) {
                return res.status(404).send({data:ward, msg:"Ward already exist"})
            }
            ward = new Ward({ 
                ward_name,
                ward_prefix,
                bedcount,
                branch_id,
                contact_number,
                created_ward,
                deleted 
            })
            await wardward.save()
            res.status(200).send({data:bedspace, msg:"Ward created"}) 
        } catch (error) { 
            res.status(500).send({msg: "Server error occurs"})
        }
    })

    // EDIT WARD INFORMATION
    app.put("/wards/:id", async (req, res) => {
        try {
            let { id } = req.params
            let { body } = req;
            let ward_update = await Ward.findById(id)
            if (!ward_update) return res.status(404).send({ msg: "Ward not found"})
            let data = ward_update._doc;
            ward_update.overwrite({ ...data, ...body })
           const ward = await ward_update.save()
            res.status(200).send({data:ward, msg: "Ward details updated"})
        } catch (error) { 
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // DELETE WARD
    app.delete("/wards/:id", async (req, res) => {
        try {
            let { id } = req.params
            let deleteward = await Ward.findById(id)
            if (!deleteward) return res.status(404).send({ msg: "Ward doesn't exist"})

            deleteward.remove();

            res.status(200).send({ msg: "Ward deleted"})
        } catch (error) { 
            res.send({msg:"Server error occurs"})
        }
    })
   
}

module.exports = routes