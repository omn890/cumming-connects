/* Cumming Connects — home page.
   The guide-sign hero is a live form: changing "I need ___ for ___" updates the count and the
   three "exit" plates below it, and Go opens the filtered directory. Also renders the category
   board, agenda, optional testimonials, video chapters, and carousel buttons. */
(function () {
  "use strict";
  const { escapeHTML: esc, parseLocal } = window.CC;
  const RES = window.RESOURCES || [], EVENTS = window.EVENTS || [], CATS = window.CATEGORIES || [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const track = (n, p) => window.CC.track && window.CC.track(n, p);

  /* ---------- Sign hero ---------- */
  const NEED_LABEL = { food: "food help", health: "health care", education: "libraries and schools", youth: "kids and teens", seniors: "senior support", parks: "parks and trails", civic: "city and county services", safety: "safety help" };

  function matchesFor(cat, aud) {
    return RES.filter(r => r.category === cat && (!aud || (r.audience || []).includes(aud) || (r.audience || []).includes("all")))
      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (b.verified ? 1 : 0) - (a.verified ? 1 : 0) || a.name.localeCompare(b.name));
  }

  function place(r) {
    if (r.confidential) return "Confidential location, call the hotline";
    const parts = (r.address || "").split(",").map(s => s.trim());
    return parts.length > 1 ? parts[0] + ", " + parts[1] : parts[0];
  }

  // A <select> is as wide as its longest option; size it to the chosen words so the sign reads as one sentence
  let measurer;
  function fitSelect(sel) {
    if (window.CSS && CSS.supports("field-sizing", "content")) return; // modern browsers size it natively (no layout shift)
    if (!measurer) {
      measurer = document.createElement("span");
      measurer.setAttribute("aria-hidden", "true");
      measurer.style.cssText = "position:absolute;visibility:hidden;white-space:pre;left:-9999px;top:0";
      document.body.appendChild(measurer);
    }
    const cs = getComputedStyle(sel);
    measurer.style.font = cs.font;
    measurer.style.letterSpacing = cs.letterSpacing;
    measurer.textContent = sel.options[sel.selectedIndex].text;
    sel.style.width = Math.ceil(measurer.getBoundingClientRect().width + parseFloat(cs.paddingRight) + 2) + "px";
  }

  function updateSign(animate) {
    const cat = document.getElementById("sign-need").value;
    const aud = document.getElementById("sign-who").value;
    const list = matchesFor(cat, aud);
    const n = list.length;
    document.querySelectorAll(".sign-select select").forEach(fitSelect);
    document.getElementById("sign-results").innerHTML = n
      ? '<span class="n">' + n + "</span> place" + (n === 1 ? "" : "s") + " for " + esc(NEED_LABEL[cat])
      : "No exact match. Try &ldquo;anyone&rdquo;.";
    document.getElementById("sign-go-label").textContent = n ? "Show " + (n === 1 ? "it" : "all " + n) : "Show all " + NEED_LABEL[cat];

    const exits = document.getElementById("sign-exits");
    exits.innerHTML = list.slice(0, 3).map((r, i) =>
      '<li class="exit cat-' + r.category + (animate && !reduceMotion ? " is-flipping" : "") + '" style="--i:' + i + '">' +
      '<a href="resources.html#' + r.id + '"><strong translate="no">' + esc(r.name) + "</strong><span>" + esc(place(r)) + "</span></a></li>").join("");
  }

  function initSign() {
    const form = document.getElementById("sign-form");
    if (!form) return;
    const need = document.getElementById("sign-need"), who = document.getElementById("sign-who");
    need.addEventListener("change", () => { updateSign(true); track("sign_select", { need: need.value, who: who.value }); });
    who.addEventListener("change", () => { updateSign(true); track("sign_select", { need: need.value, who: who.value }); });
    form.addEventListener("submit", e => {
      e.preventDefault();
      const p = new URLSearchParams({ cat: need.value });
      if (who.value && matchesFor(need.value, who.value).length) p.set("aud", who.value);
      track("sign_go", { need: need.value, who: who.value });
      location.href = "resources.html?" + p.toString();
    });
    updateSign(false);
    // Re-fit after web fonts load and when text size or viewport changes
    if (document.fonts) document.fonts.ready.then(() => updateSign(false));
    window.addEventListener("resize", window.CC.debounce(() => document.querySelectorAll(".sign-select select").forEach(fitSelect), 150));
    new MutationObserver(() => document.querySelectorAll(".sign-select select").forEach(fitSelect)).observe(document.documentElement, { attributes: true, attributeFilter: ["data-text"] });

    // L3 page moment: the sign rises into place once on load
    const hero = document.querySelector(".sign-hero");
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.remove("is-loading")));
  }

  /* ---------- "Checked" line: counted from the data, so it stays true when listings change ---------- */
  const SOURCE_NAMES = { "forsythco.com": "Forsyth County", "cityofcumming.net": "City of Cumming", "forsythpl.org": "Forsyth County Public Library", "cummingfair.net": "Cumming Fairgrounds", "cummingcitycenter.com": "Cumming City Center" };
  function initChecked() {
    const el = document.getElementById("checked-line");
    if (!el || !window.DATA_CHECKED) return;
    const counts = {}; let total = 0;
    RES.concat(EVENTS.filter((e, i, a) => a.findIndex(x => x.sourceUrl === e.sourceUrl && x.title === e.title) === i)).forEach(x => {
      const url = x.sourceUrl || x.website; if (!url) return;
      total++;
      const host = url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0].replace(/^parks\./, "");
      const name = SOURCE_NAMES[host]; if (name) counts[name] = (counts[name] || 0) + 1;
    });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 4);
    const date = parseLocal(window.DATA_CHECKED + "T12:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    const html = "<strong>Checked " + date + "</strong> <span>against " + total + " pages, including " +
      top.map(([n, c], i) => (i === top.length - 1 ? "and " : "") + '<a href="sources.html">' + esc(n) + " (" + c + ")</a>").join(", ") +
      '.</span> <a href="sources.html">See every source</a>';
    // Only repaint when the data changed, so the line already in the HTML stays put (faster first paint)
    const tmp = document.createElement("p"); tmp.innerHTML = html;
    const text = n => n.textContent.replace(/\s+/g, " ").trim();
    if (text(tmp) !== text(el)) el.innerHTML = html;
  }

  /* ---------- Category board ---------- */
  function initBoard() {
    const board = document.getElementById("category-board");
    if (!board) return;
    board.innerHTML = CATS.map(c => {
      const n = RES.filter(r => r.category === c.id).length;
      // The link's name is its visible words, starting with the count (WCAG 2.5.3, label in name)
      return '<a class="cat-' + c.id + '" href="resources.html?cat=' + c.id + '">' +
        '<span class="board-count">' + n + '<span class="visually-hidden"> places,</span></span>' +
        '<span><span class="board-title">' + esc(c.label) + "</span>" +
        '<span class="board-sub">' + esc(c.blurb) + "</span></span></a>";
    }).join("");
  }

  /* ---------- Agenda ---------- */
  function initAgenda() {
    const wrap = document.getElementById("upcoming-events");
    if (!wrap) return;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const sorted = EVENTS.slice().sort((a, b) => parseLocal(a.start) - parseLocal(b.start));
    const next = sorted.filter(e => parseLocal(e.end || e.start) >= today);
    wrap.innerHTML = (next.length ? next : sorted.slice(-4)).slice(0, 4).map(window.CCUI.eventCard).join("");
  }

  /* ---------- Testimonials: only real quotes, never placeholders ---------- */
  function initVoices() {
    const quotes = (window.TESTIMONIALS || []).filter(q => q && q.quote && q.name);
    if (!quotes.length) return;
    document.getElementById("quotes").innerHTML = quotes.map(q =>
      '<blockquote class="quote"><p>&ldquo;' + esc(q.quote) + '&rdquo;</p><footer>' + esc(q.name) + (q.role ? ", " + esc(q.role) : "") + "</footer></blockquote>").join("");
    document.getElementById("voices").hidden = false;
  }

  /* ---------- Carousel buttons (scroll-snap does the rest) ---------- */
  function initCarousel() {
    const trackEl = document.getElementById("places-track");
    if (!trackEl) return;
    const prev = document.querySelector('[data-carousel="prev"]'), next = document.querySelector('[data-carousel="next"]');
    const step = () => (trackEl.querySelector(".place")?.getBoundingClientRect().width || 300) + 16;
    // aria-disabled (not disabled) so a focused button keeps focus when it reaches the end
    const sync = () => {
      prev.setAttribute("aria-disabled", trackEl.scrollLeft < 4);
      next.setAttribute("aria-disabled", trackEl.scrollLeft + trackEl.clientWidth >= trackEl.scrollWidth - 4);
    };
    prev.addEventListener("click", () => { if (prev.getAttribute("aria-disabled") !== "true") trackEl.scrollBy({ left: -step(), behavior: reduceMotion ? "auto" : "smooth" }); });
    next.addEventListener("click", () => { if (next.getAttribute("aria-disabled") !== "true") trackEl.scrollBy({ left: step(), behavior: reduceMotion ? "auto" : "smooth" }); });
    trackEl.addEventListener("scroll", window.CC.debounce(sync, 60), { passive: true });
    window.addEventListener("resize", window.CC.debounce(sync, 120));
    sync();
  }

  /* ---------- Demo video: count plays ---------- */
  function initVideo() {
    const v = document.getElementById("demo-video");
    if (!v) return;
    // Load the poster only when the video nears the screen, so it doesn't compete with the hero's fonts
    const showPoster = () => { if (v.dataset.poster && !v.poster) v.poster = v.dataset.poster; };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { showPoster(); io.disconnect(); } }, { rootMargin: "600px 0px" });
      io.observe(v);
    } else showPoster();
    v.addEventListener("play", () => track("video_play", {}), { once: true });
    // Chapter links jump to that moment and play
    document.querySelectorAll(".chapter").forEach(btn => btn.addEventListener("click", () => {
      const t = parseFloat(btn.dataset.t);
      const seekable = () => v.seekable.length && v.seekable.end(0) > t;
      const seek = () => {
        if (seekable()) { v.currentTime = t; v.play().catch(() => {}); return; }
        // Some simple servers can't send part of a file, so the browser can't jump ahead.
        // Load the whole video into memory once; then every chapter can seek.
        if (v.dataset.blob || location.protocol === "file:") { v.currentTime = t; v.play().catch(() => {}); return; }
        v.dataset.blob = "1";
        fetch(v.currentSrc || v.querySelector("source").src).then(r => r.blob()).then(b => {
          v.src = URL.createObjectURL(b);
          v.addEventListener("loadedmetadata", () => { v.currentTime = t; v.play().catch(() => {}); }, { once: true });
        }).catch(() => { v.currentTime = t; v.play().catch(() => {}); });
      };
      // With preload="none" the video has no duration yet; load metadata first, then seek
      if (v.readyState >= 1) seek();
      else { v.addEventListener("loadedmetadata", seek, { once: true }); v.preload = "metadata"; v.load(); }
      track("video_chapter", { t: btn.dataset.t });
    }));
    // Captions: the .vtt file over the web; built in JavaScript from disk (browsers block <track> on file://)
    if (location.protocol.indexOf("http") === 0) {
      const t = document.createElement("track");
      Object.assign(t, { kind: "captions", src: "assets/video/demo.vtt", srclang: "en", label: "English", default: true });
      v.appendChild(t);
    } else if (window.DEMO_CAPTIONS && "VTTCue" in window) {
      const tt = v.addTextTrack("captions", "English", "en");
      window.DEMO_CAPTIONS.forEach(([a, b, text]) => tt.addCue(new VTTCue(a, b, text)));
      tt.mode = "showing";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initSign(); initChecked(); initBoard(); initAgenda(); initVoices(); initCarousel(); initVideo();
  });
})();
