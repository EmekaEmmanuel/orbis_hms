const mongoose = require('mongoose');
const BranchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    addr: { type: String, required: true },
    prefix: { type: String, unique: true, required: true },
    hospital_id: { type: mongoose.Types.ObjectId, ref: 'hospitals' },
    password: { type: String,required:true },
  },
  {
    timestamps: true,
  }
);

const Branch = mongoose.model('branches', BranchSchema);
module.exports = Branch;