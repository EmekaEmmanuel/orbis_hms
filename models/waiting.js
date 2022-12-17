const mongoose = require('mongoose');
const Schema = mongoose.Schema

const WaitingSchema = new Schema({
    waiting_number:{type:Number},
    waiting_day:{type:Number},
    is_emergency:{type: Boolean, default:false},
    department_id:{type:Schema.Types.ObjectId, ref:'departments'}, 
    branch_id:{type:Schema.Types.ObjectId, ref:'branches'}, 
    hospital_id:{type:Schema.Types.ObjectId, ref:'hospitals'},
    to_see:{type:Schema.Types.ObjectId, ref:'users'},
    completed:{type:Boolean, default:false},
    created_waiting:{type:Schema.Types.ObjectId, ref:'users'}},
    {
        timestamps:true
    }
)

const Waiting = mongoose.model('waiters', WaitingSchema)
module.exports=Waiting;