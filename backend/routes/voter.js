const express = require("express");
const router = express.Router();
const voter = require("../models/Voter");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

// Route 1: Create a new voter
router.post(
  "/create",
  [
    body("voterId", "Enter a valid Voter ID").isLength({ min: 10, max: 10 }),
    body("aadharNumber", "Enter a valid Aadhar Number").isLength({
      min: 16,
      max: 16,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("phoneNumber", "Enter a valid phone number").isLength({ min: 10 }),
    body("dateOfBirth", "Enter a valid date of birth").isDate(),
  ],
  async (req, res) => {
    const {
      voterId,
      voterFirstName,
      voterLastName,
      dateOfBirth,
      aadharNumber,
      image,
      email,
      phoneNumber,
    } = req.body;
    try {
      const newVoter = new voter({
        voterId,
        voterFirstName,
        voterLastName,
        aadharNumber,
        image,
        dateOfBirth,
        email,
        phoneNumber,
      });
      await newVoter.save();
      res.status(201).json({ newVoter });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
module.exports = router;
