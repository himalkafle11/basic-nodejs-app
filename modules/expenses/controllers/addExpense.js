const mongoose = require("mongoose");

const addExpense = async (req, res) => {
  const User = mongoose.model("users");
  const Transctions = mongoose.model("transactions");

  const { amount, remarks } = req.body;
  try {
    if (!amount) throw "Please enter amount!";
    if (amount < 1) throw "Amount must be more than one";

    if (!remarks) throw "Remarks is required";
    if (remarks.length < 2) throw "Remarks must be two characters long";
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error,
    });
    return;
  }

  //success

  try {
    await User.updateOne(
      {
        _id: req.user._id,
      },
      {
        $inc: {
          balance: amount * -1,
        },
      },
      { runValidators: true }
    );

    //create transction history

    await Transctions.create({
      amount: amount,
      remarks: remarks,
      user_id: req.user._id,
      transactions_type: "expense",
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
    return;
  }

  res.status(200).json({
    status: "Expense updated",
  });
};

module.exports = addExpense;
