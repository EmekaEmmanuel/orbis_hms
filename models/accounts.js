const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  // Doctors, Nurses, Accountants etc.
  {
    user_name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    branch_id: {
      type: Schema.Types.ObjectId, // ref: 'branches' },
    },
    gender: { type: String, required: true },
    age: { type: Date },
    phone_number: { type: Number, required: true },
    role: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    image: { type: String },
    password: { type: String, required: true },
    rating: { type: Number, default: 0 },
    cadre: { type: String },
    department: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('users', UsersSchema);
module.exports = User;
