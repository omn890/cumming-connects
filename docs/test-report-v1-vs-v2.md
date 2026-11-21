# Backtest report: v1 → v2

- **v1**: `/tmp/claude-0/-home-user/9a547282-013b-5131-93ec-1523f07f87a5/scratchpad/v1` (2026-10-22T16:13:55.264Z, 7 pages)
- **v2**: `/home/user/cumming-connects` (2026-10-22T17:22:57.566Z, 7 pages)
- Harness 1.0.0 · Chromium 141.0.7390.37 · axe 4.14.0 · Lighthouse 13.5.0
- Legend: **▲ better** improvement, **▼ WORSE** regression, `=` within noise tolerance.

**Overall: headline 1 improvement, 1 regression.** Per-page Core Web Vitals cells: 4 better, 13 worse. Flows: 9 newly passing, 0 newly failing.

## Headline

| Metric | v1 | v2 | Δ | Verdict |
| --- | --- | --- | --- | --- |
| Lighthouse mobile performance (avg) | 96.7 | 98.3 | +1.7 | = |
| Lighthouse mobile accessibility (avg) | 100 | 100 | 0 | = |
| Lighthouse mobile best-practices (avg) | 100 | 100 | 0 | = |
| Lighthouse mobile seo (avg) | 100 | 100 | 0 | = |
| Lighthouse desktop performance (avg) | 91 | 100 | +9 | **▲ better** |
| Lighthouse desktop accessibility (avg) | 100 | 100 | 0 | = |
| Lighthouse desktop best-practices (avg) | 100 | 100 | 0 | = |
| Lighthouse desktop seo (avg) | 100 | 100 | 0 | = |
| axe violations (rule × page × viewport) | 0 | 0 | 0 | = |
| axe critical + serious | 0 | 0 | 0 | = |
| Flow pass rate (pass / (pass+fail)) | 100% | 100% | 0 | = |
| Flow FAILs | 0 | 0 | 0 | = |
| JS errors (all passes) | 0 | 0 | 0 | = |
| Max horizontal overflow | 0 | 0 | 0 | = |
| Site weight (excl. docs) | 548.9 KB | 5.15 MB | +4.61 MB | **▼ WORSE** |
| Broken internal links | 0 | 0 | 0 | = |
| `<img>` without alt | 0 | 0 | 0 | = |

## Lighthouse

### Category scores (0–100, median run)

| Page · preset | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| index · desktop | 100 → 100 | 100 → 100 | 100 → 100 | 100 → 100 |
| index · mobile | 99 → 97 | 100 → 100 | 100 → 100 | 100 → 100 |
| resources · desktop | 85 → 100 **▲ better** | 100 → 100 | 100 → 100 | 100 → 100 |
| resources · mobile | 100 → 99 | 100 → 100 | 100 → 100 | 100 → 100 |
| events · desktop | 88 → 100 **▲ better** | 100 → 100 | 100 → 100 | 100 → 100 |
| events · mobile | 91 → 99 **▲ better** | 100 → 100 | 100 → 100 | 100 → 100 |

### Core Web Vitals and weight

| Page · preset | LCP | CLS | TBT | Total bytes (transfer) |
| --- | --- | --- | --- | --- |
| index · desktop | 386 ms → 545 ms **▼ WORSE** | 0.001 → 0.001 | 0 ms → 0 ms | 110.8 KB → 197.8 KB **▼ WORSE** |
| index · mobile | 1584 ms → 2028 ms **▼ WORSE** | 0.002 → 0.000 | 12 ms → 115 ms **▼ WORSE** | 110.8 KB → 197.8 KB **▼ WORSE** |
| resources · desktop | 334 ms → 412 ms | 0.289 → 0.001 **▲ better** | 0 ms → 0 ms | 87.3 KB → 145.9 KB **▼ WORSE** |
| resources · mobile | 1388 ms → 1663 ms **▼ WORSE** | 0.031 → 0.000 **▲ better** | 0 ms → 57 ms **▼ WORSE** | 87.3 KB → 128.5 KB **▼ WORSE** |
| events · desktop | 330 ms → 412 ms | 0.235 → 0.001 **▲ better** | 0 ms → 0 ms | 87.2 KB → 146.6 KB **▼ WORSE** |
| events · mobile | 1359 ms → 1663 ms **▼ WORSE** | 0.193 → 0.000 **▲ better** | 0 ms → 57 ms **▼ WORSE** | 87.2 KB → 129.2 KB **▼ WORSE** |

## Accessibility (axe-core)

Tags: wcag2a, wcag2aa, wcag21aa, wcag22aa, best-practice. Counted per page × viewport/scheme audit (28 audits in v2).

| Impact | v1 rules | v2 rules | Δ | Verdict | v1 nodes | v2 nodes |
| --- | --- | --- | --- | --- | --- | --- |
| critical | 0 | 0 | 0 | = | 0 | 0 |
| serious | 0 | 0 | 0 | = | 0 | 0 |
| moderate | 0 | 0 | 0 | = | 0 | 0 |
| minor | 0 | 0 | 0 | = | 0 | 0 |

No axe violations in either version.

## Interaction flows

|  | v1 | v2 |
| --- | --- | --- |
| PASS | 42 | 51 |
| FAIL | 0 | 0 |
| SKIP | 9 | 0 |
| Pass rate (excl. SKIP) | 100% | 100% |

| Group | Flow | v1 | v2 | Change | v2 detail |
| --- | --- | --- | --- | --- | --- |
| directory | `dir.search-narrows` | PASS | PASS |  | "library" -> 4 of 40 |
| directory | `dir.url-q` | PASS | PASS |  | ?q=library -> 4 of 40 |
| directory | `dir.url-cat` | PASS | PASS |  | ?cat=food -> 4 of 40 |
| directory | `dir.cat-chip` | PASS | PASS |  | food -> 4 of 40, toggles off |
| directory | `dir.aud-chip` | PASS | PASS |  | aud=families -> 35 of 40 |
| directory | `dir.clear-filters` | PASS | PASS |  | 3 -> 40 after clear |
| directory | `dir.empty-state` | PASS | PASS |  | empty state visible |
| directory | `dir.modal` | PASS | PASS |  | opened/closed avita-cumming-center, focus restored |
| directory | `dir.favorite-saved` | PASS | PASS |  | favorite saved and persists across reload |
| directory | `dir.list-view` | PASS | PASS |  | #results class "grid grid--3 results-grid is-list", aria-pressed=true |
| directory | `dir.family-haven-hash` | PASS | PASS |  | tel links=2, map links=0 |
| directory | `dir.datalayer-search` | SKIP | PASS | **▲ better** | dataLayer events: page_view,search |
| events | `ev.month-nav` | PASS | PASS |  | November 2026 -> December 2026 -> November 2026 |
| events | `ev.event-dialog` | PASS | PASS |  | opened slide-into-sundays |
| events | `ev.ics-download` | PASS | PASS |  | slide-into-sundays.ics (595 bytes) valid |
| events | `ev.list-view` | PASS | PASS |  | 26 rows |
| events | `ev.chips` | PASS | PASS |  | seniors: 26 -> 1 rows |
| events | `ev.phone-day-list` | SKIP | PASS | **▲ better** | 2026-11-01: dialog lists 2 item(s) |
| map | `map.offline-fallback` | PASS | PASS |  | offline after ~4858ms |
| map | `map.list-count` | PASS | PASS |  | 39 places |
| map | `map.parks-chip` | PASS | PASS |  | parks -> 6 |
| map | `map.list-dialog` | PASS | PASS |  | dialog opened |
| forms | `form.empty-errors` | PASS | PASS |  | 6 field errors, focus on .error-summary |
| forms | `form.error-summary` | SKIP | PASS | **▲ better** | role=alert, focused, 6 links, first -> #v-first |
| forms | `form.valid-success` | PASS | PASS |  | success message visible |
| forms | `form.tabs-arrows` | PASS | PASS |  | arrow keys switch tabs and focus |
| forms | `form.tab-click` | PASS | PASS |  | click switches panels |
| forms | `form.hash-submit` | PASS | PASS |  | #submit opens from hash |
| global | `global.theme-persist` | PASS | PASS |  | theme persisted to about.html |
| global | `global.text-persist` | PASS | PASS |  | text size persisted to about.html |
| global | `global.text-toggle-mobile` | SKIP | PASS | **▲ better** | menu text toggle works and persists |
| global | `global.mobile-nav` | PASS | PASS |  | opens (aria-expanded=true), Esc closes |
| keyboard | `kbd.skip-link:index` | PASS | PASS |  | "Skip to main content" -> #main |
| keyboard | `kbd.skip-link:resources` | PASS | PASS |  | "Skip to main content" -> #main |
| keyboard | `kbd.skip-link:events` | PASS | PASS |  | "Skip to main content" -> #main |
| keyboard | `kbd.skip-link:map` | PASS | PASS |  | "Skip to main content" -> #main |
| keyboard | `kbd.skip-link:get-involved` | PASS | PASS |  | "Skip to main content" -> #main |
| keyboard | `kbd.skip-link:about` | PASS | PASS |  | "Skip to main content" -> #main |
| keyboard | `kbd.skip-link:sources` | PASS | PASS |  | "Skip to main content" -> #main |
| home-v2 | `home.sign-live` | SKIP | PASS | **▲ better** | "health" updates results |
| home-v2 | `home.sign-submit` | SKIP | PASS | **▲ better** | navigated to resources.html?cat=food&aud=families |
| home-v2 | `home.checked-line` | SKIP | PASS | **▲ better** | 5 link(s) to sources.html |
| home-v2 | `about.answers` | SKIP | PASS | **▲ better** | 5 questions, all answers shown |
| home-v2 | `home.video-chapter` | SKIP | PASS | **▲ better** | chapter 10.1s -> currentTime 10.1s |
| offline | `offline:index` | PASS | PASS |  | no page errors, 6 font faces loaded |
| offline | `offline:resources` | PASS | PASS |  | no page errors, 40 cards, 6 font faces loaded |
| offline | `offline:events` | PASS | PASS |  | no page errors, 6 font faces loaded |
| offline | `offline:map` | PASS | PASS |  | no page errors, is-offline=true, 6 font faces loaded |
| offline | `offline:get-involved` | PASS | PASS |  | no page errors, 6 font faces loaded |
| offline | `offline:about` | PASS | PASS |  | no page errors, 6 font faces loaded |
| offline | `offline:sources` | PASS | PASS |  | no page errors, 7 font faces loaded |

### Every FAIL in v2 (0)

None.

### Every FAIL in v1 (0)

None.

## JavaScript errors

Network errors for blocked external hosts (e.g. tile.openstreetmap.org) are ignored.

| Source | v1 | v2 | Verdict |
| --- | --- | --- | --- |
| Console errors (page × viewport audits) | 0 | 0 | = |
| Uncaught page errors (audits) | 0 | 0 | = |
| Errors during flows | 0 | 0 | = |
| Page errors offline (file://) | 0 | 0 | = |
| Failed local requests (404 etc.) | 0 | 0 | = |

External hosts requested by v2 (blocked during the test): `b.tile.openstreetmap.org`, `c.tile.openstreetmap.org`, `a.tile.openstreetmap.org`

## Horizontal overflow (px)

| Page | 375x812 | 768x1024 | 1440x900 | 1440x900 dark |
| --- | --- | --- | --- | --- |
| index | 0 → 0 | 0 → 0 | 0 → 0 | 0 → 0 |
| resources | 0 → 0 | 0 → 0 | 0 → 0 | 0 → 0 |
| events | 0 → 0 | 0 → 0 | 0 → 0 | 0 → 0 |
| map | 0 → 0 | 0 → 0 | 0 → 0 | 0 → 0 |
| get-involved | 0 → 0 | 0 → 0 | 0 → 0 | 0 → 0 |
| about | 0 → 0 | 0 → 0 | 0 → 0 | 0 → 0 |
| sources | 0 → 0 | 0 → 0 | 0 → 0 | 0 → 0 |

## Site weight (raw bytes on disk)

| Type | v1 | v2 | Δ | Verdict |
| --- | --- | --- | --- | --- |
| html | 116.2 KB | 125.3 KB | +9.1 KB | **▼ WORSE** |
| css | 58.7 KB | 81.8 KB | +23.1 KB | **▼ WORSE** |
| js | 237.9 KB | 271.0 KB | +33.1 KB | **▼ WORSE** |
| fonts | 128.0 KB | 138.2 KB | +10.1 KB | **▼ WORSE** |
| images | 6.8 KB | 358.3 KB | +351.5 KB | **▼ WORSE** |
| video | 0.0 KB | 4.19 MB | +4.19 MB | **▼ WORSE** |
| other | 1.4 KB | 3.3 KB | +1.9 KB | = |
| total | 548.9 KB | 5.15 MB | +4.61 MB | **▼ WORSE** |

Docs/README/licence text (not counted in total): 18.5 KB → 32.2 KB. Files: 36 → 57.

## Broken links and missing alt text

| Check | v1 | v2 | Verdict |
| --- | --- | --- | --- |
| Broken internal links (static HTML/CSS + rendered DOM) | 0 | 0 | = |
| `<img>` without alt | 0 | 0 | = |
| Fragment links to missing ids (info; may be JS-handled) | 0 | 3 |  |

Fragment links whose id isn't in the static HTML (v2): index.html→`resources.html#sawnee-mountain-preserve`, index.html→`resources.html#mary-alice-park`, index.html→`resources.html#cumming-library`

---
Screenshots: `results/v1/shots/` and `results/v2/shots/`. Lighthouse HTML reports: `results/<label>/lighthouse/`.
