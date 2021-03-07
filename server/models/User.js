const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  password: String,
  fullName: String,
  profilePicUrl: String,
  cardsUploaded: [String],
  likedCards: [String],
  favCards: [String],
  sharedCards: [String],
});

module.exports = mongoose.model("users", User);
