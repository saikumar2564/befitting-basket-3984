const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    phoneNo: { type: Number, required: true },
  },
  {
    versionkey: false,
  }
);

const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };

// {
//     "name": "Ankit",
//     "email": "ankit@gmail.com",
//     "password": "45fkjf",
//     "gender": "male",
//     "phoneNo": 20000000
//   }

// {
//   "name": "Saman",
//   "email": "saman@gmail.com",
//   "password": "jkio45",
//   "gender": "male",
//   "phoneNo": 99999999
// }
