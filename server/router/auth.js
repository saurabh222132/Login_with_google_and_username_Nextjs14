const express = require("express");
const passport = require("passport");
const { Signup } = require("../controller/authcontroller.js");
const { Login } = require("../controller/authcontroller.js");
const { userModel } = require("../model/usermodel.js");
require("dotenv").config();

const router = express.Router();

router
  .post("/signup", Signup)
  .post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/authfail" }),
    Login
  );

//==========Google Routes= ===============
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}/googleredirect`,
    failureRedirect: "/authfail",
  })
);

router.get("/google/success", async (req, res) => {
  if (req.user) {
    const total_users = await userModel.find({}).exec();
    total_users.forEach((user) => {
      user["password"] = undefined;
    });
    res
      .status(200)
      .json({ success: true, user: req.user, totalUsers: total_users });
  } else {
    res.status(401).send({ message: "unauthorized" });
  }
});
router.get("/google/authfail", (req, res) => {
  res.status(401).json({ message: "Authentication failed." });
});

module.exports = { AuthRouter: router };
