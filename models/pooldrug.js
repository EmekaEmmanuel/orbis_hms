const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PoolDrugSchema = new Schema({
    drug_id:{type:String, required:true, unique:true},
    name:{type: String, required:true},
    expirydate:{type: Number,required:true},
    batchnumber:{type:Number, required:true},
    manufacturingDate:{type: Number, required:true},
    drugGeneric_id:{type:Schema.Types.ObjectId, ref:'druggenerics'},
    branch_id:{type:Schema.Types.ObjectId, ref:'branches'},
    hospital_id:{type:Schema.Types.ObjectId, ref:'hospitals'},
    company_prod:{type: String, required:true},
    deleted:{type:Boolean, default:false}}, 
    {
        timestamps:true
    }
)

const PoolDrug = mongoose.model('pooldrugs', PoolDrugSchema)
module.exports=PoolDrug;