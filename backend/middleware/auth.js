const jwt = require("jsonwebtoken");

exports.verifyAdminToken = (req, res, next) => {
  // Get the JWT token from the Authorization header
  const accessToken = req.cookies.jwt;

  // If no token is found in the cookies, the request is unauthorized
  if (!accessToken) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    // Verify the token using jwt.verify
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET);

    // Attach the decoded payload to the request object
    req.adminUser = {
      adminEmail: payload.email,
      adminId: payload.id,

    };

    // Call the next middleware
    next();
  } catch (e) {
    // Return unauthorized error
    return res.status(403).json({ error: "Unauthorized, Please Login to Continue" });
  }
};
