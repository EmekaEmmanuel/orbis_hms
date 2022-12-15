const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DepartmentSchema = new Schema({
    dept_name:{type: String, required:true, unique:true}, 
    prefix:{type: String, required:true},
    img:{type: String, default:"fsdgvbhjnd"}, 
    wardcount:{type: Number, default:0},
    branch_id:{type:Schema.Types.ObjectId, ref:'branches'},   
    phone_number:{type: String},
    deleted:{type:Boolean, default:false}},
    {
        timestamps:true
    }
)

const Department = mongoose.model('departments', DepartmentSchema)
module.exports=Department;