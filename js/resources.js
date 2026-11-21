/* Cumming Connects — Resource Directory: live search, category + audience filters,
   sorting, card/list views, saved favorites, and shareable URL state (?q=&cat=&aud=&saved=1). */
(function () {
  "use strict";
  const { escapeHTML: esc, debounce, favorites } = window.CC;
  const { resourceCard, AUDIENCE } = window.CCUI;
  const RES = window.RESOURCES || [], CATS = window.CATEGORIES || [];

  // Everyday words people type, mapped to the words our listings use
  const SYNONYMS = {
    doctor: ["clinic", "health", "hospital", "primary care"], doctors: ["clinic", "health", "hospital"], clinic: ["health"],
    medical: ["health", "clinic", "hospital"], er: ["emergency"], dentist: ["health"], therapy: ["mental health", "counseling"],
    therapist: ["mental health", "counseling"], food: ["pantry", "meals", "snap", "groceries"], groceries: ["pantry", "food"],
    hungry: ["pantry", "food", "meals"], spanish: ["spanish"], "español": ["spanish"], espanol: ["spanish"],
    kids: ["youth", "children", "teens"], teen: ["youth", "teens"], teens: ["youth"], elderly: ["senior", "older adults"],
    seniors: ["senior"], park: ["parks", "trail"], hiking: ["trail", "hiking"], swim: ["swim", "beach", "aquatic"],
    vote: ["voting", "elections"], voting: ["vote", "elections"], police: ["sheriff", "police"], abuse: ["domestic violence"],
    library: ["library"], books: ["library"], volunteer: ["volunteer"], benefits: ["snap", "medicaid"], "food stamps": ["snap"]
  };

  const state = { q: "", cats: new Set(), auds: new Set(), saved: false, sort: "name", view: "grid" };

  function readURL() {
    const p = new URLSearchParams(location.search);
    const { knownList, linkQuery } = window.CC;
    state.q = linkQuery(p.get("q"));
    knownList(p.get("cat"), CATS.map(c => c.id)).forEach(c => state.cats.add(c));
    knownList(p.get("aud"), Object.keys(AUDIENCE)).forEach(a => state.auds.add(a));
    state.saved = p.get("saved") === "1";
    state.sort = p.get("sort") === "category" ? "category" : "name";
    state.view = window.CC.store.get("view", "grid");
  }
  function writeURL() {
    const p = new URLSearchParams();
    if (state.q) p.set("q", state.q);
    if (state.cats.size) p.set("cat", [...state.cats].join(","));
    if (state.auds.size) p.set("aud", [...state.auds].join(","));
    if (state.saved) p.set("saved", "1");
    if (state.sort !== "name") p.set("sort", state.sort);
    const qs = p.toString();
    try { history.replaceState(null, "", (qs ? "?" + qs : location.pathname) + location.hash); } catch (e) { /* file:// in some browsers */ }
  }

  // Search matches every word against name, description, tags, category label, and address
  function matches(r) {
    if (state.cats.size && !state.cats.has(r.category)) return false;
    // Places marked "all" serve everyone, so they match any audience filter (same rule as the home sign)
    if (state.auds.size && !(r.audience || []).some(a => state.auds.has(a) || a === "all")) return false;
    if (state.saved && !favorites.has(r.id)) return false;
    if (!state.q.trim()) return true;
    const hay = [r.name, r.description, (r.tags || []).join(" "), window.CC.category(r.category).label, r.address,
      (r.audience || []).map(a => AUDIENCE[a] || a).join(" ")].join(" ").toLowerCase();
    return state.q.toLowerCase().split(/\s+/).filter(Boolean).every(w => hay.includes(w) || (SYNONYMS[w] || []).some(x => hay.includes(x)));
  }

  function render() {
    const list = RES.filter(matches).sort((a, b) =>
      state.sort === "category" ? (a.category.localeCompare(b.category) || a.name.localeCompare(b.name)) : a.name.localeCompare(b.name));

    const results = document.getElementById("results");
    results.innerHTML = list.map(r => resourceCard(r, state.q)).join("");
    results.classList.toggle("is-list", state.view === "list");
    document.getElementById("empty").hidden = list.length > 0;
    if (!list.length) {
      const msg = document.getElementById("empty-msg");
      if (state.saved && !favorites.all().length) msg.textContent = "You haven\u2019t saved any places yet. Tap the star on a place to add it here.";
      else if (state.q) msg.innerHTML = "Nothing here matches \u201c" + window.CC.escapeHTML(state.q) + "\u201d yet. For help with housing, jobs, bills, or rides, call <a href=\"tel:211\">211</a>, the free local help line, any time.";
      else msg.textContent = "No places match these filters. Clear them to see all " + RES.length + ".";
    }
    results.classList.remove("is-loading");
    const showBtn = document.getElementById("show-results");
    if (showBtn) showBtn.textContent = list.length ? "Show " + list.length + " place" + (list.length === 1 ? "" : "s") : "No places match";

    // Say exactly what is showing: "4 places in Food & basic needs, for Families"
    const catNames = [...state.cats].map(c => window.CC.category(c).label);
    const audNames = [...state.auds].map(a => AUDIENCE[a] || a);
    const parts = [];
    if (catNames.length) parts.push("in " + catNames.join(" or "));
    if (audNames.length) parts.push("for " + audNames.join(" or "));
    if (state.saved) parts.push("that you saved");
    if (state.q) parts.push("matching \u201c" + state.q + "\u201d");
    document.getElementById("results-count").textContent = parts.length
      ? list.length + " place" + (list.length === 1 ? "" : "s") + " " + parts.join(", ")
      : "All " + RES.length + " places";
    const nFilters = state.cats.size + state.auds.size;
    document.querySelector(".filter-toggle").textContent = nFilters ? "Filters (" + nFilters + ")" : "Filters";
    document.title = (catNames.length ? catNames.join(", ") + " \u2013 " : "") + "Resources | Cumming Connects";

    // Sync control states
    document.querySelectorAll("#cat-chips .chip").forEach(c => c.setAttribute("aria-pressed", state.cats.has(c.dataset.cat)));
    document.querySelectorAll("#aud-chips .chip").forEach(c => c.setAttribute("aria-pressed", state.auds.has(c.dataset.aud)));
    document.getElementById("saved-toggle").setAttribute("aria-pressed", state.saved);
    document.querySelectorAll("[data-view]").forEach(b => b.setAttribute("aria-pressed", b.dataset.view === state.view));
    writeURL();
  }

  document.addEventListener("DOMContentLoaded", () => {
    readURL();

    document.getElementById("cat-chips").innerHTML = CATS.map(c =>
      '<button type="button" class="chip cat-' + c.id + '" data-cat="' + c.id + '" aria-pressed="false"><span class="dot" aria-hidden="true"></span>' +
      esc(c.label) + '<span class="count">' + RES.filter(r => r.category === c.id).length + "</span></button>").join("");
    document.getElementById("aud-chips").innerHTML = Object.keys(AUDIENCE).filter(a => a !== "all" && RES.some(r => (r.audience || []).includes(a))).map(a =>
      '<button type="button" class="chip" data-aud="' + a + '" aria-pressed="false">' + esc(AUDIENCE[a]) + "</button>").join("");

    const q = document.getElementById("q");
    q.value = state.q;
    q.addEventListener("input", debounce(() => { state.q = q.value.trim(); render(); }, 180));
    // Count a search once the person pauses typing (avoids one event per keystroke)
    q.addEventListener("input", debounce(() => {
      if (state.q.length > 1 && window.CC.track) {
        const n = document.querySelectorAll("#results .resource-card").length;
        window.CC.track("search", { query: state.q, results: n });
        if (!n) window.CC.track("search_no_results", { query: state.q }); // tells us what's missing from the directory
      }
    }, 900));

    document.getElementById("cat-chips").addEventListener("click", e => {
      const chip = e.target.closest("[data-cat]"); if (!chip) return;
      state.cats.has(chip.dataset.cat) ? state.cats.delete(chip.dataset.cat) : state.cats.add(chip.dataset.cat);
      render();
    });
    document.getElementById("aud-chips").addEventListener("click", e => {
      const chip = e.target.closest("[data-aud]"); if (!chip) return;
      state.auds.has(chip.dataset.aud) ? state.auds.delete(chip.dataset.aud) : state.auds.add(chip.dataset.aud);
      render();
    });
    document.getElementById("saved-toggle").addEventListener("click", () => { state.saved = !state.saved; render(); });

    const sort = document.getElementById("sort");
    sort.value = state.sort;
    sort.addEventListener("change", () => { state.sort = sort.value; render(); });

    document.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => {
      state.view = b.dataset.view; window.CC.store.set("view", state.view); render();
    }));

    // On touch screens, don't pop up the keyboard; move focus to the results summary instead
    const focusAfterClear = () => window.matchMedia("(pointer: coarse)").matches ? document.getElementById("results-count").focus() : q.focus();
    const clear = () => { state.q = ""; q.value = ""; state.cats.clear(); state.auds.clear(); state.saved = false; render(); focusAfterClear(); };
    document.getElementById("clear-filters").addEventListener("click", clear);
    document.getElementById("empty-clear").addEventListener("click", clear);

    // Mobile filter drawer
    const ft = document.querySelector(".filter-toggle"), filters = document.getElementById("filters");
    ft.addEventListener("click", () => {
      const open = !filters.classList.contains("is-open");
      filters.classList.toggle("is-open", open);
      ft.setAttribute("aria-expanded", open);
      if (open) filters.querySelector(".chip").focus();
    });
    // Phones: close the drawer and jump to the results
    document.getElementById("show-results").addEventListener("click", () => {
      filters.classList.remove("is-open"); ft.setAttribute("aria-expanded", "false");
      document.getElementById("results-count").scrollIntoView({ block: "start" });
      ft.focus({ preventScroll: true });
    });

    // Re-render when favorites change while "Saved" view is on
    document.addEventListener("cc:favorites", () => { if (state.saved) render(); });

    render();

    // Deep link: resources.html#resource-id opens its details
    const hash = window.CC.hashId();
    if (hash && RES.some(r => r.id === hash)) window.CCUI.openResource(hash, window.matchMedia("(pointer: coarse)").matches ? document.getElementById("results-count") : document.getElementById("q"));
  });
})();
