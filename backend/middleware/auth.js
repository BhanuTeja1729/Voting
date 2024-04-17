const jwt = require("jsonwebtoken");

const verifyAdminToken = (req, res, next) => {
  // Get the JWT token from the Authorization header
  const accessToken = req.headers.authorization;

  // If no token is found in the Authorization header, the request is unauthorized
  if (!accessToken || !accessToken.startsWith("Bearer ")) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  // Extract the token from the Authorization header
  const token = accessToken.split(" ")[1];

  try {
    // Verify the token using jwt.verify
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded payload to the request object
    req.adminUser = {
      adminEmail: payload.email,
      adminId: payload.id,
    };
    
    // Call the next middleware
    next();
  } catch (e) {
    // Return unauthorized error
    return res.status(403).json({ error: "Unauthorized" });
  }
};

module.exports = { verifyAdminToken };
