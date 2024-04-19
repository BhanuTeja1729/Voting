const mongoose = require("mongoose");

const { Schema } = mongoose;
const candidateSchema = new Schema({
  
  candidateFirstName: {
    type: String,
    required: true,
  },
  candidateLastName: {
    type: String,
    required: true,
  },
  wardNo: {
    type: String,
    required: true,
  },
  party:{
    type:String
  },
  imgUrl: {
    type: String,
  },
});


const Candidate = mongoose.model("candidates", candidateSchema);

module.exports = Candidate;
