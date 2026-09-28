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

=== 4. THE VISUALS - PHOTOGRAPHS OF EVERYTHING IN THIS STORY ===
Hunt a real photograph for every one of these. The ordering is by how much each one carries the
video, and the first category is the one most often missed.

  A. THE SUBJECT ITSELF - the product, service, object or system the story is actually about.
     MANDATORY: at least two of these, and more if the story allows. A deck made only of
     headshots and logos is a press-conference deck, not an explainer, and it is the single most
     common way this format goes flat.
     Concretely, for this channel: a UPI payment screen or a QR sticker on a shop counter; a metro
     freight rake; the actual vehicle model; the drug's packaging or the plant that makes it; a
     wafer or a fab floor; cement bags on a lorry; a policy document; a credit card terminal; a
     warehouse; the machine that was ordered. Whatever the thing IS, show the thing.
  B. THE DOCUMENT - the actual order, notice, filing, circular, judgement or press release the
     story turns on. The first page or the header, as published. SEBI, PIB, the exchanges and the
     courts all publish these openly, so they are easy to find and enormously credible on screen:
     a viewer who sees the real letterhead stops doubting you. Skip only if there is no document.
  C. PEOPLE - ministers, chief executives, regulators, judges, anyone named or quoted.
  D. COMPANIES - the wordmark or logo, AND a real photograph of what they operate: the plant, the
     store, the rig, the office. A logo alone is filler; a logo plus their actual site is a fact.
  E. INSTITUTIONS AND PLACES - the ministry building, the Supreme Court, the RBI, the exchange.
  F. THE SCENE - where this actually lands: the shop counter, the trading floor, the queue, the
     loading bay. One or two of these are what make an abstract policy story feel real.

For each one, give exactly this shape:

  NAME: exactly as it should appear on screen
  WHAT: which category above, and why it is in this story, in under fifteen words
  IMAGE: a DIRECT image URL - one that ends in .jpg, .jpeg, .png or .webp and loads on its own.
         Not a search results page, not an article page, not a Google Images link.
  SOURCE PAGE: the page you found it on
  CONFIDENCE: HIGH if you opened the image URL itself; MEDIUM if you are confident of the host
              pattern but did not open it; LOW if you are guessing.
  FALLBACK: what the slide should show if that image does not load - a name treatment, a logo
            wordmark, an icon, a chart. Always fill this in, even when confidence is HIGH.

WHERE TO GET THEM, IN THIS ORDER. Read this carefully - the last real deck failed here completely.

  1. THE og:image OF THE SOURCE ARTICLES, and of other news pieces about this exact story.
     Open the article, read its <meta property="og:image" content="..."> tag, and use that URL.
     This is the best route by a wide margin and it is the one to reach for first:
       - It is a photograph OF THIS STORY. The actual plant, the actual minister at the actual
         announcement - not a library picture of something similar.
       - og:image exists so that third parties can fetch it for link previews. It is the one
         image URL on a news page that is BUILT to be hotlinked, so it survives being loaded
         from a local file with no referrer, which most other news images do not.
       - These are the same photographs an image search would surface from those articles.
     Take several: the source articles, plus two or three other outlets covering the same story.
  2. THE ORGANISATION'S OWN SITE - press kit, media room, investor-relations deck, PIB for
     ministers and ministries, the exchange for a listed company. Relevant and stable.
  3. WIKIMEDIA COMMONS, and only through this exact URL form:
         https://commons.wikimedia.org/wiki/Special:FilePath/FILE_NAME.jpg?width=1600
     Never the upload.wikimedia.org/wikipedia/commons/X/YZ/... form. That path contains a hash
     directory you cannot know, so writing one out is guessing, and guessing produces a 404.
     Special:FilePath takes only the file name and redirects to wherever the file really is.
     Commons is for ministers, logos, ministry buildings and landmarks - the things it genuinely
     has. It is not where you find a picture of this week's event.

IT MUST BE A PICTURE OF THE ACTUAL THING. This is a hard rule and the last deck broke it: an
Indian thermal-power story was illustrated with the turbine hall of Didcot A Power Station, in
Oxfordshire, England. A visually similar object in another country is not evidence, it is set
dressing, and a viewer who recognises it stops trusting the rest.
  - The named company's OWN plant, office or product. Not "a thermal plant".
  - The named person. Not "an official at a podium".
  - The Indian regulator, exchange or ministry. Not a generic government building.
If you genuinely cannot find a picture of the actual thing, say so and give a FALLBACK. A
well-designed typographic slide is a perfectly good outcome; a lookalike from another country is
not.

DO NOT INVENT URLs, AND UNDERSTAND WHY THIS WARNING IS HERE. On this workflow's first real deck
you returned five Wikimedia image URLs and ALL FIVE WERE 404 - plausible file names under
plausible hash directories, none of which existed. The prompt already said not to do this. So:
  - A URL you have not actually opened is CONFIDENCE: LOW. Say LOW. Do not say HIGH because the
    URL looks well-formed - that is exactly the mistake.
  - It is far better to return six images you opened than eighteen you assembled from memory.
  - The tool load-tests every URL you give before the next stage runs, and hands the next stage
    the list of dead ones. Inventing URLs does not save you work; it just wastes a stage.

HOW MANY. Aim for one usable image per slide - twelve to eighteen - rather than four or five. The
deck is 13-16 slides and a photograph carries a slide better than a bullet list does. Spread them
across the six categories rather than returning six portraits.

Prefer a large image: it is displayed across a 1920-wide frame, and a 200px thumbnail scaled up
looks worse than no photograph at all. Use https:// URLs only.

WHY THE FALLBACK IS STILL MANDATORY, even at HIGH confidence and even recording the same day. The
failure this guards against is not the URL going stale - it is hotlink protection: a referrer check
or a CORS rule refusing the request the very first time it is made, which is exactly the condition
a local file creates. That fails within a second of opening the deck, not within a week. So every
entry gets a FALLBACK line.

=== 4b. THE LISTED COMPANIES - EXACT NAMES AND TICKERS ===
Every listed company the deck will name, in this shape, and nothing invented:

  NAME: the exact listed entity, as it should read on screen
  TICKER: NSE symbol, and BSE code where the NSE one does not exist
  WHAT IT DOES: under ten words
  WHY IT IS IN THIS STORY: under fifteen words
  FOR IT: two or three things currently working in this company's favour, each a fact with a
          number and a source - a margin, an order book, a capacity, a balance-sheet change
  AGAINST IT: two or three things currently working against it, on the same terms
  MOST RECENT MOVE: the share price move tied to this story, with the date, if there was one

The FOR IT / AGAINST IT lists are not optional and not a formality - the deck's second-to-last
content slide is built directly from them. Keep them factual and attributable. Do not write a
view, a rating or a target: "operating margin rose 180bps to 14.2% in Q1 FY27 (company filing)"
belongs there; "well placed for re-rating" does not.

Get the ticker right or leave it blank. An invented symbol on screen is worse than no symbol.

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

WHICH OF ITS IMAGES ACTUALLY LOAD - measured by the tool, not claimed by anyone
{{IMAGE_CHECK}}
Use only the LIVE ones on a VISUAL line. Where something important has no live picture, either
find a replacement now - the og:image of a news article about this story is the best bet, and it
is built to be fetched by third parties - or design that slide as a chart or a typographic
treatment and say so. Never put a dead URL on a VISUAL line hoping it will work on the day.

WHAT I AM ACTUALLY MAKING
A 5 to 7 minute faceless video. No face, no camera - just this deck full-screen while I talk over it
in Hinglish. The deck is the entire visual. If the screen is static, the video is dead, so something
must change on screen every three to four seconds throughout.

The arithmetic, so you build to the right size:
  6 minutes of Hinglish commentary at about 145 words per minute is roughly 870 words.
  Across 13 to 16 CONTENT slides that is 55 to 70 spoken words per slide, 25 to 30 seconds each.
  The two closing slides - sources, and disclaimer + CTA - are extra and are not counted here.
  At one visual change every 3.5 seconds, that is 7 to 9 reveal beats per slide.
Hit those numbers. A deck of 8 slides means I am talking for 45 seconds over a static screen, which
is exactly the failure this whole format exists to avoid.

THE ARC - every step introduces something the previous steps did not
  1  THE IMPACT       what this CHANGES. Not what happened - what is now different. See below.
  2  THE TRIGGER      the one dated event that caused it, with its number. ONE slide, not three.
  3  THE MECHANISM    why that event produces that consequence. The causal chain, stated once.
  4  THE TIMELINE     how it built up, dated
  5-7 THE EVIDENCE    the charts. Each must SHOW a magnitude or trend that no earlier slide stated.
  8-9 WHO IT LANDS ON named winners and losers, quantified
  10-11 THE TWO SIDES bull then bear, honestly
  12  WHAT IS PRICED IN  what the market already believes, and what it is assuming is safe
  13  WHAT TO WATCH   dated, forward-looking
  14  THE SCORECARD   each named stock: what is working for it, what against. Specified below.
  15  THE VERDICT     my judgement, plainly, and where the big loop closes
  then DISCLAIMER + CTA, then SOURCES last - both specified under REQUIRED CLOSING SLIDES below.

The arc has been rewritten because the previous one built repetition into the deck by design: it
opened on "the most arresting fact", then gave "the facts", then charted the same facts, so a
one-day price story got told three times before slide 8. The rule that replaces it is simple and
you should apply it to every slide you write:

  A SLIDE EARNS ITS PLACE ONLY IF A VIEWER WHO HAS SEEN EVERY PREVIOUS SLIDE LEARNS SOMETHING NEW.

LOOPS - THIS IS WHAT HOLDS A VIEWER FOR SIX MINUTES, AND IT IS CURRENTLY MISSING
A loop is a question the viewer wants answered, planted on purpose and left open. Closing it is
answering that question in the same words it was asked, so the viewer feels it land. Decks without
loops are lists of true facts that nobody watches to the end, which is what the last two were.

THE BIG LOOP - one, opened on slide 1, closed on the verdict.
  It must be a SPECIFIC, ANSWERABLE question this deck actually resolves. "What happens next?" is
  not a loop, it is a tease, and a tease that is never paid reads as a waste of six minutes.
  Good: "Three power companies are all called a play on the grid crunch. Only one of them
  actually earns more when the grid strains. Which one - and how would you tell?"
  It goes on slide 1 in the narration AND as a line on screen, and the verdict slide answers it
  explicitly, echoing the question's own words before giving the answer.
  Do not answer it, or half-answer it, anywhere in the middle. The middle EARNS the answer.

MINI LOOPS - one per section, three to five across the deck.
  Each opens a smaller question and closes it within two or three slides, before the next opens.
  Open: "Jaiprakash trades at a third of Tata's multiple. That is either an opportunity or a
  warning." Close, two slides later: "It is a warning about earnings quality - here is why."
  THE RULE THAT MATTERS: never stack unanswered questions. A mini loop CLOSES before the next
  one OPENS. Three open questions at once is not suspense, it is confusion, and the viewer
  disengages rather than leaning in.
  A mini loop may be opened at the END of a slide as the last beat - that is the strongest place
  for it, because the viewer carries the question across the slide change.

Every slide block therefore carries a LOOP: line - see the format below. Nothing is left implicit.

SLIDE 1 IS ABOUT IMPACT, AND WHICH KIND DEPENDS ON THE STORY
Ask one question: does this story touch what the viewer personally pays, earns or owes?
  YES - a deposit rate, a loan rate, a transaction fee, the price of something they buy, a tax:
        open on THAT, in their own money, then land the second half of the slide on what it means
        for anyone holding the stock. "Your FD now pays 7.5% while your home loan has not moved"
        is an opening. "PSU Banks Drop 2% to 4%" is a headline, and a headline is not an impact.
  NO  - a PLI disbursement, a bond auction, a capex cycle, an order win, a sector-wide shift with
        no household hook: open on the stake for the SECTOR or the economy, concrete and
        quantified. How much capital, how many companies, what it decides.
Do NOT force a personal angle onto a story that has none. An invented "this affects YOU because..."
on a story about wholesale bond yields is worse than an honest sectoral opening - it reads as
clickbait and the viewer who stays feels lied to.

FORMAT - one block per slide, exactly this shape, nothing else between blocks:

SLIDE <n> | <TYPE>
TITLE: <English, maximum 7 words, a claim not a label>
NARRATION: <Hinglish, 55-70 words, written the way I will actually say it out loud>
BEATS:
  1. <what appears on screen at this tick>
  2. <the next thing, 3.5s later>
  ... 7 to 9 of them
LOOP: <one of these, exactly>
        OPEN BIG: <the question> | CLOSE BIG: <the question, echoed, then the answer>
        OPEN: <the mini-loop question>  | CLOSE: <which question this answers, and the answer>
        - <a dash, when this slide neither opens nor closes a loop>
VISUAL: <which photo from stage 1 section 4, with its URL - or which chart from section 3 by number,
         or NONE if this slide is typographic>
SOURCE: <URL, if this slide quotes or cites anything - otherwise omit the line>

TYPE is one of: IMPACT, FACTS, TIMELINE, CHART, QUOTE, SPLIT, PORTRAIT, SUBJECT, DOCUMENT,
BIGNUMBER, LIST, SCORECARD, VERDICT, DISCLAIMER_CTA, SOURCES.
  IMPACT     slide 1 only - what is now different, and where the big loop opens
  SUBJECT    the thing itself fills the slide - the product, the vehicle, the screen, the plant
  DOCUMENT   the actual order, notice or filing on screen with its key line pulled out beside it
  PORTRAIT   a person
  BIGNUMBER  one enormous figure and a short label, nothing else
  SPLIT      two things set against each other - before/after, gainers/losers, bull/bear
  SCORECARD  one row per named stock, what is for it and against it. Second to last content slide
  VERDICT    where the big loop closes
  DISCLAIMER_CTA  second to last overall
  SOURCES    the genuinely last slide

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

A LISTED COMPANY IS ALWAYS NAMED WITH ITS TICKER. Every single time it appears on screen, not
just the first, and written exactly as "Adani Power  NSE: ADANIPOWER". Stage 3 renders that pair
as a distinct visual element, so write it as a pair everywhere and let the deck style it. Tickers
come from stage 1 section 4b and nowhere else - if one is blank there, leave it blank here rather
than guessing a symbol. In the NARRATION use the company's spoken name only; nobody says "NSE
colon" out loud.

BEATS ARE ORDERED FOR SUSPENSE. Within a slide, the reveal order is a small piece of storytelling:
set up, then land. Put the number that surprises last, not first. A chart's takeaway line arrives
after the chart has drawn, never before.

ONE CLAIM PER SLIDE. If a slide is making two arguments, it is two slides.

SAY IT ONCE. A fact, a figure, a company name with a number attached, a date - each appears on
EXACTLY ONE slide. This is the rule the last deck broke hardest, so it is worth being concrete
about what went wrong: the per-bank drawdown list (Bank of Maharashtra -3.8%, Canara -3.2%, PNB
-2.9%, Bank of Baroda -2.5%) was printed in full on slide 1 AND again on slide 5, with slide 2
restating the same thing in words. Three slides, one piece of information. Separately, the funding
cost mechanism - CASA erosion, FD competition, deposit repricing - was restated on slides 3, 6, 7,
9 and 11 under five different headings.
  - Before you finalise, list every number you have used and check none appears twice.
  - A mechanism explained on one slide is not re-explained later under a new heading. Later slides
    may USE it; they may not teach it again.
  - The NARRATION may refer back freely - "that same 3.8% we just saw" is good writing. The
    SCREEN may not reprint it.
  - If two slides feel like they need the same figure, one of them is not needed.

VARY THE SHAPE. Eight of the last deck's fifteen slides were the identical construction: kicker,
claim title, six to eight bullets. It reads as one long list and the eye stops registering the
changes. So:
  - No more than TWO consecutive slides of the same TYPE.
  - At least SIX distinct TYPEs across the deck.
  - At most half the slides may be bullet lists. The rest are charts, a timeline, a quote, a
    portrait, the subject, the document, a single enormous number.
  - Where you find yourself writing a third list in a row, the content is usually telling you it
    belongs in a chart or on the document slide instead.

USE THE PHOTOS, AND SHOW THE THING. Stage 1 hunted real pictures in six categories: the subject
itself, the document, people, companies, places, and the scene. Name which one you are using, by
URL, on the VISUAL line. Where stage 1 marked an image LOW confidence, still use it, but say on
that line what the fallback should be.
Spend them deliberately. A slide about a minister's decision shows that minister - but the slide
about WHAT WAS DECIDED shows the thing itself: the payment screen, the freight rake, the packaging,
the terminal. Count them before you finish: if more than half your photo slides are headshots and
logos, you have built a press-conference deck, and the fix is to reach for category A and B.
Where stage 1 found the actual order, notice or judgement, put it on screen at the moment you state
what it says. Real letterhead is the cheapest credibility in this format.

THE SCORECARD - the last CONTENT slide, immediately before the verdict

  SLIDE <n> | SCORECARD
  One row per listed company the deck named, built straight from stage 1 section 4b. Each row:
    - the company name and its TICKER
    - FOR: two or three factual points currently working in its favour
    - AGAINST: two or three working against it
  This is the slide I asked for so a viewer leaves with a sense of where each name stands. It is
  written as EVIDENCE, NOT AS A CALL, and the distinction is the whole design:

    ALLOWED - facts, attributed, each with its number:
      "Merchant realisation ₹6.50/kWh vs ₹4.10 cost (CEA, Sep 2026)"
      "Net debt down ₹8,400 crore over four quarters (company filing)"
      "62% of capacity unhedged into a seasonal demand peak"
    NOT ALLOWED - anywhere on this slide or in its narration:
      a buy / sell / hold / accumulate / avoid, in any wording
      a price target, a fair value, or an expected return
      "our view", "we like", "well placed", "attractive", "overvalued", "poised to"
      an arrow, a traffic light or a colour applied to the COMPANY

  Colour is allowed only on a MEASURED CHANGE, never on the company: a margin that rose may be
  green, a debt that grew may be red, because those are facts about a number that moved. The row
  itself carries no colour, no rating and no ranking.
  The narration says what is working and what is not, and stops there. It does not say what I
  would do, and it does not hint. "Yeh do cheezein iske favour mein hain, yeh do against" is the
  register. Anything that resolves into a recommendation is out.
  If stage 1 gave no FOR/AGAINST material for a company, leave that company off rather than
  inventing balance.

REQUIRED CLOSING SLIDES - two of them, always, in this order, after the verdict

These are ADDITIONAL to the 13-16 content slides and do not count towards the runtime. Write them
as slide blocks like any other, with these types. THE ORDER IS DISCLAIMER FIRST, SOURCES LAST -
the disclaimer and CTA are the end of the video I actually narrate, and the sources slide sits
past the end as a reference I copy from rather than present.

  SLIDE <n> | DISCLAIMER_CTA
  ONE slide carrying both halves. Two parts:
    - Educational purposes only. Not investment advice. Always consult a SEBI-registered
      investment adviser before any buy or sell decision.
    - Like, share and subscribe.
  NARRATION: two or three Hinglish lines I can read over it, covering both halves naturally rather
  than reciting the legal wording.

  SLIDE <n> | SOURCES
  The genuinely last slide. Every source the deck used: the publication, what it said, and the
  URL. Laid out properly, not as a raw dump - I do not normally reach it while recording, but if
  I overshoot it must not look like a debug screen. Its real job is the copy button stage 3 puts
  on it, which fills my clipboard with a ready-to-paste YouTube description. List them completely,
  primary sources first, then news.
  NARRATION: none. Write "NARRATION: (not narrated)".

AFTER THE SLIDE BLOCKS, add these four short sections:

=== RUNTIME ===
Total spoken words across the CONTENT slides, and that divided by 145, as minutes. If it lands
outside 5:00-7:00, fix the slides rather than reporting a miss.

=== THE LOOPS ===
The big loop, quoted twice: the question exactly as slide 1 asks it, and the answer exactly as the
verdict gives it. Then every mini loop as "opened slide N -> closed slide M", with its question.
Confirm two things: every loop you opened is closed, and no two mini loops were open at the same
time. If either fails, fix the slides before answering.

=== NOTHING SAID TWICE ===
Prove it to yourself in writing. List every figure used in the deck with the slide number it
appears on, and confirm no figure appears on two slides. Then list the TYPE of each slide in order
and confirm no more than two consecutive repeats and at least six distinct types. If either check
fails, fix the slides before answering - do not report the failure and leave it.

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

WHICH IMAGE URLs ACTUALLY LOAD - measured by loading each one, not claimed by a model:
{{IMAGE_CHECK}}
Put ONLY the live ones in the deck. A URL listed DEAD above must not appear in an src attribute
under any circumstances - it is already proven not to work, and the onerror fallback exists for
the ones that fail unexpectedly, not as cover for shipping known-broken links.

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

LIGHT MODE IS A SECOND REAL PALETTE, NOT AN INVERSION. I may shoot in either, so it gets the same
care. Define every colour as a CSS custom property on :root and override the whole set under
[data-theme="light"] - no component may hardcode a colour, or half the deck will stay dark.

  Ground        #FBFBF9, a warm off-white. Not #FFF: pure white blooms on camera and under
                YouTube's compression it crushes thin type.
  Surface       #FFFFFF panels with a #E6E4DF border. The card is LIGHTER than the ground here,
                the reverse of dark mode - that inversion is what makes panels read as raised.
  Text          #14161A primary, #5C6169 secondary.
  Accent        the same accent hue, darkened for contrast on light - amber #B47600 rather than
                #F5A524, which is unreadable on off-white.
  Positive/neg  #1A7F37 and #C3342B - the dark-mode pair fails contrast on light.
  Shadow        light mode needs real shadows to build depth, since it cannot use glow. A soft
                0 2px 8px rgba(20,22,26,.08) on panels. Dark mode uses borders instead.
  Photos        the duotone or desaturation is re-tuned, not reused: raise brightness slightly and
                keep contrast lower, because a news photo treated for a near-black ground looks
                muddy on off-white. Scrims over images run from the LIGHT ground colour.
  Charts        grid #E6E4DF, ticks and labels #5C6169, series in the darkened accent. Re-theme
                Chart.js on toggle - redraw or update the chart options, do not leave it dark.
  Every text-on-colour pairing clears 4.5:1 in BOTH themes. Check the secondary text and the
  source lines especially; those are where it slips.

T toggles. Default dark. Remember the choice in localStorage inside a try/catch - this is opened
as a local file and storage can throw - and fall back to dark if it does.
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

THREE REVEAL MODES, switchable live with a keypress. Not a build-time choice - all three ship in
every deck and I change between them while recording, because which one suits a slide is something
I only know once I am talking over it.

  Markup contract:
    <section class="slide"> for each slide
    elements that reveal carry class "beat", in document order
    everything else on the slide is visible from the moment the slide appears

  MODE 1 - "one element"  <<< THIS IS THE DEFAULT ON OPEN >>>
    No timer at all. SPACE or RIGHT ARROW reveals the next hidden beat, one per press. When every
    beat on the slide is showing, the next press advances to the next slide.
    This is the presenter rhythm: I say the thing, then show it.

  MODE 2 - "auto"
    On entering a slide, reveal beats one by one at 3500ms intervals, starting 3500ms after the
    slide appears. SPACE or RIGHT ARROW while beats are still hidden reveals ALL of them at once
    and cancels the timer; pressing again advances. So a press never skips content I have not
    shown, and I am never stuck waiting when I have finished talking early.

  MODE 3 - "one slide"
    Every beat visible the instant the slide appears. SPACE or RIGHT ARROW advances to the next
    slide. No intra-slide reveals at all.

  M cycles: one element -> auto -> one slide -> one element.
  On a mode change, show the new mode's name as a small pill in the lower left, in secondary text,
  and FADE IT OUT AFTER 1.5 SECONDS. It must not sit there during a recording. Changing mode never
  re-hides a beat that is already showing - switching mid-slide only changes what the NEXT press
  does.

  Applies in every mode:
    LEFT ARROW    previous slide, with every beat already revealed
    T             toggle light / dark
    H             toggle the slide counter and progress bar
    Escape        cancel the auto timer on this slide (mode 2 only)
    The FIRST slide never reveals or auto-advances until I have pressed a key once - I need a
    moment to start the screen recorder. This holds in all three modes.

  Reveal animation: 420ms, opacity 0 to 1 with a 16px upward translate, cubic-bezier(.2,.7,.2,1).
  Stagger nothing - each beat is its own event, so they must not overlap. In mode 3 the beats
  appear together with the slide and do not animate individually.
  Honour prefers-reduced-motion by dropping the translate and shortening to 120ms. Keep the timing
  of the reveals themselves - the pacing is the point, the sliding is not.

  Slide transition: 300ms cross-fade. No slide-in, no flip, no zoom. Anything more looks like a
  template.

  A 3px accent progress bar pinned to the bottom edge, showing position through the whole deck.
  A small "7 / 15" counter in the bottom right, in secondary text at 20px. Neither counts the
  SOURCES or DISCLAIMER_CTA slides in its total - the progress bar should read full on the verdict,
  because that is where the video ends.

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

PORTRAIT slides: photo on one side taking about 40% of the width, the content list on the other.
Never a face centred behind text - it fights the words and flatters nobody.

SUBJECT slides: the thing gets the room. Photo filling roughly 60-70% of the frame, bled to one
edge rather than boxed in the middle, with the beats stacked in the remaining column. This is the
slide type that stops the deck looking like a slide deck, so do not shrink it to a thumbnail
beside a bullet list.

DOCUMENT slides: the document image on one side, squared on a surface panel with a thin border and
a soft drop shadow so it reads as a piece of paper rather than a screenshot. Beside it, the line
that matters, pulled out large and in quotation marks, with the accent colour behind or beside the
corresponding area of the document. Underneath, the issuing body and the date. This is the highest
credibility-per-pixel slide available in this format - lay it out carefully.

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

=== STOCKS ARE A DISTINCT VISUAL ELEMENT ===

Wherever a listed company is named on screen, it renders as a ticker chip - never as plain body
text. This is the single most repeated element in the deck, so it is worth building once and
using everywhere.

  <span class="tkr"><b>Adani Power</b><i>NSE: ADANIPOWER</i></span>

  - The company name in primary text at the surrounding size, semibold.
  - The ticker immediately after in a small pill: uppercase, letter-spaced ~0.06em, tabular
    figures, about 0.62em, in the accent on a low-opacity accent wash, 4px radius, 2px/7px
    padding. Not italic in the rendering - the <i> above is only markup shorthand.
  - The pair never breaks across a line. white-space: nowrap on the chip.
  - Where stage 1 left the ticker blank, render the name alone. Never invent a symbol, and never
    show an empty pill.
  - It reads correctly in both themes: the accent differs per theme, so the chip must take its
    colours from the :root custom properties like everything else.

In a SCORECARD row the chip is the row's anchor - set it larger there, at the row's leading edge.

=== THE SCORECARD SLIDE ===

One row per named stock, and it is the slide most likely to be paused and screenshotted, so lay
it out properly. Each row: the ticker chip on the left, then two columns - FOR and AGAINST -
as short factual lines, the FOR column marked with a subtle positive rule and AGAINST with a
negative one. Two or three lines each, nine words maximum, each carrying its figure.

Rules that are not stylistic:
  - NO rating, arrow, star, score, traffic light or ranking on any row. Not even implied by
    ordering - list the companies in the order the sequence gives them.
  - The positive and negative colours apply ONLY to a measured change inside a line - a margin
    that rose, a debt that grew. Never to the row, the chip or the company name.
  - Each line keeps its source, in secondary text, as on every other slide.
  - The disclaimer line sits quietly at the foot of this slide as well as on its own slide later.

Each row is one beat, so the rows arrive one at a time in "one element" mode.

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
Credibility in this format is almost entirely visible sourcing. Do not skip it.

=== THE LAST TWO SLIDES - build both exactly as described, in THIS order ===

DISCLAIMER + CTA comes FIRST of the two, then SOURCES is the genuinely last slide. The disclaimer
is where the video I narrate ends; the sources slide sits past the end, as a thing I copy from
rather than present.

DISCLAIMER + CTA, second to last, ONE slide carrying both halves.
  Upper half: educational purposes only, not investment advice, always consult a SEBI-registered
  investment adviser before any buy or sell decision. Set quietly - secondary text, generous
  space. It is a real statement, not fine print, but it is not the emphasis.
  Lower half: like, share and subscribe. This is the emphasis - large, in the accent, with room
  around it. If the channel handle appears anywhere in the evidence, use it; otherwise leave the
  call generic rather than inventing one.
  Both halves are beats, so they arrive in sequence rather than landing together.

SOURCES, last. It has two jobs and they pull in different directions, so do both.
  ON SCREEN: a properly designed list - publication, what it said, the date - laid out in two
  columns if it runs long, each entry linked, primary sources grouped above news. I do not
  normally reach this slide while recording, but if I overshoot it must look like part of the deck
  and not a debug dump. No raw URLs on screen.
  ON THE CLIPBOARD: a "Copy for description" button, prominent, in the accent. It writes a
  complete YouTube description to the clipboard as PLAIN TEXT, in this order:
      a two-line summary of what the video covers
      a blank line
      "Sources:" then each source numbered, as:
          1. Publication - the headline or document title
             https://the-url
      a blank line
      "This video is for educational purposes only and is not investment advice. Always consult
       your own financial adviser before making any buy or sell decision."
  The clipboard write MUST have a fallback: navigator.clipboard.writeText is blocked on file://
  in some browsers, and this deck is opened as a local file. Try it, and on failure select the
  text in a hidden textarea and use document.execCommand('copy'). Confirm either way by swapping
  the button label to "Copied" for two seconds. A copy button that silently does nothing is worse
  than no button.

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
  3b. NO src attribute contains a URL the image check listed as DEAD. Check each one against
      that list by eye - this is the failure that left the last deck with zero photographs.
  4. At least two slides show the SUBJECT - the product, object or system the story is about -
     rather than a person or a logo. If the sequence did not give you two, use the evidence's
     category A images and say which slides you put them on.
  4b. The big loop is visibly opened on slide 1 and answered on the verdict slide, in words that
      echo the question. Every mini loop closes.
  4c. Every listed company on screen renders as a ticker chip, everywhere it appears.
  4d. The SCORECARD carries no rating, arrow, score or ranking, and colour appears only on a
      measured change inside a line - never on a row, a chip or a company name.
  5. Every chart's numbers match the evidence exactly. Read them back against it.
  6. NOTHING IS SAID TWICE. Walk the finished deck and list every figure with the slide it is on.
     If a figure, a name-with-a-number, or an explained mechanism appears on two slides, cut it
     from the weaker one. This is the check that matters most - the last deck printed the same
     four drawdown percentages on two slides and restated one mechanism across five.
  7. No more than two consecutive slides share a TYPE, and at least six distinct types appear.
  8. No paragraph of prose anywhere on any slide.
  9. All on-screen text is English.
  10. All three reveal modes work, M cycles them, and the deck opens in "one element".
  11. Space with beats still hidden never skips a beat: in mode 1 it reveals the next, in mode 2
      it reveals all remaining, in mode 3 there are none hidden to skip.
  12. The first slide waits for a key press before anything reveals or advances, in every mode.
  13. T toggles a genuine light palette - check the charts re-theme and the source lines stay
      readable. No component hardcodes a colour outside the :root custom properties.
  14. Every quote and chart has a visible, linked source.
  15. DISCLAIMER + CTA is one slide and is SECOND to last.
  16. SOURCES is the last slide, and its copy button works, WITH the execCommand fallback.

Then tell me in one line that the Canvas artifact is ready to download. Nothing else.
