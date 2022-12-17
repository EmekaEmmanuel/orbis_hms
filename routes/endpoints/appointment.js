const Appointment = require('../../models/appointment')
const Patient = require('../../models/patient')


const routes = function (app) {

    // GET ALL APPOINTMENTS IN THE HOSPITAL
    app.get("/appointments", async (req, res) => {
        const { hospital_id } = req.query
        try {
            let appointment = await Appointment.find({ hospital_id })
            if (!appointment) { 
                return res.status(404).send({ 
                    msg: "Appointment does not exist in this hospital",
                  });
            }
            res.status(200).send({
                data:bedspace,
                msg:"Gotten all Appointments in the Hospital succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET ALL APPOINTMENTS IN THE BRANCH
    app.get("/appointments", async (req, res) => {
        const { hospital_id, branch_id } = req.query
        try {
            let appointment = await Appointment.find({ hospital_id, branch_id })
            if (!appointment) { 
                return res.status(404).send({ 
                    msg: "Appointment does not exist in this branch",
                  });
            }
            res.status(200).send({
                data:bedspace,
                msg:"Gotten all Appointments in the Branch succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET ALL APPOINTMENTS IN THE DEPARTMENT
    app.get("/appointments/dept", async (req, res) => {
        const { hospital_id, branch_id, department_id } = req.query
        try {
            let appointment = await Appointment.find({ hospital_id, branch_id, department_id })
            if (!appointment) { 
                return res.status(404).send({ 
                    msg: "Appointment does not exist in this branch",
                  });
            }
            res.status(200).send({
                data:bedspace,
                msg:"Gotten Department Appointments succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET ALL APPOINTMENTS WITH A STAFF IN A BRANCH
    app.get("/appointments/staff", async (req, res) => {
        const { branch_id, to_see, hospital_id } = req.query
        try {
            let appointment = await Appointment.find({ hospital_id, branch_id, to_see })
            if (!appointment) { 
                return res.status(404).send({ 
                    msg: "There is no Appointment for this staff ",
                  });
            }
            res.status(200).send({
                data:appointment,
                msg:"Gotten Staff Appointments succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET ALL APPOINTMENTS DETAILS WITH A STAFF IN A BRANCH
    app.get("/appointments/staff", async (req, res) => {
        const { hospital_id, branch_id, _id } = req.query
        try {
            let appointment = await Appointment.find({ hospital_id, branch_id, _id })?.populate("to_see").populate("department_id").populate("branch_id")
            if (!appointment) { 
                return res.status(404).send({ 
                    msg: "Appointment doesnt exist",
                  });
            }
            let {card_no} = appointment
            let patient = await Patient.findOne({ card_no })
            res.status(200).send({
                data:[appointment, patient],
                msg:"Gotten Patient Appointment details succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // GET PATIENT APPOINTMENTS 
    app.get("/appointments/patient", async (req, res) => {
        const { card_no, } = req.query
        try {
            let appointment = await Appointment.find({ card_no }).sort(-1)
            if (!appointment) { 
                return res.status(404).send({ 
                    msg: "There is no Appointment for this patient",
                  });
            }
            res.status(200).send({
                data:appointment,
                msg:"Gotten Patient Appointment succesfully"})  
        } catch (error) {
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // TODO:
    // GET ALL PENDING, COMPLETED, IN-PROGRESS, DECLINED, CONFIRMED FOR BRANCH, WARD, STAFF, PATIENT
    
    // CREATE APPOINTMENT
    app.post("/appointments", async (req, res) => {
        let {appointment_number, card_no, created_by, role, to_see, booked_for, department_id, branch_id,
            appointment_status } = req.body
        try {
            let appointment = await Appointment.findOne({ appointment_number })
            if (appointment) {
                return res.status(404).send({data:appointment, msg:"Appointment already exist"})
            }

            appointment = new Appointment({ 
              appointment_number, card_no, created_by, role, to_see, booked_for, department_id, branch_id, appointment_status
            })
            await appointment.save()
            res.status(200).send({data:appointment, msg:"Appointment created"}) 
        } catch (error) { 
            res.status(500).send({msg: "Server error occurs"})
        }
    })

    // EDIT APPOINTMENT INFORMATION
    app.put("/appointments/:_id", async (req, res) => {
        try {
            let { _id } = req.params
            let { body } = req;
            let appointment_update = await Appointment.findById(_id)
            if (!appointment_update) return res.status(404).send({ msg: "Appointment not found"})
            let data = appointment_update._doc;
            appointment_update.overwrite({ ...data, ...body })
           const appointment = await appointment_update.save()
            res.status(200).send({data:appointment, msg: "Appointment details updated"})
        } catch (error) { 
            res.status(500).send({msg:"Server error occurs"})
        }
    })

    // DELETE APPOINTMENT
    app.delete("/appointments/:id", async (req, res) => {
        try {
            let { id } = req.params
            let delete_appointment = await Appointment.findById(id)
            if (!delete_appointment) return res.status(404).send({ msg: "Appointment doesn't exist"})

            delete_appointment.remove();

            res.status(200).send({ msg: "Appointment deleted"})
        } catch (error) { 
            res.send({msg:"Server error occurs"})
        }
    })

}

module.exports = routes