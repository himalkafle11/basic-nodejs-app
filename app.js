const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./modules/users/users.routes");
const incomeRouter = require("./modules/income/income.routes");
const expenseRouter = require("./modules/expenses/expense.routes");

require("dotenv").config();

const app = express();

app.use(express.json());

//models
require("./models/users.model");
require("./models/transactions.model");

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("connected to mongodb successfully");
  })
  .catch((e) => {
    console.error("connection failed", e);
  });

//routes......
app.use("/users", userRouter);
app.use("/income", incomeRouter);
app.use("/expense", expenseRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server started successfully");
});
