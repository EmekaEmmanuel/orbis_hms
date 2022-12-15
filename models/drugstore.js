const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DrugStoreSchema = new Schema({
    name:{type: String, required:true},
    expirydate:{type: Number,required:true},
    batchnumber:{type:Number, required:true},
    manufacturingDate:{type: Number, required:true},
    drugGeneric_id:{type:Schema.Types.ObjectId, ref:'druggenerics'},
    branch_id:{type:Schema.Types.ObjectId, ref:'branches'},
    company_prod:{type: String, required:true},
    deleted:{type:Boolean, default:false}}, 
    {
        timestamps:true
    }
)

const DrugStore = mongoose.model('drugstores', DrugStoreSchema)
module.exports=DrugStore;