const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const admin = require("../models/Admin");
const voter = require("../models/Voter");
const approved = require("../models/ApprovedVoter");
const candidate = require("../models/Candidates");

const { encryptData, decryptData } = require("../utils/encryption");

require("dotenv").config();
const { body, validationResult } = require("express-validator");
const { verifyAdminToken } = require("../middleware/auth");

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
router.get("/voterlist", verifyAdminToken,async (req, res) => {
  try {
    const voters = await voter.find({});
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

//Route 6: Add Candidates to Mongo DB
router.post("/create", verifyAdminToken, async (req, res) => {
  const { candidateFirstName, candidateLastName, wardNo, party, imgUrl } =
    req.body;

  try {
    const existingCandidate = await candidate.findOne({
      $or: [
        { candidateFirstName: candidateFirstName },
        { candidateLastName: candidateLastName },
      ],
    });
    if (existingCandidate) {
      return res.status(400).json({ error: "Candidate Already Exists" });
    }

    const newCandidate = new candidate({
      candidateFirstName,
      candidateLastName,
      wardNo,
      party,
      imgUrl,
    });

    await newCandidate.save();
    res.status(201).json({ newCandidate, message: "New Candidate Registered" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Route 7: Fetch the registered candidate details
router.get("/candidatelist", verifyAdminToken,async (req, res) => {
  try {
    const candidates = await candidate.find({});
    res.json(candidates);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Error Fetching Candidate List, Try Again Later" });
  }
});
// Route 8: To fetch logged-in admin details
router.get("/curr", verifyAdminToken, (req, res) => {
  const adminUser = req.adminUser;
  return res.status(200).json({
    message: "Admin is Still Logged in",
    email: adminUser.adminEmail,
    id: adminUser.adminId,
  });
});

// Route 8: Logout The Admin
router.get("/logout", async (req, res) => {
  //clear cookie
  res.clearCookie("jwt");

  return res.json({
    message: "Logout Successful",
  });
});

module.exports = router;
