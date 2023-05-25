const express = require("express");
const userRouter = express.Router();

const userRegister = require("./controllers/userRegister");
const userLogin = require("./controllers/userLogin");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middlewares/auth");

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

//protected routes....
userRouter.use(auth);
userRouter.get("/dashboard", userDashboard);

module.exports = userRouter;
