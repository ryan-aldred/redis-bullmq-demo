import { addTradeToQueue } from "./bullmq";
import { eventEmitter } from "./eventEmitter";

const globalData = {
  tradesExecuted: 0,
};

eventEmitter.on("tradeComplete", (data) => {
  console.log("trade complete event received", data.ticker);
  globalData.tradesExecuted++;
});

// contrived example of a bot that loops over time and dispatches trades to the message queue
async function runBot() {
  const addTradeJob = await addTradeToQueue({ ticker: "sol/usdt" });

  setInterval(async () => {
    console.log(`we've done ${globalData.tradesExecuted} jobs eh`);
    await addTradeToQueue({ ticker: "sol/usdt" });
  }, 1000);
}

runBot();
