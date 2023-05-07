const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    userID: { type: String, required: true },
    productid: { type: String, required: true },
    msg: { type: String },
    title: { type: String },
    rating: { type: Number },
    description: { type: String },
    date: { type: Date }
  },
  {
    versionkey: false,
  }
);

const CommentModel = mongoose.model("comment", commentSchema);
module.exports = { CommentModel };