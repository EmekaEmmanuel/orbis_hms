const BedSpace = require('../../models/bedspace') 

const routes = function (app) {

    // GET ALL BEDSPACES IN THE BRANCH
    app.get("/bedspaces", async (req, res) => {
        const { branch_id } = req.query
        try {
            let bedspace = await BedSpace.find({ branch_id })
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

    // GET  ONE BEDSPACE IN THE BRANCH
    app.get("/bedspaces/branch/one", async (req, res) => {
        let { bed_number, branch_id } = req.query
        try {
            let bedspace = await BedSpace.findOne({ bed_number, branch_id })
            if (!bedspace) {
                return res.status(404).send({msg:"Bedspace does not exist in the branch"})
            }
            res.status(200).send({data:bedspace, msg:"Gotten Bedspace succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET ALL BEDSPACES IN A BRANCH WARD
    app.get("/bedspaces/ward", async (req, res) => {
        let { branch_id, ward_id } = req.query
        try {
            let bedspace = await BedSpace.find({ branch_id, ward_id })
            if (!bedspace) {
                return res.status(404).send({msg:"Bedspace does not exist in the branch"})
            }
            res.status(200).send({data:bedspace, msg:"Gotten Bedspace succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET  ONE BEDSPACE IN THE WARD
    app.get("/bedspaces/ward/one", async (req, res) => {
        let { bed_number, ward_id } = req.query
        try {
            let bedspace = await BedSpace.findOne({ bed_number, ward_id })
            if (!bedspace) {
                return res.status(404).send({msg:"Bedspace does not exist in the branch"})
            }
            res.status(200).send({data:bedspace, msg:"Gotten Bedspace succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    }) 

    // GET NUMBER OF WARD BEDSPACES OCCUPIED STATUS 
    app.get("/bedspaces/occupied", async (req, res) => {
        let { boolean_value } = req.query
        try {
            let bedspace = await BedSpace.find({ is_occupied:boolean_value, ward_id }).sort(-1)
            if (!bedspace) {
                return res.status(404).send({msg:"Bedspace does not exist in the branch"})
            }
            res.status(200).send({data:bedspace, msg:"Gotten Bedspace succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET NUMBER OF BRANCH BEDSPACES OCCUPIED STATUS 
    app.get("/bedspaces/occupied", async (req, res) => {
        let { boolean_value, branch_id } = req.query
        try {
            let bedspace = await BedSpace.find({ is_occupied:boolean_value, branch_id }).sort(-1)
            if (!bedspace) {
                return res.status(404).send({msg:"Bedspace does not exist in the branch"})
            }
            res.status(200).send({data:bedspace, msg:"Gotten Bedspace succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // CREATE BED SPACE
    app.post("/bedspaces", async (req, res) => {
        let { bed_number, ward_id, department_id, branch_id, card_no, phone_number, is_occupied, created_bedspace } = req.body
        try {
            let bedspace = await BedSpace.findOne({ bed_number })
            if (bedspace) {
                return res.status(404).send({data:bedspace, msg:"Bedspace already exist"})
            }
            bedspace = new BedSpace({ 
                bed_number, 
                ward_id, 
                department_id, 
                branch_id, 
                card_no, 
                phone_number,
                is_occupied,
                created_bedspace
            })
            await bedspace.save()
            res.status(200).send({data:bedspace, msg:"Bedspace created"}) 
        } catch (error) { 
            res.status(500).send({msg: "Server error occurs"})
        }
    })

    // EDIT BEDSPACE INFORMATION
    app.put("/bedspaces/:_id", async (req, res) => {
        try {
            let { _id } = req.params
            let { body } = req;
            let bedspace_update = await BedSpace.findById(_id)
            if (!bedspace_update) return res.status(404).send({ msg: "Bed space not found"})
            let data = bedspaceUpdate._doc;
            bedspace_update.overwrite({ ...data, ...body })
           const bedspace = await bedspace_update.save()
            res.status(200).send({data:bedspace, msg: "Bedspace updated"})
        } catch (error) { 
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // DELETE BEDSPACE
    app.delete("/bedspaces/:id", async (req, res) => {
        try {
            let { id } = req.params
            let delete_bedspace = await BedSpace.findById(id)
            if (!delete_bedspace) return res.status(404).send({ msg: "Bedspace doesn't exist"})

            delete_bedspace.remove();

            res.status(200).send({ msg: "Bedspace deleted"})
        } catch (error) { 
            res.status(500).send({msg:"Server error occurs"})
        }
    })

}

module.exports = routes