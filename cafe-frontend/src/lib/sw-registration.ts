export default function registerSW() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        console.log("✅ Service Worker registered:", registration.scope);
      } catch (err) {
        console.error("❌ Service Worker registration failed:", err);
      }
    });
  }
}
