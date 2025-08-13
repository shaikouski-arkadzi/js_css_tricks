const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (!next) return;
    const cardRect = card.getBoundingClientRect();
    const nextRect = next.getBoundingClientRect();
    if (nextRect.top < cardRect.bottom - 20) {
      card.classList.add("pushed");
    } else {
      card.classList.remove("pushed");
    }
  });
});
