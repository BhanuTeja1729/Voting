const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const admin = require("../models/Admin");
const voter = require("../models/Voter");
const approved = require("../models/ApprovedVoter");

const { encryptData, decryptData } = require("../utils/encryption");

require("dotenv").config();
const { body, validationResult } = require("express-validator");
const { verifyAdminToken } = require("../middleware/auth");

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
        return res.status(400).json({ error: "Incorrect Password" });
      }

      // Generate a token with email and id included in the payload
      const token = jwt.sign(
        { email: adminUser.adminEmail, id: adminUser.adminId }, // Use adminEmail and adminId properties
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: false,
      });

      res.status(200).json({
        message: "Admin logged in successfully",
        email: adminUser.adminEmail, // Use adminEmail property
        id: adminUser.adminId, // Use adminId property
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3: To fetch voter list
router.get("/voterlist", async (req, res) => {
  try {
    // retreive encrypted data from db
    const voters = await voter.find({});

    //decrypt each encrypted field for each voter
    // const decryptedVoters = encryptedVoters.map((voter) => {
    //   return {
    //     voterId: decryptData(voter.voterId),
    //     voterFirstName: voter.voterFirstName,
    //     voterLastName: voter.voterLastName,
    //     aadharNumber: decryptData(voter.aadharNumber),
    //     dateOfBirth: voter.dateOfBirth,
    //     email: decryptData(voter.email),
    //     phoneNumber: decryptData(voter.phoneNumber),
    //     imgUrl: voter.imgUrl,
    //   };
    // });

    res.json(voters);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Error Fetching Voter List, Try Again Later" });
  }
});

//Route 4: To delete voter from db
router.delete("/delete/:id", verifyAdminToken, async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the voter exists
    const existingVoter = await voter.findById(id);

    if (!existingVoter) {
      return res.status(404).json({ error: "Voter not found" });
    }

    // Delete the voter from the database
    await voter.findByIdAndDelete(id);

    res.status(200).json({ message: "Voter deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 5: To approve voters and send them to another collection
router.post("/approve/:id", verifyAdminToken, async (req, res) => {
  try {
    const id = req.params.id;

    const user = await voter.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Voter not found" });
    }

    //create new document
    const approvedVoter = new approved({
      email: user.email,
      voterId: user.voterId,
    });
    //save the document
    await approvedVoter.save();

    //Delete the voter from original collection
    await voter.findByIdAndDelete(id);

    res.status(200).json({ message: "Voter Approved Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Voter Not Approved" });
  }
});

// Route 6: To fetch logged-in admin details
router.get("/curr", verifyAdminToken, (req, res) => {
  const adminUser = req.adminUser;
  return res.status(200).json({
    message: "Admin is Still Logged in",
    email: adminUser.adminEmail,
    id: adminUser.adminId,
  });
});

// Route 7: Logout The Admin
router.get("/logout", async (req, res) => {
  //clear cookie
  res.clearCookie("jwt");

  return res.json({
    message: "Logout Successful",
  });
});

module.exports = router;
