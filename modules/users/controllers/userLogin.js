const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const Users = mongoose.model("users");
  const { email, password } = req.body;

  //validations
  try {
    if (!email) throw "Please provide a email!";
    if (!password) throw "Please provide a password";

    const getUser = await Users.findOne({ email: email });

    if (!getUser) throw "User does not exist";

    const passwordMatched = await bcrypt.compare(password, getUser.password);

    if (!passwordMatched) throw "Email and Password do not match!";
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
    return;
  }

  //on success
  const getUserForAccessToken = await Users.findOne({ email: email });
  const accessToken = jwt.sign(
    {
      _id: getUserForAccessToken._id,
      email: getUserForAccessToken.email,
      name: getUserForAccessToken.full_name,
    },
    process.env.MY_JWT_SECRET_KEY,
    { expiresIn: "90 days" }
  );

  res.status(200).json({
    status: "User logged in Successfully",
    accessToken,
  });
};

module.exports = userLogin;
