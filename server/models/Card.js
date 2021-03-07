const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Card = new Schema(
  {
    imageUrl: String,
    text: String,
    userId: String,
    likes: { type: Number, default: 0 },
    favs: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cards", Card);
