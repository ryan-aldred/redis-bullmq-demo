import Redis, { RedisOptions } from "ioredis";

if (!process.env.redisPort || !process.env.redisHost)
  throw new Error("missing env variables for redis config");

export const redisConfig: RedisOptions = {
  port: Number(process.env.redisPort),
  host: process.env.redisHost,
};

// can be reused for Queues and Workers
// if maxRetriesPerRequest uis bykk
// but not QueueScheduler and QueueEvents
export const redisConnection = new Redis(redisConfig);

redisConnection.on("connect", () => {
  console.log("connected to redis");
});

redisConnection.on("error", (error: Error) => {
  console.log("something went wrong with redis", error);
});
