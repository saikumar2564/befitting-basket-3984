const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
  token: String,
});

const blacklistModel = mongoose.model("backlistedToken", blacklistSchema);
module.exports = { blacklistModel };
