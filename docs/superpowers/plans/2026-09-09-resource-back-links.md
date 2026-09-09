# Resource Back Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every supporting FMHA resource a visible, reliable route back to the resource hub.

**Architecture:** Each standalone HTML resource owns a small `.hub-back-link` anchor and matching page-local styles. Every anchor uses the same text and root-relative destination, while its placement fits the page's existing header or full-screen deck shell. A single Node content test enforces coverage across all nine resources.

**Tech Stack:** Static HTML, CSS, Node.js built-in test runner

---

### Task 1: Define the navigation contract in a failing test

**Files:**
- Modify: `tests/hub-content.test.mjs`

- [ ] **Step 1: Add the failing coverage test**

Add this resource list and test:

```js
const supportingResources = [
  'FMHA_Chimp_Paradox.html',
  'FMHA_Code_of_Conduct.html',
  'FMHA_FA_Rules_Explained.html',
  'FMHA_Implementation_Guide.html',
  'FMHA_Junior_Player_Cards.html',
  'FMHA_Know_Your_Brain.html',
  'FMHA_Managing_Anger_Deck.html',
  'FMHA_Post_Incident_Kit.html',
  'FMHA_Sideline_Signals.html',
];

test('every supporting resource has one explicit route back to the hub', () => {
  for (const filename of supportingResources) {
    const html = read(filename);
    const links = html.match(/<a\b[^>]*class="[^"]*hub-back-link[^"]*"[^>]*>/gi) ?? [];
    assert.equal(links.length, 1, `${filename} should contain one hub back link`);
    assert.match(links[0], /href="\/fmha_resource_hub"/i, `${filename} should link directly to the hub`);
    assert.match(html, />\s*←\s*Back to resource hub\s*<\/a>/i, `${filename} should use the agreed label`);
  }
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test --test-name-pattern="explicit route back" tests/hub-content.test.mjs`

Expected: FAIL on the first resource because `.hub-back-link` does not exist.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/hub-content.test.mjs
git commit -m "test: require hub links on every resource"
```

### Task 2: Add the back link to all nine resources

**Files:**
- Modify: `FMHA_Chimp_Paradox.html`
- Modify: `FMHA_Code_of_Conduct.html`
- Modify: `FMHA_FA_Rules_Explained.html`
- Modify: `FMHA_Implementation_Guide.html`
- Modify: `FMHA_Junior_Player_Cards.html`
- Modify: `FMHA_Know_Your_Brain.html`
- Modify: `FMHA_Managing_Anger_Deck.html`
- Modify: `FMHA_Post_Incident_Kit.html`
- Modify: `FMHA_Sideline_Signals.html`

- [ ] **Step 1: Add the identical semantic link to each page**

Place this anchor inside the existing top header when one exists. On the reference deck, place it immediately inside `<body>` so it sits above the slide shell.

```html
<a class="hub-back-link" href="/fmha_resource_hub">← Back to resource hub</a>
```

- [ ] **Step 2: Add page-local visual and print styles**

Adapt colour variables to each page, but retain this interaction contract:

```css
.hub-back-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 14px;
  border: 1px solid currentColor;
  border-radius: 999px;
  color: inherit;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}
.hub-back-link:hover { opacity: .78; }
.hub-back-link:focus-visible { outline: 3px solid #f4b942; outline-offset: 3px; }
@media print { .hub-back-link { display: none !important; } }
```

The deck version also receives `position: fixed; top: 14px; left: 14px; z-index: 1000;` and a dark translucent background so it stays usable over every slide.

- [ ] **Step 3: Run the focused test and verify success**

Run: `node --test --test-name-pattern="explicit route back" tests/hub-content.test.mjs`

Expected: PASS.

- [ ] **Step 4: Run the full content suite and syntax check**

Run: `node --test tests/hub-content.test.mjs`

Expected: all tests pass.

Run: `git diff --check`

Expected: no output and exit code 0.

- [ ] **Step 5: Commit the implementation**

```bash
git add FMHA_Chimp_Paradox.html FMHA_Code_of_Conduct.html FMHA_FA_Rules_Explained.html FMHA_Implementation_Guide.html FMHA_Junior_Player_Cards.html FMHA_Know_Your_Brain.html FMHA_Managing_Anger_Deck.html FMHA_Post_Incident_Kit.html FMHA_Sideline_Signals.html
git commit -m "feat: add hub navigation to every resource"
```

### Task 3: Browser verification and publishing

**Files:**
- Verify only: all nine resource HTML files

- [ ] **Step 1: Serve the branch locally**

Run: `python3 -m http.server 4173`

Expected: local server listens on port 4173.

- [ ] **Step 2: Check representative page structures**

Verify one standard header page, the Junior Player Cards layout, the Code of Conduct topbar and the full-screen deck at desktop and mobile widths. In every case the link must be visible, reachable by keyboard and point to `/fmha_resource_hub`. Check that no console errors were introduced.

- [ ] **Step 3: Review the final diff**

Run: `git diff main...HEAD --stat && git diff --check main...HEAD`

Expected: nine resource files, the test and planning documents are present; the whitespace check passes.

- [ ] **Step 4: Push, open a pull request and wait for repository checks**

```bash
git push -u origin feature/resource-back-links
```

Create a PR titled `Add a reliable hub link to every resource`. Merge only after all required checks pass.

- [ ] **Step 5: Verify the production pages**

Open all nine custom-domain routes and confirm the rendered `Back to resource hub` link targets `https://assets.thefmha.com/fmha_resource_hub`.
