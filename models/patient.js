const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PatientSchema = new Schema({
    card_no:{type: String, required:true, unique:true},
    first_name:{type: String, required:true},
    surname:{type: String, required:true},
    other_name:{type: String},
    img:{type: String},
    address:{type: String, required:true},
    email:{type: String,required:true},
    password:{type:String, default:"1234"},
    access_key:{type:String, default:"1234"},
    phone_number:{type: Number},
    gender:{type: String, required:true},
    age:{type: String, required:true},
    language_spoken:{type: String, required:true},
    bloodgroup:{type: String},
    genotype:{type: String},
    kin:{type: String},
    kin_phone:{type: String, required:true},
    bed_id:{type:Schema.Types.ObjectId, ref:'bedspaces'}, 
    ward_id:{type:Schema.Types.ObjectId, ref:'wards'},
    department_id:{type:Schema.Types.ObjectId, ref:'departments'}, 
    branch_id:{type:Schema.Types.ObjectId, ref:'branches'}, 
    hospital_id:{type:Schema.Types.ObjectId, ref:'hospitals'},
    created_by:{type:String}, 
    role:{type:String, required:true}, 
    deleted:{type:Boolean, default:false}},
    {
        timestamps:true
    }
)

const Patient = mongoose.model('patients', PatientSchema)
module.exports=Patient;