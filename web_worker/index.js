const btn = document.getElementById("calc-btn");
const input = document.getElementById("nth-input");
const result = document.getElementById("result-el");

const worker = new Worker("get-nth-fibonacci-number.worker.js", {
  type: 'module'
});

worker.onmessage = event => {
  result.innerHTML = event.data;
}

worker.onerror = error => {
  result.innerHTML = error.message;
}

let n = null;

input.addEventListener("change", (e) => {
  n = e.target.value;
});

btn.addEventListener("click", (e) => {
  result.innerHTML = "processing...";
  worker.postMessage(n);
});