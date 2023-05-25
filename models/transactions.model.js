const mongoose = require("mongoose");

const transctionsSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    remarks: {
      type: String,
      required: [true, "Remarks is required"],
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User id is required"],
    },
    transactions_type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Type is required"],
    },
  },
  { timestamps: true }
);

const transactionsModel = mongoose.model("transactions", transctionsSchema);

module.exports = transactionsModel;
