// const { json } = require('express');
const DrugStore = require('../../models/drugstore')
const DrugGeneric = require('../../models/druggeneric')
const DrugPool = require('../../models/pooldrug')
const PoolDrug = require('../../models/pooldrug')
// const config = require ("config")
// const bcypt = require ("bcrypt.js")
// const jwt = require("jsonwebtoken");

const routes = function (app) {

    // GET ALL DRUGS IN THE BRANCH STORE
    app.get("/drugstores", async (req, res) => {
        try {
            let drug_store = await DrugStore.find({ branch_id });
            res.status(200).send({ data: drug_store, msg: "Gotten all drugs succesfully" })
        } catch (error) {
            res.status(500).send({ msg: "Server error occurs" })
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
                data: bedspace,
                msg: "Gotten Branch Bedspaces succesfully"
            })
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
            let drugFn = async (drug, DrugStore, drug_id, name, expirydate, batchnumber, manufacturingDate, drugGeneric_id, branch_id) => {

                let { name, expirydate, batchnumber, manufacturingDate, drugGeneric_id, branch_id } = req.body

                let drug = await DrugStore.findOne({ name })
                if (drug) {
                    return res.status(404).send({ data: drug, msg: "Drug already exist in branch" })
                }
                drug = new DrugStore({
                    drug_id,
                    name,
                    expirydate,
                    batchnumber,
                    manufacturingDate,
                    drugGeneric_id,
                    branch_id
                })
                await drug.save()
            }

            let poolDrugFn = async (drug, DrugStore, drug_id, name, expirydate, batchnumber, manufacturingDate, drugGeneric_id, branch_id) => {
                let { name, expirydate, batchnumber, manufacturingDate, drugGeneric_id, branch_id } = req.body
                let pool_drug = await DrugPool.findOne({ name })
                if (pool_drug) {
                    return res.status(4).send({ data: pool_drug, msg: "Drug alrady exist in pool" })
                }
                pool_drug = new DrugPool({
                    drug_id,
                    name,
                    expirydate,
                    batchnumber,
                    manufacturingDate,
                    drugGeneric_id,
                    branch_id
                })
                await pool_drug.save()
            }
            let results = Promise.allSettled([drugFn, poolDrugFn])
            res.status(200).send({ data: results, msg: "Drug created in the pool and branch store" })
        } catch (error) {
            res.status(500).send({ msg: "Server error" })
        }
    })

     // EDIT DRUG PRODUCT IN BRANCH AND POOL SIMULTANEOUSLY 
    app.put("/drugstores/:_id", async (req, res) => {
        try {
            let drugFn = async (_id, body) => {
                let { _id } = req.params
                let { body } = req;
                let drugStoreUpdate = await DrugStore.findById(_id)
                if (!drugStoreUpdate) return res.json({ msg: "Drug Generic not found", code: 404 })

                let data = drugStoreUpdate._doc;
                drugStoreUpdate.overwrite({ ...data, ...body })
                const drugNew = await drugStoreUpdate.save()
                return drugNew
            }

            let poolDrugFn = async (_id, body) => {
                let { _id } = req.params
                let { body } = req;
                let drugStoreUpdate = await PoolDrug.findById(_id)
                if (!drugStoreUpdate) return res.json({ msg: "Drug Generic not found", code: 404 })

                let data = drugStoreUpdate._doc;
                drugStoreUpdate.overwrite({ ...data, ...body })
                const drugNew = await drugStoreUpdate.save()
                return drugNew
            }
            let results = Promise.allSettled([drugFn, poolDrugFn])
            res.status(200).send({ data: results, msg: "Drug Details updated in pool and branch" })
        } catch (err) {
            console.log(err)
            res.status(500).send("Server error")
        }
    })

    // DELETE DRUG PRODUCT IN BRANCH AND POOL SIMULTANEOUSLY  
    app.delete("/drugstores/:_id", async (req, res) => {
        try {
            let drugFn = async (_id) => {
                let { _id } = req.params
                let deletedrugStore = await DrugStore.findById(_id)

                if (!deletedrugStore) return res.status(200).send({ msg: "Drug doesn't exist" })

                deletedrugStore.remove();
            }

            let poolDrugFn = async (id) => {
                let { _id } = req.params
                let deletedrugStore = await DrugStore.findById(_id)

                if (!deletedrugStore) return res.status(200).send({ msg: "Drug doesn't exist" })

                deletedrugStore.remove();
            }
            let results = Promise.allSettled([drugFn, poolDrugFn])
            res.status(200).send({data:results, msg: "Drug is deleted" })
        } catch (error) {
            res.send("Server error")
        }
    })

}

module.exports = routes