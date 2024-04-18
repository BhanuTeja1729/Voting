const mongoose = require("mongoose");
const crypto = require("crypto");

const { Schema } = mongoose;

const approvedVoterSchema = new Schema({
  voterId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

//Hashing Logic
approvedVoterSchema.pre("save", function (next) {
  if (this.isModified("voterId")) {
    this.voterId = this.hashField(this.voterId);
  }
  if (this.isModified("email")) {
    this.email = this.hashField(this.email);
  }
  next();
});

//Hashing Function
approvedVoterSchema.methods.hashField = function (value) {
  return crypto.createHash("sha256").update(value).digest("hex");
};

const ApprovedVoter = mongoose.model("approvedvoter", approvedVoterSchema);

module.exports = ApprovedVoter;
