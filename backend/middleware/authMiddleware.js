const jwt = require("jsonwebtoken");

const protect = async (
  req,
  res,
  next
) => {

  let token =
    req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "No token",
    });
  }

  token = token.split(" ")[1];

  try {

    const decoded = jwt.verify(
      token,
      "secret123"
    );

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Token failed",
    });
  }
};

module.exports = protect;