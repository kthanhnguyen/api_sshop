const jwt = require("jsonwebtoken");

let refreshToken = [];

generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    const userData = {
      _id: user._id
    }
    jwt.sign(
      {data: userData},
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
    });
  });
}

verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["authorization"];

  if (!token) return res.status(403).json({ message: "Access Denied!" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token!" });
  }
};

verifyRefreshToken = (req, res, next) => {
  const token = req.body.token;

  if (!token) return res.status(403).json({ message: "Invalid request." });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_REFRESH);
    req.user = verified;

    let storeRefreshToken = refreshToken.find(x => x.email ===  verified.sub);
    if(!storeRefreshToken) return res.status(403).json({ message: "Invalid request. Token is not in store." });

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token!" });
  }
};

const authJwt = {
  generateToken,
  verifyToken
};
module.exports = authJwt;