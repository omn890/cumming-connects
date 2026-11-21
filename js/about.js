/* Cumming Connects — About page: live funnel built from this session's tracked events. */
(function () {
  "use strict";
  const ACTIONS = ["click_to_call", "get_directions", "add_to_calendar", "save_favorite", "save_event", "form_submit"];

  function render() {
    const c = window.CCAnalytics ? window.CCAnalytics.counts() : {};
    const values = {
      page_view: c.page_view || 0,
      search: (c.search || 0) + (c.sign_go || 0),
      view_resource: (c.view_resource || 0) + (c.view_event || 0),
      action: ACTIONS.reduce((sum, k) => sum + (c[k] || 0), 0)
    };
    document.querySelectorAll("[data-funnel]").forEach(el => {
      const n = values[el.dataset.funnel];
      el.innerHTML = "<strong>" + n + "</strong> " + (n === 1 ? el.dataset.one : el.dataset.many);
    });
  }

  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("cc:track", render);
})();
