# Cumming Connects: Planning and Presentation Guide

7-minute presentation plus 3-minute Q&A, 120 points. This guide maps each part of the talk to a rubric row.

## The story in one sentence
*"Help in Forsyth County is scattered across dozens of websites, so we built one guide that works like the road signs everyone here already knows."*

## Suggested 7-minute flow
| Time | Section | Show on screen | Rubric row (points) |
|---|---|---|---|
| 0:00–0:40 | **Hook.** Problem, plus Denise's persona: food help, on her phone, on her lunch break. | Home sign | Delivery |
| 0:40–2:10 | **Planning.** Personas, then 8 need-based categories, then v1. Then the turning point: "Our first version looked like a template, so we listed every generic choice and replaced it with something from Cumming." That covers GA 400 guide signs, Overpass (Highway Gothic), Sawnee granite and Lake Lanier. | About: personas, process, "Why it looks like a road sign" | Planning, Development, Implementation (20) |
| 2:10–4:10 | **Live demo, one journey.** Change the sign to "food help for my family" (the exits flip), click Show, open The Place, star it, then show the source line. Events: search "parade", open the Christmas Parade, tap Save to My calendar, then turn on My calendar and Add all to phone calendar. Turn on Colorblind mode (the shapes button) to show the shapes. Then A++ and dark mode. Then the volunteer form: submit empty to show the errors, then fix them. | Home, Directory, Events, Get Involved | Features (10), Interactivity (5), UX (20) |
| 4:10–4:50 | **Works everywhere.** The same page on a laptop, tablet and phone, with the same header, colors and route markers on every page. | 3 devices | Platforms (5), Consistency (5) |
| 4:50–5:30 | **Trust.** The dated source line under the sign, "Not yet confirmed" labels, the Sources page in MLA 9, and why there are no fake testimonials. | Home source line, a "Not yet confirmed" card, Sources | Sources (5), Grammar (5) |
| 5:30–6:40 | **Metrics.** Go to About, then "Your visit, live". The numbers went up during the demo. Walk the KPI table: Core Web Vitals (LCP, INP, CLS), GA4 events, conversions, engagement rate, CTR and retention. Then show the v1-vs-v2 test results below. | About metrics | Metrics (5) |
| 6:40–7:00 | **Close.** Back to the sign: "Wherever you need to go in Cumming, start here." | Home | Delivery |

All members must speak. Split the sections and practice the hand-offs.

## Design decisions with evidence (say "because…")
- **Sign hero (the one bold element):** Locals navigate by GA 400's green guide signs, and the site's job is wayfinding. The sign is a real form: "I need ___ for ___" gives a live count and the top 3 places, and Go opens the filtered directory. People reach a result in 2 taps.
- **Restraint everywhere else:** The frontend-design principle says to "spend your boldness in one place", so inner pages are calm granite with a single green rule.
- **Overpass for headings:** It's an open-source take on Highway Gothic, the US road-sign font. **Atkinson Hyperlegible for reading:** the Braille Institute designed it so low-vision readers can tell similar letters apart (this serves Robert's persona).
- **Palette from the place:**
  - Guide Green #0B5D3B: white text on it is 7.9:1.
  - Signal Yellow #F5C242: used only for the main action, with dark text on it.
  - Granite background.
  - Lanier Blue in the illustrations.
- **Categories:** each has its own color, always paired with a word (color is never used alone).
- **Imagery over copy:** original illustrations of real Cumming places and a 43-second captioned screen-recording demo. This follows the "imagery and video build trust" principle from our landing-page research.
- **Honest social proof:** one plain, dated line showing how many pages we checked from each source, with no logo wall. Anything we couldn't confirm is labeled. The testimonials section is coded but **stays hidden until we have real quotes**, because fake ones destroy trust.
- **Personal section:** "Why we built this" tells people who made the site, and people support people.
- **Motion in four levels:**
  1. Press and hover feedback (140 ms).
  2. Pop-ups and accordions (220 ms).
  3. One page-load moment, where the sign rises.
  4. A signature moment, where the exit plates flip when you change the sign.
  All of it turns off for "reduce motion".
- **Plain language:** short sentences, and buttons say what happens ("Show all 4", "Add to my calendar").
- **Category colors from the road-sign code (MUTCD):** brown for recreation, blue for services and red for safety. They are not framework defaults, and every one is 5:1 contrast or better.
- **"Not vibecoded":** we researched what makes sites look AI-generated or templated (36 sources) and removed every pattern we found:
  - logo-wall marquees
  - icons in tinted circles
  - card accent stripes
  - glass headers
  - a FAQ accordion on the home page
  - stat strips
  - italic accent words
  - all-caps labels
  - "→" arrows
  - em-dash copy
  - fade-up on every section
- **Privacy:** saved places stay on the device, and "Near me" never stores or sends a location.

## Going beyond the requirements
- Interactive sign search
- Live analytics funnel
- GA4-ready events
- Event structured data (JSON-LD), sitemap and robots.txt
- Open Graph link preview
- Captioned demo video
- Video chapter links, places carousel
- Saved favorites
- .ics calendar files
- "Near me" sorting
- Shareable filtered links
- Dark mode and text size
- Colorblind mode: a palette tested with color-blindness simulations, plus a road-sign shape for each category
- Event search, and My calendar (save events, then export them all to a phone calendar)
- Listen: reads any page, pop-up, or selected text out loud with the browser's built-in voice (works offline)
- Works offline
- Emergency strip on every page
- Print styles
- Works-cited page

## Testing evidence: v1 vs v2
We ran the same automated test harness (Playwright, axe-core and Lighthouse) on version 1 and version 2.

| Measure | Version 1 | Version 2 |
|---|---|---|
| Lighthouse performance, desktop (average) | 91 | 100 |
| Lighthouse performance, mobile (average) | 96.7 | 98.3 |
| Lighthouse accessibility, best practices, SEO | 100 | 100 |
| Layout shift (CLS), worst page | 0.29 | 0.001 |
| axe accessibility violations (28 audits) | 0 | 0 |
| Interaction tests passing | 42 of 42 | 51 of 51 |
| JavaScript errors | 0 | 0 |
| AI-slop detectors run (13 tools) | (not run) | none flagged; worst design-slop score 7/100 |

The full report is in `docs/test-report-v1-vs-v2.md`. Talking point: "We didn't just redesign it; we measured it. Version 2 is faster on desktop, stopped the page from jumping while it loads, and passes every accessibility and interaction test."

## Q&A prep
- **"Why does it look like a road sign?"** People here already know how to read those signs, and they're designed to be understood at 60 mph, so they're clear, high-contrast and plain-language.
- **"Why no framework like React?"** It's a content site. Plain JavaScript means no build step, fast loading, offline use, and every line is code we can explain.
- **"How do you keep it current?"** Every listing has a source link, the Suggest form feeds a review queue, and we would re-check each listing every quarter.
- **"How is it accessible?"** Walk through See it / Use it / Understand it on the About page, then demo keyboard-only use: Tab, Enter, Esc and the arrow keys.
- **"What would you add next?"** A Spanish version, a real backend for the forms, a live GA4 property, and a "last verified" date on each listing.
- **"Where are your testimonials?"** "We only show real ones. Here's how we're collecting them from beta testers." Then add them if you have them.
