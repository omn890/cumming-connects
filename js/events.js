/* Cumming Connects — Community calendar: month grid + list view, category filters, event search,
   My calendar (saved events, kept on this device), event detail modal, and .ics downloads (ui.js). */
(function () {
  "use strict";
  const { escapeHTML: esc, parseLocal, fmt, eventTimeRange, store, myEvents, debounce } = window.CC;
  const { categoryBadge, highlight, myEventButton, downloadICS } = window.CCUI;
  const EVENTS = (window.EVENTS || []).slice().sort((a, b) => parseLocal(a.start) - parseLocal(b.start));
  const CATS = window.CATEGORIES || [];

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const state = { cursor: new Date(today.getFullYear(), today.getMonth(), 1), cats: new Set(), view: "month", q: "", mine: false };

  // Everyday words people type, mapped to words our event listings use
  const SYNONYMS = {
    christmas: ["christmas", "holiday", "santa", "tree", "lights"], holiday: ["holiday", "christmas", "lights", "santa"],
    kids: ["kids", "family", "children", "bounce"], family: ["family", "kids"], vote: ["election", "polls"], voting: ["election", "polls"],
    election: ["election", "polls", "runoff"], books: ["library", "reading"], reading: ["reading", "library"], food: ["market", "farmers", "vendors"],
    shopping: ["market", "vendors"], music: ["music", "concert", "band"], veterans: ["veterans", "memorial"], blood: ["blood", "donor"]
  };

  const small = window.matchMedia("(max-width: 640px)");
  const iso = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const searching = () => state.q.trim().length > 0;

  // Every word must appear in the event's title, description, place, or category (or a synonym of it)
  function matchesQuery(e) {
    if (!searching()) return true;
    const hay = [e.title, e.description, e.location, e.recurring || "", window.CC.category(e.category).label].join(" ").toLowerCase();
    // Match the start of words, so "tree" finds "tree lighting" but not "Main Street"
    const has = w => new RegExp("(^|[^a-z0-9])" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).test(hay);
    return state.q.toLowerCase().split(/\s+/).filter(Boolean).every(w => has(w) || (SYNONYMS[w] || []).some(has));
  }
  const visible = () => EVENTS.filter(e => (!state.cats.size || state.cats.has(e.category)) && (!state.mine || myEvents.has(e.id)) && matchesQuery(e));

  function eventsOn(day) {
    return visible().filter(e => {
      const s = parseLocal(e.start); s.setHours(0, 0, 0, 0);
      const en = e.end ? parseLocal(e.end) : new Date(s); en.setHours(0, 0, 0, 0);
      // Long runs (like a holiday light show) appear on their first day and at the start of each week, not in every cell
      if ((en - s) / 864e5 > 4) return day >= s && day <= en && (sameDay(day, s) || day.getDay() === 0);
      return day >= s && day <= en;
    });
  }

  function renderMonth() {
    const y = state.cursor.getFullYear(), m = state.cursor.getMonth();
    document.getElementById("cal-title").textContent = fmt.monthYear(state.cursor);
    const first = new Date(y, m, 1);
    const start = new Date(y, m, 1 - first.getDay());
    const weeks = Math.ceil((first.getDay() + new Date(y, m + 1, 0).getDate()) / 7);
    let html = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) =>
      '<div class="cal-dow" aria-hidden="true">' + d + "</div>").join("");
    let count = 0;
    for (let i = 0; i < weeks * 7; i++) {
      const day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      const evs = eventsOn(day);
      if (day.getMonth() === m) count += evs.filter(e => sameDay(parseLocal(e.start), day)).length;
      const cls = ["cal-day", day.getMonth() !== m ? "is-outside" : "", sameDay(day, today) ? "is-today" : ""].join(" ");
      const saved = evs.filter(e => myEvents.has(e.id)).length;
      const label = fmt.long(day) + (evs.length ? ", " + evs.length + " event" + (evs.length > 1 ? "s" : "") : "") + (saved && !state.mine ? ", " + saved + " in My calendar" : "");
      if (small.matches) {
        // Phones: the whole day cell is one 44px+ button; colored bars are decoration
        html += '<div class="' + cls + '">' + (evs.length
          ? '<button type="button" class="cal-day-btn" data-day="' + iso(day) + '" aria-label="' + esc(label) + '"><span class="cal-date" aria-hidden="true">' + day.getDate() + "</span>" +
            evs.map(e => '<span class="cal-event cat-' + e.category + (myEvents.has(e.id) ? " is-mine" : "") + '" aria-hidden="true"></span>').join("") + "</button>"
          : '<span class="cal-date"><span class="visually-hidden">' + esc(label) + '</span><span aria-hidden="true">' + day.getDate() + "</span></span>") + "</div>";
      } else {
        html += '<div class="' + cls + '"><span class="cal-date"><span class="visually-hidden">' + esc(label) + '</span><span aria-hidden="true">' + day.getDate() + "</span></span>" +
          evs.map(e => {
            const mine = myEvents.has(e.id);
            return '<button type="button" class="cal-event cat-' + e.category + (mine ? " is-mine" : "") + '" data-event="' + e.id + '" title="' + esc(e.title) + (mine ? " (in My calendar)" : "") + '">' +
              esc(e.title) + (mine ? '<span class="visually-hidden"> (in My calendar)</span>' : "") + "</button>";
          }).join("") +
          "</div>";
      }
    }
    document.getElementById("cal-grid").innerHTML = html;
    // Empty month: say so, and offer the next month that has events
    const note = document.getElementById("cal-empty");
    const nextEv = visible().find(e => parseLocal(e.start) > new Date(y, m + 1, 0, 23, 59));
    note.hidden = count > 0;
    if (!count) {
      const msg = state.mine && !myEvents.all().length ? emptyMineText()
        : state.mine ? "None of your saved events are in " + fmt.monthYear(state.cursor) + "."
        : "No events listed for " + fmt.monthYear(state.cursor) + ".";
      note.innerHTML = "<p>" + msg + "</p>" + (nextEv
        ? '<button type="button" class="btn btn--ghost btn--sm" data-jump="' + ev2month(nextEv) + '">Go to ' + fmt.monthYear(parseLocal(nextEv.start)) + "</button>" : "");
    }
    document.getElementById("event-status").textContent = fmt.monthYear(state.cursor) + ": " + count + " event" + (count === 1 ? "" : "s") + " shown" + (state.mine ? " from My calendar." : ".");
  }

  function emptyMineText() { return "My calendar is empty. Open any event and tap <strong>Save to My calendar</strong> to add it here."; }
  function ev2month(e) { const d = parseLocal(e.start); return d.getFullYear() + "-" + d.getMonth(); }

  function openDay(isoDay, opener) {
    const [yy, mm, dd] = isoDay.split("-").map(Number);
    const day = new Date(yy, mm - 1, dd);
    const evs = eventsOn(day);
    window.CC.openModal(document.getElementById("detail-modal"),
      '<div class="modal-head"><div><h2 id="modal-title">' + fmt.long(day) + '</h2></div><button type="button" class="icon-btn" data-close aria-label="Close">' + window.CC.icon("close") + "</button></div>" +
      '<div class="modal-body"><ul class="agenda">' + evs.map(e => '<li><div class="agenda-item cat-' + e.category + '" style="grid-template-columns:1fr"><div>' + categoryBadge(e.category) +
        (myEvents.has(e.id) ? ' <span class="badge badge--plain">In My calendar</span>' : "") +
        '<h3><button type="button" class="linkish" data-event="' + e.id + '">' + esc(e.title) + "</button></h3><p>" + esc(eventTimeRange(e)) + "</p></div></div></li>").join("") + "</ul></div>", opener);
  }

  function renderList() {
    const all = visible();
    const upcoming = all.filter(e => parseLocal(e.end || e.start) >= today);
    // Searching and My calendar show upcoming events first; if none are upcoming, show past ones rather than nothing
    const list = upcoming.length ? upcoming : all;
    let html = "", lastMonth = "";
    list.forEach(e => {
      const d = parseLocal(e.start), mk = fmt.monthYear(d);
      if (mk !== lastMonth) {
        if (lastMonth) html += "</div>";
        html += '<h2 class="month-heading">' + mk + '</h2><div class="event-list">';
        lastMonth = mk;
      }
      html += '<article class="card card--hover event-row cat-' + e.category + '">' +
        '<div class="date-block" aria-hidden="true"><span class="m">' + fmt.month(d) + '</span><span class="d">' + fmt.day(d) + "</span></div>" +
        "<div>" + categoryBadge(e.category) + (e.verified === false ? ' <span class="badge badge--note">Date not yet confirmed</span>' : "") +
        '<h3><button type="button" class="linkish" data-event="' + e.id + '">' + highlight(e.title, state.q) + "</button></h3>" +
        '<p><time datetime="' + e.start + '">' + fmt.long(d) + "</time>, " + esc(eventTimeRange(e)) + "</p>" +
        "<p>" + highlight(e.location, state.q) + "</p></div>" +
        myEventButton(e, true) +
        "</article>";
    });
    if (lastMonth) html += "</div>";
    const empty = state.mine && !myEvents.all().length ? emptyMineText()
      : searching() ? "No events match &ldquo;" + esc(state.q) + "&rdquo;. Try another word, like parade, market, or library."
      : "No events match these filters.";
    document.getElementById("list-view").innerHTML = html ||
      '<div class="empty-state"><p>' + empty + "</p>" + (searching() ? '<button type="button" class="btn btn--ghost btn--sm" data-clear-search>Clear search</button>' : "") + "</div>";
    document.getElementById("event-status").textContent = searching()
      ? list.length + " event" + (list.length === 1 ? "" : "s") + " match " + state.q + "."
      : list.length + " events listed" + (state.mine ? " from My calendar." : ".");
  }

  function render() {
    // A search looks across every month, so its results always show as a list
    const view = searching() ? "list" : state.view;
    const isMonth = view === "month";
    document.getElementById("month-view").hidden = !isMonth;
    document.getElementById("list-view").hidden = isMonth;
    const calNav = document.querySelector(".cal-nav");
    calNav.hidden = !isMonth; calNav.removeAttribute("data-pending"); // phones start in list view, so the arrows wait for this
    if (!isMonth) document.getElementById("cal-empty").hidden = true;
    document.querySelectorAll("[data-cal-view]").forEach(b => b.setAttribute("aria-pressed", b.dataset.calView === view));
    document.querySelectorAll("#event-chips .chip").forEach(c => c.setAttribute("aria-pressed", state.cats.has(c.dataset.cat)));
    document.getElementById("mine-toggle").setAttribute("aria-pressed", state.mine);
    document.getElementById("my-cal-bar").hidden = !state.mine;
    document.getElementById("export-mine").hidden = !myEvents.all().length;
    isMonth ? renderMonth() : renderList();
    // The URL reflects the month, view, search, and filters, so a link or a reload shows the same thing
    const q = new URLSearchParams({ m: state.cursor.getFullYear() + "-" + (state.cursor.getMonth() + 1), view: state.view });
    if (state.cats.size) q.set("cat", [...state.cats].join(","));
    if (searching()) q.set("q", state.q.trim());
    if (state.mine) q.set("mine", "1");
    try { history.replaceState(null, "", "?" + q + location.hash); } catch (e) { /* file:// in some browsers */ }
  }

  document.addEventListener("DOMContentLoaded", () => {
    // If this month has no events (e.g., the site is opened after the season), jump to the nearest month that does
    if (EVENTS.length) {
      const first = parseLocal(EVENTS[0].start), last = parseLocal(EVENTS[EVENTS.length - 1].start);
      if (state.cursor < new Date(first.getFullYear(), first.getMonth(), 1)) state.cursor = new Date(first.getFullYear(), first.getMonth(), 1);
      if (state.cursor > last) state.cursor = new Date(last.getFullYear(), last.getMonth(), 1);
    }
    state.view = store.get("calView", window.matchMedia("(max-width: 640px)").matches ? "list" : "month");
    const params = new URLSearchParams(location.search);
    if (/^\d{4}-\d{1,2}$/.test(params.get("m") || "")) { const [yy, mm] = params.get("m").split("-").map(Number); state.cursor = new Date(yy, mm - 1, 1); }
    if (params.get("view") === "list" || params.get("view") === "month") state.view = params.get("view");
    window.CC.knownList(params.get("cat"), CATS.map(c => c.id)).forEach(c => state.cats.add(c));
    state.q = window.CC.linkQuery(params.get("q"));
    state.mine = params.get("mine") === "1";

    const usedCats = CATS.filter(c => EVENTS.some(e => e.category === c.id));
    document.getElementById("event-chips").innerHTML = usedCats.map(c =>
      '<button type="button" class="chip cat-' + c.id + '" data-cat="' + c.id + '" aria-pressed="false"><span class="dot" aria-hidden="true"></span>' + esc(c.label) + "</button>").join("");
    document.getElementById("event-chips").addEventListener("click", e => {
      const chip = e.target.closest("[data-cat]"); if (!chip) return;
      state.cats.has(chip.dataset.cat) ? state.cats.delete(chip.dataset.cat) : state.cats.add(chip.dataset.cat);
      render();
    });

    // Search: results update as you type (after a short pause)
    const qInput = document.getElementById("event-q");
    qInput.value = state.q;
    qInput.addEventListener("input", debounce(() => {
      const was = searching();
      state.q = qInput.value;
      render();
      if (searching() && window.CC.track) window.CC.track("search", { area: "events", term: state.q.trim() });
      if (was && !searching()) document.getElementById("event-status").textContent += " Search cleared.";
    }, 220));
    const clearSearch = () => { state.q = ""; qInput.value = ""; render(); qInput.focus(); };

    // My calendar: show only saved events; export them all as one calendar file
    document.getElementById("mine-toggle").addEventListener("click", () => { state.mine = !state.mine; render(); });
    document.getElementById("export-mine").addEventListener("click", () => {
      const ids = EVENTS.filter(e => myEvents.has(e.id)).map(e => e.id);
      if (ids.length) downloadICS(ids);
    });
    // When an event is saved or removed, refresh the calendar (after any open pop-up closes, so focus isn't lost)
    let pending = false;
    const dialog = document.getElementById("detail-modal");
    document.addEventListener("cc:myevents", () => {
      document.getElementById("export-mine").hidden = !myEvents.all().length;
      if (dialog.open) { pending = true; return; }
      if (!state.mine) return; // the Save button already updated itself; redrawing would move focus away
      render(); document.getElementById("mine-toggle").focus();
    });
    dialog.addEventListener("close", () => { if (pending) { pending = false; render(); } });

    const shift = n => { state.cursor = new Date(state.cursor.getFullYear(), state.cursor.getMonth() + n, 1); render(); };
    document.getElementById("prev-month").addEventListener("click", () => shift(-1));
    document.getElementById("next-month").addEventListener("click", () => shift(1));
    document.getElementById("today-btn").addEventListener("click", () => { state.cursor = new Date(today.getFullYear(), today.getMonth(), 1); render(); });
    document.querySelectorAll("[data-cal-view]").forEach(b => b.addEventListener("click", () => {
      state.view = b.dataset.calView; store.set("calView", state.view);
      if (searching() && state.view === "month") { state.q = ""; qInput.value = ""; } // Month shows one month, so it ends the search
      render();
    }));
    // Keyboard: left/right arrows change months, but only while focus is inside the calendar or its controls
    const arrowScope = [document.getElementById("month-view"), document.querySelector(".cal-nav")];
    arrowScope.forEach(el => el.addEventListener("keydown", e => {
      if (state.view !== "month" || searching()) return;
      if (e.key === "ArrowLeft") shift(-1);
      if (e.key === "ArrowRight") shift(1);
    }));

    document.addEventListener("click", e => {
      const dayBtn = e.target.closest("[data-day]");
      if (dayBtn) openDay(dayBtn.dataset.day, dayBtn);
      const jump = e.target.closest("[data-jump]");
      if (jump) { const [yy, mm] = jump.dataset.jump.split("-").map(Number); state.cursor = new Date(yy, mm, 1); render(); document.getElementById("cal-title").focus({ preventScroll: true }); }
      if (e.target.closest("[data-clear-search]")) clearSearch();
    });
    small.addEventListener("change", () => { if (state.view === "month") render(); });

    render();
  });
})();
