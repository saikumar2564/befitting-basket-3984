const {Schema,model} = require("mongoose");
ObjectId = Schema.ObjectId;
const commentSchema = Schema(
  {
    userID: { type: ObjectId, required: true },
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

const CommentModel = model("comment", commentSchema);
module.exports = { CommentModel };