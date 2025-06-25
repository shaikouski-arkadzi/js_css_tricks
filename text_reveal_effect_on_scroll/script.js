document.addEventListener("DOMContentLoaded", () => {
  const paragraphs = document.querySelectorAll("p");
  const allSpans = [];

  // Оборачиваем каждую букву в span
  paragraphs.forEach((paragraph) => {
    const fragment = document.createDocumentFragment();
    const letters = paragraph.textContent.split("");
    letters.forEach((letter) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.style.opacity = 0;
      fragment.appendChild(span);
      allSpans.push(span);
    });
    paragraph.textContent = "";
    paragraph.appendChild(fragment);
  });

  function revealSpans() {
    const viewportHeight = window.innerHeight;
    const revealThreshold = viewportHeight * 0.5;

    allSpans.forEach((span) => {
      const parentTop = span.parentElement.getBoundingClientRect().top;
      // если параграф ниже наполовины экрана
      if (parentTop < revealThreshold) {
        const rect = span.getBoundingClientRect();
        // насколько span смещён вверх относительно 40% высоты экрана.
        const offsetTop = rect.top - viewportHeight * 0.4;
        const offsetLeft = rect.left;

        // Чем выше и левее элемент — тем меньше opacity
        let opacity = 1 - (offsetTop * 0.01 + offsetLeft * 0.001);
        opacity = Math.max(0.1, Math.min(1, +opacity.toFixed(3)));

        span.style.opacity = opacity;
      }
    });
  }

  // Используем requestAnimationFrame для оптимизации scroll
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        revealSpans();
        ticking = false;
      });
      ticking = true;
    }
  });

  revealSpans();
});
