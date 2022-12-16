const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DrugGenericSchema = new Schema({
    prefix:{type: String,required:true}, 
    created_generic:{type:Schema.Types.ObjectId, ref:'users'},
    generic_name:{type: String, required:true, unique:true}},
    {
        timestamps:true
    }
)

const DrugGeneric = mongoose.model('druggenerics', DrugGenericSchema)
module.exports=DrugGeneric;