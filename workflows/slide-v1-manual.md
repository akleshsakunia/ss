WORKFLOW: Slide Deck v1 (manual)
DESCRIPTION: One story to a self-running HTML deck you talk over. Faceless commentary, 5-7 min. Three stages: evidence and photo hunt, slide-by-slide sequence, then a build prompt that makes Gemini produce the deck as a downloadable Canvas artifact.
INPUT: STORY | The story or event (or just the company) | required | text
INPUT: SUGGESTED_STOCKS | Listed companies involved, if any | optional | text
INPUT: SOURCE_LINKS | Articles this came from - stage 1 opens these first | optional | textarea
INPUT: USER_ANGLE | An angle you already want to take | optional | textarea
ALIAS: STORY = EVENT

Stage 1: Evidence and Visual Hunt
EMITS: RESEARCH
GATE: none
---
You are STAGE 1 OF 3 of a slide-deck pipeline. You are the researcher. Stage 2 turns your findings
into a slide-by-slide sequence, and stage 3 turns that into an HTML deck. You are NOT writing the
deck and you are NOT writing narration. Do not produce slides.

HOW YOUR ANSWER IS USED: I copy your whole reply with the copy button and paste it into my tool. Put
EVERYTHING in one message - no "shall I continue?", no splitting across replies, no questions first.
Do not wrap the whole answer in a code block.

USE WEB SEARCH THROUGHOUT. Every figure, quote and date must come from a page you actually opened,
and you name that source next to it. If you cannot verify something, write UNVERIFIED beside it
rather than recalling it. An admitted gap is far more useful to me than a confident wrong number.

TODAY IS {{TODAY}}. The current quarter is {{CURRENT_QUARTER}}; the next is {{NEXT_QUARTER}}. Indian
fiscal years run April to March, so FY27 is April 2026 to March 2027 and Q1 is April-June. Never
infer today's date from a retrieved article - an undated or stale page will put you a year out.

SUBJECT
STORY: {{STORY}}
LISTED COMPANIES INVOLVED: {{SUGGESTED_STOCKS}}
ANGLE I ALREADY SUSPECT: {{USER_ANGLE}}
SOURCE ARTICLES: {{SOURCE_LINKS}}
IF THAT LINE HAS URLs, OPEN THEM BEFORE ANY OTHER SEARCH. They are the specific reporting this idea
came from - they define what I actually saw, what figures were quoted and when it ran. Pull the
concrete details out of them first, then widen out with your own searching. This stops the research
drifting to a neighbouring story that happens to rank better in search. Any text after the links
under "AS REPORTED" is the published summary; use it only if a link will not open. If a link fails
and there is no such text, say so plainly and carry on searching - do not invent what it said.

WHAT MAKES DECK EVIDENCE DIFFERENT FROM ARTICLE EVIDENCE
This is the part people get wrong, so read it twice. A deck is watched, not read. A fact only earns
a place if it can be SHOWN. So as you research, sort everything you find into one of three buckets
and label it that way:
  DRAWABLE   a number that can become a chart - a series over time, a comparison across companies,
             a split of a whole, a before and after. These are the spine of the deck. Hunt for them
             deliberately; do not just collect whatever numbers appear.
  SAYABLE    a fact that lands in one spoken line and one short on-screen bullet. Most facts.
  CUTTABLE   true, sourced, and it would still bore someone. Say so and leave it at the bottom.
A single number with no comparison is SAYABLE at best. The same number across four quarters, or
against three peers, is DRAWABLE and worth ten of the others.

Produce these sections, with these exact headings.

=== 1. THE ONE-LINE STORY ===
What happened, in one sentence a stranger would understand. Then the single most arresting verified
fact in the whole story - the one that would stop someone scrolling. Give it with its number, its
date and its source. This becomes the cold open, so it must be a fact, not a characterisation.

=== 2. WHAT HAPPENED - THE DATED SPINE ===
A chronological list of confirmed, dated events. For each line: the date, what happened, the number
attached, and the source URL. Six to twelve entries. This becomes the deck's timeline, which is the
single most useful thing a deck can show, so give it real care - no undated entries, and no entry
that is really an opinion about an event rather than the event.
Mark clearly where something is EXPECTED rather than CONFIRMED. Never blur the two.

=== 3. DRAWABLE DATA - THE CHARTS ===
Between three and six chart-ready datasets. This section decides whether the deck is any good, so
work harder here than anywhere else. For each one give, in this shape:

  CHART <n>
  TYPE: line | bar | grouped bar | stacked bar | doughnut | horizontal bar
  TITLE: what the chart proves, stated as a claim, not a label. "Margins fell for four straight
         quarters", not "Quarterly margins".
  X / CATEGORIES: the exact labels, in order
  SERIES: each series named, with its values in the same order as the labels
  UNIT: crore, %, x, INR, whatever it is - stated once, so the axis can be labelled
  SOURCE: the URL the numbers came from
  SO WHAT: one sentence on what the viewer should notice. If you cannot write this line, the chart
           does not belong in the deck - drop it and find a better one.

Prefer series with at least four points, or comparisons with at least three things being compared.
A two-bar chart is usually a sentence pretending to be a visual.
If the real data does not support that many charts, say so and give fewer honest ones. Never pad
this section with invented or interpolated figures - a fabricated chart is the one mistake that
would destroy the channel's credibility, because a chart looks authoritative by default.

=== 4. PEOPLE, COMPANIES AND PLACES - WITH PHOTOS ===
Every named entity the deck will show: people, companies, ministries, regulators, plants, buildings.
For each one, hunt an actual photograph. Give, in this shape:

  NAME: exactly as it should appear on screen
  ROLE: why they are in this story, in under twelve words
  IMAGE: a DIRECT image URL - one that ends in .jpg, .jpeg, .png or .webp and loads on its own.
         Not a search results page, not an article page, not a Google Images link.
  SOURCE PAGE: the page you found it on
  CONFIDENCE: HIGH if you opened the image URL itself and it is a stable host; MEDIUM if you are
              confident of the host pattern but did not open it; LOW if you are guessing.
  FALLBACK: what the slide should show if that image does not load - a name treatment, a logo
            wordmark, an icon, a chart. Always fill this in, even when confidence is HIGH.

Where to hunt, in this order, because it decides whether the image still loads next week:
  1. Wikimedia Commons (upload.wikimedia.org/...) - stable, freely licensed, and it has essentially
     every sitting Indian minister, most listed-company logos and most public buildings.
  2. The organisation's own site - press kit, investor-relations page, media room, PIB for ministers
     and ministries, the exchange site for a listed company.
  3. A news photograph, if neither of the above has one.
Say plainly when you could not find a real photo for someone. A named FALLBACK is a good outcome; a
made-up URL is not. Do not invent a URL that merely looks right - a broken image mid-recording is
worse than a designed slide that never pretended to have a photo.

=== 5. QUOTABLE LINES ===
Exact words worth putting on screen in quotation marks: from a minister, a chief executive, a
regulatory order, an analyst note, a court judgement. For each: the exact words, who said them, the
date, and the URL. Six at most, and only the ones that are genuinely quotable - a quote that merely
restates a fact you already listed is clutter. Never paraphrase inside quotation marks.

=== 6. WHO GAINS, WHO LOSES ===
Two lists. For each name: the mechanism, and the size of the effect where it is knowable. Quantify
wherever the data allows - "roughly X crore of annual revenue exposed" beats "significantly
affected". Where it is not knowable, say so rather than reaching for an adjective.

=== 7. THE TWO SIDES ===
The bull case and the bear case, or the case for and against, each in four to six short lines. Each
grounded in something from section 2 or 3. For each side, state what would have to turn out TRUE,
and what evidence would kill it. Do not favour one.

=== 8. WHAT TO WATCH ===
Dated, known-in-advance events over the next one to four quarters: results dates, deadlines, hearing
dates, policy reviews, commissioning dates, expiries. For each: the date and what it would confirm
or break. This is the deck's closing slide, so it must be genuinely forward-looking and dated - not
a restatement of what already happened.

=== 9. WHAT I COULD NOT VERIFY ===
Everything you looked for and could not stand behind: figures you found only on one unreliable page,
dates that conflicted between sources, images you could not locate, claims that are widely repeated
but which you could not trace to a primary source. Be generous here. This list protects me from
saying something wrong on camera, which is the most expensive mistake available to me.

LAST: no narration, no hooks, no slide layouts, no deck. Evidence only.


Stage 2: Story Sequence
EMITS: SEQUENCE
GATE: none
---
You are STAGE 2 OF 3 of a slide-deck pipeline. Stage 1 gathered the evidence, quoted below. Stage 3
will turn your answer into an HTML deck. Your job is the SEQUENCE: what appears on screen, in what
order, and what I say over it. You are not writing the HTML and not choosing colours.

HOW YOUR ANSWER IS USED: I copy your whole reply and paste it into my tool. One message, everything
in it, no questions first, not wrapped in a code block.

TODAY IS {{TODAY}}.

THE STORY: {{STORY}}
MY ANGLE, IF I GAVE ONE: {{USER_ANGLE}}

THE EVIDENCE FROM STAGE 1
{{RESEARCH}}

WHAT I AM ACTUALLY MAKING
A 5 to 7 minute faceless video. No face, no camera - just this deck full-screen while I talk over it
in Hinglish. The deck is the entire visual. If the screen is static, the video is dead, so something
must change on screen every three to four seconds throughout.

The arithmetic, so you build to the right size:
  6 minutes of Hinglish commentary at about 145 words per minute is roughly 870 words.
  Across 13 to 16 slides that is 55 to 70 spoken words per slide, about 25 to 30 seconds each.
  At one visual change every 3.5 seconds, that is 7 to 9 reveal beats per slide.
Hit those numbers. A deck of 8 slides means I am talking for 45 seconds over a static screen, which
is exactly the failure this whole format exists to avoid.

THE ARC - use it unless the story genuinely demands otherwise
  1  COLD OPEN         the single most arresting fact. No "today we will discuss". Start mid-punch.
  2  WHAT HAPPENED     the dated facts, plainly
  3  WHY IT MATTERS    who this touches and how
  4  THE TIMELINE      the dated spine as one visual
  5-7 THE NUMBERS      the charts, one claim per slide
  8-9 WHO GAINS/LOSES  named, quantified
  10-11 THE TWO SIDES  bull then bear, honestly
  12  WHAT IS PRICED IN  what the market already believes
  13  WHAT TO WATCH    dated, forward-looking
  14  THE CLOSE        my judgement, stated plainly, with what would change my mind

FORMAT - one block per slide, exactly this shape, nothing else between blocks:

SLIDE <n> | <TYPE>
TITLE: <English, maximum 7 words, a claim not a label>
NARRATION: <Hinglish, 55-70 words, written the way I will actually say it out loud>
BEATS:
  1. <what appears on screen at this tick>
  2. <the next thing, 3.5s later>
  ... 7 to 9 of them
VISUAL: <which photo from stage 1 section 4, with its URL - or which chart from section 3 by number,
         or NONE if this slide is typographic>
SOURCE: <URL, if this slide quotes or cites anything - otherwise omit the line>

TYPE is one of: COLD_OPEN, FACTS, TIMELINE, CHART, QUOTE, SPLIT, PORTRAIT, LIST, CLOSE.

THE RULES, and these are not negotiable

NO PARAGRAPHS ANYWHERE ON SCREEN. Every on-screen beat is a fragment: a number, a phrase, a name, a
bullet of nine words or fewer. The moment a slide carries a sentence of prose it becomes a lecture,
and a lecture is the thing we are avoiding. Multiple points always arrive as a list, one item per
beat, never as a block of text. Prose belongs in NARRATION, which is spoken and never shown.

ON SCREEN IS ENGLISH. NARRATION IS HINGLISH. Titles, bullets, numbers, chart labels, quotes: all
English. What I say over them: Hinglish, natural, the way I would say it to a friend who invests.
Do not write the narration in formal Hindi and do not write it in textbook English.

NARRATION AND BEATS MUST NOT BE THE SAME WORDS. If the screen says what I am saying, the viewer
reads it and stops listening, and the video is pointless. The screen carries the evidence - the
number, the name, the date, the chart. My voice carries the meaning - why it matters, what it
implies, what I think. Write them as two halves of one thing.

EVERY NUMBER ON SCREEN MUST EXIST IN STAGE 1. You have no licence to invent, round for effect, or
interpolate. If a beat needs a figure stage 1 did not establish, drop the beat.

BEATS ARE ORDERED FOR SUSPENSE. Within a slide, the reveal order is a small piece of storytelling:
set up, then land. Put the number that surprises last, not first. A chart's takeaway line arrives
after the chart has drawn, never before.

ONE CLAIM PER SLIDE. If a slide is making two arguments, it is two slides.

USE THE PHOTOS. Stage 1 found real pictures of the people and companies in this story. A slide about
a minister's decision should show that minister. Name which photo, by URL, on the VISUAL line. Where
stage 1 marked an image LOW confidence, still use it, but say on the VISUAL line what the fallback
should be.

AFTER THE SLIDE BLOCKS, add these three short sections:

=== RUNTIME ===
Total spoken words, and that divided by 145, as minutes. If it lands outside 5:00-7:00, fix the
slides rather than reporting a miss.

=== WHAT I AM CLAIMING ===
The deck's actual argument in three lines, so I can see whether I agree with it before I record.

=== WHAT WOULD MAKE THIS WRONG ===
The two or three things that, if they turned out differently, would make this deck embarrassing in a
month. Name them plainly. I would rather know now.


Stage 3: Build the Deck
EMITS: DECK
OPTIONAL: yes
GATE: none
---
BUILD THIS AS A CANVAS ARTIFACT I CAN DOWNLOAD. Open Canvas, create a single self-contained .html
file, and put the whole deck in it. One file - no separate CSS, no separate JS, no build step, no
framework. I will download it and open it straight from my Downloads folder.

Do not explain the code to me. Do not show me the HTML in the chat body. Build it in Canvas and give
me one short line saying it is ready.

WHAT THIS IS
A presentation deck for a 5 to 7 minute faceless YouTube video about Indian markets, for value
investors. I put it full-screen, screen-record it, and talk over it in Hinglish. There is no camera
and no presenter on screen - this deck IS the video. So it has to hold attention on its own.

THE CONTENT - build exactly this, nothing added, nothing dropped

{{SEQUENCE}}

SUPPORTING EVIDENCE, for chart values, exact figures, image URLs and source links:

{{RESEARCH}}

SOURCE LINKS COLLECTED SO FAR:
{{REFERENCES}}

=== THE LOOK ===

Dark editorial with a single accent. Confident, expensive, restrained - a research desk, not a
startup pitch and not a news channel's lower-third.

  Ground        near-black, #0B0C0E, flat. No gradient wash across the whole slide.
  Surface       #15171A for cards and panels, with a 1px #24272C border
  Text          #F2F3F5 primary, #9BA1A8 secondary. Never pure white on near-black - it vibrates.
  Accent        ONE colour, used for emphasis, active chart series, rules and the progress bar.
                Amber #F5A524 by default. Pick a different one only if the story has an obvious
                owning colour. Never more than one accent.
  Positive/neg  #3FB950 and #F85149, and ONLY for genuinely directional numbers. Not decoration.
  Type          a clean grotesque - Inter, with -apple-system and system-ui fallbacks. One family.
                Numbers in tabular figures (font-variant-numeric: tabular-nums) so they do not
                jitter as they animate.
  Scale         slide title 64px/600. Big stat 140px/700, tight tracking. Bullets 34px/400.
                Captions and sources 20px/400 in secondary. Nothing on a slide smaller than 20px -
                this is watched on a phone at 360px wide after YouTube compresses it.
  Space         generous. A 100px margin on all four sides of the 1920x1080 frame. Crowding is the
                single fastest way to make a deck look cheap.

FIXED DESIGN FRAME. Lay the deck out at exactly 1920x1080 and scale the whole thing to fit the
window with a CSS transform, centred, letterboxed with the ground colour. Recompute the scale on
resize. This guarantees the framing is identical whatever size my window is, which matters because I
am recording it.

=== THE MOTION - this is the part that decides whether it works ===

Within a slide, elements reveal themselves one at a time on a timer. Between slides, I press a key.
That way the screen is never static while I talk, but I never have to match a stopwatch.

Exact behaviour, implement it precisely:

  Markup contract:
    <section class="slide"> for each slide
    elements that reveal carry class "beat", in document order
    everything else on the slide is visible from the moment the slide appears

  Entering a slide: hide every .beat, then reveal them one by one at 3500ms intervals, starting
  3500ms after the slide appears. The first slide does NOT start its timer until I press a key -
  I need a moment to start the screen recorder.

  RIGHT ARROW or SPACE:
    if any beats on this slide are still hidden, reveal ALL of them immediately and stop the timer
    otherwise, advance to the next slide
  This is important: it means a key press never skips content I have not shown yet, and I am never
  trapped waiting for a timer when I have finished talking early.

  LEFT ARROW: previous slide, with every beat already revealed.
  H: toggle the slide counter.
  Escape: stop the auto-reveal timer on the current slide.

  Reveal animation: 420ms, opacity 0 to 1 with a 16px upward translate, cubic-bezier(.2,.7,.2,1).
  Stagger nothing - each beat is its own tick, so they must not overlap.
  Honour prefers-reduced-motion by dropping the translate and shortening to 120ms. Keep the timing
  of the reveals themselves - the pacing is the point, the sliding is not.

  Slide transition: 300ms cross-fade. No slide-in, no flip, no zoom. Anything more looks like a
  template.

  A 3px accent progress bar pinned to the bottom edge, showing position through the whole deck.
  A small "7 / 15" counter in the bottom right, in secondary text at 20px.

=== IMAGES - real photographs, and they must never break on camera ===

Use the real image URLs from the evidence above. Every one of them.

Every single <img> gets an onerror handler that hides the image and reveals a designed fallback in
the same slot - the fallback named in the evidence, or, failing that, the subject's name set large
in the accent colour on a surface panel with a thin border. A broken-image icon appearing while I am
recording is the worst outcome this deck can produce, so treat this as mandatory on every image
without exception, including ones marked HIGH confidence.

Photographs are treated, not pasted raw:
  - object-fit: cover, never stretched
  - a subtle duotone or a desaturate-to-70% filter so mismatched news photos sit together
  - a bottom-up gradient scrim from the ground colour where text sits over an image
  - a small caption underneath in secondary text: who it is, and the source
  - rounded to 8px, on the surface panel, never floating on the bare ground

Portrait slides: photo on one side taking about 40% of the width, the content list on the other.
Never a face centred behind text - it fights the words and flatters nobody.

=== CHARTS ===

Chart.js 4 from cdnjs. The deck already loads real photographs from the web, so a CDN costs nothing
extra. Build every chart from the CHART blocks in the evidence - the exact labels, the exact values,
the exact units. Do not smooth, extrapolate, or invent a data point to make a line prettier.

  - Dark theme throughout: grid #24272C, ticks and labels #9BA1A8, no chart-area border
  - The emphasised series in the accent; other series in greys. Never a rainbow palette.
  - Legend off when there is one series. Data labels directly on the bars or points rather than a
    legend wherever it fits - a viewer should never have to look twice to read a chart.
  - Animate on reveal, not on page load: initialise a chart when its beat is revealed, so I actually
    see it draw. 900ms, easeOutQuart.
  - The chart's TITLE from the evidence goes above it as a claim, in the slide title position.
    The SO WHAT line arrives as the LAST beat on that slide, under the chart, in the accent.
  - Axis label with the unit. A number with no unit is a wrong number.
  - Currency in Indian convention: crore and lakh, and Indian digit grouping.

=== TEXT ON SLIDES ===

NO PARAGRAPHS. Anywhere. This is an absolute.
  - Multiple points are always a list, one item per beat. Never a block of prose.
  - Maximum 9 words per bullet, maximum 7 words in a slide title.
  - A stat slide is one enormous number with a short label beneath it, not a sentence containing a
    number.
  - Quotes are set large in quotation marks with the speaker, their role and the date beneath, and
    the source as a link. Maximum 25 words - trim with an ellipsis rather than shrinking the type.
  - No bullet glyphs. Use a short accent rule, or the number itself, as the marker.
  - No sentence-ending full stops on bullets.

=== LINKS AND SOURCING ===

Anything quoted, any figure that could be challenged, and every chart gets its source reachable:
  - a small source line under the element, in secondary text at 20px, linking out with the
    publication's name - not a raw URL
  - links open in a new tab and are underlined on hover only, so they never distract on screen
  - a final SOURCES slide after the close, listing every source used, each linked
Credibility in this format is almost entirely visible sourcing. Do not skip it.

=== TECHNICAL ===

  - One .html file. Everything inline. It must work opened directly from the filesystem.
  - Chart.js from https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js, pinned.
  - Google Fonts for Inter is fine, with a real system fallback stack so it still reads offline.
  - No other dependency. No bundler, no modules, no framework.
  - <title> is the story, so the recording's window title is not "Untitled".
  - It must run with the window at 1280x720 and still at 2560x1440.

=== BEFORE YOU FINISH, CHECK ALL OF THESE ===

  1. Every slide from the sequence is present, in order, with its beats in the given order.
  2. Every beat count is 7 or more - a slide with 3 beats leaves me talking over a static screen.
  3. Every <img> has an onerror fallback. Every one.
  4. Every chart's numbers match the evidence exactly. Read them back against it.
  5. No paragraph of prose anywhere on any slide.
  6. All on-screen text is English.
  7. Right arrow reveals remaining beats before it advances - test this logic by reading it.
  8. The first slide waits for a key press before its timer starts.
  9. Every quote and chart has a visible, linked source.
  10. A SOURCES slide at the end.

Then tell me in one line that the Canvas artifact is ready to download. Nothing else.
