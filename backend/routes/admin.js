const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const admin = require("../models/Admin");
const voter = require("../models/Voter");

require("dotenv").config();
const { body, validationResult } = require("express-validator");

//Route 1: To register a new admin
// router.post(
//   "/register",
//   body("email", "Enter a valid email").isEmail(),
//   body("password", "Password must be atleast 6 characters").isLength({
//     min: 6,
//   }),
//   async (req, res) => {
//     try {
//       const { email, password } = req.body;

//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       let adminUser = await admin.findOne({ email });
//       if (adminUser) {
//         return res.status(400).json({ error: "Admin already exists" });
//       }

//       adminUser = new admin({
//         email,
//         password,
//       });

//       await adminUser.save();
//       res.status(200).json({ message: "Admin registered successfully" });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// );

//Route 2: To login an admin
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists(),
  async (req, res) => {
    try {
      const { email, password } = req.body;

      let adminUser = await admin.findOne({ email });

      if (!adminUser) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      if (adminUser.password !== password) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      //Generate a token
      const token = jwt.sign({_email:adminUser.email},process.env.JWT_SECRET,{
        expiresIn:"24h",
      });

      res.cookie("jwt", token, {expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true})

      res.status(200).json({ message: "Admin logged in successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
//Route 3: To fetch voter list
router.get("/voterlist", async (req, res) => {
  try {
    const voters = await voter.find({});
    res.json(voters);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;