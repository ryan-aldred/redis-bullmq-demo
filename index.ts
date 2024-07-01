import { addTradeToQueue } from "./bullmq";

const addTradeJob = await addTradeToQueue({ ticker: "sol/usdt" });
