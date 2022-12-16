// const { json } = require('express');
const DrugStore = require('../../models/drugstore')
// const DrugGeneric = require('../../models/druggeneric')
const DrugPool = require('../../models/pooldrug')
// const config = require ("config")
// const bcypt = require ("bcrypt.js")
// const jwt = require("jsonwebtoken");

const routes = function (app) {

    // GET ALL DRUGS IN THE SYSTEM
    app.get("/pooldrugs", async (req, res) => {
        try {
            let drug_pool = await DrugPool.find();
            res.status(200).send({ data: drug_pool, msg: "Gotten all drugs in the pool succesfully" })
        } catch (error) {
            res.status(500).send({ msg: "Server error occurs" })
        }
    })

    // GET ALL DRUGS IN THE POOL BELONGING TO A PARTICULAR BRANCH STORE
    app.get("/pooldrugs", async (req, res) => {
        const { branch_id } = req.query
        try {
            let drug_pool = await DrugPool.find({ branch_id });
            res.status(200).send({ data: drug_pool, msg: "Gotten all drugs in the pool succesfully" })
        } catch (error) {
            res.status(500).send({ msg: "Server error occurs" })
        }
    })

    // GET ALL DRUGS IN THE POOL BELONGING TO A PARTICULAR HOSPITAL GROUP
    app.get("/pooldrugs", async (req, res) => {
        const { hospital_id } = req.query
        try {
            let drug_pool = await DrugPool.find({ hospital_id });
            res.status(200).send({ data: drug_pool, msg: "Gotten all drugs in the pool tagged to a hospital succesfully" })
        } catch (error) {
            res.status(500).send({ msg: "Server error occurs" })
        }
    })

    // GET ONE OF THE DRUG IN THE POOL via drug_id
    app.get("/pooldrugs", async (req, res) => {
        let { drug_id, branch_id, } = req.body
        try {
            let drugUnique = await DrugPool.findOne({ drug_id })
            if (!drugUnique) {
                return res.status(200).send({ msg: "Drug does not exist" })
            }
            res.status(200).send({ drugUnique, msg: "Gotten Drug Product in pool succesfully" })
        } catch (error) {
            res.status(500).send({ msg: "Server error occurs" })
        }
    })

    //  COMPLETED
}

module.exports = routes