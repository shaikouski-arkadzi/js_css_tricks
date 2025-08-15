const card = document.querySelector(".card");

// Куда хотим наклонить
let targetX = 0;
let targetY = 0;
// Текущий наклон
let currentX = 0;
let currentY = 0;

// Как быстро двигаемся к цели
const ease = 0.1;

function animate() {
  currentX += (targetX - currentX) * ease;
  currentY += (targetY - currentY) * ease;

  card.style.transform = `perspective(1000px) rotateX(${currentX}deg) rotateY(${currentY}deg)`;

  requestAnimationFrame(animate);
}

animate();

card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();

  // Координаты мыши относительно верхнего левого угла карточки
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Центр карточки
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Вычисляем наклоны
  targetX = (centerY - y) / 7;
  targetY = (x - centerX) / 7;
});

//Когда мышь уходит с карточки
card.addEventListener("mouseleave", () => {
  targetX = 0;
  targetY = 0;
});
