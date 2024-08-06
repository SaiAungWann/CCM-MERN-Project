const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  let maxAge = 3 * 24 * 60 * 60;
  return jwt.sign({ _id }, "myScreateKey", {
    expiresIn: maxAge,
  });
};

module.exports = createToken;
