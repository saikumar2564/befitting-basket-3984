const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    userid: { type: String, required: true },
    productid: { type: String, required: true},
    msg: {type: String},
  },
  {
    versionkey: false,
  }
);

const CommentModel = mongoose.model("comment", commentSchema);
module.exports = { CommentModel };