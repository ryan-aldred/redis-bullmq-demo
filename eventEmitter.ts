import EventEmitter from "events";

export const eventEmitter = new EventEmitter();

export const emitTradeCompleteEvent = (data: { ticker: string }) => {
  eventEmitter.emit("tradeComplete", data);
};
