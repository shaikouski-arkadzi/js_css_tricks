window.addEventListener("load", async () => {
  // Проверка поддержки Service worker
  if ("serviceWorker" in navigator) {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      console.log("Service worker register success", reg);
    } catch (e) {
      console.log("Service worker register fail");
    }
  }

  await loadPosts();
});

async function loadPosts() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  );
  const data = await res.json();

  const container = document.querySelector("#posts");
  container.innerHTML = data.map(toCard).join("\n");
}

function toCard(post) {
  return `
    <div class="card">
      <h3 class="card-title">
        ${post.title}
      </h3>
      <p class="card-body">
        ${post.body}
      </p>
    </div>
  `;
}
