const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AppointmentSchema = new Schema({
    appointment_number:{type: Number, unique:true},
    patient_id:{type:Schema.Types.ObjectId, ref:'users'}, 
    created_by:{type:Schema.Types.ObjectId, ref:'users'}, 
    to_see:{type:Schema.Types.ObjectId, ref:'users'}, 
    booked_on:{type:String},
    department_id:{type:Schema.Types.ObjectId, ref:'departments'},  
    branch_id:{type:Schema.Types.ObjectId, ref:'branches'}, 
    pending:{type: Boolean, default:true},
    confirmed:{type: Boolean, default:false},    
    completed:{type: Boolean, default:false}},
    {
        timestamps:true
    }
)

const Appointment = mongoose.model('appointments', AppointmentSchema)
module.exports=Appointment;

    // The booked on string is a timestamp 
    // when a new appointment is created, it will read pending
    // if confirmed is false and pending true; it reads pending on the user end but shows two buttons on the doctors end; that is confirm or decline.
    // if doctor confirms appointment; confirmed is true and pending false; 
    // if doctor declines appointment; confirmed is false and pending false; 