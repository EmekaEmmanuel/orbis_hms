const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UsersSchema = new Schema({
    username:{type: String, required:true, unique:true},
    email:{type: String,required:true},
    password:{type:String, required:true},
    phone_number:{type: Number},
    role:{type:String, default:'user'},
    deleted:{type:Boolean, default:false}},
    {
        timestamps:true
    }
)

const User = mongoose.model('users', UsersSchema)
module.exports=User;