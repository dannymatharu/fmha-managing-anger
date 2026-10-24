# Academy Neurodiversity Briefing Hub

Public static deployment at `/academy-nd-briefings/`, following the Pro Academy ND landing-page brand. The folder is self-contained and does not change other FMHA pages. The root `_redirects` rule serves individual shareable briefing URLs through this page.

Edit `source/template.html` and regenerate with `python academy-nd-briefings/source/build.py` from the repo root. `source/briefings.json` is the four-briefing fallback collection. The image is reused from the FMHA parent-course page.

## Content updates

On opening, the static page refreshes its public content from `https://fmha-academy-nd-briefings.dannymatharu.chatgpt.site/api/briefings`. This is a read-only public JSON feed with CORS enabled. If unavailable, the saved collection remains readable and a notice explains the fallback. Future entries therefore appear without a GitHub rebuild. Briefing paths use the scoped Netlify rewrite, including for future dates.

The Monday sending task publishes completed, fully logged email campaigns using the owner-authenticated Academy Neurodiversity Briefing Hub plugin. Its protected writer and R2 storage remain hosted on Sites; this static deployment contains no write credentials or recipient records. Both reading locations use the same live collection. The existing email link remains valid.

Brief dates identify the original research/email briefs, not their send dates. Published text is adapted from the approved email sections; internal planning notes are excluded. Every page includes research limits, sources, the primary ND training link and the supporting calculator link.

## Subscriptions and navigation

Each briefing has prominent Back to all briefings buttons above and below its content. A shared subscription box appears on the collection and individual briefings when the server confirms the connection is ready and enabled.

The secure subscription handler sends confirmation emails through Resend. A reader must explicitly confirm on the confirmation page before entering the weekly audience. Weekly briefings continue through the existing Gmail workflow. Signups, confirmation and the live state change were integration-tested on 24 October 2026. Invalid and expired tokens, duplicate requests, suppression handling and disabled configuration were also covered by local tests.

Runtime settings are managed privately in the hosting configuration. Do not put credentials, subscriber records, connection keys or private spreadsheet identifiers in this repository. The production build excludes server source, local scripts, source templates and private setup material from public static files.