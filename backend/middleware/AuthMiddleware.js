const jwt = require("jsonwebtoken");
const AuthMiddleware = (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: err.message });
      } else {
        next();
      }
    });
  } else {
    return res.status(400).json({ message: "No token found" });
  }
};

module.exports = AuthMiddleware;
