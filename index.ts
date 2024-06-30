import { redis } from "./redis";

redis.set("someKey", "someValue", (err, res) => {
  if (res !== "OK") {
    console.log("set successful", res);
  } else {
    console.log("set went wrong", err);
  }
});

redis.get("someKey", (err, res) => {
  if (!err) {
    console.log("get successful", res);
  } else {
    console.log("get went wrong", res);
  }
});
