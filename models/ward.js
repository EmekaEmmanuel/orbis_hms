const mongoose = require('mongoose');
const Schema = mongoose.Schema

const WardSchema = new Schema({
    ward_name:{type: String, required:true, unique:true}, 
    ward_prefix:{type: String, required:true, unique:true},  
    bedcount:{type: Number}, 
    branch_id:{type:Schema.Types.ObjectId, ref:'branches'},
    contact_number:{type: Number},
    created_ward:{type:Schema.Types.ObjectId, ref:'users'},
    deleted:{type:Boolean, default:false}},
    {
        timestamps:true
    }
)

const Ward = mongoose.model('wards', WardSchema)
module.exports=Ward;