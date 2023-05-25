const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const User = mongoose.model("users");

  const getUserData = await User.findOne({
    _id: req.user._id,
  }).select("balance");

  console.log(req.user);
  res.status(200).json({
    data: getUserData,
  });
};
module.exports = userDashboard;
