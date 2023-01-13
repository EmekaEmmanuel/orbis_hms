const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DrugStoreSchema = new Schema({
    drug_id:{type:String, required:true, unique:true},
    name:{type: String, required:true},
    expirydate:{type: Number,required:true},
    batchnumber:{type:Number, required:true},
    manufacturing_date:{type: Number, required:true},
    drug_generic_id:{type:Schema.Types.ObjectId, ref:'druggenerics'},
    branch_id:{type:Schema.Types.ObjectId, ref:'branches'},
    hospital_id:{type:Schema.Types.ObjectId, ref:'hospitals'},
    company_produce:{type: String, required:true},
    entered_drug:{type:Schema.Types.ObjectId, ref:'users'},
    deleted:{type:Boolean, default:false}}, 
    {
        timestamps:true
    }
)

const DrugStore = mongoose.model('drugstores', DrugStoreSchema)
module.exports=DrugStore;