const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BedSpaceSchema = new Schema({
    bed_number:{type: String, unique:true}, 
    ward_id:{type:Schema.Types.ObjectId, ref:'wards'}, 
    department_id:{type:Schema.Types.ObjectId, ref:'departments'}, 
    branch_id:{type:Schema.Types.ObjectId, ref:'branches'}, 
    card_no:{type: String},
    phone_number:{type: String},
    is_occupied:{type: Boolean, default:false}},
    {
        timestamps:true
    }
)

const BedSpace = mongoose.model('bedspaces', BedSpaceSchema)
module.exports=BedSpace;