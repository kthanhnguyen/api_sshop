const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).send({ message: "Access Denied!" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token!" });
  }
};

const authJwt = {
  verifyToken
};
module.exports = authJwt;