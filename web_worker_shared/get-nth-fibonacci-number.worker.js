import { getNthFobonacciNumber } from "./get-nth-fibonacci-number.js";

self.onconnect = e => {
  const port = e.ports[0];

  port.onmessage = function (e) {
    const num = e.data;
    if (Number.isInteger(parseInt(num))) {
      const result = getNthFobonacciNumber(num);
      port.postMessage(result);
    } else {
      port.postMessage("Is not a number");
      throw new Error("Is not a number");
    }
  }
}
