import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => readFileSync(join(root, file), 'utf8');

test('every local HTML link on the hub resolves to a repository file', () => {
  const hub = read('FMHA_Resource_Hub.html');
  const links = [...hub.matchAll(/href="([^"#?]+\.html)"/gi)].map((match) => match[1]);

  assert.ok(links.length >= 9, 'the hub should expose at least nine local HTML tools');
  for (const link of links) {
    assert.ok(existsSync(join(root, link)), `missing linked file: ${link}`);
  }
});

test('the hub gives delegates a five-step follow-through route', () => {
  const hub = read('FMHA_Resource_Hub.html');
  for (const phrase of [
    'Tonight',
    'Before your next fixture',
    'Within seven days',
    'Before the next committee meeting',
    'After an incident',
  ]) {
    assert.ok(hub.includes(phrase), `hub route missing: ${phrase}`);
  }
});

test('the action and repair plan covers audit, commitments and restoration', () => {
  const guide = read('FMHA_Implementation_Guide.html');
  const required = [
    'Club Action and Repair Plan',
    'Clear Expectations',
    'Visible Leadership',
    'Consistent Consequences',
    'Proactive Communication',
    'Personal commitment',
    'Club commitment',
    'For someone else',
    'What happened?',
    'What were you thinking at the time?',
    'What have you thought about since?',
    'Who has been affected, and how?',
    'What needs to happen to make things right?',
    'Owner',
    'Target date',
    'Review date',
    'Print / Save PDF',
    'Clear this device',
    'localStorage',
  ];

  for (const phrase of required) assert.ok(guide.includes(phrase), `guide missing: ${phrase}`);
});

test('Sideline Signals limits pattern interruption to low-level escalation', () => {
  const signals = read('FMHA_Sideline_Signals.html');
  for (const phrase of [
    'Safe Pattern Interruption',
    'Disrupt the pattern, not the person',
    'levels 1 and 2',
    'Do you know where the toilets are?',
    'threats, discriminatory abuse or physical aggression',
  ]) {
    assert.ok(signals.includes(phrase), `Sideline Signals missing: ${phrase}`);
  }
});

test('Junior Player Cards includes Pause, Ask, Tell and adult guidance', () => {
  const cards = read('FMHA_Junior_Player_Cards.html');
  for (const phrase of [
    'Words Carry Weight',
    'Pause',
    'Ask',
    'Tell',
    "If you don't know what a word means, don't repeat it, post it or send it.",
    'Adult companion',
    'check understanding privately',
    'does not erase the harm',
  ]) {
    assert.ok(cards.includes(phrase), `Junior Player Cards missing: ${phrase}`);
  }
});

test('the post-incident kit supports records and people after an incident', () => {
  assert.ok(existsSync(join(root, 'FMHA_Post_Incident_Kit.html')), 'post-incident kit file is missing');
  const kit = read('FMHA_Post_Incident_Kit.html');
  for (const phrase of [
    'Post-Incident and Aftercare Kit',
    'Incident record',
    'Exact words or actions',
    'Support offered',
    'Young referee',
    'Welfare officer aftercare',
    'Review date',
    'Print / Save PDF',
    'Clear this device',
    'localStorage',
  ]) {
    assert.ok(kit.includes(phrase), `post-incident kit missing: ${phrase}`);
  }
});

test('device-only tools do not transmit entered information', () => {
  for (const file of ['FMHA_Implementation_Guide.html', 'FMHA_Post_Incident_Kit.html']) {
    assert.ok(existsSync(join(root, file)), `${file} is missing`);
    const html = read(file);
    assert.doesNotMatch(html, /\bfetch\s*\(/i, `${file} must not make network requests`);
    assert.doesNotMatch(html, /<form\b[^>]*\baction\s*=/i, `${file} must not submit a form`);
    assert.match(html, /stays on this device/i, `${file} must state the privacy model`);
  }
});

test('sensitive incident persistence is explicit and time-limited', () => {
  const kit = read('FMHA_Post_Incident_Kit.html');
  assert.match(kit, /Keep this draft on this device for up to 30 days/);
  assert.match(kit, /stored unencrypted/i);
  assert.match(kit, /if \(!remember\.checked\)/);
  assert.match(kit, /_expiresAt/);
});

test('the browser deck no longer contains identified unsupported absolutes', () => {
  const deck = read('FMHA_Managing_Anger_Deck.html');
  const removed = [
    '5,000 emotional reactions',
    '4× faster',
    '40% fewer',
    'It is never harmful',
    'Intentional — the person is choosing their behaviour',
    'reducing heart rate and cortisol',
    'significantly fewer repeat incidents',
  ];

  for (const phrase of removed) assert.ok(!deck.includes(phrase), `deck still contains: ${phrase}`);
});

test('Chimp resources describe a teaching model without fixed speed claims', () => {
  for (const file of ['FMHA_Managing_Anger_Deck.html', 'FMHA_Chimp_Paradox.html', 'FMHA_Know_Your_Brain.html', 'FMHA_Junior_Player_Cards.html']) {
    const html = read(file);
    assert.doesNotMatch(html, /\b[45](?:×|x) faster\b/i, `${file} still makes a fixed processing-speed claim`);
    assert.match(html, /teaching (?:label|model)/i, `${file} should explain the teaching-model boundary`);
  }
});

test('interactive disclosures expose keyboard and expanded state', () => {
  const signals = read('FMHA_Sideline_Signals.html');
  const cards = read('FMHA_Junior_Player_Cards.html');
  assert.equal((signals.match(/class="level-header" role="button" tabindex="0" aria-expanded="false"/g) || []).length, 5);
  assert.equal((cards.match(/class="scenario-card" role="button" tabindex="0" aria-expanded="false"/g) || []).length, 3);
  assert.match(signals, /event\.key === 'Enter' \|\| event\.key === ' '/);
  assert.match(cards, /event\.key === 'Enter' \|\| event\.key === ' '/);
});

test('the deck does not publish a stale static slide count', () => {
  const deck = read('FMHA_Managing_Anger_Deck.html');
  assert.doesNotMatch(deck, />\s*\d+ slides\s*[·<]/i);
});
