/* Cumming Connects — shared renderers for resource cards, event cards, detail modals,
   and the "Add to calendar" (.ics) download. Used by home, directory, events, and map pages. */
(function () {
  "use strict";
  const T = (n, p) => window.CCAnalytics && window.CCAnalytics.track(n, p);
  const { icon, escapeHTML: esc, category, parseLocal, fmt, eventTimeRange, directionsURL, favorites, myEvents, toast, openModal } = window.CC;

  function highlight(text, query) {
    const safe = esc(text);
    if (!query) return safe;
    const words = query.trim().split(/\s+/).filter(w => w.length > 1).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (!words.length) return safe;
    return safe.replace(new RegExp("(" + words.map(w => esc(w)).join("|") + ")", "gi"), "<mark>$1</mark>");
  }

  function categoryBadge(catId) {
    const c = category(catId);
    return '<span class="badge cat-' + c.id + '">' + esc(c.label) + "</span>";
  }

  function favButton(r) {
    const on = favorites.has(r.id);
    return '<button type="button" class="fav-btn" data-fav="' + r.id + '" aria-pressed="' + on + '" aria-label="Save ' + esc(r.name) + ' to favorites">' + icon("star") + "</button>";
  }

  /* Resource card (used in grids) */
  function resourceCard(r, query) {
    const shortAddr = r.confidential ? "Confidential location" : (r.address ? r.address.split(",").slice(0, 2).join(",") : "");
    return '<article class="card card--hover resource-card cat-' + r.category + '">' +
      favButton(r) +
      '<div class="card-top">' + categoryBadge(r.category) + (r.verified === false ? ' <span class="badge badge--plain">Call to confirm</span>' : "") + "</div>" +
      '<h3 translate="no"><button type="button" data-open="' + r.id + '">' + highlight(r.name, query) + "</button></h3>" +
      "<p>" + highlight(r.description, query) + "</p>" +
      '<div class="meta">' +
        (shortAddr ? "<span>" + icon("pin") + esc(shortAddr) + "</span>" : "") +
        // Phone shown as text: the whole card opens the details, where "Call" is the main button
        (r.phone ? "<span>" + icon("phone") + esc(r.phone) + "</span>" : "") +
      "</div></article>";
  }

  /* Resource detail dialog */
  function resourceModalHTML(r) {
    const c = category(r.category);
    const audience = (r.audience || []).filter(a => a !== "all").map(a => '<span class="badge badge--plain">' + esc(audienceLabel(a)) + "</span>").join(" ");
    return '<div class="modal-head cat-' + c.id + '"><div>' + categoryBadge(r.category) +
      '<h2 id="modal-title" translate="no">' + esc(r.name) + '</h2></div>' +
      '<button type="button" class="icon-btn" data-close aria-label="Close details">' + icon("close") + "</button></div>" +
      '<div class="modal-body">' +
      (r.verified === false ? '<p class="form-note">' + icon("alert") + "<span><strong>Call to confirm.</strong> We couldn&rsquo;t check every detail with an official source yet.</span></p>" : "") +
      "<p>" + esc(r.description) + "</p>" +
      (audience ? '<p class="row" style="gap:.4rem"><span class="text-soft">Serves:</span> ' + audience + "</p>" : "") +
      '<ul class="info-list">' +
        (r.address ? "<li>" + icon("pin") + "<span>" + esc(r.address) + "</span></li>" : "") +
        (r.phone ? "<li>" + icon("phone") + '<a href="tel:' + r.phone.replace(/[^\d+]/g, "") + '">' + esc(r.phone) + "</a></li>" : "") +
        "<li>" + icon("clock") + "<span>" + (r.hours ? esc(r.hours) : '<span class="text-soft">Hours not listed. Call before you go.</span>') + "</span></li>" +
        (r.website ? "<li>" + icon("globe") + '<a href="' + esc(r.website) + '" target="_blank" rel="noopener">' + esc(r.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")) + '<span class="visually-hidden"> (opens in a new tab)</span></a></li>' : "") +
      "</ul>" +
      '<p class="source-line">Checked Oct. 22, 2026, against <a href="' + esc(r.sourceUrl || r.website) + '" target="_blank" rel="noopener">' + esc((r.sourceUrl || r.website || "").replace(/^https?:\/\/(www\.)?/, "").split("/")[0]) + '<span class="visually-hidden"> (opens in a new tab)</span></a>.</p>' +
      "</div>" +
      '<div class="modal-actions">' +
        (r.phone && !r.confidential ? '<a class="btn btn--primary" href="tel:' + r.phone.replace(/[^\d+]/g, "") + '">' + icon("phone") + "Call</a>" : "") +
        (r.address && !r.confidential ? '<a class="btn ' + (r.phone ? "btn--ghost" : "btn--primary") + '" href="' + directionsURL(r) + '" target="_blank" rel="noopener">' + icon("directions") + 'Directions<span class="visually-hidden"> (opens in a new tab)</span></a>' : "") +
        (r.confidential && r.phone ? '<a class="btn btn--primary" href="tel:' + r.phone.replace(/[^\d+]/g, "") + '">' + icon("phone") + "Call the hotline</a>" : "") +
        (r.confidential ? '<button type="button" class="btn btn--ghost" data-quick-exit>Leave this site quickly</button>' : "") +
        (typeof r.lat === "number" ? '<a class="btn btn--ghost" href="map.html#' + r.id + '">' + icon("pin") + "View on map</a>" : "") +
        '<button type="button" class="btn btn--ghost" data-fav="' + r.id + '" aria-pressed="' + favorites.has(r.id) + '">' + icon("star") + '<span data-fav-label>' + (favorites.has(r.id) ? "Saved" : "Save") + "</span></button>" +
      "</div>";
  }

  const AUDIENCE = { all: "Everyone", families: "Families", youth: "Youth & teens", seniors: "Seniors", veterans: "Veterans", newcomers: "New residents", spanish: "Spanish-speaking" };
  function audienceLabel(a) { return AUDIENCE[a] || a; }

  function openResource(id, opener) {
    const r = (window.RESOURCES || []).find(x => x.id === id);
    const dlg = document.getElementById("detail-modal");
    if (r && dlg) { openModal(dlg, resourceModalHTML(r), opener); T("view_resource", { id: r.id, category: r.category }); }
  }

  /* Event card (home "coming up") */
  function eventCard(ev) {
    const d = parseLocal(ev.start);
    return '<li><div class="agenda-item cat-' + ev.category + '">' +
      '<div class="date-block" aria-hidden="true"><span class="m">' + fmt.month(d) + '</span><span class="d">' + fmt.day(d) + "</span></div>" +
      '<div><h3><button type="button" class="linkish" data-event="' + ev.id + '">' + esc(ev.title) + "</button></h3>" +
      '<p><time datetime="' + ev.start + '">' + fmt.long(d).replace(/, \d{4}$/, "") + "</time>, " + esc(eventTimeRange(ev)) + "</p>" +
      "<p>" + esc(ev.location.split(",")[0]) + "</p></div>" + categoryBadge(ev.category) + "</div></li>";
  }

  /* Save an event to My calendar (stays on this device, like starred places) */
  function myEventButton(ev, small) {
    const on = myEvents.has(ev.id);
    return '<button type="button" class="btn ' + (small ? "btn--ghost btn--sm" : "btn--primary") + '" data-myev="' + ev.id + '" aria-pressed="' + on + '">' + icon("calcheck") +
      '<span data-myev-label>' + (on ? "Saved" : "Save") + "</span>" + (small ? '<span class="visually-hidden"> ' + esc(ev.title) + " to My calendar</span>" : " to My calendar") + "</button>";
  }

  function eventModalHTML(ev) {
    const d = parseLocal(ev.start);
    return '<div class="modal-head"><div>' + categoryBadge(ev.category) +
      '<h2 id="modal-title">' + esc(ev.title) + "</h2></div>" +
      '<button type="button" class="icon-btn" data-close aria-label="Close details">' + icon("close") + "</button></div>" +
      '<div class="modal-body"><p>' + esc(ev.description) + "</p>" +
      '<ul class="info-list">' +
        "<li>" + icon("calendar") + "<span>" + fmt.long(d) + (ev.recurring ? '<br><small class="text-soft">' + esc(ev.recurring) + "</small>" : "") + "</span></li>" +
        "<li>" + icon("clock") + "<span>" + esc(eventTimeRange(ev)) + "</span></li>" +
        "<li>" + icon("pin") + "<span>" + esc(ev.location) + "</span></li>" +
        (ev.website ? "<li>" + icon("globe") + '<a href="' + esc(ev.website) + '" target="_blank" rel="noopener">Event website<span class="visually-hidden"> (opens in a new tab)</span></a></li>' : "") +
      "</ul>" +
      (ev.verified === false ? '<p class="form-note">' + icon("alert") + "<span><strong>Date not yet confirmed.</strong> " + esc(ev.dateNote || "Check the event website before you go.") + "</span></p>" : "") +
      "</div>" +
      '<div class="modal-actions">' +
        myEventButton(ev) +
        '<button type="button" class="btn btn--ghost" data-ics="' + ev.id + '">' + icon("download") + "Add to phone calendar</button>" +
        '<a class="btn btn--ghost" href="' + googleCalURL(ev) + '" target="_blank" rel="noopener">' + icon("calendar") + 'Google Calendar<span class="visually-hidden"> (opens in a new tab)</span></a>' +
        '<a class="btn btn--ghost" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ev.location) + '" target="_blank" rel="noopener">' + icon("directions") + 'Directions<span class="visually-hidden"> (opens in a new tab)</span></a>' +
      "</div>";
  }

  function googleCalURL(ev) {
    const end = ev.end || ev.start.replace(/T(\d\d)/, (m, h) => "T" + String(Math.min(23, +h + 1)).padStart(2, "0"));
    const f = iso => iso.replace(/[-:]/g, "").slice(0, 13) + "00";
    return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(ev.title) +
      "&dates=" + f(ev.start) + "/" + f(end) + "&ctz=America/New_York&location=" + encodeURIComponent(ev.location) + "&details=" + encodeURIComponent(ev.description);
  }

  function openEvent(id, opener) {
    const ev = (window.EVENTS || []).find(x => x.id === id);
    const dlg = document.getElementById("detail-modal");
    if (ev && dlg) { openModal(dlg, eventModalHTML(ev), opener); T("view_event", { id: ev.id }); }
  }

  /* .ics calendar file (works in Google Calendar, Outlook, Apple Calendar) */
  function icsDate(iso) { return iso.replace(/[-:]/g, "").slice(0, 13) + "00"; }
  function icsEscape(s) { return String(s || "").replace(/\\/g, "\\\\").replace(/[,;]/g, m => "\\" + m).replace(/\n/g, "\\n"); }
  // One event, or a list of them (My calendar's "Add all to phone calendar")
  function downloadICS(ids) {
    const evs = [].concat(ids).map(id => (window.EVENTS || []).find(x => x.id === id)).filter(Boolean);
    if (!evs.length) return;
    const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Cumming Connects//Community Calendar//EN", "CALSCALE:GREGORIAN"];
    evs.forEach(ev => {
      const end = ev.end || ev.start.replace(/T(\d\d)/, (m, h) => "T" + String(Math.min(23, +h + 1)).padStart(2, "0"));
      lines.push("BEGIN:VEVENT",
        "UID:" + ev.id + "@cummingconnects",
        "DTSTAMP:" + stamp,
        "DTSTART;TZID=America/New_York:" + icsDate(ev.start),
        "DTEND;TZID=America/New_York:" + icsDate(end),
        "SUMMARY:" + icsEscape(ev.title),
        "LOCATION:" + icsEscape(ev.location),
        "DESCRIPTION:" + icsEscape(ev.description + (ev.website ? " " + ev.website : "")),
        "END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = evs.length === 1 ? evs[0].id + ".ics" : "my-cumming-calendar.ics";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast(evs.length === 1 ? "Calendar file ready for " + evs[0].title + ". Open it to add the event." : "Calendar file ready with " + evs.length + " events. Open it to add them all.");
    T("add_to_calendar", { id: evs.length === 1 ? evs[0].id : "my-calendar", count: evs.length });
  }

  /* Quick exit for safety listings: swap to a neutral site and replace this history entry,
     so the Back button doesn't return here (the pattern used by domestic violence services) */
  function quickExit() {
    try { sessionStorage.clear(); } catch (e) { /* ignore */ }
    window.open("https://weather.com", "_blank", "noopener");
    location.replace("https://www.google.com/search?q=weather");
  }
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && e.shiftKey && document.querySelector("[data-quick-exit]")) quickExit();
  });

  /* Delegated clicks: open details, favorites, calendar downloads */
  document.addEventListener("click", e => {
    if (e.target.closest("[data-quick-exit]")) { quickExit(); return; }
    const openBtn = e.target.closest("[data-open]");
    if (openBtn) { openResource(openBtn.dataset.open, openBtn); return; }
    const evBtn = e.target.closest("[data-event]");
    if (evBtn) { openEvent(evBtn.dataset.event, evBtn); return; }
    const icsBtn = e.target.closest("[data-ics]");
    if (icsBtn) { downloadICS(icsBtn.dataset.ics); return; }
    const myev = e.target.closest("[data-myev]");
    if (myev) {
      const id = myev.dataset.myev;
      const nowOn = myEvents.toggle(id);
      const ev = (window.EVENTS || []).find(x => x.id === id);
      document.querySelectorAll('[data-myev="' + id + '"]').forEach(b => {
        b.setAttribute("aria-pressed", nowOn);
        const lbl = b.querySelector("[data-myev-label]"); if (lbl) lbl.textContent = nowOn ? "Saved" : "Save";
      });
      toast((nowOn ? "Saved " : "Removed ") + (ev ? ev.title : "event") + (nowOn ? " to My calendar" : " from My calendar"));
      if (nowOn) T("save_event", { id: id });
      document.dispatchEvent(new CustomEvent("cc:myevents"));
      return;
    }
    const fav = e.target.closest("[data-fav]");
    if (fav) {
      const id = fav.dataset.fav;
      const nowOn = favorites.toggle(id);
      const r = (window.RESOURCES || []).find(x => x.id === id);
      document.querySelectorAll('[data-fav="' + id + '"]').forEach(b => {
        b.setAttribute("aria-pressed", nowOn);
        const lbl = b.querySelector("[data-fav-label]"); if (lbl) lbl.textContent = nowOn ? "Saved" : "Save";
      });
      fav.classList.remove("pulse"); void fav.offsetWidth; fav.classList.add("pulse");
      toast((nowOn ? "Saved " : "Removed ") + (r ? r.name : "resource") + (nowOn ? " to your list" : " from your list"));
      if (nowOn) T("save_favorite", { id: id });
      document.dispatchEvent(new CustomEvent("cc:favorites"));
    }
  });

  window.CCUI = { resourceCard, eventCard, categoryBadge, highlight, openResource, openEvent, audienceLabel, AUDIENCE, downloadICS, myEventButton };
})();
