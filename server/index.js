const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const { connectDB } = require("./config/db.js");
const { AuthRouter } = require("./router/auth.js");
const passport = require("passport");
const { userModel } = require("./model/usermodel.js");

require("dotenv").config();

const app = express();
connectDB();
const port = process.env.PORT;

//======================Middlewares================================

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/passport",
      collectionName: "sessions",
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ===============requiring Local Strategy===================

require("./config/passport.js");

// ================Connecting to database ====================

// ===================Routers=======================
app.use("/auth", AuthRouter);
app.get("/checksession", async (req, res) => {
  if (req.user) {
    const total_users = await userModel.find({}).exec();
    res.send({ success: true, user: req.user, totalUsers: total_users });
  } else {
    res.status(401).json({ success: false, message: "Unathorized" });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
