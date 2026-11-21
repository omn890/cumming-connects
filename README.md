# Cumming Connects

This is a community resource website for Cumming and Forsyth County, Georgia, built for the FBLA **Website Design** event (2026–27 topic: *Community Resource Website*).

It is plain HTML, CSS and JavaScript, with no frameworks, no build step and no server needed.

## Run it
- **At the competition (offline-safe):** double-click `index.html`. Everything works without internet, including the demo video, except the map tiles. When the map can't load tiles, it automatically switches to a list of places.
- **Local server (optional):** run `python3 -m http.server` in this folder, then open http://localhost:8000.
- **Publish it free:** use GitHub Pages or Netlify Drop. Then replace `YOUR-SITE-ADDRESS` in `robots.txt` and `sitemap.xml`, and change each page's `og:image` to the full address (for example `https://your-site/assets/img/og-image.png`) so link previews work.

## What's on each page
| Page | Highlights |
|---|---|
| `index.html` | **Guide-sign hero:** "I need ___ for ___" updates live, the matching places flip in on green plates, and Go opens the filtered directory. Then a dated source line, the demo video with chapter links, "Browse by need" (counts styled like exit numbers), upcoming events, the places carousel and "Why we built this" |
| `resources.html` | Live search with highlighting, category and audience filters, sort, card or list view, ★ saved favorites, shareable filtered links |
| `events.html` | Month or list calendar, event search, filters, My calendar (saved events, exported as one .ics), event details, "Add to phone calendar" (.ics), Event structured data for Google |
| `map.html` | Leaflet map, synced list, "Near me" sorting, and a drawn offline map (GA 400, Lake Lanier, clickable pins) when there's no internet |
| `get-involved.html` | Volunteer and Suggest-a-resource forms with inline validation (demo only; nothing is sent) |
| `about.html` | Problem, personas, process, v1-vs-v2 comparison, design system, accessibility **test results table**, live analytics counter, KPI table, common questions |
| `sources.html` | MLA works cited for every listing, font, library and research source |

## Files
| Path | What it is |
|---|---|
| `css/styles.css` | The whole design system: tokens, light and dark mode, components, the four motion levels |
| `js/data.js` | **All content:** categories, resources, events and `TESTIMONIALS` |
| `js/main.js`, `js/ui.js` | Shared code: theme and text size, Listen (read aloud), nav, favorites, cards, pop-ups, .ics download |
| `js/analytics.js` | Sends GA4-ready events to `dataLayer` and counts them for the About page funnel |
| `js/home.js`, `resources.js`, `events.js`, `map.js`, `forms.js`, `about.js` | Page-specific behavior |
| `assets/img/places/` | Original SVG illustrations of real Cumming places |
| `assets/video/` | `demo.mp4` (for Safari) and `demo.webm`: a 43-second screen recording of this site. Also `demo.vtt` captions (mirrored in `js/demo-captions.js` for offline use) and a poster image |
| `assets/fonts/`, `vendor/leaflet/` | Fonts and map library, stored locally for offline use |
| `robots.txt`, `sitemap.xml`, `assets/img/og-image.png` | SEO and link-preview files |
| `docs/planning.md` | Presentation guide: rubric mapping, design reasons, v1-vs-v2 test results, Q&A |

### Editing content (no coding needed)
- **Add a resource or event:** copy an entry in `js/data.js` and change its fields. Counts, filters, the sign, the map and the calendar all update automatically. Add the source to `sources.html`.
- **Add a real testimonial:** add `{ quote: "...", name: "First L.", role: "Cumming resident" }` to `window.TESTIMONIALS` in `js/data.js`. The "What neighbors say" section appears only once a quote exists. **Use real quotes with permission. Never make one up.**
- **Turn on Google Analytics:** paste your GA4 tag into each page's `<head>`. The site already sends events such as `search`, `view_resource`, `get_directions`, `click_to_call`, `add_to_calendar`, `save_favorite`, `form_submit` and `video_play`.
- **Shared header and footer:** these are repeated on all 7 pages. Change all of them together, since consistency is scored.

---

## Security
- **Content Security Policy** (in each page's `<head>`): pages run only this site's own script files. The one small inline script (it applies the saved theme before the page appears) is allowed by its SHA-256 hash. **If you edit that inline script, the browser will block it until you update the hash in the policy on all 7 pages.** Map tiles may load from OpenStreetMap; nothing else outside the site can load.
- **Links are checked:** values read from a page address (`?cat=`, `?aud=`, `?q=`, `#place`) are accepted only if the site itself uses them, and searches from links are capped at 80 characters. This stops crafted links from putting their own words on the page.
- **No secrets, no tracking, no data sent:** saved places, events and settings stay in the visitor's browser (localStorage). Forms are demos and send nothing.
- **Tested (Nov. 19, 2026):** 99 cross-site-scripting attacks through every link parameter, search box and form field, with 0 executed; 0 policy violations while using every feature, online and from `file://`; no known vulnerabilities in Leaflet 1.9.4 (npm advisory database, Retire.js); secrets scan clean.

## What the final audits found (Oct. 22, 2026)
Four read-only audits ran against v2:
- **Design guidelines:** Vercel Web Interface Guidelines, WCAG 2.2 manual checks, typography, Refactoring UI and Nielsen. All 8 must-fix and most should-fix items are done.
- **AI-slop and vibecode detectors:** 13 tools. None flagged the site; the worst design-slop score was 7/100.
- **Research on past NLC Website Design winners.**
- **A simulated three-judge panel:** about 69 out of 80 on the website rows before fixes.

Every code-level fix is done. What remains needs your team (below).

## ⚠️ Team checklist before RLC (must do)
1. **Fix the map pin coordinates** in `js/data.js`; only Sawnee Mountain Preserve is exact. Look up each address in Google Maps, right-click the pin and copy the coordinates.
2. **Check every `verified: false` item** in `js/data.js`:
   - Resources: Meals by Grace (phone), the CFUMC pantry, DFCS, the Boys & Girls Club, Hearthstone Lodge, the Big Creek Greenway trailhead, the United Way (address and name), and Cumming Police (address and non-emergency number).
   - Events: 8 have unconfirmed dates (each explained in its `dateNote`).
3. **Open every link on `sources.html`, and re-source these to the organization's own website if you can:** Northside (currently ahd.com), The Place (ampleharvest.org), Avita (carf.org), Family Haven (domesticshelters.org), Big Creek Greenway (traillink.com), Forsyth County Schools (focochamber.org), and the four forsythnews.com items. Update `sourceUrl` in `js/data.js` and the matching line in `sources.html`.
4. **Make "Why we built this" personal** (Chris's rule 5; the design audit ranked it #3):
   - **Photo:** take a real team photo at a Cumming spot, such as the library steps or City Center. Save it as `assets/img/team.jpg` and swap the `<img>` in `index.html`, with alt text naming who is in it.
   - **Names:** replace "The Cumming Connects team" with your first names, grades and school.
   - **Story:** replace the quote with one true, specific moment that made you build this, in two short sentences. Don't invent numbers.
5. **Collect 2–3 real testimonials** from beta testers and add them to `TESTIMONIALS`.
6. **Run a real 5-person user test** (cover all four personas). Record task success and number of taps, and note what you changed. Add a small results table to About and, with permission, use real quotes as testimonials. The judges ranked this #2.
7. **Show planning evidence:** photos of your paper sketches and wireframes, and real dates for the "How we built it" steps on About.
8. **Optional extras the research suggests:**
   - verified Housing, Jobs and Transportation listings
   - Spanish text for the emergency strip, sign and categories, reviewed by a native speaker
   - testing on Safari and Edge
9. **Check your state's FBLA rules on AI tools.** The guidelines say only registered competitors may plan, research and prepare the project. Ask your adviser how AI assistance must be disclosed, and be ready to explain every part of the code yourselves.
10. **Test the live map with internet.** The build environment blocked map tiles.
11. **Proofread every page out loud**, then put backups on a USB drive and keep screenshots handy.
