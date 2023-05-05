const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  password: process.env.Redis_Password,
  socket: {
    host: "redis-18905.c305.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 18905,
  },
});

redisClient.on("connect", () => {
  console.log("Connected to redis");
});

redisClient.on("error", (error) => {
  console.error("RedisLabs connection error:", error);
});

redisClient.connect();
redisClient.set("ghh", "ggjj");
module.exports = { redisClient };
