# ASSETS (v6) — G4 · U1 · L2 · الإملاء · «دخول حروف (ف–ب–ك–ل) على الكلمة المعرَّفة بـ(ال)» (صندوق الأحلام)

Stage **1800 × 1200**, safe area **x 120–1670, y 190–1025** (invisible). `index.html` opens by double-click (no server, no internet, no library). Images in `images/`, effects in `sfx/`, voices in `vo/`, fonts in `fonts/`, every text and sound id in `animate-data.js` (`ANIMATE_DATA`, `ANIMATE_SOUNDS`). Nothing embedded (no base64).

## Background and camera

One background file `images/bg_plate.jpg` (**2700 × 1800** = stage × the largest zoom 1.5). The camera only moves/scales this image; every other element sits in stage pixels.

| Screen | Zoom | originX | originY |
|---|---|---|---|
| Intro | ×1.5 | 644 | 447 |
| Quiz | ×1.0 | 0 | 0 |
| Result | ×1.2 | 419 | 150 |

## Images

| File | Size (px) | Screen | What it is | Notes |
|---|---|---|---|---|
| `bg_light_rays.png` | 900 × 600 | all | soft light rays over the board (drifts) | shown at 1800×1200 = ×2 upscale of a 900×600 source → needs larger art |
| `bg_plate.jpg` | 2700 × 1800 | all | background — one image, camera zoom ×1.5 max | PLACEHOLDER extension: top/bottom bands are a blurred extension of 16:9 art; needs real 3:2 art ≥ 2700×1800 |
| `intro_star.png` | 90 × 84 | intro | pulsing chalk star (white chalk fill) | shown 36–60 px |
| `quiz_btn_play.png` | 110 × 109 | quiz | play-sentence button (triangle) |  |
| `quiz_btn_slow.png` | 62 × 62 | quiz | slow-word (turtle) button |  |
| `quiz_chalk_piece.png` | 121 × 65 | quiz | chalk stick that travels along the sentence |  |
| `quiz_crumple_ball.png` | 101 × 109 | quiz | crumpled wrong paper (ball) |  |
| `quiz_crumple_half.png` | 211 × 153 | quiz | crumpled wrong paper (half) |  |
| `quiz_glow.png` | 220 × 203 | quiz | glow behind the revealed correct paper | shown ≈ 472×265 (×2.1 upscale) → needs larger art |
| `quiz_hint_cream.png` | 290 × 302 | quiz | hint paper — default (cream #f8efea) | size-sensitive: text area |
| `quiz_hint_mint.png` | 290 × 302 | quiz | hint paper — right answer (#cee7d7) | size-sensitive |
| `quiz_hint_pink.png` | 290 × 302 | quiz | hint paper — wrong answer (#f2bda7) | size-sensitive |
| `quiz_hint_tape.png` | 129 × 46 | quiz | tape on the hint paper |  |
| `quiz_next_calendar.png` | 340 × 204 | quiz | «التالي» desk calendar (from your next+ image, cropped 340×204) | size-sensitive: label sits on the sheet |
| `quiz_next_page.png` | 340 × 152 | quiz | blank top sheet of the calendar that flips up (cut from the same image) | size-sensitive: hinge at y = 40 of the calendar |
| `quiz_note_fold_grey.png` | 134 × 111 | quiz | flying note: folded (missed) |  |
| `quiz_note_fold_mint.png` | 134 × 111 | quiz | flying note: folded (second try) |  |
| `quiz_note_fold_yellow.png` | 134 × 111 | quiz | flying note: folded (first try) |  |
| `quiz_note_half_grey.png` | 172 × 88 | quiz | flying note: half-folded (missed) |  |
| `quiz_note_half_mint.png` | 172 × 88 | quiz | flying note: half-folded (second try) |  |
| `quiz_note_half_yellow.png` | 172 × 88 | quiz | flying note: half-folded (first try) |  |
| `quiz_note_open_grey.png` | 211 × 140 | quiz | flying note: open (missed) |  |
| `quiz_note_open_mint.png` | 211 × 140 | quiz | flying note: open (second try) |  |
| `quiz_note_open_yellow.png` | 211 × 140 | quiz | flying note: open (first try) |  |
| `quiz_paper_yellow.png` | 315 × 139 | quiz | answer paper | size-sensitive: option text centred in it |
| `quiz_piece_noun.png` | 357 × 180 | quiz | rule piece: noun (P07 torn paper) | size-sensitive: torn edge joins the prefix piece (joinDx 333.9 / joinDy 3.9). Only the text is coloured |
| `quiz_piece_prefix.png` | 149 × 180 | quiz | rule piece: prefix (P07 torn paper) | size-sensitive: keep with the noun piece |
| `result_box_seal.png` | 250 × 34 | result | tape strip sealing the box opening | PLACEHOLDER (final art can replace it) |
| `result_sticker.png` | 300 × 155 | result | rectangular «outro» label stuck on the box (live text on top; 4 corner tapes are part of the image) | size-sensitive: text area |
| `shared_box_angled.png` | 600 × 352 | quiz | the box — angled view | size-sensitive: hole polygon and slot measured on it (BOX_META) |
| `shared_box_front.png` | 600 × 367 | intro, result | the box — front view | size-sensitive: hole polygon and slot measured on it (BOX_META) |
| `shared_btn_plaque.png` | 359 × 129 | intro, result, overlays | wooden plaque button | size-sensitive: label sits in the inner panel |
| `shared_btn_plaque_red.png` | 359 × 129 | exit overlay | red wooden plaque («اخرج») | size-sensitive |
| `shared_chalk_strong.png` | 627 × 627 | trails | stronger-grain version of the chalk tile — fills the kite trace and the progress line |  |
| `shared_chalk_white.png` | 627 × 627 | everything chalk | white chalk texture tile (alpha = chalk grain) — fills the title, sentence, result texts, plus signs |  |
| `shared_fx_dust1.png` | 225 × 206 | quiz | dust puff when a wrong paper lands |  |
| `shared_fx_dust2.png` | 225 × 124 | quiz | dust puff |  |
| `shared_fx_dust3.png` | 225 × 232 | quiz | dust puff |  |
| `shared_fx_spark1.png` | 201 × 191 | quiz, result | sparkle |  |
| `shared_fx_spark2.png` | 133 × 123 | quiz, result | sparkle |  |
| `shared_fx_spark3.png` | 156 × 154 | quiz, result | sparkle |  |
| `shared_fx_spark4.png` | 189 × 170 | quiz, result | sparkle |  |
| `shared_glass_shine.png` | 600 × 400 | all | glass reflection over the box |  |
| `shared_kite.png` | 68 × 50 | intro, quiz, result | paper-plane kite filled with the white chalk texture | shown 68 px (intro/result) and 40 px (progress bar); nose points up-left |
| `shared_notebook.png` | 1000 × 689 | overlays | notebook page for instructions / exit / answers | size-sensitive: ruled-line pitch and margin are measured on it (NOTEBOOK_META) |
| `shared_star_current.png` | 107 × 100 | quiz | star — current question (white chalk) |  |
| `shared_star_glow.png` | 170 × 170 | quiz, result | round soft glow behind a lit star | halo may go slightly past the safe area |
| `shared_star_gold.png` | 107 × 100 | quiz, result | star — lit (gold chalk): answered correctly on the 1st or 2nd try |  |
| `shared_star_grey.png` | 107 × 100 | quiz | star — missed (grey chalk) |  |
| `shared_star_off.png` | 107 × 100 | quiz, result | star — not reached (white chalk, faint) |  |
| `ui_btn_close.png` | 60 × 60 | quiz | close (×) button — opens the exit window |  |
| `ui_btn_info.png` | 60 × 60 | quiz | info (i) button — opens «كيف تلعب؟» |  |
| `ui_btn_mute.png` | 60 × 60 | quiz, result | sound on icon (button mutes / unmutes everything) |  |
| `ui_btn_mute_off.png` | 60 × 60 | quiz, result | sound off icon |  |
| `ui_logo.png` | 242 × 62 | all | logo |  |

Total: 55 images, PNG (transparent) or JPG (background). Every look of an element is its own file (hint paper ×3, notes ×9, stars ×4, box ×2, plaque ×2, mute ×2).

**Upscaled more than 1.5×:** `bg_light_rays.png` (×2.0) and `quiz_glow.png` (×2.1). Both are soft effects, so they look fine, but larger art would be cleaner.

**Placeholders:** background extension bands (needs real 3:2 art), `result_box_seal.png`, `sfx/jingle_end.mp3` (synthesised).

## Sounds

Plain `.mp3` files played through the page itself (works from a double-click). Voice files are **unchecked** (not listened to): the text is what the file name and place suggest. The sound button mutes / unmutes everything.

| Id | File | Where it plays |
|---|---|---|
| `sfx_box_drop` | `sfx/box_drop.mp3` | Intro box drop; note drops into the box |
| `sfx_chalk_write` | `sfx/chalk_write.mp3` | Intro title; sentence; strike on the dropped alef |
| `sfx_gold_glow` | `sfx/gold_glow.mp3` | Missed question — the correct paper glows |
| `sfx_jingle_end` | `sfx/jingle_end.mp3` | Result — with the confetti (synthesised placeholder) |
| `sfx_paper_crumple` | `sfx/paper_crumple.mp3` | Wrong paper becomes a ball |
| `sfx_paper_fold` | `sfx/paper_fold.mp3` | Note folds before it flies into the box |
| `sfx_paper_slide` | `sfx/paper_slide.mp3` | Papers move; hint changes |
| `sfx_paper_tear` | `sfx/paper_tear.mp3` | Rule pieces appear |
| `sfx_paper_whoosh` | `sfx/paper_whoosh.mp3` | Screen changes, kite flights, calendar page flip |
| `sfx_pin_press` | `sfx/pin_press.mp3` | Every button / paper press; kite arrives at a star |
| `sfx_star_chalk` | `sfx/star_chalk.mp3` | Progress star lights; result stars |
| `sfx_sticky_place` | `sfx/sticky_place.mp3` | Hint paper appears / changes |
| `sfx_tape_stick` | `sfx/tape_stick.mp3` | Papers appear; box seal and label stuck on |
| `vo_q0_prompt` | `vo/q0_prompt.mp3` | Quiz, question 1 only — «استمع جيدًا، ثم اختر الكتابة الصحيحة» (assumed) |
| `vo_q1_sentence` | `vo/q1_sentence.mp3` | Question 1 — play button + automatically when the question opens (unchecked) |
| `vo_q1_word` | `vo/q1_word.mp3` | Question 1 — plays after the sentence (unchecked) |
| `vo_q1_slow` | `vo/q1_slow.mp3` | Question 1 — turtle button (word, slowly) (unchecked) |
| `vo_q2_sentence` | `vo/q2_sentence.mp3` | Question 2 — play button + automatically when the question opens (unchecked) |
| `vo_q2_word` | `vo/q2_word.mp3` | Question 2 — plays after the sentence (unchecked) |
| `vo_q2_slow` | `vo/q2_slow.mp3` | Question 2 — turtle button (word, slowly) (unchecked) |
| `vo_q3_sentence` | `vo/q3_sentence.mp3` | Question 3 — play button + automatically when the question opens (unchecked) |
| `vo_q3_word` | `vo/q3_word.mp3` | Question 3 — plays after the sentence (unchecked) |
| `vo_q3_slow` | `vo/q3_slow.mp3` | Question 3 — turtle button (word, slowly) (unchecked) |
| `vo_q4_sentence` | `vo/q4_sentence.mp3` | Question 4 — play button + automatically when the question opens (unchecked) |
| `vo_q4_word` | `vo/q4_word.mp3` | Question 4 — plays after the sentence (unchecked) |
| `vo_q4_slow` | `vo/q4_slow.mp3` | Question 4 — turtle button (word, slowly) (unchecked) |
| `vo_q5_sentence` | `vo/q5_sentence.mp3` | Question 5 — play button + automatically when the question opens (unchecked) |
| `vo_q5_word` | `vo/q5_word.mp3` | Question 5 — plays after the sentence (unchecked) |
| `vo_q5_slow` | `vo/q5_slow.mp3` | Question 5 — turtle button (word, slowly) (unchecked) |

## Fonts

| File | Family | Used for |
|---|---|---|
| `fonts/readex-pro-arabic.woff2`, `readex-pro-latin.woff2` | Readex Pro (OFL) | all text |
| `fonts/playpen-sans-arabic.woff2` | Playpen Sans Arabic (OFL) | the curved chalk title «صندوق الأحلام» only |

## Drawn by code (not image files)

| Visual | How it is made |
|---|---|
| Chalk fill of the title and underline | SVG `<pattern>` made from `shared_chalk_white.png` (title is live text on a curve; underline is revealed right → left) |
| Chalk fill of the sentence, result texts, plus signs | CSS `background-clip:text` with the same chalk tile |
| Kite trace (dashed on route flights, solid between progress stars) | canvas strokes filled with a pattern from `shared_chalk_strong.png`; dashes hold then fade bit by bit |
| Kite route | 188 points traced from your path, smoothed, scaled per flight; **never drawn** |
| Calendar page flip | CSS 3D rotation of `quiz_next_page.png` around its top edge + a soft shade |
| Dashed blank under the sentence, strike on the dropped alef | CSS |
| Coloured text in the rule pieces | CSS colours on live text (prefix + kashida red, «ال» blue) |
| Confetti, answer chips (✓/✕), shadows | CSS / inline SVG |
