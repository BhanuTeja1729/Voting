const mongoose = require("mongoose");
const { Schema } = mongoose;
const adminSchema = new Schema({
  // adminId: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  adminEmail: {
    type: String,
    required: true,
    unique: true,
  },
  adminPassword: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
