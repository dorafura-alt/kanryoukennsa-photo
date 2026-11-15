// 金物検査 オフライン用の仕組み
// 画面（index.html）：ネットがあれば最新版を取る。ネットがない・3秒で返事がない時は保存してある版を出す。
// そのほかのファイル：保存してある版をすぐ使い、裏で新しい版に入れかえておく。
const CACHE = "kanamono-v1";
const FILES = ["./", "./jspdf.umd.min.js", "./manifest.webmanifest",
  "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

async function fromNet(req, key) {
  const res = await fetch(req, { cache: "no-cache" });
  if (res.ok) (await caches.open(CACHE)).put(key, res.clone());
  return res;
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      const net = fromNet(new Request("./"), "./");
      const late = new Promise(r => setTimeout(r, 3000));
      try {
        const res = await Promise.race([net, late]);
        if (res && res.ok) return res;
      } catch (err) {}
      e.waitUntil(net.catch(() => {}));
      return (await caches.match("./")) || net;
    })());
    return;
  }
  e.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    const net = fromNet(req, req).catch(() => null);
    if (cached) { e.waitUntil(net); return cached; }
    return (await net) || new Response("オフラインです", { status: 503 });
  })());
});
