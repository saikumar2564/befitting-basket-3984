const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  host: process.env.Redis_Username,
  port: process.env.Redis_PORT,
  password: process.env.Redis_Password,
});

redisClient.on("connect", async () => {
  console.log("Connected to redis");
});

// redisClient.on("error", (err) => {
//   console.log(err);
// });

redisClient.connect();

module.exports = { redisClient };
