const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //auth logic....
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({
      status: "failed",
      message: "Authorization failed! You must be failed.",
    });
    return;
  }

  //check auth header
  const token = authorizationHeader.split("Bearer ")[1];

  try {
    const checkToken = jwt.verify(token, process.env.MY_JWT_SECRET_KEY);
    req.user = checkToken;
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Authorization failed! Invalid Token.",
    });
    return;
  }
  next();
};
module.exports = auth;
