const staticCacheName = "stat-app-v1";
const dynamicCacheName = "dyn-app-v1";

const assetUrls = ["index.html", "/app.js", "offline.html"];

self.addEventListener("install", async (event) => {
  // кэшируем файлы
  // event.waitUntil(
  //   caches.open(staticCacheName).then((cache) => cache.addAll(assetUrls))
  // );

  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetUrls);
});

// Оставляем в кэше только актуальную версию
self.addEventListener("activate", async (event) => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter((name) => name !== staticCacheName)
      .filter((name) => name !== dynamicCacheName)
      .map((name) => caches.delete(name))
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  const url = new URL(request.url);
  if (url.origin === location.origin) {
    // получаем статические ресурсы (файлы коды, assets)
    event.respondWith(cacheFirst(request));
  } else {
    // если мы получаем данные со get запросов
    event.respondWith(networkFirst(request));
  }
});

// Сначала загружаем закэшированные файлы, иначе загружаем из сети
async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? (await fetch(request));
}

// Пытаемся загрузить данные из запроса
// и при успехе кладем в кэш
async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName);
  try {
    // загружаем данные из сервера
    const response = await fetch(request);
    // копируем в кэщ
    await cache.put(request, response.clone());
    return response;
  } catch (e) {
    //если не можем загрузить из сервера
    const cached = await cache.match(request);
    // если есть данные в кэше - достаем
    // если нету показываем оффлайн страницу
    return cached ?? (await caches.match("/offline.html"));
  }
}
