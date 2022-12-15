// const { json } = require('express');
const BedSpace = require('../../models/bedspace')
// const config = require ("config")
// const bcypt = require ("bcrypt.js")
// const jwt = require("jsonwebtoken");

const routes = function (app) {

    // GET ALL BEDSPACES IN THE BRANCH
    app.get("/bedspaces/:number", async (req, res) => {
        let { branch_id } = req.query
        try {
            let bedspace = await BedSpace.find({ branch_id })
            if (!bedspace) {
                return res.status(200).send({msg:"Bedspace does not exist in the branch"})
            }
            res.status(200).send({bedspace, msg:"Gotten Bedspace succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET  ONE BEDSPACE IN THE BRANCH
    app.get("/bedspaces/:number", async (req, res) => {
        let { bed_number, branch_id } = req.query
        try {
            let bedspace = await BedSpace.findOne({ bed_number, branch_id })
            if (!bedspace) {
                return res.status(200).send({msg:"Bedspace does not exist in the branch"})
            }
            res.status(200).send({bedspace, msg:"Gotten Bedspace succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET ALL BEDSPACES IN A BRANCH WARD
    app.get("/bedspaces/:number", async (req, res) => {
        let { branch_id, ward_id } = req.query
        try {
            let bedspace = await BedSpace.find({ branch_id, ward_id })
            if (!bedspace) {
                return res.status(200).send({msg:"Bedspace does not exist in the branch"})
            }
            res.status(200).send({bedspace, msg:"Gotten Bedspace succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET  ONE BEDSPACE IN THE WARD
    app.get("/bedspaces/:number", async (req, res) => {
        let { bed_number, ward_id } = req.query
        try {
            let bedspace = await BedSpace.findOne({ bed_number, ward_id })
            if (!bedspace) {
                return res.status(200).send({msg:"Bedspace does not exist in the branch"})
            }
            res.status(200).send({bedspace, msg:"Gotten Bedspace succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    }) 

    // CREATE BED SPACE
    app.post("/bedspaces", async (req, res) => {
        let { number, ward_id, department_id, branch_id, contact_number } = req.body
        try {
            let bedspace = await BedSpace.findOne({ number })
            if (bedspace) {
                return res.status(200).send({bedspace, msg:"Bedspace alrady exist"})
            }
            bedspace = new BedSpace({ 
                number,
                ward_id,
                department_id,
                branch_id,
                contact_number
            })
            await BedSpace.save()
            res.status(200).send({bedspace, msg:"Bedspace created"}) 
        } catch (err) {
            console.log(err)
            res.status(400).send({msg: "Server error"})
        }
    })

    // EDIT BEDSPACE INFORMATION
    app.put("/bedspaces/:id", async (req, res) => {
        try {
            let { id } = req.params
            let { body } = req;
            let bedspaceUpdate = await BedSpace.findById(id)
            if (!bedspaceUpdate) return res.json({ msg: "Bed space not found", code: 404})

            let data = bedspaceUpdate._doc;
            bedspaceUpdate.overwrite({ ...data, ...body })
           const bedspace = await bedspaceUpdate.save()
            res.status(200).send({bedspace, msg: "Bedspace updated"})
        } catch (err) {
            console.log(err)
            res.send("Server error")
        }
    })

    // DELETE BEDSPACE
    app.delete("/bedspaces/:id", async (req, res) => {
        try {
            let { id } = req.query
            let deletebedspace = await Bedspace.findById(id)

            if (!deletebedspace) return res.status(200).send({ msg: "Bedspace doesn't exist"})

            deletebedspace.remove();

            res.status(200).send({ msg: "Bedspace deleted"})
        } catch (err) {
            console.log(err)
            res.send("Server error")
        }
    })

}

module.exports = routes