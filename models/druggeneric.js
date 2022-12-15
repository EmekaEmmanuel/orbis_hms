const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DrugGenericSchema = new Schema({
    id:{type: Number,required:true}, 
    name:{type: String, required:true},
    deleted:{type:Boolean, default:false}},
    {
        timestamps:true
    }
)

const DrugGeneric = mongoose.model('druggenerics', DrugGenericSchema)
module.exports=DrugGeneric;