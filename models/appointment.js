const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AppointmentSchema = new Schema({
    appointment_number:{type: Number, unique:true},
    card_no:{type:String, unique:true, required:true}, 
    created_by:{type:String}, 
    role:{type:String, required:true},
    to_see:{type:Schema.Types.ObjectId, ref:'users'}, 
    booked_for:{type:Number},
    department_id:{type:Schema.Types.ObjectId, ref:'departments'},  
    branch_id:{type:Schema.Types.ObjectId, ref:'branches'}, 
    hospital_id:{type:Schema.Types.ObjectId, ref:'hospitals'}, 
    appointment_status:{type: String, default:"PENDING", enum:[ "PENDING", "IN-PROGRESS", "POSTPONED", "DUE", "DECLINED", "CONFIRMED","COMPLETED"]}},
    {
        timestamps:true
    }
)

const Appointment = mongoose.model('appointments', AppointmentSchema)
module.exports=Appointment;

    // The booked on number is a timestamp  