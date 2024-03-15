const mongoose = require("mongoose");
const { Schema } = mongoose;
const voterSchema = new Schema({
  voterId: {
    type: String,
    required: true,
    unique: true,
  },
  voterFirstName: {
    type: String,
    required: true,
  },
  voterLastName: {
    type: String,
    required: true,
  },
  aadharNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
});

const Voter = mongoose.model("voter", voterSchema);

module.exports = Voter;
