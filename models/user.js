const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  about: String
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
