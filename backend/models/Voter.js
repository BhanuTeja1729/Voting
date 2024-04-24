const mongoose = require("mongoose");
const crypto = require('crypto');

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
    type: String,
    required: true,
    unique: true,
  },
  imgUrl: {
    type: String,
  },
  dateOfBirth: {
    type: String,
    default:"10-10-2002",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  
});



const Voter = mongoose.model("voter", voterSchema);

module.exports = Voter;
