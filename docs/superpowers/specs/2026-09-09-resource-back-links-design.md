# Resource back links

## Purpose

Delegates must be able to return to the resource hub from every supporting resource without relying on browser history.

## Scope

Add one clearly visible `← Back to resource hub` link near the top of each of the nine supporting resources:

- `FMHA_Chimp_Paradox.html`
- `FMHA_Code_of_Conduct.html`
- `FMHA_FA_Rules_Explained.html`
- `FMHA_Implementation_Guide.html`
- `FMHA_Junior_Player_Cards.html`
- `FMHA_Know_Your_Brain.html`
- `FMHA_Managing_Anger_Deck.html`
- `FMHA_Post_Incident_Kit.html`
- `FMHA_Sideline_Signals.html`

The resource hub itself is excluded because linking it back to itself adds noise without helping navigation. Existing footer and brand links remain unchanged.

## Behaviour

Each control is a normal anchor that points directly to `/fmha_resource_hub`. It must not call browser history, so delegates always return to the hub even when they opened a resource from email, messaging or another website.

The link text and accessible name are `Back to resource hub`. It remains visible and keyboard accessible at desktop and mobile widths. Printed versions hide the control because it has no value on paper.

## Presentation

Use the visual language already present on each resource rather than introducing a global stylesheet. Place the link in the top navigation or immediately below it, wherever the existing page structure allows a predictable top-of-page position. Keep the wording, arrow and destination identical across all nine files.

## Verification

An automated content test checks that every supporting resource contains exactly one top-of-page back-link contract with the expected text and destination. Existing hub tests must continue to pass. Browser checks cover keyboard focus, the destination URL, mobile visibility and the absence of console errors.
