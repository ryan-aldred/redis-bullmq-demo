import Redis from "ioredis";

export const redisConfig = {
  port: 6379,
  host: "127.0.0.1",
};

export const redis = new Redis(redisConfig);

redis.on("connect", () => {
  console.log("connected to redis");
});

redis.on("error", (error: Error) => {
  console.log("something went wrong with redis", error);
});
