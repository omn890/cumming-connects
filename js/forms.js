/* Cumming Connects — Get Involved: accessible tabs + form validation with inline messages.
   Demo only: nothing is transmitted or stored. */
(function () {
  "use strict";

  /* ---------- Tabs (ARIA tabs pattern with arrow-key support) ---------- */
  function initTabs() {
    const tabs = [...document.querySelectorAll('[role="tab"]')];
    if (!tabs.length) return;
    const select = (tab, focus) => {
      tabs.forEach(t => {
        const on = t === tab;
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls"));
        panel.hidden = !on;
        if (on) prefill(panel);
      });
      if (focus) tab.focus();
      try { history.replaceState(null, "", "#" + tab.getAttribute("aria-controls")); } catch (e) { /* ignore */ }
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", e => {
        const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (dir) { e.preventDefault(); select(tabs[(i + dir + tabs.length) % tabs.length], true); }
        if (e.key === "Home") { e.preventDefault(); select(tabs[0], true); }
        if (e.key === "End") { e.preventDefault(); select(tabs[tabs.length - 1], true); }
      });
    });
    const fromHash = () => {
      const t = tabs.find(x => "#" + x.getAttribute("aria-controls") === location.hash);
      if (t) select(t);
    };
    window.addEventListener("hashchange", fromHash);
    fromHash();
  }

  /* ---------- Validation ---------- */
  function fieldFor(el) { return el.closest(".field"); }

  function validateField(el) {
    const field = fieldFor(el);
    if (!field) return true;
    let ok;
    if (el.type === "checkbox" && el.name === "interests") {
      ok = !!el.form.querySelector('input[name="interests"]:checked');
    } else {
      el.value = el.type === "checkbox" ? el.value : el.value.replace(/^\s+/, "");
      ok = el.checkValidity() && !(el.required && el.type !== "checkbox" && !el.value.trim());
      if (el.type === "tel") {
        // Accept any common format: (770) 555-0123, 770.555.0123, +1 770 555 0123
        const d = el.value.replace(/\D/g, "");
        ok = !el.value.trim() || d.length === 10 || (d.length === 11 && d[0] === "1");
      }
    }
    field.classList.toggle("has-error", !ok);
    field.classList.toggle("is-valid", ok && el.value !== "" && el.type !== "checkbox");
    const target = el.name === "interests" ? field : el;
    if (el.name !== "interests") el.setAttribute("aria-invalid", !ok);
    // Point aria-describedby at the error message only while it is visible
    const err = field.querySelector(".error-msg");
    if (err && target) {
      const ids = (target.getAttribute("aria-describedby") || "").split(" ").filter(id => id && id !== err.id);
      if (!ok) ids.push(err.id);
      ids.length ? target.setAttribute("aria-describedby", ids.join(" ")) : target.removeAttribute("aria-describedby");
    }
    return ok;
  }

  let contact = {};
  function prefill(panel) {
    if (!contact.name) return;
    const n = panel.querySelector("#s-name"), em = panel.querySelector("#s-email");
    if (n && !n.value) n.value = contact.name;
    if (em && !em.value) em.value = contact.email;
  }

  function initForm(form) {
    const controls = [...form.querySelectorAll("input, select, textarea")];
    // Start with error messages detached; validateField attaches them when they appear
    form.querySelectorAll(".error-msg").forEach(err => {
      form.querySelectorAll('[aria-describedby~="' + err.id + '"]').forEach(el => {
        const ids = el.getAttribute("aria-describedby").split(" ").filter(id => id !== err.id);
        ids.length ? el.setAttribute("aria-describedby", ids.join(" ")) : el.removeAttribute("aria-describedby");
      });
    });
    const interestBoxes = controls.filter(c => c.name === "interests");

    // Validate on blur; re-validate on input once a field has shown an error
    controls.forEach(c => {
      c.addEventListener("blur", () => { if (c.value || c.type === "checkbox" || fieldFor(c)?.classList.contains("has-error")) validateField(c); });
      c.addEventListener("input", () => { if (fieldFor(c)?.classList.contains("has-error")) validateField(c); });
      c.addEventListener("change", () => { if (c.type === "checkbox" || c.tagName === "SELECT") validateField(c); });
    });

    // Live character counters
    form.querySelectorAll("[data-counter]").forEach(t => {
      const out = document.getElementById(t.dataset.counter);
      const live = document.createElement("span");
      live.className = "visually-hidden"; live.setAttribute("role", "status");
      out.after(live);
      const update = () => {
        out.textContent = t.value.length + " / " + t.maxLength;
        const left = t.maxLength - t.value.length;
        live.textContent = left <= 50 ? left + " characters left" : "";
      };
      t.addEventListener("input", update); update();
    });

    form.addEventListener("reset", () => setTimeout(() => {
      form.querySelector(".error-summary")?.remove();
      form.querySelectorAll(".field").forEach(f => f.classList.remove("has-error", "is-valid"));
      form.querySelectorAll("[aria-invalid]").forEach(c => c.removeAttribute("aria-invalid"));
      form.querySelectorAll(".error-msg").forEach(err => form.querySelectorAll('[aria-describedby~="' + err.id + '"]').forEach(el => {
        const ids = el.getAttribute("aria-describedby").split(" ").filter(id => id !== err.id);
        ids.length ? el.setAttribute("aria-describedby", ids.join(" ")) : el.removeAttribute("aria-describedby");
      }));
      form.querySelectorAll("[data-counter]").forEach(t => t.dispatchEvent(new Event("input")));
    }));

    let dirty = false;
    form.addEventListener("input", () => { dirty = true; });
    window.addEventListener("beforeunload", e => { if (dirty && !form.classList.contains("is-sent")) { e.preventDefault(); e.returnValue = ""; } });

    form.addEventListener("submit", e => {
      e.preventDefault();
      const toCheck = controls.filter(c => c.name !== "interests").concat(interestBoxes.slice(0, 1));
      const invalid = toCheck.filter(c => !validateField(c));
      let summary = form.querySelector(".error-summary");
      if (invalid.length) {
        // Persistent summary at the top: says how many, links to each field (GOV.UK error-summary pattern)
        if (!summary) {
          summary = document.createElement("div");
          summary.className = "error-summary";
          summary.setAttribute("role", "alert");
          summary.tabIndex = -1;
          form.prepend(summary);
        }
        const name = el => {
          const f = fieldFor(el); const lab = f && (f.querySelector("legend") || f.querySelector("label"));
          if (!lab) return el.name;
          const c = lab.cloneNode(true);
          c.querySelectorAll("input, .req, .text-soft").forEach(n => n.remove());
          const t = c.textContent.replace(/\s+/g, " ").trim();
          return t.length > 60 ? "Confirm the information is accurate" : t;
        };
        summary.innerHTML = "<h3>Fix " + (invalid.length === 1 ? "1 thing" : invalid.length + " things") + " to send this</h3><ul>" +
          invalid.map(el => '<li><a href="#' + (el.name === "interests" ? fieldFor(el).querySelector("input").id || "" : el.id) + '">' + window.CC.escapeHTML(name(el)) + "</a></li>").join("") + "</ul>";
        summary.querySelectorAll("a").forEach((link, i) => link.addEventListener("click", e => { e.preventDefault(); invalid[i].focus(); }));
        summary.focus();
        return;
      }
      if (summary) summary.remove();
      const data = new FormData(form);
      const success = form.nextElementSibling;
      const name = (data.get("first") || data.get("name") || "there").toString().trim().split(" ")[0];
      success.querySelector("[data-name]").textContent = name;
      const org = success.querySelector("[data-org]");
      if (org) org.textContent = data.get("org");
      form.classList.add("is-sent");
      if (window.CC.track) window.CC.track("form_submit", { form: form.id });
      dirty = false;
      // Redundant entry (WCAG 3.3.7): remember name and email for the other form, in memory only
      const full = data.get("first") ? (data.get("first") + " " + (data.get("last") || "")).trim() : data.get("name");
      contact = { name: (full || "").toString(), email: (data.get("email") || "").toString() };
      success.focus();
      form.reset();
    });

    form.nextElementSibling.querySelector("[data-again]").addEventListener("click", () => {
      form.classList.remove("is-sent");
      form.querySelector("input, select").focus();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    document.querySelectorAll("form[novalidate]").forEach(initForm);
  });
})();
