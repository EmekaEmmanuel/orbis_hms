const mongoose = require('mongoose');
const Schema = mongoose.Schema

const WardSchema = new Schema({
    name:{type: String, required:true, unique:true}, 
    prefix:{type: String, required:true}, 
    img:{type: String}, 
    bedcount:{type: Number},
    department_id:{type:Schema.Types.ObjectId, ref:'departments'}, 
    branch_id:{type:Schema.Types.ObjectId, ref:'branches'},
    contact_number:{type: Number},
    deleted:{type:Boolean, default:false}},
    {
        timestamps:true
    }
)

const Ward = mongoose.model('wards', WardSchema)
module.exports=Ward;