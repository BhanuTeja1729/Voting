const jwt = require("jsonwebtoken");

const verifyAdminToken = (req, res, next) => {
  let accessToken = req.cookies.jwt;

  // If no token is found, the request is unauthorized
  if (!accessToken) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  let payload;
  try {
    // Verify the token using jwt.verify
    payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.adminUser = {
      adminEmail: payload.email,
      adminId: payload.id, 
    };
    next();
  } catch (e) {
    // Return unauthorized error
    return res.status(403).json({ error: "Unauthorized" });
  }
};

module.exports = { verifyAdminToken };
