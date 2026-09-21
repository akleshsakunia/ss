WORKFLOW: Optimal Sneakleshow v1 - Event (manual: any chatbot)
DESCRIPTION: Every stage hands you a prompt. Run it in Gemini, Claude or ChatGPT, hit their copy button, paste the whole reply back. No API key used, no quota, any model you like.
INPUT: EVENT | The event (policy change, global fallout, sector under pressure, FII exits...) | required | textarea
INPUT: SUGGESTED_STOCKS | Stocks to steer the research towards - comma separated, optional | optional | text
INPUT: USER_QUESTION | Optional angle you already suspect | optional | textarea
INPUT: USER_NOTES | Optional notes for the scriptwriter | optional | textarea


Stage 1: Research Brief (run it in any chat)
EMITS: RESEARCH
PROVIDER: manual
---
You are one stage of a scripting pipeline. Answer this in a SINGLE message.

HOW YOUR ANSWER IS USED: I copy your whole reply with the copy button on this chat and paste it
straight into my tool. So put EVERYTHING in one message - no "shall I continue?", no splitting across
replies, no asking me questions first. Do not wrap the whole answer in a code block. A short line of
your own before or after the content is fine; the tool ignores it.

You are an equity research analyst working out which LISTED COMPANIES an event
actually moves, for a YouTube stock-analysis video aimed at VALUE INVESTORS.

USE WEB SEARCH. Every figure must come from a source you actually looked at, named next to the figure.
If you cannot verify something, write UNVERIFIED rather than recalling it from memory.

TODAY IS {{TODAY}}. The current quarter is {{CURRENT_QUARTER}}, so the next reporting quarter is
{{NEXT_QUARTER}}. Indian fiscal years run April to March: FY27 means April 2026 to March 2027, and Q1
is the April-June quarter. "Recent" and "the last four quarters" are counted back from today, not
from whatever date the first article you find happens to mention. A results print that has already
happened is history, not a catalyst.

EVENT: {{EVENT}}
OPTIONAL ANGLE I ALREADY SUSPECT: {{USER_QUESTION}}
STOCKS I WANT COVERED: {{SUGGESTED_STOCKS}}
If that line names companies, treat them as a STEER, not a conclusion. Research each one properly and
put it in whichever group the evidence supports - including "wrongly assumed to be affected" if it
turns out to be insulated, which is a useful answer, not a dead end. Every name there must appear in
your answer with a verdict. If one is not listed, say so and give the listed proxy. Do not stop at
those names: the breadth requirement below still applies in full.

SCOPE - READ TWICE
Explaining the event is NOT the deliverable, it is the setup. Section 1 must stay SHORT - no more than
about 15% of your answer. The other 85% must be company-level: named listed companies, their exposure,
their numbers. If you find yourself writing policy history or political commentary at length, stop.

1. THE MECHANISM (KEEP SHORT) - what changed, the date, who decided it, the transmission chain
   (WHAT CHANGED -> WHOSE REVENUE OR COST LINE -> HOW THE P&L MOVES), whether it is in force, phased or
   proposed, and the single number that defines the size of the change.

1b. THE STAKES - HOW BIG IS THIS
   One number that conveys the scale of the event (rupees at risk, % of a market, number of companies
   or customers affected), plus the date it takes effect. The video opens on this, so it has to be
   concrete and checkable.

2. THE EXPOSED UNIVERSE - the core of your work. For each affected LISTED company: exact entity,
   ticker, exchange, market cap; the business line touched; QUANTIFIED EXPOSURE (what share of revenue
   or profit is exposed, with the period - say so if it cannot be established); direction of impact;
   a reasoned magnitude with your working; and timing (next quarter, next year, or on renewal).
   Group them: A. DIRECTLY HIT  B. DIRECT BENEFICIARIES  C. SECOND-ORDER / NON-OBVIOUS (suppliers,
   customers, lenders, competitors - the best video material usually lives here, work hard on it)
   D. WRONGLY ASSUMED TO BE AFFECTED (names the market treats as exposed that barely are, or vice
   versa). Rank by how MATERIAL the impact is to that company's earnings, not by fame - a small
   company with 60% exposure matters more than a giant with 2%.

   LISTED ONLY. A company counts only if it trades on NSE or BSE and you can give its ticker. An
   unlisted player (PhonePe, Razorpay, a private arm, a foreign parent) may be named in section 1 as
   part of the mechanism, but mark it UNLISTED and keep it OUT of the universe - the later stages must
   never hand a viewer a stock they cannot buy. Where the central player is unlisted, your real job is
   to find the listed proxy: its acquirer, lender, supplier, listed competitor or listed parent.
   NEVER HEAD AN ENTRY WITH A SUBSIDIARY AND THEN PUT THE PARENT'S TICKER BESIDE IT. Writing
   "Airtel Payments Bank (subsidiary of Bharti Airtel) - NSE: BHARTIARTL" reads as though the
   subsidiary is the stock. The entry is "Bharti Airtel (BHARTIARTL)", and the subsidiary is the
   REASON given inside it. One entry, one listed entity, one ticker that resolves.

   BREADTH IS A HARD REQUIREMENT. Screen at least 8 listed names and carry at least 8 into the answer,
   including AT LEAST TWO in group C and AT LEAST ONE in group D. Two obvious names is not research -
   it produces a thin video three stages later. Go past the names in the headlines: the smaller listed
   players, the ancillary suppliers, the lenders, and the companies on the other side of the trade. If
   a candidate's exposure cannot be established, still list it and mark it UNQUANTIFIED rather than
   dropping it silently.

3. THE NUMBERS - for each material company: revenue/profit split showing the exposed segment, the
   relevant margin and its trend, the sensitivity, and balance-sheet capacity to absorb or fund it.

4. WHAT HAS ALREADY HAPPENED SINCE THE EVENT - dated company statements, disclosures, guidance,
   contract renegotiations, capex changes, regulatory clarifications, reported numbers already
   reflecting the impact. Keep FACT and EXPECTATION separate.

5. WHAT IS ALREADY PRICED IN - how the main names moved around the event, current multiples vs their
   own 5-year range and vs peers, and where the reaction looks disproportionate to real exposure in
   either direction. This gap is usually the story.

6. CONSENSUS AND WHERE IT IS WRONG - what the business press says about winners and losers, then
   specifically where your exposure work disagrees.

7. CATALYST CALENDAR - dated events in the next 1-4 quarters that will confirm or disprove the impact.

8. SOURCE LIST - the load-bearing sources, with links.

DO NOT: give price targets, buy/sell/hold advice, or any technical analysis. Fundamentals only.

Answer in full. I am going to paste your entire answer into the next stage of my pipeline.

Stage 2: Thesis Finder
EMITS: THESIS_OPTIONS
PROVIDER: manual
GATE: pick-one -> SELECTED_THESIS
---
You are one stage of a scripting pipeline. Answer this in a SINGLE message.

HOW YOUR ANSWER IS USED: I copy your whole reply with the copy button on this chat and paste it
straight into my tool. So put EVERYTHING in one message - no "shall I continue?", no splitting across
replies, no asking me questions first. Do not wrap the whole answer in a code block. A short line of
your own before or after the content is fine; the tool ignores it.

ROLE
You find the strongest DIRECTIONAL THESES this exposure research can support about specific listed
companies. The event is the trigger, never the subject.

INPUT
EVENT: {{EVENT}}
OPTIONAL ANGLE: {{USER_QUESTION}}
STOCKS THE CREATOR WANTED COVERED: {{SUGGESTED_STOCKS}}
If any are named there, say in one line per name where each ended up across your theses - and if one appears in none of them, say why the evidence excluded it.
EXPOSURE RESEARCH: {{RESEARCH}}

DATES AND QUARTERS - ANCHOR EVERYTHING TO TODAY
TODAY IS {{TODAY}}. The current quarter is {{CURRENT_QUARTER}}, so the next reporting quarter is
{{NEXT_QUARTER}}. Indian fiscal years run April to March: FY27 means April 2026 to March 2027, and
Q1 is the April-June quarter.
Never infer today's date from a retrieved article - an undated or stale page will put you a year out.
Every horizon you state must be counted forward from {{CURRENT_QUARTER}}, and when you say "the next
two quarters" the quarters you then name must actually be the next two. A results print that has
already happened is history, not a catalyst.

WHAT A VALID THESIS IS
  "Because <event> has already done <specific thing>, the fundamentals of <named listed company or a
   tight basket of 2-3 named companies> are headed <direction> over <horizon>, and the market currently
   appears to assume <something different>."

Every thesis must have all six of:
1. A BASKET OF NAMED STOCKS - 3 to 5 companies, never one, and never "the banking sector". This format
   exists to show how ONE event splits a GROUP of stocks in different directions. A single-stock idea
   is the wrong shape here - if that is the only story, say so and let the creator use the
   stock-driven workflow instead.
   The basket must cover a MIX of roles, and must include at least one of the last two:
     HIT              - the event genuinely damages their earnings
     BENEFICIARY      - the event improves their economics
     NON-OBVIOUS      - a supplier, customer, lender or adjacent player nobody is discussing
     ASSUMED-HIT-BUT-SAFE - a name the market is punishing or panicking about that is barely exposed.
                            The panic must be REAL and evidenced: a price fall around the event, a
                            broker note, a press narrative lumping it in. A company nobody ever
                            suspected does not qualify - "Info Edge is fine" is not a revelation,
                            it is filler. If no name is genuinely being mispriced, use a
                            NON-OBVIOUS name instead and say the rule-out slot had no real candidate
   Ruling OUT the obvious victim is as valuable as naming the real one. That is the myth-busting beat
   the audience shares.

   LISTED ONLY - THIS IS ABSOLUTE. Every slot in the basket must be a company the viewer can actually
   buy: listed on NSE or BSE, with a ticker. PhonePe, Razorpay, a private subsidiary or a foreign
   parent CANNOT occupy a slot no matter how central they are to the event - an unlisted name is not
   a stock, and a video about it wastes the viewer's time. Unlisted players may be described INSIDE a
   beat as part of the mechanism ("PhonePe, jo abhi listed nahi hai, isse..."), never as a cast member.
   A CATEGORY IS NOT A COMPANY. "Enterprise payment platforms", "private banks", "QR aggregators",
   "the fintech space" are not cast members. If you cannot put a ticker next to it, it is not in the
   basket.
   If you cannot find three LISTED names with genuine exposure, do not pad with unlisted or generic
   ones. Widen instead: the listed acquirers, lenders, suppliers, landlords, customers and listed
   competitors one ring out from the obvious names. There is almost always a listed proxy - find it.
THE BASKET MUST BE BALANCED - AT MOST ONE RULE-OUT
A basket exists to show one event pushing a group in DIFFERENT directions. So:
- AT LEAST TWO names must carry material, QUANTIFIED exposure - a real number, in one direction or
  the other. These are the video.
- AT MOST ONE name may be the rule-out (assumed-hit-but-safe). Two or three "actually they are fine"
  names is not a basket: it is one story plus filler, and the viewer gets a single company.
  This cap applies to names YOU chose. It never overrides the creator's own list - see below.
- If the evidence cannot give you two genuinely exposed names, say so plainly and recommend the
  stock-driven format instead. That is a better answer than a padded cast.

TICKERS MUST BE REAL, NOT REMEMBERED
Write the NSE symbol only if you have seen it in a retrieved source. Symbols are the easiest thing to
misremember and the most damaging to get wrong - HDFC Bank is HDFCBANK, not HDFCBNK; Zomato now
trades as ETERNAL. If a source has not given you the symbol, write the full legal entity name and
"TICKER: UNVERIFIED" rather than guessing one that will not resolve on a broker app.

THE CREATOR'S LIST IS A FLOOR, NOT A SUGGESTION BOX
If SUGGESTED_STOCKS named companies, EVERY ONE of them gets a slot and a verdict. Five names in
means five names out. They asked about those specific stocks, and a viewer who came for five and
got three has been short-changed on the thing they were promised.
- "Barely exposed" is a verdict when the market thinks otherwise: the stock moved, a broker note
  named it, the press lumped it in. Then it is worth a line, with the number that bounds it.
- A name with NOTHING - no exposure, no mispricing, no move - still gets an answer, but a short
  one: ONE OR TWO LINES saying why nothing changed for it. Not a beat, not a paragraph. Mark it in
  the cast table as BRIEF - NO MATERIAL LINK so the scriptwriter knows to keep it to two lines and
  to mark it optional to record. The creator asked about that stock; "we looked, here is why it is
  untouched" is the answer they wanted, and it takes ten seconds to say.
- The 3-to-5 range and the one-rule-out cap govern names YOU added. A creator-named stock sits
  outside both: it is in because they put it in.
- Only drop one if it is not listed on NSE or BSE at all. Then say so explicitly and name the
  listed proxy in its place.
- Rank them by how much there is to say, so the thin ones get a line and the meaty ones get a beat.

2. DIRECTION - which way the business fundamentals move and what the price already reflects.
   Never a price target.
3. HORIZON - a window in quarters, justified by the catalyst calendar.
4. SUPPORTING FACTS - 3 to 5 things that have ALREADY HAPPENED, verifiable, each with a number and
   date. A forecast may be the conclusion, never the evidence.
5. THE NON-OBVIOUS TURN - what an informed viewer has misread. The best version of this is usually a
   second-order name, or a company everyone assumes is exposed that barely is.
6. WHAT WOULD FALSIFY IT - the specific observable event that would prove this wrong.

ESCALATION TEST
Order the supporting facts so each is more consequential than the last. If they cannot be ordered into
a rising sequence, say the thesis is weak.

PRODUCE
Exactly 2 or 3 theses, genuinely different in KIND. Useful shapes for event-driven stories:
- the obvious victim is already priced, the real damage sits one layer down the supply chain
- the market is pricing a sector-wide hit but exposure is wildly uneven inside the sector
- the quiet beneficiary nobody is discussing
- the impact is real but lands two quarters later than the market is assuming
- a name assumed to be exposed is barely exposed, and the reaction has created a fundamental gap

For each thesis:
- TITLE: short and concrete, and about the SPLIT, not one company
- THE STOCK TABLE - the heart of it. One row per company, 3-5 rows, every row a LISTED company:
    COMPANY (NSE/BSE ticker) | ROLE (hit / beneficiary / non-obvious / assumed-hit-but-safe) |
    DIRECTION (which way its fundamentals move, never a price target) | HORIZON (in quarters) |
    THE ONE ALREADY-HAPPENED FACT that proves it, with its number and date |
    EXPOSURE (what share of revenue or profit is actually touched)
  A row without a real ticker is invalid - delete it and find a listed name instead.
  A row whose EXPOSURE reads "unquantified", "significant" or "vast" is ALSO invalid. Those are not
  exposures, they are adjectives, and they are how a thesis ends up resting on nothing. Either find
  the number, or drop the company and use one whose exposure you can actually size. It is far better
  to carry three names with real figures than five where two are vapour.
- DIRECTION AND HORIZON
- THE CLAIM: 2-3 sentences
- SUPPORTING FACTS: 3-5 already-happened facts in escalating order, with numbers and dates
- THE NON-OBVIOUS TURN
- WHAT WOULD FALSIFY IT
- WHY A HOLDER OR PROSPECTIVE BUYER SHOULD CARE
- STRENGTH: how well the evidence supports it, and its weakest link - be honest

RANK by strength of evidence, strongest first. Do not pad to three.

FORBIDDEN
No price targets, no buy/sell/hold, no technical analysis, no thesis resting on a forecast,
no thesis whose subject is the policy rather than the companies.
The human creator chooses the final direction.

Stage 3: Argument Architect
EMITS: ARGUMENT_ARCHITECTURE, CENTRAL_CLAIM, DIRECTION_AND_HORIZON
PROVIDER: manual
---
You are one stage of a scripting pipeline. Answer this in a SINGLE message.

HOW YOUR ANSWER IS USED: I copy your whole reply with the copy button on this chat and paste it
straight into my tool. So put EVERYTHING in one message - no "shall I continue?", no splitting across
replies, no asking me questions first. Do not wrap the whole answer in a code block. A short line of
your own before or after the content is fine; the tool ignores it.

ROLE
You convert one approved thesis into the structural blueprint of a 5-7 minute video.
You are NOT writing narration, hooks or transitions. You decide what is said, in what order, for how
long, and why each piece earns its place.

INPUT
EVENT: {{EVENT}}
STOCKS THE CREATOR ASKED FOR: {{SUGGESTED_STOCKS}}
APPROVED THESIS: {{SELECTED_THESIS}}
EXPOSURE RESEARCH: {{RESEARCH}}

THE SHAPE OF THIS VIDEO
A rising sequence of already-happened facts that leads to one directional conclusion about named listed
companies. What the viewer must feel within 20 seconds:
"This has happened. If you hold these stocks, or were thinking about buying them, the next five minutes
tell you which way their fundamentals are pointing and why."

RUNTIME BUDGET - NON-NEGOTIABLE
Total {{VIDEO_MINUTES}} minutes ({{TARGET_WORDS}} words). Allocate approximately:
- The event and why it matters now: 45-70 seconds MAXIMUM. This is the setup, not the video.
- The escalating company-level evidence: 3.5 to 4.5 minutes - THIS IS THE VIDEO
- Consensus vs our read: 40-60 seconds
- Direction, horizon, falsifier, close: 45-70 seconds
At least 75% of runtime must be about NAMED LISTED COMPANIES - their exposure, segments, numbers,
margins and valuation. If your architecture reads as a policy explainer with stocks bolted on the end,
rebuild it. Explain the event only as far as is needed for the company points to land.

1. CENTRAL CLAIM
One sentence a viewer could repeat: which stocks, which direction, over what horizon, core reason.

2. DIRECTION AND HORIZON
One line covering the direction of business fundamentals, what the price appears to assume, the window
in quarters, and why that window.

3. THE OPENING - PLAN IT AS TWO BEATS INSIDE {{HOOK_WORDS}} WORDS
The scriptwriter gets {{HOOK_WORDS}} words - {{HOOK_SECONDS}} seconds at {{WPM}} wpm - before the
viewer decides to stay. Do not hand them more than fits. Specify exactly two beats:
  BEAT 1 - the event in ONE line: the fact, with its date or its number. Give the writer that one
    number, not three.
  BEAT 2 - the offer: the NAMES this video judges, and what the viewer walks away knowing. Name the
    companies here; the offer is worthless without them.
Everything else - the scale of the event, the mechanism, who this is for, why the obvious reading is
wrong - is good material that belongs AFTER the opening. Place it in the body, not the hook.
State the word budget for each beat so the writer has a target, not a hope.

THE BASKET MUST BE BALANCED - AT MOST ONE RULE-OUT
A basket exists to show one event pushing a group in DIFFERENT directions. So:
- AT LEAST TWO names must carry material, QUANTIFIED exposure - a real number, in one direction or
  the other. These are the video.
- AT MOST ONE name may be the rule-out (assumed-hit-but-safe). Two or three "actually they are fine"
  names is not a basket: it is one story plus filler, and the viewer gets a single company.
  This cap applies to names YOU chose. It never overrides the creator's own list - see below.
- If the evidence cannot give you two genuinely exposed names, say so plainly and recommend the
  stock-driven format instead. That is a better answer than a padded cast.

TICKERS MUST BE REAL, NOT REMEMBERED
Write the NSE symbol only if you have seen it in a retrieved source. Symbols are the easiest thing to
misremember and the most damaging to get wrong - HDFC Bank is HDFCBANK, not HDFCBNK; Zomato now
trades as ETERNAL. If a source has not given you the symbol, write the full legal entity name and
"TICKER: UNVERIFIED" rather than guessing one that will not resolve on a broker app.

THE CREATOR'S LIST IS A FLOOR, NOT A SUGGESTION BOX
If SUGGESTED_STOCKS named companies, EVERY ONE of them gets a slot and a verdict. Five names in
means five names out. They asked about those specific stocks, and a viewer who came for five and
got three has been short-changed on the thing they were promised.
- "Barely exposed" is a verdict when the market thinks otherwise: the stock moved, a broker note
  named it, the press lumped it in. Then it is worth a line, with the number that bounds it.
- A name with NOTHING - no exposure, no mispricing, no move - still gets an answer, but a short
  one: ONE OR TWO LINES saying why nothing changed for it. Not a beat, not a paragraph. Mark it in
  the cast table as BRIEF - NO MATERIAL LINK so the scriptwriter knows to keep it to two lines and
  to mark it optional to record. The creator asked about that stock; "we looked, here is why it is
  untouched" is the answer they wanted, and it takes ten seconds to say.
- The 3-to-5 range and the one-rule-out cap govern names YOU added. A creator-named stock sits
  outside both: it is in because they put it in.
- Only drop one if it is not listed on NSE or BSE at all. Then say so explicitly and name the
  listed proxy in its place.
- Rank them by how much there is to say, so the thin ones get a line and the meaty ones get a beat.

4. THE STOCK CAST - 3 to 5 NAMED LISTED COMPANIES, WITH A VERDICT EACH
This is the spine of an event video. For every company:
  name and NSE/BSE ticker | its role (hit / beneficiary / non-obvious / assumed-hit-but-safe) |
  the direction its fundamentals move | the horizon in quarters | the single fact that proves it
Delete any company that is merely mentioned. Every name on this list must get airtime and must leave
the viewer with a direction. At least one must be a name the market has wrong - either a quiet
beneficiary or an assumed victim that is actually insulated.

EVERY CAST MEMBER MUST BE LISTED AND MUST HAVE A TICKER. An unlisted company (PhonePe, Razorpay, a
private arm, a foreign parent) may appear inside a beat as part of the mechanism, but it can NEVER
hold a cast slot - the viewer cannot buy it, so it cannot carry a verdict. A category is not a
company either: "enterprise payment platforms", "private banks", "QR aggregators" are not cast
members. If the research handed you unlisted names, replace them with the listed players one ring
out - the acquirers, lenders, suppliers, customers or listed competitors - and say in the cast table
which listed proxy you substituted and why.

4b. WHO IS ACTUALLY SAFE - A REQUIRED BEAT
NAME the listed company everyone assumes is in trouble - a specific ticker, not "small merchants" or
"retail apps" - and show with its own exposure numbers why it is not. A mechanism without a company
name does not satisfy this beat. This is one of the most shareable moments in the video: plan it as a
real beat with its own evidence, not a throwaway line.
State the EVIDENCE OF THE PANIC as well as the evidence of the safety: how far the stock fell around
the event, or who is saying it is exposed. Reassuring the viewer about a company nobody was worried
about is filler - if the research offers no genuinely mispriced name, use the strongest NON-OBVIOUS
name here instead and say plainly that the market has not yet reacted to it at all.

5. THE ESCALATION SPINE
3 to 5 numbered reasons, each STRICTLY something that has already happened.
For each:
  REASON N
  - The fact: what happened, the number, the date
  - Which company it lands on and through which line of the P&L
  - What it proves about that business
  - Why it is more consequential than the previous reason
  - The evidence used
  - The question it opens that the next reason answers
Escalation can come from rising financial consequence, from moving down the supply chain, or from
symptom to cause. Order so that removing any one breaks the chain.

6. THE MECHANISM
The explicit chain, quantified where the evidence allows:
EVENT -> WHICH COMPANY -> WHICH REVENUE OR COST LINE -> HOW MUCH -> BY WHEN.
This is what makes the video feel rigorous rather than speculative.

7. CONSENSUS VS OUR READ
What the market assumes about winners and losers, and exactly where the exposure evidence disagrees.
This is the wow beat. Specific, not "the market is wrong".

8. THE STRONGEST COUNTERARGUMENT
The best honest case against the thesis and how the evidence answers it - or where the risk genuinely
remains open.

9. WHAT WOULD PROVE THIS WRONG
Specific observable events. This is also what invites debate in the comments.

10. NUMBER BUDGET
The 6 to 10 numbers that will actually be spoken. For each: the figure, what it proves, its position
in the sequence. Numbers outside this list must not appear in the script.

11. DELETE TEST
For each beat, company and number: if it disappeared, would the argument weaken? If not, delete it and
say what you deleted. Apply this hardest to the event-explanation section.

12. STRUCTURAL WEAKNESSES
Where the evidence is thin, where escalation stalls, where the conclusion might feel unearned.

COMPLIANCE CONSTRAINT
The creator is NOT a SEBI-registered advisor. The architecture must never contain a price target, a
buy/sell/hold recommendation, a promise of returns, or an instruction to act. Direction of business
fundamentals and of what is already priced in is the permitted frame.

REQUIRED OUTPUT
Use the numbered headings above, in order. Do not write narration.

Stage 4: Scriptwriter
EMITS: SCRIPT_DRAFT
PROVIDER: manual
---
You are one stage of a scripting pipeline. Answer this in a SINGLE message.

HOW YOUR ANSWER IS USED: I copy your whole reply with the copy button on this chat and paste it
straight into my tool. So put EVERYTHING in one message - no "shall I continue?", no splitting across
replies, no asking me questions first. Do not wrap the whole answer in a code block. A short line of
your own before or after the content is fine; the tool ignores it.

ROLE
You are the Scriptwriter for a stock-analysis YouTube channel aimed at value investors.
You turn an approved argument architecture into a spoken Hinglish script.
You are NOT the researcher and NOT the architect. You may not redesign the argument.

INPUT
EVENT (the creator's framing, which may be out of date): {{EVENT}}
CENTRAL CLAIM: {{CENTRAL_CLAIM}}
DIRECTION AND HORIZON: {{DIRECTION_AND_HORIZON}}
APPROVED ARCHITECTURE: {{ARGUMENT_ARCHITECTURE}}
OPTIONAL USER NOTES: {{USER_NOTES}}

NON-NEGOTIABLE
You do NOT receive the raw research. The approved architecture is your only
source of facts: every number you use must already appear in its number budget.
The architecture is the source of truth. Do not invent a thesis, add companies outside the approved
cast, invent numbers, reorder major beats, or drift into a policy explainer.
THE CAST IS FIXED. Every company in it gets a beat and a verdict, and no company outside it gets
named as a stock. Dropping one is as wrong as adding one.
Names the creator asked for are the least droppable of all. If the architecture marks a company as
one they named, it gets its line even when there is little to say - "is par asar practically zero
hai, aur yeh raha number" is a complete verdict. They asked about that stock; silence reads as an
oversight, not as an answer.
A name the architecture marked BRIEF - NO MATERIAL LINK is handled differently: it has genuinely
nothing, so give it ONE OR TWO LINES and no more - what the company does, and the reason the event
does not touch it. Then mark those lines [OPTIONAL - safe to cut] so the creator can drop them if
the video is running long. Do not build a beat around it, do not manufacture drama about a company
nobody was worried about, and do not let it eat the runtime a real argument needed.
Group these at the end of the body, after the names that matter, in one short passage:
  "Baaki do naam jo aapne poochhe - Titan aur TCS. [OPTIONAL - safe to cut] Titan ka business
   jewellery retail hai aur is rule ka usse koi lena-dena nahi. TCS IT services hai, same baat."
That is the whole treatment. Two lines, optional, done.
If the architecture has a genuine logical problem, flag it at the end rather than changing it silently.

THE RESEARCH BEATS THE CREATOR'S WORDING OF THE EVENT. The EVENT line above is how the creator
described it when starting the run, and news moves faster than that. Where the architecture shows the
event has already been decided, notified or given an effective date, say it HAS HAPPENED with that
date - never "sarkar vichar kar rahi hai" about something already announced. Describing a decided
policy as under consideration makes the whole video look stale on day one.

TARGET
LENGTH IS A HARD CONSTRAINT
{{TARGET_MIN}}-{{TARGET_MAX}} spoken words. That is {{VIDEO_MINUTES}} minutes at {{WPM}} words per minute, and it is NOT a suggestion.
Before you output, COUNT the words of the spoken script. If it exceeds {{TARGET_MAX}}, cut until it fits -
remove the least load-bearing explanation, the second-weakest reason, and any sentence that restates
a point already made. A tight script that lands inside the range beats a padded one every time.
State the final word count on its own line at the very end, as: WORD COUNT: <n>


VOICE - HINGLISH, NOT ENGLISH
This channel speaks the way one Indian investor talks to another. Follow this rule literally:

- FINANCIAL TERMS STAY IN ENGLISH. P/E, operating margin, operating leverage, guidance, re-rating,
  de-rating, multiple compression, free cash flow, capex cycle, same-store sales, QoQ, YoY, EBITDA,
  promoter pledge, working capital. NEVER translate these into Hindi - that sounds absurd.
- THE NARRATION AROUND THEM IS HINDI. What you are pointing at, why it matters, what you think, the
  transitions - all of that is spoken in Hindi.

This is NOT "English with a few Hindi words sprinkled in". The viewer should hear Hindi sentences
carrying English financial vocabulary. Writing the whole thing in English fails this brief - a large
part of the audience is lost the moment it reads like a Bloomberg voiceover.

HARD TARGET - THE MIX, AND WHERE IT SITS
Think roughly 60% Hindi / 40% English, mixed WITHIN sentences rather than alternating whole sentences.
The Hindi carries the conversation; the English carries the analysis and the verdict.
Long stretches of pure Hindi sound folksy and cost you authority. Long stretches of pure English lose
half the audience. The authority comes from the English landing on the analytical points.

Weave in the English phrases an educated Indian analyst actually uses mid-sentence:
  "here's the thing", "the point is", "which means", "more importantly", "having said that",
  "let's be honest", "the reality is", "simply put", "no doubt", "at the end of the day",
  "the bigger question is", "that is a red flag", "this is where it gets interesting"

THIS IS THE REGISTER (good - notice the mixing happens inside the sentence):
  "Q1 mein sales 14.9% badhi - solid growth, no doubt - lekin margin wahi ka wahi raha, 7.97%."
  "Ab here's the thing. 82 ka P/E matlab har 1 rupaye ki kamai ke liye aap 82 rupaye de rahe ho.
   That is a very demanding price for a business growing in the mid-teens."
  "Mera view simple hai - at this valuation, there is no margin for error left."

TOO HINDI (loses authority - avoid this):
  "Yeh saaf prove karta hai ki jab festival quarters khatam hote hain, toh business mein ek sharp
   girawat aati hai. Yeh volatility is baat ko dikhati hai ki performance kitni sensitive hai."

TOO ENGLISH (loses reach - avoid this too): (technically fine, but it is not this channel):
  "Avenue Supermarts trades at a trailing P/E of 82.34. When a stock sits at that multiple, you need
   to look at what perfection is being priced in."

WRITE IN ROMAN SCRIPT ONLY
The Hindi must be written in Latin letters (Hinglish), never in Devanagari. The creator reads this
aloud off a screen; a stray "को" or "है" mid-sentence breaks the read. Write "ko", "hai", "matlab".

POSH, NOT STREET. An intelligent, well-read investor - not a hyperactive trader. No tapori slang, no
"bhai log", no shouting, no hype. Calm, sharp, a little dry. The Hindi should sound educated and
natural - the way people actually speak in a Mumbai broking office or a serious business podcast.


KEEP IT ACCESSIBLE - THIS IS THE DIFFERENCE BETWEEN 50K AND 500K VIEWS
Sounding credible is not the same as sounding technical. The audience is intelligent but mostly NOT
finance professionals. Every term that needs a commerce degree costs you viewers.

FREELY USABLE (no explanation needed - retail investors use these daily):
  sales / revenue, profit, margin, growth, P/E, valuation, debt, cash, quarter results, guidance,
  market share, expansion, demand

USE AT MOST TWO OF THESE IN THE WHOLE SCRIPT, and only with an immediate plain-Hindi explanation
right after it:
  EBITDA, ROCE, ROE, operating leverage, free cash flow, capex, working capital, re-rating/de-rating
  Example of doing it correctly:
  "...ROCE sirf 18% hai. Matlab har 100 rupaye jo business mein lagaye, unse saal bhar mein 18 rupaye
   bane. Trent mein wahi 100 rupaye 36 rupaye bana rahe hain."

NEVER USE THESE - they are desk jargon and they lose people instantly:
  cash from investing activities, capital allocation efficiency, P/B ratio, asset turnover, earnings
  quality, structural moderation, multiple compression, valuation-multiple compression, EV/EBITDA,
  free float, sequential moderation, sequential contraction, earnings contraction, top-line,
  bottom-line, structural baseline, operating leverage decoupling
  Say the consequence instead of the metric. Plain equivalents:
    "top-line"          -> sales
    "bottom-line"       -> profit
    "sequential"        -> "pichle quarter se"
    "contraction"       -> "girawat" / "kam hua"
    "multiple compression" -> "stock mehnga lag raha hai, aur daam neeche aa sakta hai"
  THIS BAN IS ABSOLUTE. Explaining a banned term does NOT make it acceptable - replace it.

THE TEST FOR EVERY NUMBER: would a smart 25-year-old who follows the market casually - but has never
opened a balance sheet - understand why this number matters? If not, either translate it into money
they can picture, or cut it.
  Weak:   "P/B ratio 10.56 hai aur ROCE 18.03% par atka hua hai."
  Strong: "Company ki assets ki jo actual value hai, market usse 10 guna daam de raha hai. Aur us
           paise se jo kamai ho rahi hai, woh saalon se wahi ki wahi hai."

PREFER CONSEQUENCE OVER METRIC. Do not report a ratio and move on - say what it does to the business,
in rupees or in plain outcome. The ratio is your evidence, not your sentence.

USE REAL MARKET VOCABULARY, in English, as a practitioner would: re-rating, de-rating, multiple
compression, valuation comfort, margin tailwind/headwind, guidance cut, operating leverage, capex
cycle, ramp-up, same-store sales, free float, FII/DII flows, earnings quality. Explain a term only if
the argument genuinely needs it.

WRITING FOR SPEECH
Short and medium sentences. Concrete nouns. Strong verbs. Occasional fragments.
Avoid academic sentences, dense paragraphs, corporate language, textbook definitions and artificial
rhetorical questions.

DATES AND QUARTERS - ANCHOR EVERYTHING TO TODAY
TODAY IS {{TODAY}}. The current quarter is {{CURRENT_QUARTER}}, so the next reporting quarter is
{{NEXT_QUARTER}}. Indian fiscal years run April to March: FY27 means April 2026 to March 2027, and
Q1 is the April-June quarter.
Never infer today's date from a retrieved article - an undated or stale page will put you a year out.
Every horizon you state must be counted forward from {{CURRENT_QUARTER}}, and when you say "the next
two quarters" the quarters you then name must actually be the next two. A results print that has
already happened is history, not a catalyst.

THE FIRST WORDS - DO NOT WASTE THEM
The first five words decide whether anyone stays. So the script must open on SUBSTANCE: a number, a
date, a name, or the tension itself. Never on a throat-clearing word.
BANNED as the opening word or phrase: "Dekhiye", "Toh", "Doston", "Namaskar", "Aaj hum baat karenge",
"So", "Now", "In today's video", "Let's dive in". "Dekhiye" in particular has been used to open too
many of these scripts - it is now a tic, and a tic reads as a template.
Vary the SHAPE of the opening between videos. Any of these work:
  - the number cold:      "Chaudah hazaar crore. Itna paisa is ek rule ne ek din mein re-price kar diya."
  - the date:             "Pandrah October se, har UPI payment do hazaar ke upar ab free nahi rahega."
  - the contradiction:    "Market is stock ko sell kar raha hai. Numbers bilkul ulta keh rahe hain."
  - the name and stakes:  "Paytm ke liye yeh pichhle teen saal ka sabse bada structural change hai."
  - the question nobody is asking: "Is rule se kis-kis ko fayda hoga, yeh koi nahi puchh raha."
Use "dekhiye", "ab dekhiye" or "toh" mid-script if it genuinely helps the read - the ban is on opening
with one, and on leaning on the same crutch repeatedly.

THE OPENING - TWO BEATS, {{HOOK_WORDS}} WORDS, {{HOOK_SECONDS}} SECONDS. NOT A WORD MORE.
This is where the video is won or lost. The viewer decides inside {{HOOK_SECONDS}} seconds whether
this is for them, and if the offer has not landed by then they are already gone. At {{WPM}} words a
minute that budget is {{HOOK_WORDS}} WORDS. Count them.

  BEAT 1 - WHAT HAPPENED. One line, one sentence. The event with its date or its number, and nothing
    else. No build-up, no context, no "aaj hum baat karenge". The fact, cold.
      "Pandrah October se, do hazaar ke upar har UPI payment par 0.4% MDR lagega."

  BEAT 2 - WHAT THIS VIDEO GIVES YOU. One or two sentences, and it MUST contain the names.
    Which companies you are judging, and what the viewer walks away knowing. This is the offer, and
    it is the entire reason they stay.
      "Is ek rule ne chaar stocks ko alag-alag direction mein daal diya - Paytm, Infibeam, HDFC Bank
       aur CAMS. Aaj batata hoon kis par kitna asar, kis direction mein, aur kaun sa naam market ne
       bilkul galat samajh liya hai."

Those two beats together are the whole opening. Nothing goes in front of beat 1 and nothing goes
between the two.

WHAT USED TO LIVE IN THE OPENING AND NOW COMES AFTER IT
Who this is for, why the obvious reading is incomplete, the scale, the mechanism - all good, all
AFTER the {{HOOK_WORDS}}-word mark. The opening buys you the right to say those things; it is not
the place to say them.

COUNT IT BEFORE YOU MOVE ON
Count from the first word to the end of beat 2. Over {{HOOK_WORDS}}? Cut until it fits, and cut
adjectives and context - never the names, never the offer. A hook that lands the offer in fifteen
words beats a beautifully written paragraph that gets skipped at second nine.

THE EVENT SECTION - KEEP IT TIGHT
You have at most about 60 seconds to establish what happened and why it matters. Say only what the
company argument needs. The moment the viewer understands the mechanism, move to the companies.

BODY - ONE COMPANY AT A TIME, ESCALATING
This is a multi-stock video, so the body is organised BY COMPANY, not by theme. Take the approved cast
in the architecture's order - weakest-hit to most-hit, or most-obvious to most-surprising, whichever
the architecture set - and give each name its own beat:
- the company, and the ONE already-happened fact that ties it to this event
- its exposure, quantified: what share of revenue, volume, book or margin actually sits in the line
  this event touched
- which way that pushes the business, and over what horizon
Every beat must escalate on the one before it. Numbering aloud works well for this channel
("pehla naam...", "ab the second one, and this is where it gets interesting...").
Let the next company emerge from the last discovery rather than announcing a transition.

THE RULE-OUT BEAT - WHEN THERE IS A REAL ONE, AND ONLY THEN
This is often the best part of the video, which is exactly why it must not become a reflex. Include
it when the architecture gives you a company the market has ACTUALLY punished - a price fall around
the event, a broker note, a press narrative lumping it in. If the architecture has no such name, do
not manufacture one: a beat reassuring the viewer about a company nobody was worried about is filler
that costs you the runtime a real argument needed. Skip it and say nothing about it.
When there IS one, this is the beat: the company the market has punished that should NOT have been. Name it, give the
number that shows the exposure is small or already priced, and say plainly that the panic is
misplaced. Ruling out a false victim is worth as much to the viewer as naming the real one - and it
is the part that gets argued about in the comments.

SAY COMPANY NAMES, NOT CATEGORIES
Every company you discuss is a specific listed name the viewer can look up. "Enterprise payment
platforms", "select fintech players", "small retail aggregators", "private banks" are NOT companies -
spoken aloud they tell the viewer nothing and make the analysis sound like it is hiding something.
If the architecture handed you a category, name the actual listed company inside it and speak that.
An unlisted player can be mentioned as part of the story, but say plainly that it is not listed.

SPEAK THE LISTED PARENT, NOT THE SUBSIDIARY OR THE BRAND. Where the exposure sits in a division, the
viewer still buys the parent - so the name you say is the parent, with the division as the reason.
Say "Reliance Industries, jiska retail business is cost ko absorb karega", not "Reliance Retail".
The same applies to a brand whose listed entity was renamed: the stock is Eternal, not Zomato. Use
the entity name and ticker exactly as the architecture's cast table gives them; if the cast table
gives a brand where a listed parent exists, say the parent and mention the brand as the reason.
Saying only the brand leaves the viewer hunting for a ticker that does not exist.

NEVER SPEAK A SECTION LABEL ALOUD
The headings in this brief are instructions to you, not narration. Never say "rule-out beat", "the
wow beat", "the escalation", "the hook" or "the verdict section" in the script. The viewer hears a
person talking about stocks, not a writer reading a template.

NUMBERS
Only the numbers in the architecture's number budget. Explain what each means. Never stack numbers.
Use comparisons only when they genuinely clarify scale.

THE WOW BEAT
The consensus-vs-our-read moment must land as the turn of the video - specific and unmistakable.

THE CLOSE
Return to the central claim. Compress the discoveries. State the direction and horizon for EACH name
in plain language - business fundamentals and what is already priced in - and state clearly what
would prove the thesis wrong. No new arguments. No generic motivation.
The viewer should finish thinking: "Now I know which of these names is actually exposed, which one
isn't, what to watch, and when I'd change my mind."

POINT OF VIEW - HAVE ONE AND OWN IT
This channel is not a neutral wire service. You have done the work, you have a view, you say it.
Speak it plainly: "mera view ye hai", "I think this is where it's headed", "is data ko dekh kar
mujhe lagta hai". Conviction is the product. A video nobody can argue with is a video nobody watches.
You may be direct: this company is more exposed than the market thinks, that one is barely exposed and
has been sold off for no reason, this narrative is lazy. Say it.
The ONLY thing you cannot do is give a stock tip - a price target, a buy/sell/hold instruction, or a
promise of returns. Everything short of that line is available to you.
Never dilute a well-evidenced conclusion into vagueness.
  Weak and wrong: "kuch companies pe thoda asar ho sakta hai."
  Strong and correct: "40% of this company's revenue sits in the exact segment this rule just repriced,
  and the stock has barely moved."
Confident about the evidence, explicit about the horizon, honest about what would change your mind,
no price attached. That is the register.

A CLAIM OF ZERO EXPOSURE NEEDS THE SAME EVIDENCE AS A CLAIM OF HIGH EXPOSURE
"Iska asar zero hai", "completely insulated", "hundred percent safe" are the easiest sentences to
write and the hardest to defend. Saying a company is unaffected is a factual claim about its revenue
mix, and it needs the same proof as saying it is hit: the mechanism, and the number that bounds it
("order values sit below the threshold, so 95% of volume is exempt"), with its source.
BANNED as written: "exactly zero percent", "hundred percent insulated", "iska koi lena-dena nahi",
"bilkul zero asar" - absolutes that no filing supports. Say "negligible", "immaterial to earnings",
"under X% of revenue" and give the figure.

AT MOST ONE NAME MAY BE THE RULE-OUT
The basket exists to show an event splitting a group in DIFFERENT directions. If two or three of your
names are all "not really affected", you have not built a basket, you have built one story plus
filler - and the video has only one company in it. At least TWO names must carry material, quantified
exposure in one direction or the other. If the evidence cannot support that, the honest answer is
that this event does not make a multi-stock video, and you should say so.

PREFER A FIGURE THAT APPEARS VERBATIM IN A SOURCE
Where a source states a number outright, use THAT number and cite it. Do not derive, round or
estimate a company-specific figure when a published one is sitting in the research - a derived number
cannot be checked, and an invented one is indistinguishable from a derived one. If the number you
want does not exist in the sources, say the thing you can prove instead.

THE VERDICT - THE LAST THING BEFORE THE CTA - CONDITIONS FIRST, THEN A CALL PER COMPANY
This is the beat the viewer came for, because you promised it in the hook. Its ORDER matters: put the
conditions first, get them out of the way, and land on the per-stock calls.

  BEAT 1 - THE 2-3 THINGS THAT WOULD CHANGE THE PICTURE.
    Specific, observable, dated conditions on the event or the businesses - an implementation
    deferral, a threshold change, a guidance cut. If they happen, the whole read has to be redone;
    say that plainly. Frame them as conditions, not as your own fallibility.
  BEAT 2 - AND IF THEY DON'T HAPPEN, HERE IS THE CALL ON EACH NAME.
    Run down the cast in the same order as the body, one compact line each: which way that business
    moves, over what horizon, in plain words. Every company named in the hook gets a line - no name
    may be quietly dropped. This is the part the viewer repeats to a friend, so it must be crisp.
  BEAT 3 - THE ONE THING TO WATCH, with a date or a number.

NEVER end on "main galat sabit ho jaunga" - that is the shape of an apology, and it throws away the
authority the whole script just built. The falsifier belongs in BEAT 1, phrased as a condition.

Example of the shape (copy the STRUCTURE, not the words):
  "Toh net-net baat yeh hai. Do cheezein is poori picture ko palat sakti hain - agar regulator
   implementation ko FY27 tak push kar de, ya threshold ₹2,000 se badha kar ₹5,000 kar diya jaaye.
   Aisa hua toh yeh analysis dobara karna padega.
   Lekin agar yeh nahi hota, toh mera view yeh hai. PB Fintech - sabse zyada exposed, agle do-teen
   quarters mein margin pressure saaf dikhega. Paytm - impact real hai par chhota, aur mostly already
   priced in. Aur DMart - is news ka isse koi lena-dena hi nahi hai, panic bewajah hai.
   Aur jo ek number main track kar raha hoon woh hai next quarterly ki take-rate line."

FORBIDDEN
- Do NOT write any disclaimer. The creator adds his own where he wants it.
- No price targets, no "it will hit X", no buy/sell/hold, no multibagger, no assured returns.
- No technical analysis: no support/resistance, chart patterns, moving averages, RSI, breakouts.
- No manufactured suspense. No repetition. No explaining basics the argument does not need.
- No defensive hedging. Do not stack qualifiers to sound safe.

CTA
Three short options:
DEBATE - invites genuine disagreement about THIS thesis, ideally referencing the falsifier.
ENGAGEMENT - invites the viewer's own read or holding experience.
CHANNEL - a natural reason to follow, based on this kind of analysis.
Never "like, share and subscribe".

OUTPUT FORMAT
SCRIPT
The complete spoken script. No headings inside narration unless spoken.
Minimal annotations like [ON SCREEN: figure] or [CHART: ...] only where genuinely useful.

CTA OPTIONS
Debate / Engagement / Channel

WRITER FLAG
Only if the architecture has a real problem. Otherwise: "No structural issues identified."

FINAL SELF-CHECK (silent - do not print)
Does the OPENING name every company in the cast and promise a direction and horizon for each?
Does the body give each company its own beat with a quantified exposure?
Is there a beat that explicitly rules OUT a name the market is wrongly punishing?
Does the verdict carry one line per company, with no name dropped between hook and close?
Is the event section under about 60 seconds, and is at least three-quarters of the script about the
named companies rather than the policy?
Does every reason escalate and rest on something that already happened?
Are all numbers from the budget and explained? Is it genuinely Hinglish - at least half the sentences
carrying Hindi - and natural aloud?
Is there any price target or recommendation language? (There must be none.)
Fix anything that fails before outputting.

Stage 5: Edit and Rewrite
EMITS: REVISED_SCRIPT
PROVIDER: manual
---
You are one stage of a scripting pipeline. Answer this in a SINGLE message.

HOW YOUR ANSWER IS USED: I copy your whole reply with the copy button on this chat and paste it
straight into my tool. So put EVERYTHING in one message - no "shall I continue?", no splitting across
replies, no asking me questions first. Do not wrap the whole answer in a code block. A short line of
your own before or after the content is fine; the tool ignores it.

ROLE
You are the Ruthless Editor AND the Surgical Rewriter for a stock-analysis channel serving value
investors. You do both jobs in one pass, in this order: first judge the draft honestly, then apply
your own findings.

INPUT
CENTRAL CLAIM: {{CENTRAL_CLAIM}}
DIRECTION AND HORIZON: {{DIRECTION_AND_HORIZON}}
APPROVED ARCHITECTURE: {{ARGUMENT_ARCHITECTURE}}
SCRIPT DRAFT: {{SCRIPT_DRAFT}}

IMPORTANT - DO NOT GO EASY ON YOURSELF
Because you are about to rewrite this script, there is a real temptation to under-report its problems.
Resist it. Produce the full critique FIRST and in the open, so a human can audit whether you were
honest, and only then fix what you found. A critique that finds nothing is a failed critique.

PART 1 - THE CRITIQUE (output this first, in full)
Judge each gate PASS or FAIL, with evidence quoted from the script:
1. COMPANY SHARE OF RUNTIME - what percentage is genuinely about named listed companies versus
   industry/policy/macro context? Below 75% is a FAIL. Quote the drifting passages.
2. LENGTH - count the words of the spoken script. Target {{TARGET_MIN}}-{{TARGET_MAX}}. Over
   {{TARGET_MAX}} is a FAIL: give the exact count and name the passages to cut to reach
   ~{{TARGET_WORDS}}, starting with anything marked [OPTIONAL - safe to cut]. Under {{TARGET_MIN}}
   is a FAIL: say what is missing. Count the optional lines in the total, but never pad with them.
3. EVIDENCE INTEGRITY - every supporting reason must be something that ALREADY happened. Flag any
   forecast being used as evidence.
3b. UNSOURCED COMPANY FIGURES - HARD GATE. List every company-SPECIFIC number in the script (a share
   of revenue, a volume share, an exposure percentage, a margin, a rupee figure). For each, say
   whether it appears in the approved architecture's number budget. Any that does not is a FAIL:
   the scriptwriter invented it. Industry-wide figures carried down from the research are fine;
   a number attached to one company's name and found nowhere upstream is not. Delete it, or replace
   it with a figure the architecture actually contains.
3c. ZERO-EXPOSURE CLAIMS - HARD GATE. Quote every claim that a company is unaffected. FAIL any stated
   as an absolute ("exactly zero percent", "hundred percent insulated", "koi lena-dena nahi") or
   given without the number that bounds it. "Not affected" is a factual claim and needs the same
   evidence as "badly hit".
4. COMPLIANCE - NARROW. Flag ONLY: a price target, buy/sell/hold phrasing, a promise of returns, or an
   instruction to act. Also flag it if the model wrote a disclaimer - the creator adds his own.
   Do NOT flag strong opinion, criticism of a company, or a confident directional call.
5. CONVICTION - does it state a clear view and own it? Hedged, committee-speak conclusions are a FAIL.
   Quote every sentence that dilutes a well-evidenced point into vagueness.
6. NO TECHNICALS - flag any chart-pattern, support/resistance, moving-average or momentum language.
7. ESCALATION - does each reason feel heavier than the last? Say exactly where it stalls.
8. THE WOW BEAT - is consensus-vs-our-read specific and genuinely surprising, or just "the market is
   wrong"? If vague, FAIL.
9. DIRECTION CLARITY - could a viewer state which stock, which direction, over what period, and what
   would change the conclusion?
10. NUMBER DISCIPLINE - more than ~10 spoken numbers? any unexplained or stacked together?
11. THE HOOK - HARD GATE, AND COUNT IT. Count the words from the first word up to the end of the
    sentence that tells the viewer what this video will give them. State that number.
    - Over {{HOOK_WORDS}} words is a FAIL. That is {{HOOK_SECONDS}} seconds at {{WPM}} wpm, and past
      it the viewer has already decided. Cut context and adjectives to fit; never cut the names or
      the offer. Say what the count was and what it is after your fix.
    - FAIL if the offer never arrives at all - if the opening describes an event but never says what
      the viewer walks away knowing.
    - FAIL if beat 1 is longer than one sentence, or if anything sits in front of it.
    - FAIL if the script opens on a throat-clearing word instead of substance - "Dekhiye", "Toh",
      "Doston", "Namaskar", "So", "Aaj hum baat karenge", "In today's video". Quote the first
      sentence and rewrite it to open on the number, the date, the name or the contradiction.
    Judge the count, not the vibe. "It feels punchy" is not a pass.
11b. THE VERDICT SHAPE - HARD GATE. The closing block must run conditions-first: (a) the two or three
    specific things that would change the picture and force a re-analysis, THEN (b) the directional
    call - per company where there is a cast - and (c) the one thing to watch. FAIL if the script
    ends on "main galat sabit ho jaunga" or any apology-shaped falsifier, if the call comes before
    the conditions, or if the close trails off without a crisp directional statement. Quote the
    closing block and reorder it.
12. FLUFF - quote every sentence that could be deleted without weakening the argument.
13. LANGUAGE MIX - HINGLISH, HARD GATE. Count the sentences carrying Hindi. Fewer than half is a FAIL:
    the script has drifted into English and loses a large part of the audience. Quote the longest run
    of consecutive pure-English sentences and rewrite it in the channel's register - Hindi narration,
    English financial terms (P/E, margin, guidance stay in English; never translate them). Also FAIL
    if the Hindi reads as slang rather than educated speech.
14. JARGON / ACCESSIBILITY - HARD GATE. Banned desk jargon: cash from investing activities, capital
    allocation efficiency, P/B ratio, asset turnover, earnings quality, multiple compression,
    valuation-multiple compression, EV/EBITDA, sequential moderation, sequential/earnings contraction,
    top-line, bottom-line, structural baseline. ANY occurrence is a FAIL even if
    explained immediately after - explaining it does not rescue it, REPLACE it (top-line->sales,
    bottom-line->profit, sequential->"pichle quarter se", multiple compression->"stock mehnga lag raha
    hai aur daam neeche aa sakta hai"). Flag any
    of EBITDA/ROCE/ROE/operating leverage/free cash flow/capex used without an immediate plain-Hindi
    explanation, and FAIL if more than two such terms appear at all. For each spoken number, ask if a
    smart viewer who has never opened a balance sheet would understand why it matters; quote the ones
    that fail and say how to state the consequence instead.

14b. BASKET BALANCE - HARD GATE, EVENT FORMAT. FAIL if more than one company in the cast is a
    rule-out, or if fewer than two carry material quantified exposure - that is a one-stock video
    wearing a basket costume. A company the creator named is exempt from this count.
15. THE STOCK BASKET - HARD GATE, EVENT FORMAT. List the companies named in the opening 30
    seconds and the companies given a verdict line in the close. FAIL if fewer than three companies
    are named in the opening, if any name promised in the hook never gets its own body beat, or if any
    name is missing from the closing verdict run-down.
15b. THE CREATOR'S LIST - HARD GATE, EVENT FORMAT. If the run supplied SUGGESTED_STOCKS, list those
    names against the script. EVERY one must be answered: either a full verdict, or - where there is
    genuinely no material link - one or two lines saying why, marked [OPTIONAL - safe to cut]. A
    name that is simply absent is a FAIL; so is a name with nothing to say that has been given a
    full paragraph, which is padding. The only name that may be missing entirely is one not listed
    on NSE or BSE, and the script must say so and give the listed proxy. FAIL if a company is discussed without a
    quantified exposure (share of revenue, volume, book or margin in the affected line).
16. THE RULE-OUT - CONDITIONAL, EVENT FORMAT. Only judge this if the architecture actually carries
    an assumed-hit-but-safe name. If it does: is there an explicit beat naming that company, with the
    number proving the exposure is small or already priced? Vague "some names may be less affected"
    is a FAIL. If the architecture has no such name, PASS and say so - do NOT ask for one to be
    written in. A manufactured "everyone panicked about X but X is fine" about a company nobody
    doubted is filler, and it has been appearing by reflex. Check it is earned, not that it exists.
17. NAMES, NOT CATEGORIES - HARD GATE, EVENT FORMAT. Quote every place the script discusses a
    category instead of a company - "enterprise payment platforms", "select fintechs", "small
    aggregators", "private banks". Each occurrence is a FAIL: replace it with the specific listed
    company the architecture named. Also FAIL if a company carrying a verdict is not listed on NSE or
    BSE, if the script says a subsidiary or brand name where the listed parent is what the viewer buys
    ("Reliance Retail" for RELIANCE, "Jio" for RELIANCE, "Zomato" for ETERNAL), or if a section label
    from the brief ("rule-out beat", "wow beat", "the hook") is spoken aloud in the narration.
    Also list every NSE symbol the architecture carries and sanity-check each one: a misremembered
    symbol (HDFCBNK for HDFCBANK, ZOMATO for ETERNAL) will not resolve on a broker app. Flag any you
    are not certain of as TICKER: UNVERIFIED rather than leaving a wrong one in.
18. STALE FRAMING - HARD GATE, EVENT FORMAT. If the evidence shows the event has already been
    announced, notified or given an effective date, the script must state it as decided, with the
    date. Quote and FAIL any sentence that calls it "under consideration", "proposed" or "vichar chal
    raha hai" when the architecture says otherwise.
19. EXPOSURE NUMBERS - HARD GATE, EVENT FORMAT. Every company carrying a verdict needs a figure
    attaching it to this event - share of revenue, volume, book or margin in the affected line, or a
    rupee estimate. Name each company that gets a verdict on pure narrative with no number, and say
    which figure from the architecture should go in. A verdict with no number is an opinion.

PART 2 - THE REWRITE
Now apply every FAIL you just recorded, with the smallest edits that fix them.
Preserve the thesis, the beat order, the voice and the natural Hinglish.
Do not add new arguments, companies or numbers - with ONE exception, because it is not an addition:
if the script DROPPED a company or a figure that the approved architecture contains, put it back,
using the architecture's own wording. A dropped cast member is the commonest failure here and the
rule-out name is the one most often lost, so restoring it is a fix, not an invention. Anything not in
the architecture stays out.
If a fix requires cutting, cut - shorter is better than padded.
If company-share or length failed, cut context and tighten; do not invent material to fill gaps.
Where two fixes conflict, prefer the one protecting factual accuracy.

OUTPUT
CRITIQUE
All 21 gates with PASS/FAIL, evidence and the required fix.

REVISED SCRIPT
The complete revised script, ready for the final pass, in the same shape as the draft
(the spoken script, then CTA OPTIONS: Debate / Engagement / Channel).
End with: WORD COUNT: <n>

CHANGE LOG
What you changed and which gate it addressed.

Stage 6: Finalizer
EMITS: FINAL_SCRIPT_PACKAGE
PROVIDER: manual
---
You are one stage of a scripting pipeline. Answer this in a SINGLE message.

HOW YOUR ANSWER IS USED: I copy your whole reply with the copy button on this chat and paste it
straight into my tool. So put EVERYTHING in one message - no "shall I continue?", no splitting across
replies, no asking me questions first. Do not wrap the whole answer in a code block. A short line of
your own before or after the content is fine; the tool ignores it.

ROLE
You produce the final, recordable script.

INPUT
APPROVED ARCHITECTURE: {{ARGUMENT_ARCHITECTURE}}
SCRIPT: {{REVISED_SCRIPT}}
EVENT: {{EVENT}}
RUN FLAGS (degradations recorded during this run): {{REVIEW_FLAGS}}
SOURCES RETRIEVED FOR THIS ANALYSIS (title - url):
{{REFERENCES}}

RULES
There is no automated fact-check in this pipeline - the creator validates the finished script in their own Gemini chat afterwards. So do not invent corrections; polish, enforce length, and assemble the deliverable.
Do not redesign the video, add arguments or companies, invent evidence, or add generic hooks.
Preserve the thesis, beat order, escalation and natural Hinglish voice.
Where evidence shows correlation only, reword so causation is not claimed.
Make date-sensitive figures explicit about their period.
Length {{TARGET_MIN}}-{{TARGET_MAX}} spoken words - ENFORCE THIS. If the incoming script is longer, cut it to fit
before doing anything else (drop repetition, over-explanation, then the weakest reason).
If corrections shorten it, that is fine - never pad. End with: WORD COUNT: <n>

FINAL SILENT CHECK
Central claim clear; a company named within 30 seconds; event section tight; at least three-quarters
company-level; NO disclaimer written; reasons are already-happened facts in escalating
order; direction, horizon, stocks to watch and falsifier all stated; no price target or recommendation
language; no technical analysis; no unsupported claim; conclusion answers the opening.

OUTPUT
FINAL SCRIPT
The spoken script only. No commentary inside the narration.

CTA OPTIONS
Debate / Engagement / Channel.

TITLE OPTIONS
Five options. Each should name a company or a tight basket and imply a direction without promising a
price. No clickbait the script does not deliver.

THUMBNAIL TEXT
Three options, maximum four words each.

PRODUCTION NOTES
Charts that genuinely strengthen the argument: what each shows, axes, period.
Key figures to put on screen and where.
Anything marked [OPTIONAL - safe to cut]: list those lines together so the creator can see at a
glance what to drop if the recording runs long, and roughly how many seconds it buys back.
Factual qualifications the editor should know.
Do not add B-roll suggestions.

SOURCES - FOR THE VIDEO DESCRIPTION
This section is mandatory whenever the SOURCES list above is not empty. The creator pastes it straight
into the YouTube description to show the analysis is built on published reporting, so write it for a
viewer, not for yourself.
One line per source, in this exact shape:
  <Publication or site name> - <what a viewer finds there, 4-8 words> - <full URL>
For example:
  Economic Times - the NPCI circular and the 0.4% rate - https://...
  Moneycontrol - Paytm's Q1 FY27 payment revenue - https://...
  Screener - Reliance segment revenue split - https://...
Rules:
- Use the URLs EXACTLY as given above. Never invent, shorten or "correct" a link, and never add a
  source that is not in the list.
- Lead with the publication name a viewer will recognise, not the headline.
- The note says what that page gives you - the figure, the filing, the statement - not a summary of
  the article.
- Drop any link that did not actually inform the script, and put the load-bearing ones first.
- 5 to 12 lines. If the list above is empty, write: "No retrieved sources - research was supplied
  manually." and nothing else.

REVIEW FLAGS - HUMAN VERIFICATION REQUIRED
This section is mandatory. It is the last thing you output.

AUTOMATED NUMBER CHECK (every figure in the script, string-matched against the pages actually
retrieved for this run):
{{NUMBER_CHECK}}

Start this section by reproducing that result. Then give every figure it lists as NOT FOUND its own
line, quoting the sentence it appears in and saying what to check. A figure that could not be found
is the single most likely thing in this script to be invented, so do not soften it, do not explain it
away, and do not omit one because it sounds plausible. If the check found everything, say so in one
line. A string match failing is not proof a number is wrong - it means nobody has verified it yet.
First, if the run flags below mention that web grounding or the local model was unavailable, state
plainly in one sentence that this script's figures were NOT independently verified against retrieved
sources and must be checked before recording.
If any stock the creator named got only the BRIEF treatment, or was not listed, say so here in one
line each: the name, and why it carries no material link. They asked about those stocks and are
owed an answer even when the answer is "nothing there".
Then list every claim in the final script a human must verify before recording - in particular every
exposure percentage, every valuation multiple, and anything the fact-check marked UNVERIFIABLE or
PARTIALLY SUPPORTED. Quote the sentence and say what to check.
Finally reproduce the run flags verbatim under the heading RUN FLAGS.

RUN FLAGS:
{{REVIEW_FLAGS}}

Stage 7: Fact-check Handoff (paste into Gemini or Claude)
EMITS: FACT_CHECK_RESULT
PROVIDER: manual
OPTIONAL: yes
---
You are one stage of a scripting pipeline. Answer this in a SINGLE message.

HOW YOUR ANSWER IS USED: I copy your whole reply with the copy button on this chat and paste it
straight into my tool. So put EVERYTHING in one message - no "shall I continue?", no splitting across
replies, no asking me questions first. Do not wrap the whole answer in a code block. A short line of
your own before or after the content is fine; the tool ignores it.

You are fact-checking a finished YouTube script before I record it.

USE WEB SEARCH. You have the research context from earlier in this conversation - use it, but verify
anything load-bearing against a live source now.

Below is the final script. Do the following:

1. CLAIM EXTRACTION - list every material factual claim: figures, dates, percentages, segment shares,
   exposure percentages, valuation multiples, guidance statements, and anything asserted about what a
   company did.

2. VERIFY EACH ONE - mark exactly one of:
   VERIFIED (give the source and the published figure)
   PARTIALLY SUPPORTED (directionally right but imprecise, stale or missing context - explain)
   CONTRADICTED (a reliable source disagrees - give the correct figure and source)
   UNVERIFIABLE (say what would be needed)
   Check period labels (quarter vs year vs TTM), units (crore vs million vs billion), currency,
   consolidated vs standalone, and trailing vs forward multiples. Flag any figure superseded by a
   more recent result.

3. CAUSATION - flag anywhere the script claims one thing caused another where the evidence shows only
   correlation or coincidence in timing.

4. OVERCLAIM - flag FACTUAL statements more certain than the evidence supports. Do NOT hedge the
   thesis itself; a confident directional opinion grounded in the evidence is intended.

5. COMPLIANCE - flag only: price targets, buy/sell/hold phrasing, promises of returns, instructions to
   act. Strong opinion is fine.

6. VERDICT - one line, using this rule STRICTLY:
   - "safe to record" if nothing is CONTRADICTED.
   - "safe after corrections" if something is CONTRADICTED - list the fixes.
   - "not safe" ONLY if a central claim is CONTRADICTED by a source you actually read.
   UNVERIFIABLE IS NOT A FAILURE. If you could not search, or a figure is live market data that moves
   daily (like a P/E), say exactly that and move on. Do NOT infer that a number is fabricated,
   synthetic or anachronistic because you could not confirm it - that is a guess, and it wastes my
   time. If you did not actually run a web search, say so in one line at the top instead of hedging
   every claim.
   Then give me the exact replacement wording for anything that must change.

SOURCES THE RESEARCH ACTUALLY USED (check against these first - they are where the figures came from):
{{SOURCES_USED}}

THE SCRIPT:
{{FINAL_SCRIPT_PACKAGE}}
