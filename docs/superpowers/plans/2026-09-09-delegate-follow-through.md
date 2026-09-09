# Delegate Follow-Through Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the Managing Anger hub into a device-only follow-through system with action planning, safe intervention guidance, child-friendly language support and post-incident aftercare.

**Architecture:** Keep the repository's standalone HTML architecture. Each tool owns its markup, styles and small script. User-entered content is stored only in browser `localStorage`, can be cleared, and can be printed or saved as PDF; no entered content is transmitted.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js built-in test runner, GitHub Pages/custom-domain deployment.

---

## File structure

- `FMHA_Resource_Hub.html`: Start Here pathway and updated tool inventory.
- `FMHA_Implementation_Guide.html`: Four Pillars audit, commitments matrix and restorative planning.
- `FMHA_Sideline_Signals.html`: Safe Pattern Interruption guidance.
- `FMHA_Junior_Player_Cards.html`: Words Carry Weight child card and adult response.
- `FMHA_Post_Incident_Kit.html`: Device-only incident record and aftercare tool.
- `FMHA_Managing_Anger_Deck.html`: Evidence and wording corrections in the browser reference deck.
- `tests/hub-content.test.mjs`: Static link, privacy, content and risk-regression checks.

### Task 1: Create failing content and privacy checks

**Files:**
- Create: `tests/hub-content.test.mjs`

- [ ] Write tests using `node:test`, `node:assert/strict`, `node:fs` and `node:path`. Assert that the hub links to every local HTML file it names; the new post-incident file exists; the implementation guide contains the Four Pillars, three commitments, five restorative questions, owner, date, review, print, clear and `localStorage`; Sideline Signals contains the low-level-only pattern-interruption boundary; Junior Player Cards contains Pause, Ask and Tell; the new kit contains young-referee and welfare-officer aftercare; device-only tools contain neither `fetch(` nor a form `action=`; and identified unsupported claims are absent from the browser deck.

- [ ] Run `node --test tests/hub-content.test.mjs`.

Expected: FAIL because the new content and file do not exist yet.

- [ ] Commit with `git add tests/hub-content.test.mjs && git commit -m "test: define delegate follow-through requirements"`.

### Task 2: Build the combined Club Action and Repair Plan

**Files:**
- Modify: `FMHA_Implementation_Guide.html`
- Test: `tests/hub-content.test.mjs`

- [ ] Replace the static four-block page with semantic sections for privacy notice, Four Pillars audit, three commitments, restorative questions, reporting boundary and review.

- [ ] Add labelled form controls for status, evidence, action, owner and target date for each pillar. Add commitment fields for personal, club and someone else, each with first step, completion evidence and review date.

- [ ] Add these restorative prompts verbatim: `What happened?`, `What were you thinking at the time?`, `What have you thought about since?`, `Who has been affected, and how?`, and `What needs to happen to make things right?`.

- [ ] Add device-only persistence under one namespaced local-storage key, an explicit privacy message, a `Clear this device` button with an in-page confirmation step, and `Print / Save PDF` using `window.print()`.

- [ ] Run `node --test tests/hub-content.test.mjs` and confirm the guide assertions pass while later tasks remain failing.

- [ ] Commit with `git add FMHA_Implementation_Guide.html tests/hub-content.test.mjs && git commit -m "feat: turn implementation guide into action and repair plan"`.

### Task 3: Add Safe Pattern Interruption

**Files:**
- Modify: `FMHA_Sideline_Signals.html`
- Test: `tests/hub-content.test.mjs`

- [ ] Add a section titled `Safe Pattern Interruption` before the escalation ladder. Explain `Disrupt the pattern, not the person` and limit the technique to levels 1 and 2.

- [ ] Add neutral prompts including `Can you help me with something for a second?`, `Do you know where the toilets are?`, `What time did this match kick off?`, `Can you stand over here with me?`, and `Could you give me a hand with the equipment?`.

- [ ] Add the safety switch: threats, discriminatory abuse or physical aggression require distance, referee or club-official involvement, recording and reporting rather than direct interruption.

- [ ] Run `node --test tests/hub-content.test.mjs` and confirm the Sideline Signals assertions pass.

- [ ] Commit with `git add FMHA_Sideline_Signals.html tests/hub-content.test.mjs && git commit -m "feat: add safe pattern interruption guidance"`.

### Task 4: Add Words Carry Weight

**Files:**
- Modify: `FMHA_Junior_Player_Cards.html`
- Test: `tests/hub-content.test.mjs`

- [ ] Add a sixth navigation tab and card titled `Words Carry Weight`.

- [ ] Give children the exact route `Pause`, `Ask`, `Tell` and the core instruction `If you don't know what a word means, don't repeat it, post it or send it. Ask a trusted adult.`

- [ ] Add an adult companion that says to stop the language calmly, support the person targeted, check understanding privately, explain impact without public humiliation, record exact words and follow club, County FA or safeguarding procedures.

- [ ] State that lack of understanding may change the educational response but does not erase harm or automatically remove reporting duties.

- [ ] Run `node --test tests/hub-content.test.mjs` and confirm the Junior Player Cards assertions pass.

- [ ] Commit with `git add FMHA_Junior_Player_Cards.html tests/hub-content.test.mjs && git commit -m "feat: add words carry weight player guidance"`.

### Task 5: Build the Post-Incident and Aftercare Kit

**Files:**
- Create: `FMHA_Post_Incident_Kit.html`
- Test: `tests/hub-content.test.mjs`

- [ ] Build a responsive page in the established FMHA visual system with privacy notice, immediate safety checks, incident record, affected-person support, young-referee support, welfare-officer aftercare, restorative follow-up and review sections.

- [ ] Include labelled fields for date, fixture, time, location, exact words or actions, people involved, witnesses, immediate response, support offered, reporting route, owner, outcome and review date.

- [ ] Add explicit boundaries for emergency risk, children, threats, discrimination, physical contact and safeguarding. State that the page does not replace FA, County FA, safeguarding, police or emergency procedures.

- [ ] Add device-only `localStorage`, clear-device confirmation and Print or Save PDF. Include no network submission.

- [ ] Run `node --test tests/hub-content.test.mjs` and confirm the kit assertions pass.

- [ ] Commit with `git add FMHA_Post_Incident_Kit.html tests/hub-content.test.mjs && git commit -m "feat: add post-incident and aftercare kit"`.

### Task 6: Turn the hub into a follow-through route

**Files:**
- Modify: `FMHA_Resource_Hub.html`
- Test: `tests/hub-content.test.mjs`

- [ ] Add a Start Here section with `Tonight`, `Before your next fixture`, `Within seven days`, and `Before the next committee meeting` steps.

- [ ] Link the steps to the action plan, Sideline Signals and post-incident kit. Update the implementation-guide card title and description. Add the post-incident card. Update the interactive-tool count.

- [ ] Run `node --test tests/hub-content.test.mjs` and confirm the hub-link assertions pass.

- [ ] Commit with `git add FMHA_Resource_Hub.html tests/hub-content.test.mjs && git commit -m "feat: add delegate follow-through route"`.

### Task 7: Correct risky claims in the browser reference deck

**Files:**
- Modify: `FMHA_Managing_Anger_Deck.html`
- Test: `tests/hub-content.test.mjs`

- [ ] Remove the unsourced `5,000 emotional reactions`, fixed `4×` processing multiplier and `40% fewer` incident claim. Replace them with bounded Chimp-model language that distinguishes a teaching model from a literal neurological map.

- [ ] Replace the anger-versus-overload binary with observable, non-diagnostic descriptions. Remove `It is never harmful` and advise reducing pressure while retaining safety and safeguarding judgement.

- [ ] Replace claims that one breath reduces cortisol and that structured reviews demonstrably reduce repeat incidents with modest, practice-focused wording.

- [ ] Add a short references and review note pointing delegates to current FA safeguarding, reporting and aggravated-breach guidance and identifying the Chimp Paradox as the course's teaching model.

- [ ] Run `node --test tests/hub-content.test.mjs` and confirm all tests pass.

- [ ] Commit with `git add FMHA_Managing_Anger_Deck.html tests/hub-content.test.mjs && git commit -m "fix: tighten evidence and safety wording in hub deck"`.

### Task 8: Browser, accessibility and deployment verification

**Files:**
- Modify only if verification finds defects in the scoped hub files.

- [ ] Serve the repository locally and open the hub at desktop and mobile widths.

- [ ] Verify keyboard navigation, visible focus, labelled controls, save-after-refresh, clear-device confirmation, print controls, no console errors and every hub link.

- [ ] Review the diff for accidental changes and run `node --test tests/hub-content.test.mjs` one final time.

- [ ] Push the tested commits to `main`, verify the GitHub Pages deployment, then verify the live custom-domain hub and each new or changed tool.
