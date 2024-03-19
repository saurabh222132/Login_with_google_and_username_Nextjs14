const { userModel } = require("../model/usermodel.js");
const bcrypt = require("bcrypt");
const saltRounds = 12;

// ===================Signup========================
const Signup = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email }).exec();
    if (!user) {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      // Store hash in your password DB.

      const newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      const doc = await newUser.save({ timestamps: true });

      doc.password = undefined;
      const total_users = await userModel.find({}).exec();
      total_users.forEach((user) => {
        user["password"] = undefined;
      });
      res
        .status(200)
        .json({ success: true, user: req.user, totalUsers: total_users });
    } else {
      res
        .status(409)
        .json({ message: "email already registered!", success: false });
    }
  } catch (err) {
    console.log("Error occured during saving of user", err);
  }
};

// ============================login================================

const Login = async (req, res, next) => {
  if (req.user) {
    req.user.password = undefined;
    const total_users = await userModel.find({}).exec();
    total_users.forEach((user) => {
      user["password"] = undefined;
    });
    res
      .status(200)
      .json({ success: true, user: req.user, totalUsers: total_users });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = { Signup, Login };
