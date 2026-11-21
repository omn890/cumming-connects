/* Cumming Connects — shared behavior for every page.
   Exposes a small `CC` namespace used by the page scripts. */
(function () {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");

  /* ---------- Safe storage (private windows can throw) ---------- */
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem("cc:" + key); return v === null ? fallback : JSON.parse(v); }
      catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem("cc:" + key, JSON.stringify(value)); } catch (e) { /* ignore */ }
    }
  };

  /* ---------- Icons (Lucide-style, stroke-based, MIT-licensed shapes) ---------- */
  const ICONS = {
    food: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    health: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>',
    education: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h8M8 11h6"/>',
    youth: '<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85"/>',
    seniors: '<path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 15 6 6"/><path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z"/>',
    parks: '<path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"/><path d="M12 22v-3"/>',
    civic: '<path d="M3 22h18"/><path d="M6 18v-7M10 18v-7M14 18v-7M18 18v-7"/><path d="m12 2 8 5H4Z"/>',
    safety: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z"/><path d="M12 8v4M12 16h.01"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    calcheck: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4"/>',
    star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    directions: '<path d="M3 11l19-9-9 19-2-8-8-2Z"/>',
    external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    volume: '<path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6a1.4 1.4 0 0 1-1 .4H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4a.7.7 0 0 0 1.2-.5Z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.4 18.4a9 9 0 0 0 0-12.8"/>'
  };
  function icon(name, extra) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"' + (extra ? " " + extra : "") + ">" + (ICONS[name] || "") + "</svg>";
  }

  /* ---------- Helpers ---------- */
  function escapeHTML(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function debounce(fn, ms) {
    let t; return function () { const args = arguments; clearTimeout(t); t = setTimeout(() => fn.apply(this, args), ms); };
  }
  // Values read from a link are only trusted if they're ones the site itself uses (stops spoofed text, OWASP content spoofing)
  const MAX_QUERY = 80;
  function knownList(raw, allowed) { return (raw || "").split(",").filter(v => allowed.includes(v)); }
  function linkQuery(raw) { return (raw || "").slice(0, MAX_QUERY); }
  function hashId() { try { return decodeURIComponent(location.hash.slice(1)); } catch (e) { return ""; } }
  function category(id) {
    return (window.CATEGORIES || []).find(c => c.id === id) || { id: id, label: id, short: id };
  }
  function parseLocal(iso) {
    // "2026-11-07T09:00" → local Date (avoids UTC shifting)
    const [d, t] = iso.split("T");
    const [y, m, day] = d.split("-").map(Number);
    const [hh, mm] = (t || "00:00").split(":").map(Number);
    return new Date(y, m - 1, day, hh, mm);
  }
  const fmt = {
    month: d => d.toLocaleDateString("en-US", { month: "short" }),
    day: d => d.getDate(),
    long: d => d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
    // AP style, matching the listings: "9 a.m.", "6:30 p.m.", "noon"
    time: d => {
      const h = d.getHours(), m = d.getMinutes();
      if (h === 12 && m === 0) return "noon";
      if (h === 0 && m === 0) return "midnight";
      return (h % 12 || 12) + (m ? ":" + String(m).padStart(2, "0") : "") + (h < 12 ? " a.m." : " p.m.");
    },
    monthYear: d => d.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  };
  function eventTimeRange(ev) {
    const s = parseLocal(ev.start);
    if (ev.allDay) return "All day";
    let out = fmt.time(s);
    if (ev.end) {
      const e = parseLocal(ev.end);
      // Multi-day events repeat the same hours each day, so show the hours and the last day
      out += " – " + fmt.time(e) + (e.toDateString() === s.toDateString() ? "" : " daily, through " + e.toLocaleDateString("en-US", { month: "long", day: "numeric" }));
    }
    return out;
  }
  function directionsURL(r) {
    return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(r.name + ", " + r.address);
  }

  /* ---------- Saved lists: starred places and My calendar events (kept on this device only) ---------- */
  function savedList(key, badgeAttr) {
    const list = {
      all() { return store.get(key, []); },
      has(id) { return list.all().includes(id); },
      toggle(id) {
        const ids = list.all();
        const i = ids.indexOf(id);
        if (i === -1) ids.push(id); else ids.splice(i, 1);
        store.set(key, ids);
        list.badge();
        return i === -1;
      },
      badge() {
        const n = list.all().length;
        document.querySelectorAll("[" + badgeAttr + "]").forEach(el => { el.textContent = n; el.hidden = n === 0; });
      }
    };
    return list;
  }
  const favorites = savedList("favorites", "data-fav-count");
  const myEvents = savedList("myEvents", "data-myev-count");

  /* ---------- Toast (announced to screen readers) ---------- */
  let toastRegion;
  function toast(msg) {
    if (!toastRegion) {
      toastRegion = document.createElement("div");
      toastRegion.className = "toast-region";
      toastRegion.setAttribute("role", "status");
      toastRegion.setAttribute("aria-live", "polite");
      document.body.appendChild(toastRegion);
    }
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    toastRegion.appendChild(t);
    setTimeout(() => t.remove(), 3200);
  }

  /* ---------- Modal helper (native <dialog>: focus trap + Esc built in) ---------- */
  function openModal(dialog, html, opener) {
    if (listen.root) stopListening(); // don't talk over the pop-up
    dialog.innerHTML = html;
    // A Listen button next to Close: the page behind a pop-up can't be clicked
    const head = dialog.querySelector(".modal-head [data-close]");
    if (canListen && head) {
      const tools = document.createElement("div"); tools.className = "modal-tools";
      head.before(tools);
      tools.innerHTML = '<button type="button" class="icon-btn listen-btn" data-listen data-listen-name="Listen to these details" aria-label="Listen to these details">' +
        icon("volume", 'class="listen-icon-play"') + '<svg class="listen-icon-stop" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><rect x="6" y="6" width="12" height="12" rx="2"/></svg></button>';
      tools.appendChild(head);
    }
    if (!dialog.open) dialog.showModal();
    const closeBtn = dialog.querySelector("[data-close]");
    if (closeBtn) closeBtn.focus();
    dialog.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", () => dialog.close()));
    dialog.addEventListener("close", () => { if (opener && document.contains(opener)) opener.focus(); }, { once: true });
  }
  document.addEventListener("click", e => {
    // Click on the backdrop closes the dialog
    if (e.target instanceof HTMLDialogElement && e.target.open) {
      const r = e.target.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) e.target.close();
    }
  });

  /* ---------- Theme toggle ---------- */
  function currentTheme() {
    return root.dataset.theme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function applyTheme(theme) {
    root.dataset.theme = theme;
    document.querySelectorAll("[data-theme-toggle]").forEach(b => {
      b.setAttribute("aria-pressed", theme === "dark"); // a toggle named "Dark mode": pressed = on
    });
  }

  /* ---------- Colorblind mode: a color-blind-safe palette plus a road-sign shape for each category ---------- */
  function applyCvd(on) {
    if (on) root.dataset.cvd = "on"; else delete root.dataset.cvd;
    document.querySelectorAll("[data-cvd-toggle]").forEach(b => b.setAttribute("aria-pressed", on));
  }
  // The shape key uses the browser's popover (Esc and tapping outside close it); older browsers get a simple toggle
  function shapeKey(show) {
    const key = document.getElementById("shape-key");
    if (!key) return;
    if (typeof key.showPopover === "function") {
      if (show && !key.matches(":popover-open")) key.showPopover();
      if (!show && key.matches(":popover-open")) key.hidePopover();
    } else key.hidden = !show;
  }
  function initShapeKey() {
    const key = document.getElementById("shape-key");
    if (!key || typeof key.showPopover === "function") return;
    key.removeAttribute("popover"); // older browser: this script shows and hides the key instead
    key.hidden = true;
    document.addEventListener("click", e => {
      const t = e.target.closest("[popovertarget='shape-key']");
      if (t) shapeKey(t.getAttribute("popovertargetaction") === "hide" ? false : key.hidden);
      else if (!key.hidden && !key.contains(e.target) && !e.target.closest("[data-cvd-toggle]")) shapeKey(false); // the toggle itself opens it
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") shapeKey(false); });
  }

  /* ---------- Text size ---------- */
  const TEXT_LABELS = { 1: "A", 2: "A+", 3: "A++" };
  function applyTextSize(level) {
    root.dataset.text = level;
    document.querySelectorAll("[data-text-toggle]").forEach(b => {
      // The accessible name always contains the visible label (WCAG 2.5.3)
      const lvl = b.querySelector("[data-lvl]");
      if (lvl) lvl.textContent = TEXT_LABELS[level];
      else b.textContent = "Text size: " + TEXT_LABELS[level];
      if (lvl) b.setAttribute("aria-label", "Text size " + TEXT_LABELS[level]);
    });
  }

  /* ---------- Inside a frame (a preview viewer or an embed), phone and outside links open in a new tab,
     so the frame never navigates away to a blank page ---------- */
  if (window.top !== window) {
    document.addEventListener("click", e => {
      const link = e.target.closest("a[href]");
      if (!link || e.defaultPrevented) return;
      const href = link.getAttribute("href");
      if (/^(tel:|mailto:|https?:)/i.test(href) && link.target !== "_blank") {
        e.preventDefault();
        window.open(link.href, "_blank", "noopener");
      }
    });
  }

  /* ---------- Listen: reads the page out loud with the browser's built-in voice (works offline; nothing is sent) ---------- */
  const synth = window.speechSynthesis;
  const canListen = !!(synth && window.SpeechSynthesisUtterance);
  const BLOCKS = "h1, h2, h3, h4, p, li, dt, dd, figcaption, blockquote, summary";
  const WHOLE = "article, tr, .exit, .agenda-item, #category-board > a, .cal-day:has(.cal-event)"; // read as one piece
  // Skipped: icons, action buttons (but not buttons that are a place or event name), breadcrumbs, "opens in a new tab" hints
  const SKIP = "script, style, noscript, template, svg, input, textarea, button:not(.cal-event, .linkish, [data-open]), nav[aria-label='Breadcrumb'], .toc, .char-count, a .visually-hidden, [aria-hidden='true'], [hidden], [data-no-read]";
  let listen = { session: 0, queue: [], root: null, mark: null };

  function textOf(el) {
    let out = "";
    const ps = getComputedStyle(el);
    const inRow = /flex/.test(ps.display) && !/column/.test(ps.flexDirection); // words laid out in a row read as one sentence
    el.childNodes.forEach(n => {
      if (n.nodeType === 3) { out += n.nodeValue; return; }
      if (n.nodeType !== 1 || n.matches(SKIP)) return;
      if (n.tagName === "SELECT") { out += " " + (n.selectedOptions[0] ? n.selectedOptions[0].text : "") + " "; return; }
      const d = getComputedStyle(n).display;
      if (d === "none") return;
      const t = textOf(n);
      out += !inRow && /^(block|flex|grid|list-item|table-cell|table-row|flow-root|-webkit-box)$/.test(d) ? ". " + t + ". " : " " + t + " ";
    });
    return out;
  }
  function tidy(t) {
    return t.replace(/\b((?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|org|net|gov|edu|us))\/\S*/gi, "$1") // say the site, not the whole address
      .replace(/\s+/g, " ").replace(/\s+([.,;:!?])/g, "$1").replace(/([.,;:!?])(\s*\.)+/g, "$1").replace(/^[\s.]+/, "").trim();
  }
  function collectBlocks(root) {
    const blocks = [];
    (function walk(el) {
      for (const c of el.children) {
        if (c.matches(SKIP) || !c.getClientRects().length) continue;
        const whole = c.matches(WHOLE);
        if (whole || (c.matches(BLOCKS) && !c.querySelector(BLOCKS + ", " + WHOLE))) {
          const text = tidy(textOf(c));
          if (/[a-z0-9]/i.test(text)) blocks.push({ el: c, text });
        } else walk(c);
      }
    })(root);
    return blocks;
  }
  // Short pieces keep every browser's voice from cutting off mid-paragraph
  function chunk(text) {
    const parts = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
    return parts.reduce((acc, p) => { if (acc.length && (acc[acc.length - 1] + p).length < 220) acc[acc.length - 1] += p; else acc.push(p); return acc; }, []);
  }
  function pickVoice() {
    const vs = synth.getVoices();
    return vs.find(v => v.lang === "en-US" && v.localService) || vs.find(v => v.lang === "en-US") || vs.find(v => /^en/i.test(v.lang)) || null;
  }
  function markBlock(el) {
    if (listen.mark) listen.mark.classList.remove("is-reading");
    listen.mark = el || null;
    if (!el || !el.isConnected) return;
    el.classList.add("is-reading");
    const r = el.getBoundingClientRect();
    if (r.top < 80 || r.bottom > window.innerHeight) {
      el.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  }
  function setListenButtons(on) {
    document.querySelectorAll("[data-listen]").forEach(b => {
      b.dataset.state = on ? "reading" : "";
      b.setAttribute("aria-label", on ? "Stop reading" : b.dataset.listenName || "Listen to this page");
      const lbl = b.querySelector("[data-listen-label]"); if (lbl) lbl.textContent = on ? "Stop" : "Listen";
    });
  }
  function stopListening() {
    listen.session++; listen.queue = []; listen.root = null;
    if (canListen) synth.cancel();
    markBlock(null); setListenButtons(false);
  }
  function speakNext(session) {
    if (session !== listen.session) return;
    const item = listen.queue.shift();
    if (!item) { stopListening(); return; }
    if (item.el !== listen.mark) markBlock(item.el);
    const u = new SpeechSynthesisUtterance(item.text);
    const voice = pickVoice(); if (voice) u.voice = voice;
    u.lang = voice ? voice.lang : "en-US";
    u.onend = () => speakNext(session);
    u.onerror = e => { if (e.error !== "interrupted" && e.error !== "canceled") speakNext(session); };
    synth.speak(u);
  }
  function startListening() {
    stopListening();
    const dialog = document.querySelector("dialog[open]");
    const root = dialog || document.getElementById("main") || document.body;
    const sel = window.getSelection();
    const picked = sel && !sel.isCollapsed && root.contains(sel.anchorNode) ? tidy(sel.toString()) : "";
    // Selected text: read just that. Otherwise read the open pop-up, or the whole page.
    const blocks = picked ? [{ el: null, text: picked }] : collectBlocks(root);
    if (!blocks.length) return;
    listen.root = root;
    listen.queue = blocks.flatMap(b => chunk(b.text).map(text => ({ el: b.el, text })));
    setListenButtons(true);
    if (window.CC.track) window.CC.track("listen", { scope: picked ? "selection" : dialog ? "details" : "page" });
    speakNext(listen.session);
  }
  function initListen() {
    if (!canListen) { document.querySelectorAll("[data-listen]").forEach(b => { b.hidden = true; }); return; } // no voice in this browser
    // Delegated, so the Listen button inside each details pop-up works too
    document.addEventListener("mousedown", e => { if (e.target.closest("[data-listen]")) e.preventDefault(); }); // keep a text selection
    document.addEventListener("click", e => { if (e.target.closest("[data-listen]")) listen.root ? stopListening() : startListening(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && listen.root) stopListening(); });
    document.querySelectorAll("dialog").forEach(d => d.addEventListener("close", () => { if (listen.root === d) stopListening(); }));
    window.addEventListener("pagehide", stopListening);
  }

  /* ---------- Init on every page ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(currentTheme());
    applyTextSize(store.get("textSize", 1));
    applyCvd(store.get("cvd", false));
    initShapeKey();
    document.querySelectorAll("[data-cvd-toggle]").forEach(b => b.addEventListener("click", () => {
      const on = root.dataset.cvd !== "on";
      applyCvd(on); store.set("cvd", on);
      shapeKey(on); // show the key right away so the shapes make sense; the Shape key button reopens it any time
      toast(on ? "Colorblind mode on. Use the Shape key button to see what each shape means." : "Colorblind mode off");
    }));
    initListen();

    document.querySelectorAll("[data-theme-toggle]").forEach(b => b.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next); store.set("theme", next);
      toast(next === "dark" ? "Dark mode on" : "Light mode on");
    }));
    document.querySelectorAll("[data-text-toggle]").forEach(b => b.addEventListener("click", () => {
      const next = (Number(root.dataset.text || 1) % 3) + 1;
      applyTextSize(next); store.set("textSize", next);
    }));

    // Mobile navigation
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("primary-nav");
    if (navToggle && nav) {
      const isPhoneMenu = () => window.matchMedia("(max-width: 960px)").matches;
      const setOpen = (open, focusFirst) => {
        nav.classList.toggle("is-open", open);
        navToggle.setAttribute("aria-expanded", open);
        navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        if (open && focusFirst) nav.querySelector("a").focus(); // focus goes into the panel, not behind it
      };
      navToggle.addEventListener("click", () => setOpen(navToggle.getAttribute("aria-expanded") !== "true", true));
      // Close the panel when keyboard focus leaves it, so it never hides what has focus
      nav.addEventListener("focusout", e => {
        if (isPhoneMenu() && nav.classList.contains("is-open") && !nav.contains(e.relatedTarget) && e.relatedTarget !== navToggle) setOpen(false);
      });
      document.addEventListener("keydown", e => {
        if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); navToggle.focus(); }
      });
      window.matchMedia("(min-width: 961px)").addEventListener("change", e => { if (e.matches) setOpen(false); });
    }

    // Back-to-top button
    const btt = document.querySelector(".back-to-top");
    if (btt) {
      const onScroll = () => btt.classList.toggle("is-visible", window.scrollY > 600);
      window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
      btt.addEventListener("click", () => { window.scrollTo({ top: 0 }); document.getElementById("main").focus({ preventScroll: true }); });
    }

    // Current year in footer
    document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

    favorites.badge(); myEvents.badge();
  });

  window.CC = { store, icon, escapeHTML, debounce, category, parseLocal, fmt, eventTimeRange, directionsURL, favorites, myEvents, toast, openModal, stopListening, knownList, linkQuery, hashId };
})();
