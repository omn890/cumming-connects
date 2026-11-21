/* Cumming Connects — Resource map (Leaflet + OpenStreetMap tiles).
   Sidebar list and markers stay in sync with filters. Falls back to an accessible list when offline. */
(function () {
  "use strict";
  const { escapeHTML: esc, debounce, directionsURL, category } = window.CC;
  const RES = (window.RESOURCES || []).filter(r => typeof r.lat === "number" && typeof r.lng === "number");
  const CATS = window.CATEGORIES || [];
  const CUMMING = [34.2073, -84.1402];

  const state = { cats: new Set(), q: "", origin: null };
  let map = null, markers = {}, activeId = null;

  function goOffline() {
    document.getElementById("map-layout").classList.add("is-offline");
    drawSchematic();
  }

  /* ---------- Offline schematic: drawn from our own coordinates, no tiles needed ---------- */
  // Simplified shapes (lat, lng). Not to scale; enough to orient someone when Wi-Fi fails.
  const GA400 = [[34.07, -84.25], [34.12, -84.205], [34.16, -84.175], [34.2, -84.145], [34.235, -84.12], [34.28, -84.1], [34.33, -84.075], [34.37, -84.055]];
  const LANIER = [[34.12, -84.06], [34.16, -84.085], [34.2, -84.09], [34.23, -84.083], [34.27, -84.068], [34.31, -84.045], [34.35, -84.01], [34.37, -83.96], [34.37, -83.9], [34.12, -83.9]];
  const BOX = { n: 34.36, s: 34.1, w: -84.25, e: -83.98 };
  const W = 1000, H = Math.round(1000 * ((BOX.n - BOX.s) / ((BOX.e - BOX.w) * Math.cos(34.2 * Math.PI / 180))));
  const px = ([lat, lng]) => [((lng - BOX.w) / (BOX.e - BOX.w)) * W, ((BOX.n - lat) / (BOX.n - BOX.s)) * H];
  const path = pts => pts.map((p, i) => (i ? "L" : "M") + px(p).map(n => n.toFixed(1)).join(" ")).join(" ");

  function drawSchematic() {
    const wrap = document.getElementById("map-offline");
    if (!wrap || wrap.dataset.drawn) return;
    wrap.dataset.drawn = "1";
    const [cx, cy] = px(CUMMING);
    wrap.innerHTML =
      '<div class="schematic"><div class="sch-frame" style="aspect-ratio:' + W + " / " + H + '"><svg viewBox="0 0 ' + W + " " + H + '" aria-hidden="true" focusable="false">' +
        '<rect width="' + W + '" height="' + H + '" class="sch-land"/>' +
        '<path d="' + path(LANIER) + ' Z" class="sch-lake"/>' +
        '<path d="' + path(GA400) + '" class="sch-road-casing"/><path d="' + path(GA400) + '" class="sch-road"/>' +
        '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="10" class="sch-town"/>' +
        '<text x="' + (cx + 16).toFixed(1) + '" y="' + (cy + 6).toFixed(1) + '" class="sch-label">Cumming</text>' +
        '<text x="' + (px([34.3, -83.99])[0]).toFixed(1) + '" y="' + (px([34.3, -83.99])[1]).toFixed(1) + '" class="sch-label sch-label--lake" text-anchor="end">Lake Lanier</text>' +
        '<text x="' + (px([34.12, -84.2])[0] + 14).toFixed(1) + '" y="' + (px([34.12, -84.2])[1]).toFixed(1) + '" class="sch-label sch-label--road">GA 400</text>' +
      '</svg><div class="sch-pins" id="sch-pins"></div></div></div>' +
      '<p class="sch-note">Offline view: a simplified map drawn without internet. Positions are approximate. Select a pin or a place in the list for details and directions.</p>';
    renderSchematicPins(filtered());
  }

  function renderSchematicPins(list) {
    const pins = document.getElementById("sch-pins");
    if (!pins) return;
    pins.innerHTML = list.map(r => {
      const [x, y] = px([r.lat, r.lng]);
      // Pins are for pointing; the list beside the map is the keyboard and screen-reader path
      return '<button type="button" tabindex="-1" aria-hidden="true" class="sch-pin cat-' + r.category + '" style="left:' + (x / W * 100).toFixed(2) + "%;top:" + (y / H * 100).toFixed(2) + '%" data-open="' + r.id + '" data-name="' + esc(r.name) + '"></button>';
    }).join("");
  }

  function initMap() {
    if (typeof L === "undefined") { goOffline(); return; }
    map = L.map("map", { scrollWheelZoom: false, zoomControl: true }).setView(CUMMING, 11);
    const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // Offline detection: if no tile loads within 5 seconds, switch to the list view
    let loaded = false;
    tiles.on("tileload", () => { loaded = true; document.getElementById("map-layout").classList.remove("is-offline"); });
    setTimeout(() => { if (!loaded) goOffline(); }, 5000);
    if (!navigator.onLine) goOffline();
    map.on("focus", () => map.scrollWheelZoom.enable());
    map.on("blur", () => map.scrollWheelZoom.disable());
    map.on("click", () => map.scrollWheelZoom.enable());

    RES.forEach(r => {
      const icon = L.divIcon({ className: "map-pin-wrap", html: '<div class="map-pin cat-' + r.category + '"></div>', iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -28] });
      const m = L.marker([r.lat, r.lng], { icon, title: r.name, alt: r.name, keyboard: true });
      m.bindPopup(
        "<strong>" + esc(r.name) + "</strong>" +
        '<span class="badge cat-' + r.category + '">' + esc(category(r.category).label) + "</span>" +
        '<p style="margin:.5rem 0">' + esc(r.address) + "</p>" +
        '<div class="row" style="gap:.5rem">' +
          '<button type="button" class="btn btn--primary btn--sm" data-open="' + r.id + '">Details</button>' +
          '<a class="btn btn--ghost btn--sm" href="' + directionsURL(r) + '" target="_blank" rel="noopener">Directions</a>' +
        "</div>"
      );
      m.on("click", () => setActive(r.id, false));
      markers[r.id] = m;
    });
  }

  function distanceMiles(a, b) {
    const R = 3958.8, toRad = d => d * Math.PI / 180;
    const dLat = toRad(b[0] - a[0]), dLng = toRad(b[1] - a[1]);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function filtered() {
    const q = state.q.toLowerCase();
    let list = RES.filter(r => (!state.cats.size || state.cats.has(r.category)) &&
      (!q || (r.name + " " + r.address + " " + (r.tags || []).join(" ")).toLowerCase().includes(q)));
    if (state.origin) list = list.map(r => Object.assign({}, r, { dist: distanceMiles(state.origin, [r.lat, r.lng]) })).sort((a, b) => a.dist - b.dist);
    else list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }

  function render() {
    const list = filtered();
    document.getElementById("map-list").innerHTML = list.map(r =>
      '<li><button type="button" class="cat-' + r.category + (r.id === activeId ? " is-active" : "") + '" data-map-id="' + r.id + '">' +
      '<span class="dot" aria-hidden="true"></span><span><strong>' + esc(r.name) + "</strong><small>" +
      esc(r.address.split(",")[0]) +
      (r.dist != null ? ", " + r.dist.toFixed(1) + " mi away" : "") + "</small></span></button></li>").join("") ||
      '<li style="padding:1rem">No places match. Try another filter.</li>';
    const hidden = (window.RESOURCES || []).length - RES.length;
    renderSchematicPins(list);
    document.getElementById("map-count").textContent = (list.length === RES.length ? RES.length + " places on the map" : list.length + " of " + RES.length + " places") +
      (state.origin ? ", nearest first" : "") + (hidden && list.length === RES.length ? " (" + hidden + " confidential shelter not shown)" : "");
    document.querySelectorAll("#map-chips .chip").forEach(c => c.setAttribute("aria-pressed", state.cats.has(c.dataset.cat)));
    const qs = new URLSearchParams();
    if (state.cats.size) qs.set("cat", [...state.cats].join(","));
    if (state.q) qs.set("q", state.q);
    try { history.replaceState(null, "", (qs.toString() ? "?" + qs : location.pathname) + location.hash); } catch (e) { /* file:// */ }

    if (map) {
      const ids = new Set(list.map(r => r.id));
      Object.entries(markers).forEach(([id, m]) => ids.has(id) ? m.addTo(map) : m.remove());
      if (list.length && (state.cats.size || state.q)) {
        map.fitBounds(L.latLngBounds(list.map(r => [r.lat, r.lng])).pad(0.2), { maxZoom: 14 });
      }
    }
  }

  function setActive(id, fly) {
    activeId = id;
    document.querySelectorAll("[data-map-id]").forEach(b => b.classList.toggle("is-active", b.dataset.mapId === id));
    const btn = document.querySelector('[data-map-id="' + id + '"]');
    if (btn) btn.scrollIntoView({ block: "nearest" });
    const offline = document.getElementById("map-layout").classList.contains("is-offline");
    if (map && markers[id] && !offline) {
      if (fly) map.setView(markers[id].getLatLng(), 15);
      markers[id].openPopup();
    } else if (fly) {
      window.CCUI.openResource(id, btn);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    try { initMap(); } catch (e) { goOffline(); }

    const used = CATS.filter(c => RES.some(r => r.category === c.id));
    document.getElementById("map-chips").innerHTML = used.map(c =>
      '<button type="button" class="chip cat-' + c.id + '" data-cat="' + c.id + '" aria-pressed="false"><span class="dot" aria-hidden="true"></span>' + esc(c.short || c.label) + "</button>").join("");
    document.getElementById("map-chips").addEventListener("click", e => {
      const chip = e.target.closest("[data-cat]"); if (!chip) return;
      state.cats.has(chip.dataset.cat) ? state.cats.delete(chip.dataset.cat) : state.cats.add(chip.dataset.cat);
      render();
    });
    const q = document.getElementById("map-q");
    const params = new URLSearchParams(location.search);
    window.CC.knownList(params.get("cat"), CATS.map(c => c.id)).forEach(c => state.cats.add(c));
    if (params.get("q")) { state.q = window.CC.linkQuery(params.get("q")); q.value = state.q; }
    q.addEventListener("input", debounce(() => { state.q = q.value.trim(); render(); }, 180));

    document.getElementById("map-list").addEventListener("click", e => {
      const b = e.target.closest("[data-map-id]"); if (b) setActive(b.dataset.mapId, true);
    });

    // "Near me": sort by distance using the browser's location (never stored or sent anywhere)
    document.getElementById("near-me").addEventListener("click", () => {
      if (!navigator.geolocation) { window.CC.toast("Location isn\u2019t available in this browser."); return; }
      window.CC.toast("Finding places near you…");
      navigator.geolocation.getCurrentPosition(pos => {
        state.origin = [pos.coords.latitude, pos.coords.longitude];
        if (map) {
          L.circleMarker(state.origin, { radius: 9, color: "#1a5fd0", fillColor: "#1a5fd0", fillOpacity: .9, weight: 3 }).addTo(map).bindTooltip("You are here", { permanent: true, direction: "top" });
          map.setView(state.origin, 12);
        }
        render();
        window.CC.toast("Sorted by distance from you");
      }, () => window.CC.toast("We couldn\u2019t get your location. Check your browser\u2019s permissions."), { timeout: 8000 });
    });

    render();

    // Deep link from resource details: map.html#resource-id
    const hash = window.CC.hashId();
    if (hash && markers[hash]) setTimeout(() => setActive(hash, true), 300);
    else if (hash && RES.some(r => r.id === hash)) setActive(hash, false);
  });
})();
