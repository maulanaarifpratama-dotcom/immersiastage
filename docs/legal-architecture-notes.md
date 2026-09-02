# Legal Architecture Notes

Implementation memo for the three legal pages added in `src/pages/`. Written
2026-09-02 against commit `31f5e11`.

These pages are unusual in one respect worth stating up front: **they are
accurate because of how the site is built, not because of how they are
worded.** Change the build and they become false — silently, and without any
edit to the pages themselves. That is what this memo is for.

---

## What is true today

Verified against the built output and against production, not assumed.

| Claim made in the pages | Why it holds |
| --- | --- |
| No cookies | No `Set-Cookie` on any response; `document.cookie` empty at runtime; no `document.cookie` anywhere in `dist-astro` |
| No analytics | No GA/GA4/GTM, Vercel Analytics, Vercel Speed Insights, Plausible, Meta Pixel, Clarity, Hotjar, Segment, Mixpanel, Amplitude, PostHog, Matomo, Umami or Fathom — in source, in `dist-astro`, or in the runtime globals |
| No browser storage | `localStorage` and `sessionStorage` both 0 keys at runtime, including after interacting with the project-records search and filter |
| No third-party scripts | `script[src]` is empty on every page; every network request goes to `immersia.id` |
| No embedded content | Zero `<iframe>` in all 44 built pages |
| Form sends nothing to a server | `src/pages/request-proposal.astro:215` ends in `window.location.href = "mailto:…"`. No `fetch`, no `XMLHttpRequest`, no `sendBeacon` in the page script |
| Only WhatsApp / Instagram / LinkedIn are linked | The only non-`immersia.id` hosts in `<a href>` across the build |
| Vercel serves every request | `Server: Vercel` on every response |

**The three pages are the only files added.** Nothing else in the repository
was touched — see *What must be updated* for the consequences.

---

## What breaks if Vercel Analytics is enabled

**This is the dangerous one.** Vercel Analytics can be switched on from the
project dashboard **without any change to this repository**. No commit, no
diff, no code review. The script is injected at the edge. Nothing in the repo
would record that it happened, and nothing in CI would fail.

Statements that become false the moment it is on:

| Statement | Page |
| --- | --- |
| "There is no analytics or measurement tool on this site." | Privacy Policy |
| "We do not count visits, sessions, page views, or any other visitor metric." | Privacy Policy |
| "No advertising, tracking, social, chat, or measurement script is loaded." | Privacy Policy |
| "Every file the page needs is served from immersia.id." | Privacy Policy |
| "Reading this website leaves no record with us." | Privacy Policy |
| "Because there is nothing to consent to, this site shows no cookie banner." | Privacy Policy |

Speed Insights has the same property and breaks the same statements about
third-party scripts and first-party-only requests.

**Required before enabling:** rewrite the "What this website collects" section,
add a section naming Vercel Analytics and what it measures, and decide whether
a consent mechanism is needed for the configuration chosen.

---

## What breaks if GA4 is added

Everything Vercel Analytics breaks, plus:

| Statement | Page |
| --- | --- |
| "The site sets no cookies of any kind, and no cookie is required to read any page." | Privacy Policy |
| "Nothing is written to local storage, session storage, or any in-browser database." | Privacy Policy |
| "Nothing is kept on your device between visits." | Privacy Policy |

GA4 writes identifiers to the visitor's device and sends data to Google. The
Privacy Policy's central claim — that reading the site leaves no record —
becomes false in both halves at once.

**Required before adding:** a cookie disclosure, a named third-party recipient,
and a decision on consent. The current no-banner position is no longer
defensible.

**Google Tag Manager is worse than GA4 for documentation purposes.** GTM's
contents can change from its own console without a deploy, so any list of
third parties in the Privacy Policy stops being verifiable from the codebase.
If GTM is adopted, the policy needs a maintenance owner, not just an edit.

---

## What breaks if HubSpot forms are added

This is the largest change of the six, because it changes what Immersia *is*
with respect to the data.

| Statement | Page |
| --- | --- |
| "The form … does not send anything to us over the internet." | Privacy Policy |
| "Nothing is transmitted until you send that message yourself." | Privacy Policy |
| "The form data never reaches a server of ours. There is no database behind it and no submission is recorded anywhere on this site." | Privacy Policy |
| "This website is a static site … receives no form submissions." | Privacy Policy (lead) |
| "one form that opens an email in your own mail application" | Terms of Use (lead) |

Today the visitor's own mail client is the only thing that ever holds the form
data before they choose to send it. With a hosted form, submissions are
captured on receipt — by HubSpot and by Immersia — including submissions the
visitor started and thought better of.

**Required before adding:** name HubSpot as a processor, state what is stored
and for how long, state the legal basis, and add cookie disclosure (HubSpot
sets tracking cookies by default).

---

## What breaks if Calendly embed is added

| Statement | Page |
| --- | --- |
| "There are no embedded videos, maps, calendars, or widgets from other services." | Privacy Policy |
| "No advertising, tracking, social, chat, or measurement script is loaded." | Privacy Policy |
| "Every file the page needs is served from immersia.id." | Privacy Policy |
| "The site sets no cookies of any kind." | Privacy Policy |
| "Those are links, not embeds: nothing is loaded from them while you read our site." | Privacy Policy |

An embed loads on page view, before the visitor decides to interact — which is
the distinction the Privacy Policy currently draws between our outbound links
and third-party content. That distinction disappears.

**Also affects the Disclaimer:** "Proposal discussions are not binding" holds,
but a booked slot is a scheduled commitment and the page should say what a
booking does and does not commit Immersia to.

---

## What breaks if an embedded YouTube video is added

Same set as Calendly: the no-embeds statement, the no-third-party-scripts
statement, the first-party-only statement, and — on the standard
`youtube.com` domain — the no-cookies statement.

`youtube-nocookie.com` narrows the cookie exposure but does not restore any of
the other three claims. The request still leaves the visitor's browser for
Google's servers on page load.

---

## What breaks if Cloudflare analytics is enabled

| Statement | Page |
| --- | --- |
| "There is no analytics or measurement tool on this site." | Privacy Policy |
| "We do not count visits, sessions, page views, or any other visitor metric." | Privacy Policy |
| "No advertising, tracking, social, chat, or measurement script is loaded." | Privacy Policy |
| "Every file the page needs is served from immersia.id." | Privacy Policy |

Cloudflare's script-based analytics also shares the Vercel Analytics hazard:
depending on how it is enabled, it may not appear in this repository at all.

---

## What must be updated

The three pages were added on their own, with nothing else in the repository
touched. These items are outstanding and each one is required before the pages
can ship.

### Blocking — the build is not shippable without these

1. **`src/test/astro-output.test.js` — `LEGACY_URLS`.** The suite asserts the
   build "adds nothing beyond the legacy URLs except the 404 page". Three new
   pages fail it by design; that guard is working. Add
   `privacy-policy.html`, `terms-of-use.html`, `disclaimer.html`.
2. **Footer links.** `src/components/Footer.jsx` currently ends at the
   copyright line with no legal links. Legal pages that nothing links to are
   orphans — they will not be found by readers and the crawl will flag them.
   Add the three links beside the copyright.
3. **Resolve every `[TO BE CONFIRMED]`.** Six of them: registered entity name,
   registered address, two retention periods, Vercel log retention, and the
   statutory basis for the rights section. Also the effective date on all three
   pages, and the governing-law carry-over in Terms of Use.
4. **Legal review by someone qualified.** These pages are accurate about the
   site's behaviour. Whether they are *sufficient* is a different question and
   not one this work can answer.

### Required, non-blocking

5. **Redirects in `vercel.json`** from the five archived WordPress legal URLs.
   Sources are written without a trailing slash, matching the 45 rules already
   there:

   | Source | Destination |
   | --- | --- |
   | `/privacy-policy` | `/privacy-policy.html` |
   | `/syarat-dan-ketentuan` | `/terms-of-use.html` |
   | `/terms-and-conditions-of-use` | `/terms-of-use.html` |
   | `/en/syarat-dan-ketentuan` | `/terms-of-use.html` |
   | `/en/terms-and-conditions-of-use` | `/terms-of-use.html` |

   Note `/privacy-policy` as a redirect source and `privacy-policy.html` as a
   built page are different paths and do not collide. The existing test
   `never shadows a page the build produced` covers exactly this case — let it
   prove the point rather than assuming it.

6. **`REDIRECT_COUNTS.legacy` in the test suite**, 26 → 31, once those are
   added.

7. **Sitemap** needs no change. It is generated from the build, so the three
   pages join it automatically — 23 entries becomes 26. Worth asserting rather
   than assuming.

### Recommended

8. **A guard against the silent-breakage class.** Every hazard in this memo
   except HubSpot can arrive without a commit. A periodic check that fetches a
   production page and asserts zero third-party hosts and zero `Set-Cookie`
   would catch a dashboard toggle that no code review can see. Without it, the
   accuracy of the Privacy Policy depends on everyone remembering this memo.

9. **Note the review date on each page** once legal review happens, so the next
   person can tell how current the review is.
