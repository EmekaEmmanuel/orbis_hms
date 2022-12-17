const Waiting = require('../../models/waiting') 


const routes = function (app) {

    // GET ALL WAITING IN THE BRANCH
    app.get("/waits/branch", async (req, res) => {
        const { hospital_id, branch_id, waiting_day } = req.query
        try {
            let waits = await Waiting.find({ waiting_day, hospital_id, branch_id })
            if (!waits) { 
                return res.status(404).send({ 
                    msg: "No waiting in this branch",
                  });
            }
            res.status(200).send({
                data:waits,
                msg:"Gotten all waitings in the Branch succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET ALL EMERGENCY WAITING FOR A STAFF IN A BRANCH
    app.get("/waits/staff/emergency", async (req, res) => {
        const { branch_id, to_see, hospital_id, waiting_day } = req.query
        try {
            let waits = await Waiting.find({ hospital_id, branch_id, to_see, waiting_day })
            if (!waits) { 
                return res.status(404).send({ 
                    msg: "There is no emergency Waiting for this staff ",
                  });
            }
            res.status(200).send({
                data:waits,
                msg:"Gotten Staff Waitings succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET ALL WAITING FOR A STAFF IN A BRANCH
    app.get("/waits/staff", async (req, res) => {
        const { branch_id, to_see, hospital_id, waiting_day } = req.query
        try {
            let waits = await Waiting.find({ hospital_id, branch_id, to_see, waiting_day })
            if (!waits) { 
                return res.status(404).send({ 
                    msg: "There is no Waiting for this staff ",
                  });
            }
            res.status(200).send({
                data:waits,
                msg:"Gotten Staff Waitings succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

   

    // TODO:
    // GET ALL PENDING, COMPLETED, IN-PROGRESS, DECLINED, CONFIRMED FOR BRANCH, WARD, STAFF, PATIENT
    
    // CREATE WAITING
    app.post("/waits", async (req, res) => {
        let {waiting_number, waiting_day, is_emergency, department, branch, hospital, to_see, completed, created_waiting } = req.body
            req.body.waiting_number = await Waiting.find({branch_id, hospital_id, department, to_see}).count() + 1
            
        try {
            let waits = await Waiting.findOne({ waiting_number })
            if (waits) {
                return res.status(404).send({data:waits, msg:"Waiting already exist"})
            }

            waits = new Waiting({ waiting_number, waiting_day, is_emergency, department, branch, hospital, to_see, completed, created_waiting })
            await Waiting.save()
            res.status(200).send({data:waits, msg:"Waiting created"}) 
        } catch (error) { 
            res.status(500).send({msg: "Server error occurs"})
        }
    })

    // EDIT WAITING INFORMATION
    app.put("/waits/:_id", async (req, res) => {
        try {
            let { _id } = req.params
            let { body } = req;
            let wait_update = await Waiting.findById(_id)
            if (!wait_update) return res.status(404).send({ msg: "Waiting not found"})
            let data = wait_update._doc;
            wait_update.overwrite({ ...data, ...body })
           const wait = await wait_update.save()
            res.status(200).send({data:wait, msg: "Waiting details updated"})
        } catch (error) { 
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // DELETE WAITING
    app.delete("/waits/:id", async (req, res) => {
        try {
            let { id } = req.params
            let delete_wait = await Waiting.findById(id)
            if (!delete_wait) return res.status(404).send({ msg: "Waiting doesn't exist"})

            delete_wait.remove();

            res.status(200).send({ msg: "Waiting deleted"})
        } catch (error) { 
            res.send({msg:"Server error occurs"})
        }
    })

}

module.exports = routes