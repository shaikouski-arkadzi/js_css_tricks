const btn = document.getElementById("calc-btn");
const input = document.getElementById("nth-input");
const result = document.getElementById("result-el");

const worker = new SharedWorker("get-nth-fibonacci-number.worker.js", {
  type: 'module',
  name: 'shared-worker'
});

worker.port.onmessage = event => {
  result.innerHTML = event.data;
}

worker.port.onerror = error => {
  result.innerHTML = error.message;
}

let n = null;

input.addEventListener("change", (e) => {
  n = e.target.value;
});

btn.addEventListener("click", (e) => {
  result.innerHTML = "processing...";
  worker.port.postMessage(n);
});