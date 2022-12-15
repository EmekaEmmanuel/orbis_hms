// const { json } = require('express');
const DrugStore = require('../../models/drugstore')
const DrugGeneric = require('../../models/druggeneric')
// const config = require ("config")
// const bcypt = require ("bcrypt.js")
// const jwt = require("jsonwebtoken");

const routes = function (app) {

     // GET ALL DRUGS IN THE BRANCH STORE
     app.get("/drugstores", async (req, res) => {
        try {
            let drug_store = await DrugStore.find();
            res.status(200).send({data:drug_store, msg:"Gotten all drugs succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

     // GET ALL DRUGS IN THE BRANCH
     app.get("/drugstores", async (req, res) => {
        const { branch_id } = req.query
        try {
            let bedspace = await DrugStore.find({ branch_id })
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

    // GET ONE OF THE DRUG IN THE STORE
    app.get("/drugstore", async (req, res) => {
        let { name, drugGeneric_id, branch_id, } = req.body
        try {
            let drugUnique = await DrugStore.findOne({ name, drugGeneric_id, branch_id })
            if (!drugUnique) {
                return res.status(200).send({msg:"Drug does not exist"})
            }
            res.status(200).send({drugUnique, msg:"Gotten Drug Product succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET ALL OF THE DRUG IN A PARTICULAR BRANCH
    app.get("/drugstore", async (req, res) => {
        let { branch_id, } = req.body
        try {
            let drugBranch = await DrugStore.find({ branch_id })
            if (!drugBranch) {
                return res.status(200).send({msg:"Drug does not exist in this branch"})
            }
            res.status(200).send({drugBranch, msg:"Gotten Drug Product succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // CREATE DRUG GENERIC
    app.post("/createdrug", async (req, res) => {
        let { name, expirydate, batchnumber,  manufacturingDate, drugGeneric_id, branch_id } = req.body
        try {
            let drug = await DrugStore.findOne({ name })
            if (drug) {
                return res.status(200).send({drug, msg:"Drug alrady exist"})
            }
            drug = new DrugStore({ 
                name, 
                expirydate, 
                batchnumber,  
                manufacturingDate, 
                drugGeneric_id, 
                branch_id
            })
            await drug.save()
            res.status(200).send({drug, msg:"Drug created"}) 
        } catch (err) {
            console.log(err)
            res.status(400).send({msg: "Server error"})
        }
    })

    // EDIT DRUG GENERIC INFORMATION
    app.put("/updatedruggeneric/:_id", async (req, res) => {
        try {
            let { _id } = req.params
            let { body } = req;
            let drugStoreUpdate = await DrugStore.findById(_id)
            if (!drugStoreUpdate) return res.json({ msg: "Drug Generic not found", code: 404})

            let data = drugStoreUpdate._doc;
            drugStoreUpdate.overwrite({ ...data, ...body })
           const drugNew = await drugStoreUpdate.save()
            res.status(200).send({drugNew, msg: "Drug Details updated"})
        } catch (err) {
            console.log(err)
            res.send("Server error")
        }
    })

    // DELETE DRUG GENERIC
    app.delete("/deletedruggeneric/:id", async (req, res) => {
        try {
            let { id } = req.params
            let deletedrugStore = await DrugStore.findById(id)

            if (!deletedrugStore) return res.status(200).send({ msg: "Drug doesn't exist"})

            deletedrugStore.remove();

            res.status(200).send({ msg: "Drug is deleted"})
        } catch (err) {
            console.log(err)
            res.send("Server error")
        }
    })
   
}

module.exports = routes