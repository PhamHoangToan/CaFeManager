self.addEventListener("install", () => {
  self.skipWaiting();
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open("coffee-cache").then((cache) =>
      cache.match(event.request).then(
        (response) =>
          response ||
          fetch(event.request).then((r) => {
            cache.put(event.request, r.clone());
            return r;
          })
      )
    )
  );
});
