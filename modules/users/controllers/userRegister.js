const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  const Users = mongoose.model("users");

  const { full_name, email, password, balance } = req.body;

  //validation....

  //creation...

  const hash_password = await bcrypt.hash(password, 10);

  try {
    const createdUser = await Users.create({
      full_name,
      email,
      password: hash_password,
      balance,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
    return;
  }

  res.status(200).json({
    status: "Hello from userRegister",
  });
};

module.exports = userRegister;
