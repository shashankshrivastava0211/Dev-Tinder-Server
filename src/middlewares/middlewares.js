const jwt = require("jsonwebtoken");
const User = require("../models/user");

const UserMiddleware = async (req, res, next) => {
  //read the token from the cookie and verify it
  try {
    const cookies = req.cookies;

    const { token } = cookies;
    if (!token) {
      throw new Error("No token found");
    }
    const decodedMessage = await jwt.verify(token, "bllps5830F@");

    const { emailID } = decodedMessage;

    const user = await User.findOne({ emailID: emailID });
    if (!user) {
      throw new Error("Invalid token");
    }
    req.user = user; //attached user to req
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  UserMiddleware,
};
