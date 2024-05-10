const mongoose = require("mongoose");

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

const ApprovedVoter = mongoose.model("approvedvoter", approvedVoterSchema);

module.exports = ApprovedVoter;
