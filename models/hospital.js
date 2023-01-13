const mongoose = require('mongoose');
const HospitalSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  prefix: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  logo:{type:String,default:""}
},
{
  timestamps:true
});

const Hospital = mongoose.model('hospitals', HospitalSchema);
module.exports = Hospital;