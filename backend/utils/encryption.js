const crypto = require("crypto");
require("dotenv").config();

const key = crypto.randomBytes(32).toString("base64");

// process.env.ENCRYPTION_KEY;

const iv = crypto.randomBytes(16);

// Encryption function
function encryptData(data) {
  console.log(key);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  console.log(encrypted);

  return encrypted;
}

// Decryption function
function decryptData(encryptedData) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  console.log(decrypted);
  return decrypted;
}

module.exports = { encryptData, decryptData };

// Hashing logic for specific fields
// voterSchema.pre("save", function (next) {
//   if (this.isModified("aadharNumber")) {
//     this.aadharNumber = this.hashField(this.aadharNumber.toString());
//   }
//   if (this.isModified("voterId")) {
//     this.voterId = this.hashField(this.voterId);
//   }
//   if (this.isModified("email")) {
//     this.email = this.hashField(this.email);
//   }
//   if (this.isModified("phoneNumber")) {
//     this.phoneNumber = this.hashField(this.phoneNumber.toString());
//   }
//   next();
// });

// Hashing function
// voterSchema.methods.hashField = function (value) {
//   return crypto.createHash("sha256").update(value).digest("hex");
// };
