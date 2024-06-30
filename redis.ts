import Redis from "ioredis";

export const redis = new Redis({
  port: 6379,
  host: "127.0.0.1",
});

redis.on("connect", () => {
  console.log("connected to redis");
});

redis.on("error", (error: Error) => {
  console.log("something went wrong with redis", error);
});
