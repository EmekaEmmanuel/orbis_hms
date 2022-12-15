// const { json } = require('express');
const DrugStore = require('../../models/drugStore')
const DrugGeneric = require('../../models/drugGeneric')
// const config = require ("config")
// const bcypt = require ("bcrypt.js")
// const jwt = require("jsonwebtoken");

const routes = function (app) { 

     // GET ALL GENERIC DRUGS
     app.get("/druggenerics", async (req, res) => {
        try {
            let drugGeneric = await DrugGeneric.find();
            res.status(200).send({drugGeneric, msg:"Gotten generic drugs succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET ONE OF THE GENERIC
    app.get("/druggeneric", async (req, res) => {
        let { name } = req.body
        try {
            let drugGeneric = await DrugGeneric.findOne({ name })
            if (!department) {
                return res.status(200).send({msg:"Drug Generic does not exist"})
            }
            res.status(200).send({department, msg:"Gotten Department succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET ONE OF THE GENERIC DRUG AND PRODUCTS UNDER IT
    app.get("/druggeneric", async (req, res) => {
        let { name } = req.body
        try {
            let drugGeneric = await DrugGeneric.findOne({ name })
            if (!drugGeneric) {
                return res.status(200).send({msg:"Drug Generic does not exist"})
            }
            let {_id} = drugGeneric
            let drugProducts = await DrugStore.find({ _id })
            res.status(200).send({drugProducts, drugGeneric, msg:"Gotten Drug Products and Drug Generics succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // CREATE DRUG GENERIC
    app.post("/createdruggeneric", async (req, res) => {
        let { name, company_prod, } = req.body
        try {
            let drugGeneric = await DrugGeneric.findOne({ name })
            if (drugGeneric) {
                return res.status(200).send({drugGeneric, msg:"Drug Generic alrady exist"})
            }
            drugGeneric = new DrugGeneric({ 
                name, 
                company_prod
            })
            await drugGeneric.save()
            res.status(200).send({drugGeneric, msg:"Drug Generic created"}) 
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
            let drugGenericUpdate = await DrugGeneric.findById(_id)
            if (!drugGenericUpdate) return res.json({ msg: "Drug Generic not found", code: 404})

            let data = drugGenericUpdate._doc;
            drugGenericUpdate.overwrite({ ...data, ...body })
           const drugGeneric = await drugGenericUpdate.save()
            res.status(200).send({drugGeneric, msg: "Drug Generic updated"})
        } catch (err) {
            console.log(err)
            res.send("Server error")
        }
    })

    // DELETE DRUG GENERIC
    app.delete("/deletedruggeneric/:_id", async (req, res) => {
        try {
            let { _id } = req.params
            let deletedrugGeneric = await DrugGeneric.findById(_id)

            if (!deletedrugGeneric) return res.status(200).send({ msg: "Drug Generic doesn't exist"})

            deletedrugGeneric.remove();

            res.status(200).send({ msg: "Drug Generic deleted"})
        } catch (err) {
            console.log(err)
            res.send("Server error")
        }
    })
   
}

module.exports = routes