import { Queue, Worker } from "bullmq";
import { redis, redisConfig } from "./redis";

export async function addTradeToQueue({ ticker }: { ticker: string }) {
  return await tradeQueue.add("trades", { ticker: "sol/usdc" });
}

const tradeQueue = new Queue("trades", {
  connection: redisConfig,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  },
});

console.log("redis memory used before", await getRedisMemoryUsed());

const tradeWorker = new Worker(
  "trades",
  async (job) => {
    console.log("processing job");
    console.log(job.data);
    // throw new Error("haha your fucked");
  },
  {
    connection: redisConfig,
    maxStalledCount: 0,
  }
);

tradeWorker.on("completed", async (job) => {
  console.log(`trade job ${job.id} completed`);
  console.log("redis memory used after", await getRedisMemoryUsed());
});

tradeWorker.on("failed", async (job, err) => {
  console.log(`job ${job?.id} failed ${err} retry ${job?.attemptsMade}`);

  if (job?.attemptsMade === job?.opts.attempts) {
    console.log("job completely fucking failed! logging failed job...");
    // log failed job
    console.log("completely failed job logged");
    console.log("redis memory used after", await getRedisMemoryUsed());
  }
});

async function getRedisMemoryUsed() {
  const memoryInfo = await redis.info("memory");
  const memoryUsed = memoryInfo.match(/used_memory:(\d+)/);

  if (memoryUsed !== null) {
    return memoryUsed[1];
  }

  throw new Error("Failed to get redis memory used");
}
