const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const passport = require("./passport");
const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/react-passport", {
  useNewUrlParser: true
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/auth", usersRouter);
// register passport with express
app.use(passport.initialize());
// not using sessions makes a login persistent
// app.use(passport.session());

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}.`);
});

module.exports = app;
