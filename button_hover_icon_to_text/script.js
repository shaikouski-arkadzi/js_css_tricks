const link = document.querySelector(".social__link");
const title = link.querySelector(".social__title");

const width = Math.max(60, title.offsetWidth + 40);

link.style.setProperty("--w", width + "px");
