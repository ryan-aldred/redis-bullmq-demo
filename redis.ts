import Redis, { RedisOptions } from "ioredis";

if (!process.env.redisPort || !process.env.redisHost)
  throw new Error("missing env variables for redis config");

export const redisConfig: RedisOptions = {
  port: Number(process.env.redisPort),
  host: process.env.redisHost,
};

export const redis = new Redis(redisConfig);

redis.on("connect", () => {
  console.log("connected to redis");
});

redis.on("error", (error: Error) => {
  console.log("something went wrong with redis", error);
});
