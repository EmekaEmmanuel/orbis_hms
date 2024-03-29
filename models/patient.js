const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PatientSchema = new Schema({
    card_no:{type: String, required:true, unique:true},
    first_name:{type: String, required:true},
    surname:{type: String, required:true},
    other_name:{type: String},
    img:{type: String},
    weight:{type: String},
    bmi:{type: String},
    address:{type: String, required:true},
    email:{type: String,required:true},
    password:{type:String, default:"123"},
    access_key:{type:String, default:"123"},
    phone_number:{type: Number},
    gender:{type: String, required:true},
    age:{type: String, required:true},
    language_spoken:{type: String, required:true},
    bloodgroup:{type: String},
    genotype:{type: String},
    kin:{type: String},
    kin_phone:{type: String, required:true},
    bed_id:{type:Schema.Types.ObjectId, ref:'bedspaces'}, 
    waiting_id:{type:Schema.Types.ObjectId, ref:'waiters'},   
    branch_id:{type:Schema.Types.ObjectId, ref:'branches'}, 
    hospital_id:{type:Schema.Types.ObjectId, ref:'hospitals'},
    created_by:{type:String, required:true}, 
    nhis_id:{type:String}, 
    nhis_other_info:{type:String},  
    finger_print:{type:String, default:""},
    eye_scan:{type:String, default:""},
    deleted:{type:Boolean, default:false}},
    {
        timestamps:true
    }
)

const Patient = mongoose.model('patients', PatientSchema)
module.exports=Patient;