/* Cumming Connects — measurement layer.
   Every meaningful action calls CC.track(name, params). Events are pushed to window.dataLayer
   (the format Google Tag Manager / GA4 read), and counted for this browser session so the
   About page can show a live funnel. No data leaves the device until a real GA4 tag is added:
   paste the GA4 snippet into each page's <head> and these events flow through automatically. */
(function () {
  "use strict";
  window.dataLayer = window.dataLayer || [];
  const KEY = "cc:funnel";

  function read() {
    try { return JSON.parse(sessionStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function write(v) {
    try { sessionStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* private mode */ }
  }

  function track(name, params) {
    const evt = Object.assign({ event: name, page: location.pathname.split("/").pop() || "index.html" }, params || {});
    window.dataLayer.push(evt);
    const counts = read();
    counts[name] = (counts[name] || 0) + 1;
    write(counts);
    document.dispatchEvent(new CustomEvent("cc:track", { detail: evt }));
  }

  // Automatic events: page views, outbound actions (call, directions, website), downloads
  track("page_view", { title: document.title });
  document.addEventListener("click", e => {
    const a = e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href");
    if (href.startsWith("tel:")) track("click_to_call", { number: href.slice(4) });
    else if (/google\.com\/maps/.test(href)) track("get_directions", { label: a.textContent.trim() });
    else if (/^https?:/.test(href)) track("outbound_click", { url: href });
  });

  window.CC = window.CC || {};
  window.CC.track = track;
  window.CCAnalytics = { track, counts: read };
})();
