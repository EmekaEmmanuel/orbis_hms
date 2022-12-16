// const { json } = require('express');
const DrugStore = require('../../models/drugstore')
const DrugGeneric = require('../../models/druggeneric')
const DrugPool = require('../../models/pooldrug')
// const config = require ("config")
// const bcypt = require ("bcrypt.js")
// const jwt = require("jsonwebtoken");

const routes = function (app) { 

           // GET ALL GENERIC DRUGS IN THE SYSTEM
           app.get("/druggenerics", async (req, res) => { 

            try {
                let drug_generic = await DrugGeneric.find({ branch_id }) 
                res.status(200).send({
                    data: drug_generic,
                    msg: "Gotten Drug Generics succesfully"
                })
            } catch (error) {
                res.status(500).send({ msg: "Server error occurs" })
            }
        })

    // GET ONE OF THE GENERIC
    app.get("/druggenerics", async (req, res) => {
        let { generic_name } = req.query
        try {
            let drug_generic = await DrugGeneric.findOne({ generic_name })
            if (!drug_generic) {
                return res.status(404).send({msg:"Drug Generic does not exist"})
            }
            res.status(200).send({data:drug_generic, msg:"Gotten Drug Generic succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

     // GET ONE OF THE GENERIC DRUG AND PRODUCTS UNDER IT
     app.get("/druggeneric/drugstore", async (req, res) => {
        let { generic_name } = req.query
        try {
            let drug_generic = await DrugGeneric.findOne({ generic_name })
            if (!drug_generic) {
                return res.status(404).send({msg:"Drug Generic does not exist"})
            }
            let {_id} = drug_generic
            let drug_products = await DrugStore.find({ _id })
            res.status(200).send({data:[drug_products, drug_generic], msg:"Gotten Drug Products and Drug Generic succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

     // GET ONE OF THE GENERIC DRUG AND PRODUCTS UNDER IT IN A BRANCH
     app.get("/druggeneric/drugstore", async (req, res) => {
        let { generic_name, branch_id } = req.query
        try {
            let drug_generic = await DrugGeneric.findOne({ generic_name })
            if (!drug_generic) {
                return res.status(404).send({msg:"Drug Generic does not exist"})
            }
            let {_id} = drug_generic
            let drug_products = await DrugStore.find({ _id, branch_id })
            res.status(200).send({data:[drug_products, drug_generic], msg:"Gotten Drug Products and Drug Generic succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })
 
     // GET ONE OF THE GENERIC DRUG AND PRODUCTS UNDER IT IN THE DRUG POOL
     app.get("/druggeneric/drugstore", async (req, res) => {
        let { generic_name } = req.query
        try {
            let drug_generic = await DrugGeneric.findOne({ generic_name })
            if (!drug_generic) {
                return res.status(404).send({msg:"Drug Generic does not exist"})
            }
            let {_id} = drug_generic
            let drug_pool_products = await DrugPool.find({ _id })
            res.status(200).send({data:[drug_pool_products, drug_generic], msg:"Gotten Drug Pool and Drug Generic succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

      // CREATE DRUG GENERIC
      app.post("/druggenerics", async (req, res) => {
        let { generic_name, prefix, } = req.body
        try {
            let drug_generic = await DrugGeneric.findOne({ generic_name })
            if (drug_generic) {
                return res.status(404).send({data:drug_generic, msg:"Drug Generic already exist"})
            }
            drug_generic = new DrugGeneric({ 
                generic_name, 
                prefix,
                created_generic
            })
            await drug_generic.save()
            res.status(200).send({data:drug_generic, msg:"Drug Generic created"}) 
        } catch (error) { 
            res.status(500).send({msg: "Server error"})
        }
    })

       // EDIT DEPARTMENT INFORMATION
       app.put("/druggenerics/:_id", async (req, res) => {
        try {
            let { _id } = req.params
            let { body } = req;
            let drug_generic_update = await DrugGeneric.findById(_id)
            if (!drug_generic_update) return  res.status(404).send({ msg: "Drug Generic not found" })

            let data = drug_generic_update._doc;
            drug_generic_update.overwrite({ ...data, ...body })
            const drug_generic = await drug_generic_update.save()
            res.status(200).send({ data:drug_generic, msg: "Drug Generic updated" })
        } catch (err) {
            console.log(err)
            res.send("Server error")
        }
    })
   
    // DELETE DRUG GENERIC
    app.delete("/druggenerics/:_id", async (req, res) => {
        try {
            let { _id } = req.params
            let deletedrug_generic = await DrugGeneric.findById(_id)

            if (!deletedrug_generic) return res.status(404).send({ msg: "Drug Generic doesn't exist"})

            deletedrugGeneric.remove();

            res.status(200).send({ msg: "Drug Generic deleted"})
        } catch (err) {
            console.log(err)
            res.status(500).send("Server error")
        }
    })
   
}

module.exports = routes