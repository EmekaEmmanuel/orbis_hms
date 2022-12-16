const mongoose = require('mongoose');
const BranchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    addr: { type: String, required: true },
    hospital_id: { type: mongoose.Types.ObjectId, ref: 'hospital' },
  },
  {
    timestamps: true,
  }
);

const Branch = mongoose.model('branches', BranchSchema);
module.exports = Branch;