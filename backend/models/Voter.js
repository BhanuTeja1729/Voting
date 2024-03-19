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
    type: String,
    required: true,
    unique: true,
  },
});

// Hashing logic for specific fields
voterSchema.pre("save", function (next) {
  if (this.isModified("aadharNumber")) {
    this.aadharNumber = this.hashField(this.aadharNumber.toString());
  }
  if (this.isModified("voterId")) {
    this.voterId = this.hashField(this.voterId);
  }
  if (this.isModified("email")) {
    this.email = this.hashField(this.email);
  }
  if (this.isModified("phoneNumber")) {
    this.phoneNumber = this.hashField(this.phoneNumber.toString());
  }
  next();
});

// Hashing function
voterSchema.methods.hashField = function (value) {
  return crypto.createHash("sha256").update(value).digest("hex");
};

const Voter = mongoose.model("voter", voterSchema);

module.exports = Voter;
