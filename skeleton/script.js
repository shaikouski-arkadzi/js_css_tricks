const cardWrap = document.getElementById("card-wrap").querySelector(".card");
const container = document.getElementById("container");

const numberOfCards = 10;

function createSkeletonCards(cardsNumber) {
  for (let i = 0; i < cardsNumber; i++) {
    const card = cardWrap.cloneNode(true);
    container.appendChild(card);
  }
}

function populateCards(products) {
  container.innerHTML = "";

  products.forEach((product) => {
    const card = cardWrap.cloneNode(true);
    const image = card.querySelector("img");
    const title = card.querySelector(".title");
    const description = card.querySelector(".description");
    const price = card.querySelector(".price");

    image.src = product.image;
    title.textContent = product.title;
    description.textContent = product.description;
    price.textContent = product.price;

    card.classList.remove("skeleton");

    container.appendChild(card);
  });
}

function loadProducts() {
  createSkeletonCards(numberOfCards);

  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        populateCards(data);
      }, 3000);
    });
}

window.onload = loadProducts;
