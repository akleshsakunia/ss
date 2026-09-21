/* Script Studio — manual mode, no backend.
 *
 * Manual mode never calls a model: it hands you a prompt, you run it in whatever chat you like, and
 * paste the reply back. That is pure string work, so the whole thing runs in the browser and can be
 * served as static files. This is a port of parser.py, the placeholder resolver and the gate logic.
 *
 * What is not here, because it needs a server: the auto and hybrid workflows (they call Gemini) and
 * the deterministic number check (it fetches pages, which CORS blocks from a browser).
 */
const WORKFLOWS = ['optimal-sneakleshow-v1-event-manual', 'optimal-sneakleshow-v1-stock-manual'];
const LS_RUNS = 'ss.runs.v1';
const KEEP_RUNS = 7;   // "my last week of ideas", not an archive

const $ = id => document.getElementById(id);
const esc = s => (s || '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

/* ============================ workflow parsing (port of parser.py) ============================ */
const STAGE_RE = /^\s*stage\s+(\d+)\s*[:\-–—.]\s*(.+?)\s*$/i;
const META_RE = /^\s*(EMITS|GATE|TOOLS|MODEL|TEMPERATURE|TITLE|PROVIDER|THINKING|OPTIONAL)\s*:\s*(.*?)\s*$/i;
const HEAD_RE = /^\s*(WORKFLOW|DESCRIPTION|INPUT|ALIAS)\s*:\s*(.*?)\s*$/i;
const SEP_RE = /^\s*-{3,}\s*$/;
const PLACEHOLDER_RE = /\{\{\s*([A-Z0-9_]+)\s*\}\}/g;

function parseGate(raw) {
  raw = (raw || '').trim();
  if (!raw || ['none', 'no', 'false', '-'].includes(raw.toLowerCase())) return null;
  const m = raw.match(/(pick-one|pick-many|approve-edit)\s*(?:-+>\s*([A-Z0-9_]+))?/i);
  if (!m) return null;
  return { mode: m[1].toLowerCase(), target: (m[2] || '').toUpperCase() || null };
}

function parseInput(raw) {
  const b = raw.split('|').map(x => x.trim());
  return {
    name: b[0].toUpperCase(),
    label: b[1] || b[0].replace(/_/g, ' '),
    required: b.length > 2 ? /^req/i.test(b[2]) : false,
    kind: (b.length > 3 && b[3] ? b[3].toLowerCase() : 'textarea'),
  };
}

function parseWorkflow(id, text) {
  const lines = text.split(/\r?\n/);
  const wf = { id, name: id, description: '', inputs: [], aliases: {}, stages: [] };
  let i = 0;
  for (; i < lines.length && !STAGE_RE.test(lines[i]); i++) {
    const h = lines[i].match(HEAD_RE);
    if (!h) continue;
    const key = h[1].toUpperCase(), val = h[2];
    if (key === 'WORKFLOW') wf.name = val;
    else if (key === 'DESCRIPTION') wf.description = val;
    else if (key === 'INPUT') wf.inputs.push(parseInput(val));
    else if (key === 'ALIAS' && val.includes('=')) {
      const [a, b] = val.split('=');
      wf.aliases[a.trim().toUpperCase()] = b.trim().toUpperCase();
    }
  }
  let cur = null, inBody = false;
  for (const line of lines.slice(i)) {
    const s = line.match(STAGE_RE);
    if (s) {
      if (cur) wf.stages.push(cur);
      cur = { number: +s[1], name: s[2].trim(), emits: [], gate: null, provider: null,
              optional: false, body: [] };
      inBody = false;
      continue;
    }
    if (!cur) continue;
    if (!inBody) {
      if (SEP_RE.test(line)) { inBody = true; continue; }
      const m = line.match(META_RE);
      if (m) {
        const key = m[1].toUpperCase(), val = m[2];
        if (key === 'EMITS') cur.emits = val.split(',').map(v => v.trim().toUpperCase()).filter(Boolean);
        else if (key === 'GATE') cur.gate = parseGate(val);
        else if (key === 'OPTIONAL') cur.optional = ['yes', 'true', '1'].includes((val || '').trim().toLowerCase());
        else if (key === 'PROVIDER') cur.provider = (val || '').trim().toLowerCase();
        else if (key === 'TITLE') cur.name = val || cur.name;
        continue;
      }
      if (!line.trim()) continue;
      inBody = true;
    }
    cur.body.push(line);
  }
  if (cur) wf.stages.push(cur);
  for (const st of wf.stages) {
    st.prompt = st.body.join('\n').trim();
    delete st.body;
    if (!st.emits.length) st.emits = [`STAGE${st.number}_OUTPUT`];
  }
  wf.stages.sort((a, b) => a.number - b.number);
  return wf;
}

/* ============================ context the engine supplies ============================ */
function lengthTargets() {
  const wpm = +($('wpm').value) || 135, mins = +($('mins').value) || 6;
  const words = Math.round(wpm * mins / 10) * 10;
  return { WPM: String(wpm), VIDEO_MINUTES: String(mins), TARGET_WORDS: String(words),
           HOOK_SECONDS: '15', HOOK_WORDS: String(Math.round(wpm / 4)),
           GROUND_SECONDS: '25', GROUND_WORDS: String(Math.round(wpm * 5 / 12)),
           TARGET_MIN: String(Math.round(words * 0.92 / 10) * 10),
           TARGET_MAX: String(Math.round(words * 1.08 / 10) * 10) };
}

// Indian fiscal year: FY27 is April 2026 - March 2027, and Q1 is the April-June quarter.
function nowContext() {
  const d = new Date();
  const mo = d.getMonth() + 1, fy = mo >= 4 ? d.getFullYear() + 1 : d.getFullYear();
  const q = Math.floor(((mo - 4 + 12) % 12) / 3) + 1;
  const span = { 1: 'Apr-Jun', 2: 'Jul-Sep', 3: 'Oct-Dec', 4: 'Jan-Mar' }[q];
  const start = mo >= 4 ? d.getFullYear() : d.getFullYear() - 1;
  const yr = q <= 3 ? start : start + 1;
  const pad = n => String(n % 100).padStart(2, '0');
  return {
    TODAY: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
    CURRENT_QUARTER: `Q${q} FY${pad(fy)} (${span} ${yr})`,
    NEXT_QUARTER: `Q${q % 4 + 1} FY${pad(fy + (q === 4 ? 1 : 0))}`,
  };
}

const URL_RE = /https?:\/\/[^\s)\]>"']+/g;
function references(ctx) {
  const seen = new Set(), out = [];
  for (const m of (ctx.RESEARCH || '').matchAll(URL_RE)) {
    const u = m[0].replace(/[.,;]+$/, '');
    if (!seen.has(u)) { seen.add(u); out.push(`(from the research) - ${u}`); }
  }
  return out.slice(0, 20).join('\n');
}

function resolve(text, ctx, aliases) {
  return text.replace(PLACEHOLDER_RE, (_, name) => {
    name = name.toUpperCase();
    if (ctx[name] && String(ctx[name]).trim()) return String(ctx[name]);
    const t = aliases[name];
    if (t && ctx[t] && String(ctx[t]).trim()) return String(ctx[t]);
    return `[NOT PROVIDED: ${name}]`;
  });
}

const OPTIONS_CONTRACT = `

---
MACHINE BLOCK (required, in addition to everything above)
After your full response, output this exact block last:
===OPTIONS===
\`\`\`json
{"options": [{"id": "1", "label": "short label", "detail": "2-3 sentence summary"}]}
\`\`\`
List every distinct choice you are offering the human, in the order you presented them.`;

const FIELDS_CONTRACT = `

---
MACHINE BLOCK (required, in addition to everything above)
After your full response, output this exact block last:
===FIELDS===
\`\`\`json
{%s}
\`\`\`
Fill each key with that section's content as plain text.`;

/* ============ reading a pasted reply, whatever chat it came from (port of engine.py) ============ */
function extractBlock(text, marker) {
  if (!text) return null;
  const bare = marker.replace(/=/g, '').trim();
  const pat = new RegExp(`(?:^|\\n)[#*\\s>]*=*\\s*${bare}\\s*=*[#*\\s]*(?=\\n|$)`, 'gi');
  const hits = [...text.matchAll(pat)];
  const tail = hits.length ? text.slice(hits[hits.length - 1].index + hits[hits.length - 1][0].length) : text;
  let cands = [...tail.matchAll(/```[a-zA-Z]*\s*([\s\S]*?)```/g)].map(m => m[1]);
  cands.push(tail);
  if (!hits.length) cands = [...text.matchAll(/```[a-zA-Z]*\s*([\s\S]*?)```/g)].map(m => m[1]).concat([text]);
  for (let raw of cands) {
    raw = (raw || '').trim();
    if (!raw) continue;
    const braced = raw.match(/\{[\s\S]*\}/);
    for (const attempt of [raw, braced ? braced[0] : null]) {
      if (!attempt) continue;
      for (const fixed of [attempt, attempt.replace(/[\u201c\u201d]/g, '"').replace(/[\u2018\u2019]/g, "'")]) {
        try { const o = JSON.parse(fixed); if (o && typeof o === 'object' && !Array.isArray(o)) return o; }
        catch (e) { /* try the next candidate */ }
      }
    }
  }
  return null;
}

// Real thesis output comes back as "### Thesis 1: <title>" far more often than a numbered list, and
// a loose numeric pattern happily matches dates and table cells - on real documents it returned
// "2025" and "July 20, 2026" as choices. Headings first, lists only as a fallback, junk filtered.
const OPT_HEAD = /^[#*\s>]*(?:thesis|option|direction|candidate|angle)\s*#?(\d{1,2})\b[\s:.\-–—)]*(.*)$/i;
const OPT_LINE = /^\s*(\d{1,2})[.):\-]\s+[*_#]{0,3}\s*(.{6,90}?)\s*[*_]{0,3}\s*(?:[-–—:]\s*(.*))?$/;
const JUNK = /^(?:\d[\d,./ ]*|(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+\d.*|q[1-4]\b.*|fy\d+.*|\W*)$/i;
const clean = x => (x || '').replace(/[*_`#]+/g, '').replace(/^[\s:\-–—]+|[\s:\-–—]+$/g, '');
const okLabel = l => !!l && l.length >= 6 && !JUNK.test(l) && /[A-Za-z]{3}/.test(l);

function optionsFromText(text, limit = 6) {
  if (!text) return [];
  const lines = text.split('\n');

  // 1. headings - the shape these documents actually use
  const out = [], seen = new Set();
  for (let i = 0; i < lines.length && out.length < limit; i++) {
    const m = lines[i].match(OPT_HEAD);
    if (!m) continue;
    let label = clean(m[2]);
    if (!label) label = clean(lines.slice(i + 1, i + 3).find(l => l.trim()) || '');
    if (!okLabel(label) || seen.has(label.toLowerCase())) continue;
    seen.add(label.toLowerCase());
    const detail = [];
    for (const l of lines.slice(i + 1)) {
      if (OPT_HEAD.test(l) || /^[#*\s>]*#{2,}\s/.test(l)) break;
      if (l.trim() && !l.trimStart().startsWith('|')) detail.push(clean(l));
      if (detail.join(' ').length > 300) break;
    }
    out.push({ id: m[1], label: label.slice(0, 110), detail: detail.join(' ').slice(0, 400) });
  }
  if (out.length >= 2) return out;

  // 2. numbered list, only where the headings gave us nothing usable
  const m = text.match(/(?:^|\n)[#*\s>]*[^\n]{0,60}(THESIS|OPTION|DIRECTION|CANDIDATE)[^\n]{0,60}\n/i);
  const region = m ? text.slice(m.index + m[0].length) : text;
  const out2 = [], seen2 = new Set();
  for (const line of region.split('\n')) {
    if (line.trimStart().startsWith('|')) continue;      // table rows are data, not choices
    const mm = line.match(OPT_LINE);
    if (!mm) continue;
    let label = clean(mm[2]).replace(/^(?:option|thesis)\s*\d*\s*[:.\-–—]?\s*/i, '').trim();
    if (!okLabel(label) || seen2.has(label.toLowerCase())) continue;
    seen2.add(label.toLowerCase());
    out2.push({ id: mm[1], label: label.slice(0, 110), detail: clean(mm[3]).slice(0, 400) });
    if (out2.length >= limit) break;
  }
  return out2.length > out.length ? out2 : out;
}

function spokenScript(pkg) {
  if (!pkg) return '';
  let t = pkg.replace(/^#+ *Finalizer\s*\n/, '').trim();
  const m = t.match(/^[ \t]*(?:#+\s*)?(?:FINAL|REVISED)\s+SCRIPT[ \t]*$/mi);
  if (m) t = t.slice(m.index + m[0].length);
  const end = t.match(/^[ \t]*(?:#+\s*)?(?:CTA OPTIONS|TITLE OPTIONS|THUMBNAIL TEXT|PRODUCTION NOTES|CHANGE LOG|REVIEW FLAGS|RUN FLAGS|SOURCES|WORD COUNT)\b/mi);
  if (end) t = t.slice(0, end.index);
  return t.trim();
}

function packageSection(pkg, head) {
  if (!pkg) return '';
  const m = pkg.match(new RegExp(`^[ \\t]*(?:#+\\s*)?(?:${head})(?:\\s*[-–—:]\\s*[A-Z][A-Z ]*)?[ \\t]*$`, 'm'));
  if (!m) return '';
  const rest = pkg.slice(m.index + m[0].length);
  const nxt = rest.match(/^[ \t]*(?:#+\s*)?(?:FINAL SCRIPT|CTA OPTIONS|TITLE OPTIONS|THUMBNAIL TEXT|PRODUCTION NOTES|SOURCES|REVIEW FLAGS|RUN FLAGS|CHANGE LOG)\b/mi);
  return (nxt ? rest.slice(0, nxt.index) : rest).trim();
}

/* ============================ tiny markdown renderer ============================ */
function md(src) {
  return esc(src || '').replace(/\r/g, '').split(/\n{2,}/).map(b => {
    b = b.trim(); if (!b) return '';
    const inline = t => t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                         .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
                         .replace(/`([^`]+)`/g, '<code>$1</code>');
    if (/^#{1,6}\s/.test(b)) return '<h3>' + inline(b.replace(/^#{1,6}\s*/, '')) + '</h3>';
    if (/^(---|___|\*\*\*)$/.test(b)) return '<hr>';
    const L = b.split('\n');
    if (L.every(l => /^\s*[-*•]\s+/.test(l)))
      return '<ul>' + L.map(l => '<li>' + inline(l.replace(/^\s*[-*•]\s+/, '')) + '</li>').join('') + '</ul>';
    if (L.every(l => /^\s*\d+[.)]\s+/.test(l)))
      return '<ol>' + L.map(l => '<li>' + inline(l.replace(/^\s*\d+[.)]\s*/, '')) + '</li>').join('') + '</ol>';
    if (L.length === 1 && /^[A-Z0-9 ,\-—&/()]{4,60}$/.test(b)) return '<h3>' + inline(b) + '</h3>';
    return '<p>' + inline(L.join('<br>')) + '</p>';
  }).join('');
}

/* ============================ runs, kept in localStorage ============================ */
function loadRuns() {
  try { return JSON.parse(localStorage.getItem(LS_RUNS) || '[]'); } catch (e) { return []; }
}
function saveRun(run) {
  let runs = loadRuns().filter(r => r.id !== run.id);
  runs.unshift(run);
  runs = runs.slice(0, KEEP_RUNS);          // last few ideas, not an archive
  for (const r of runs) delete r.outputs;   // legacy: a byte-for-byte duplicate of ctx, never read

  // A phone gives this site about 5MB, and one research-heavy run is a few hundred KB of pasted
  // text, so a full history CAN hit the wall. Dropping the run just finished is the worst possible
  // answer: shed the OLDEST instead, and keep shedding until the newest fits.
  const wanted = runs.length;
  while (runs.length) {
    try {
      localStorage.setItem(LS_RUNS, JSON.stringify(runs));
      if (runs.length < wanted)
        note(`Storage was full, so the ${wanted - runs.length} oldest run(s) were dropped to make `
           + `room for this one.`);
      paintRuns();
      return;
    } catch (e) {
      runs.pop();
    }
  }
  note('Could not save this run — this phone has no storage left for this site, or is blocking it.');
  paintRuns();
}
function dropRun(id) {
  try { localStorage.setItem(LS_RUNS, JSON.stringify(loadRuns().filter(r => r.id !== id))); } catch (e) {}
  paintRuns();
}

/* ============================ state ============================ */
let WFS = {}, RUN = null;

function newRun(wfId, topic, inputs) {
  return { id: 'r' + Date.now().toString(36), wf: wfId, topic, inputs,
           ctx: Object.assign({}, inputs), stage: 0, pendingChoice: null,
           updated: Date.now() };
}

/* ============================ the run loop ============================ */
function curWf() { return WFS[RUN.wf]; }
function curStage() { const w = curWf(); return RUN.stage < w.stages.length ? w.stages[RUN.stage] : null; }

function buildPrompt(stage) {
  const wf = curWf();
  const ctx = Object.assign({}, RUN.ctx, lengthTargets(), nowContext(), {
    REFERENCES: references(RUN.ctx),
    // No server here, so the deterministic check cannot run: say so rather than let the finalizer
    // invent a clean bill of health for figures nothing verified.
    NUMBER_CHECK: 'No automated number check ran (this is the browser-only build, which cannot fetch '
      + 'pages). Treat every figure as unverified: list each one and say what to check.',
    SOURCES_USED: references(RUN.ctx), REVIEW_FLAGS: 'None - manual run.',
  });
  let p = resolve(stage.prompt, ctx, wf.aliases);
  if (stage.gate && ['pick-one', 'pick-many'].includes(stage.gate.mode)) p += OPTIONS_CONTRACT;
  if (stage.emits.length > 1)
    p += FIELDS_CONTRACT.replace('%s', stage.emits.map(e => `"${e}": ""`).join(', '));
  return p;
}

function submitPaste(value) {
  const stage = curStage();
  RUN.ctx[stage.emits[0]] = value;
  // a stage emitting several variables ships them in a ===FIELDS=== block
  if (stage.emits.length > 1) {
    const f = extractBlock(value, '===FIELDS===') || {};
    for (const e of stage.emits) RUN.ctx[e] = (typeof f[e] === 'string' && f[e].trim()) ? f[e] : value;
  }
  // a pick-one stage is only half done at the paste: chain into the choice
  if (stage.gate && ['pick-one', 'pick-many'].includes(stage.gate.mode)) {
    const blk = extractBlock(value, '===OPTIONS===') || {};
    RUN.pendingChoice = { target: stage.gate.target, mode: stage.gate.mode,
                          options: blk.options || optionsFromText(value) };
    RUN.updated = Date.now(); saveRun(RUN); render(); return;
  }
  RUN.stage++; RUN.updated = Date.now(); saveRun(RUN); render();
}

function submitChoice(value) {
  RUN.ctx[RUN.pendingChoice.target] = value;
  RUN.pendingChoice = null;
  RUN.stage++; RUN.updated = Date.now(); saveRun(RUN); render();
}

async function copy(text, msgEl, label) {
  try { await navigator.clipboard.writeText(text); }
  catch (e) {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e2) {
      msgEl.textContent = 'Copy blocked — long-press the box and copy manually.'; ta.remove(); return;
    }
    ta.remove();
  }
  msgEl.textContent = label + ' copied';
  setTimeout(() => { if (msgEl.textContent === label + ' copied') msgEl.textContent = ''; }, 2500);
}

/* ============================ rendering ============================ */
function note(t) { const n = $('note'); n.textContent = t; n.classList.toggle('hide', !t); }

function paintRuns() {
  const runs = loadRuns();
  $('runs').innerHTML = runs.length ? runs.map(r => {
    const w = WFS[r.wf];
    const total = w ? w.stages.length : 7;
    const done = r.stage >= total;
    return `<div class="topic">
      <div><a onclick="openRun('${r.id}')">${esc(r.topic || 'untitled')}</a>
      <div class="muted">${done ? 'finished' : 'stage ' + (r.stage + 1) + ' of ' + total} ·
        ${w ? esc(w.name.replace(/^Optimal Sneakleshow v1 - /, '')) : r.wf}</div></div>
      <button class="icon" onclick="dropRun('${r.id}')" aria-label="Delete ${esc(r.topic)}"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg></button></div>`;
  }).join('') : `<div class="empty">Nothing yet. Your last ${KEEP_RUNS} runs stay on this phone.</div>`;
}

function openRun(id) {
  const r = loadRuns().find(x => x.id === id);
  if (!r) return;
  RUN = r; render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startNew() {
  const wfId = $('wf').value, topic = $('topic').value.trim();
  if (!topic) { note('Give it a topic name first.'); return; }
  const inputs = {};
  let missing = null;
  document.querySelectorAll('.in').forEach(e => {
    inputs[e.dataset.n] = e.value.trim();
    if (e.dataset.req === '1' && !e.value.trim()) missing = missing || e.dataset.label;
  });
  if (missing) { note(`"${missing}" is required.`); return; }
  note('');
  RUN = newRun(wfId, topic, inputs);
  saveRun(RUN); render();
}

function resetToForm() { RUN = null; render(); }

function pickWorkflow() {
  const w = WFS[$('wf').value];
  if (!w) return;
  $('wfdesc').textContent = w.description || '';
  $('inputs').innerHTML = w.inputs.map(i => `
    <label>${esc(i.label)} ${i.required ? '<span class="req">*</span>' : '<span class="muted">(optional)</span>'}</label>
    ${i.kind === 'text'
      ? `<input class="in" data-n="${i.name}" data-req="${i.required ? 1 : 0}" data-label="${esc(i.label)}">`
      : `<textarea class="in" data-n="${i.name}" data-req="${i.required ? 1 : 0}" data-label="${esc(i.label)}"></textarea>`}`).join('');
}

function render() {
  paintRuns();
  const onForm = !RUN;
  $('startcard').classList.toggle('hide', !onForm);
  $('stepcard').classList.toggle('hide', onForm);
  $('donecard').classList.add('hide');
  $('newbtn').classList.toggle('hide', onForm);
  if (onForm) { $('stagebar').innerHTML = ''; return; }

  const wf = curWf();
  if (!wf) { note('That workflow is no longer available.'); RUN = null; return render(); }
  const total = wf.stages.length;

  $('stagebar').innerHTML = wf.stages.map((s, i) => {
    const cls = i < RUN.stage ? 'done' : (i === RUN.stage ? 'now' : '');
    return `<span class="pip ${cls}" title="${esc(s.name)}">${s.number}</span>`;
  }).join('');

  // finished
  if (RUN.stage >= total) {
    const pkg = RUN.ctx.FINAL_SCRIPT_PACKAGE || RUN.ctx.REVISED_SCRIPT || '';
    const script = spokenScript(pkg) || pkg;
    const words = script.trim().split(/\s+/).filter(Boolean).length;
    $('stepcard').classList.add('hide');
    $('donecard').classList.remove('hide');
    $('doneTitle').textContent = RUN.topic;
    $('doneMeta').textContent = `${words} words ≈ ${(words / (+$('wpm').value || 135)).toFixed(1)} min`;
    $('scriptbody').innerHTML = md(script);
    window.__parts = {
      script, package: pkg,
      sources: packageSection(pkg, 'SOURCES') || references(RUN.ctx),
    };
    return;
  }

  const stage = curStage();
  const choice = RUN.pendingChoice;
  $('stepNum').textContent = `Step ${RUN.stage + 1} of ${total}`;
  $('stepName').textContent = stage.name.replace(/\s*\(.*?\)\s*$/, '');

  if (choice) {
    const opts = choice.options || [];
    $('stepBody').innerHTML = `
      <p class="muted">Pick the direction to build on. This came out of what you just pasted.</p>
      ${opts.length ? opts.map((o, i) => `
        <label class="opt"><input type="radio" name="ch" value="${esc(o.label)}${o.detail ? ' — ' + esc(o.detail) : ''}" ${i === 0 ? 'checked' : ''}>
        <span><span class="lab">${esc(o.label)}</span><div class="det">${esc(o.detail || '')}</div></span></label>`).join('')
        : '<div class="empty">No option list came through. Read your pasted reply and type the direction you want.</div>'}
      <label>…or write your own</label>
      <textarea id="ownChoice" placeholder="your own direction"></textarea>
      <div class="row" style="margin-top:12px">
        <button class="primary" onclick="doChoice()">Continue</button>
        <span id="stepmsg" class="muted"></span></div>`;
    return;
  }

  const prompt = buildPrompt(stage);
  const last = RUN.stage === total - 1;
  $('stepBody').innerHTML = `
    <p class="muted">Copy this into any chat — Gemini, Claude, ChatGPT — then copy its whole reply
    back here. Nothing is sent anywhere from this page.</p>
    <div class="row" style="margin:10px 0">
      <button class="primary" onclick="doCopyPrompt()">Copy prompt</button>
      <a class="ext" href="https://gemini.google.com/app" target="_blank" rel="noopener">Gemini</a>
      <a class="ext" href="https://claude.ai/new" target="_blank" rel="noopener">Claude</a>
      <a class="ext" href="https://chatgpt.com/" target="_blank" rel="noopener">ChatGPT</a>
      <span id="stepmsg" class="muted"></span>
    </div>
    <details class="fold"><summary><h3>See the prompt</h3></summary>
      <textarea id="promptbox" readonly class="mono">${esc(prompt)}</textarea></details>
    <label>Paste the whole reply${stage.optional ? ' (optional — you can skip)' : ''}</label>
    <textarea id="pastebox" placeholder="paste the entire message — preamble, markdown and all"></textarea>
    <div class="row" style="margin-top:12px">
      <button class="primary" onclick="doPaste()">${last ? 'Finish' : 'Save & next step'}</button>
      ${stage.optional ? '<button onclick="doSkip()">Skip this step</button>' : ''}
      <span id="stepmsg2" class="muted"></span></div>`;
  window.__prompt = prompt;
}

function doCopyPrompt() { copy(window.__prompt, $('stepmsg'), 'Prompt'); }
function doPaste() {
  const v = $('pastebox').value.trim();
  const stage = curStage();
  if (!v && !stage.optional) { $('stepmsg2').textContent = 'Paste the reply first.'; return; }
  submitPaste(v);
}
function doSkip() { submitPaste(''); }
function doChoice() {
  const picked = document.querySelector('input[name=ch]:checked');
  const own = ($('ownChoice') && $('ownChoice').value.trim()) || '';
  const v = own || (picked ? picked.value : '');
  if (!v) { $('stepmsg').textContent = 'Pick one or write your own.'; return; }
  submitChoice(v);
}
function copyPart(k, label) {
  const t = (window.__parts || {})[k] || '';
  if (!t) { $('donemsg').textContent = 'Nothing to copy.'; return; }
  copy(t, $('donemsg'), label);
}
function downloadScript() {
  const p = window.__parts || {};
  const name = (RUN.topic || 'script').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const blob = new Blob([p.package || p.script || ''], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = `${name}.md`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/* ============================ boot ============================ */
async function boot() {
  const picked = [];
  for (const id of WORKFLOWS) {
    try {
      const r = await fetch(`workflows/${id}.md`);
      if (!r.ok) continue;
      WFS[id] = parseWorkflow(id, await r.text());
      picked.push(id);
    } catch (e) { /* a missing workflow must not take the page down */ }
  }
  if (!picked.length) { note('Could not load the workflows. Reload, or check your connection.'); return; }
  $('wf').innerHTML = picked.map(id =>
    `<option value="${id}">${esc(WFS[id].name.replace(/^Optimal Sneakleshow v1 - /, ''))}</option>`).join('');
  pickWorkflow();
  const saved = loadRuns();
  if (saved.length && saved[0].stage < (WFS[saved[0].wf] || { stages: [] }).stages.length) RUN = saved[0];
  render();
}
// publish_static.sh rewrites the placeholder as it copies, so the live page always says which
// build it is. Served straight from docs/ the placeholder survives, which is the honest answer.
function stampBuild() {
  const el = $('build');
  if (!el) return;
  el.textContent = el.textContent.includes('__BUILD')
    ? 'local build - not published' : 'build ' + el.textContent;
}
window.addEventListener('DOMContentLoaded', () => { stampBuild(); boot(); });

/* A handle for the browser console - `let` at script top level does not attach to window, and on a
 * phone the console is the only way in when something looks wrong. Read-only views of the state. */
window.SS = {
  get wfs() { return WFS; },
  get run() { return RUN; },
  get prompt() { return window.__prompt; },
  get parts() { return window.__parts; },
  runs: loadRuns,
  save: saveRun,
  key: LS_RUNS,
  reset() { localStorage.removeItem(LS_RUNS); RUN = null; render(); },
};
