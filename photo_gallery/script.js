document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".gallery");
  const totalImages = 2000;
  const imagesPerLoad = 50;
  let loadedImages = 0;
  let imageList = [];

  async function fetchPhotos() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos"
      );
      const data = await response.json();

      // Map the fetched data into a more usable format
      imageList = data.map((photo) => ({
        id: photo.id,
        title: photo.title,
        url: `https://picsum.photos/600?random=${photo.id}`, // Replace with Lorem Picsum
        thumbnailUrl: `https://picsum.photos/150?random=${photo.id}`,
      }));

      loadImages();
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }

  function createPlaceholder() {
    const placeholder = document.createElement("img");
    placeholder.classList.add("gallery-placeholder");
    placeholder.style.backgroundColor = "black";
    return placeholder;
  }

  function loadImages() {
    for (
      let i = 0;
      i < imagesPerLoad &&
      loadedImages < totalImages &&
      loadedImages < imageList.length;
      i++
    ) {
      const container = document.createElement("div");
      container.classList.add("gallery-container");
      container.dataset.imageIndex = loadedImages; // Привязываем индекс

      const placeholder = createPlaceholder();
      container.appendChild(placeholder);
      gallery.appendChild(container);

      observer.observe(container);
      loadedImages++; // Перемещаем сюда, чтобы не было повторов
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const container = entry.target;
        const placeholder = container.querySelector(".gallery-placeholder");
        const imageIndex = container.dataset.imageIndex; // Берём индекс изображения

        if (entry.isIntersecting) {
          if (!container.dataset.loaded && imageIndex < imageList.length) {
            const img = document.createElement("img");
            img.src = imageList[imageIndex].thumbnailUrl;
            img.dataset.fullImage = imageList[imageIndex].url;
            img.classList.add("gallery-item");
            img.onload = () => {
              img.style.opacity = "1";
              placeholder.replaceWith(img);
            };
            container.dataset.loaded = "true";
          }
        } else {
          if (container.dataset.loaded) {
            const newPlaceholder = createPlaceholder();
            container.innerHTML = "";
            container.appendChild(newPlaceholder);
            container.dataset.loaded = "";
          }
        }
      });
    },
    { rootMargin: "200px" }
  );

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 500) {
      loadImages();
    }
  });

  // Lightbox functionality
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("gallery-item")) {
      const lightbox = document.getElementById("lightbox");
      const lightboxImg = document.getElementById("lightbox-img");

      lightbox.style.display = "flex";
      setTimeout(() => lightbox.classList.add("show"), 10);
      lightboxImg.src = event.target.dataset.fullImage;
    }
  });

  document.getElementById("close").addEventListener("click", closeLightbox);
  document
    .getElementById("lightbox")
    .addEventListener("click", function (event) {
      if (event.target === this) {
        closeLightbox();
      }
    });

  function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("show");
    setTimeout(() => (lightbox.style.display = "none"), 300);
  }

  fetchPhotos(); // Call the function to fetch and display images
});
