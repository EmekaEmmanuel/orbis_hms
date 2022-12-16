// const { json } = require('express');
const DrugStore = require('../../models/drugstore')
const DrugGeneric = require('../../models/druggeneric')
// const config = require ("config")
// const bcypt = require ("bcrypt.js")
// const jwt = require("jsonwebtoken");

const routes = function (app) {

    // GET ALL DRUGS IN THE SYSTEM
    app.get("/drugstores", async (req, res) => {
        try {
            let drug_store = await DrugStore.find();
            res.status(200).send({ data: drug_store, msg: "Gotten all drugs succesfully" })
        } catch (error) {
            res.status(500).send({ msg: "Server error occurs" })
        }
    })

    // GET ALL DRUGS IN THE BRANCH
    app.get("/drugstores/branch", async (req, res) => {
        const { branch_id } = req.query
        try {
            let drugstore = await DrugStore.find({ branch_id, hospital_id })
            if (!drugstore) {
                return res.status(404).send({
                    msg: "Bedspace does not exist in the branch",
                });
            }
            res.status(200).send({
                data: ddrugstore,
                msg: "Gotten Drugs in branch succesfully"
            })
        } catch (error) {
            res.status(500).send({ msg: "Server error occurs" })
        }
    })

    // GET ONE OF THE GENERIC DRUG AND PRODUCTS UNDER IT 
    app.get("/druggeneric/drugstore", async (req, res) => {
        let { generic_name, branch_id, hospital_id } = req.query
        try {
            let drug_generic = await DrugGeneric.findOne({ generic_name })
            if (!drug_generic) {
                return res.status(404).send({ msg: "Drug Generic does not exist" })
            }
            let { _id } = drug_generic
            let drug_products = await DrugStore.find({ _id, branch_id, hospital_id })
            if (drug_products) {
                return res.status(200).send({ data: [drug_products, drug_generic], msg: "Gotten Drug Products and Drug Generic succesfully" })
            }
            else {
                let drug_products_alt = await DrugStore.find({ _id })
                res.status(200).send({ data: [drug_products_alt, drug_generic], msg: "Gotten Drug Products from different branch succesfully" })
            }
        } catch (error) {
            res.status(500).send({ msg: "Server error occurs" })
        }
    })

    // GET ONE OF THE DRUG IN THE STORE VIA name
    app.get("/drugstores", async (req, res) => {
        let { name, drugGeneric_id, branch_id, } = req.body
        try {
            let drugUnique = await DrugStore.findOne({ name, drugGeneric_id, branch_id, })
            if (!drugUnique) {
                return res.status(200).send({ msg: "Drug does not exist" })
            }
            res.status(200).send({ drugUnique, msg: "Gotten Drug Product succesfully" })
        } catch (error) {
            res.status(500).send({ msg: "Server error occurs" })
        }
    })

    // GET ONE OF THE DRUG IN THE BRANCH STORE VIA drug_id
    app.get("/drugstores", async (req, res) => {
        let { drug_id, branch_id, } = req.body
        try {
            let drugUnique = await DrugStore.findOne({ drug_id, branch_id })
            if (!drugUnique) {
                return res.status(200).send({ msg: "Drug does not exist" })
            }
            res.status(200).send({ drugUnique, msg: "Gotten Drug Product succesfully" })
        } catch (error) {
            res.status(500).send({ msg: "Server error occurs" })
        }
    })

    // CREATE DRUG PRODUCT IN BRANCH AND POOL SIMULTANEOUSLY
    app.post("/drugstores", async (req, res) => {

        try {
            let { name, expirydate, batchnumber, manufacturingDate, drugGeneric_id, branch_id, hospital_id } = req.body

            let new_drug = new DrugStore({
                drug_id,
                name,
                expirydate,
                batchnumber,
                manufacturingDate,
                drugGeneric_id,
                branch_id,
                hospital_id,
                entered_drug
            })
            let drug = await new_drug.save()

            res.status(200).send({ data: drug, msg: "Drug created" })
        } catch (error) {
            res.status(500).send({ msg: "Server error" })
        }
    })

    // EDIT DRUG PRODUCT IN BRANCH AND POOL SIMULTANEOUSLY 
    app.put("/drugstores/:_id", async (req, res) => {
        let { _id } = req.params
        let { body } = req

        try {
            let drug_store_update = await DrugStore.findOne(_id, body.hospital_id, body.branch_id)
            if (!drug_store_update) return res.json({ msg: "Drug not found", code: 404 })

            let data = drug_store_update._doc;
            drug_store_update.overwrite({ ...data, ...body })
            const drug_new = await drug_store_update.save()
            res.status(200).send({ data: drug_new, msg: "Drug Details updated" })
        } catch (err) {
            console.log(err)
            res.status(500).send("Server error")
        }
    })

    // DELETE DRUG PRODUCT IN BRANCH AND POOL SIMULTANEOUSLY  
    app.delete("/drugstores/:_id", async (req, res) => {
        let { _id } = req.params
        let { hospital_id, branch_id } = req.query

        try {

            let deletedrug_store = await DrugStore.findOne(_id, hospital_id, branch_id)
            if (!deletedrug_store) return res.status(4040).send({ msg: "Drug doesn't exist" })
            deletedrug_store.remove();
            res.status(200).send({ msg: "Drug is deleted" })
        } catch (error) {
            res.status(200).send({msg:"Server error"})
        }
    })

}

module.exports = routes