Analysis prompt
ROLE
You analyze an existing, working web activity and produce two JSON files. You do NOT touch Adobe Animate.

INPUT
Web source folder (index.html, activity.js, data file(s), style.css, images/, sfx/, vo/).

ABSOLUTE RULES

1. Do NOT modify, delete, rename, or move any existing file in the web source or in any Animate/XFL project. Read-only on everything existing.
2. Write only the two files below into /output/. If they already exist, OVERWRITE them completely. Do not read or reuse their old content.
3. Never invent data. Every value must come from the source (code, CSS, inline styles, image files). Do not guess.
4. Copy all texts exactly (diacritics, punctuation, RTL, spacing). Never paraphrase, translate, or fix.
5. No explanations in chat. Output the two files, then a 5-line summary (screens count, elements count, texts count, warnings count).

TASK 1 — /output/screens-manifest.json
Schema:
{
"activity": {"id","title","stage":{"w","h"},"direction":"rtl|ltr","templateType","language"},
"screens": [
{
"id": "snake_case",
"name": "<name as in source>",
"order": 1,
"type": "intro|quiz|result|overlay|other",
"repeats": false,
"camera": {...} | null,
"elements": [
{
"id": "unique_snake_case",
"kind": "image|text|button|shape|group|canvas|audio-trigger",
"domId": "<original DOM id/class>",
"x","y","w","h",
"zIndex",
"asset": "images/xxx.png" | null,
"textKey": "questions.json path" | null,
"font": {"family","size","weight","color","align"} | null,
"states": ["default","hover","disabled"],
"reveal": "none|animation|interaction",
"notes": ""
}
],
"animations": [
{"target":"element id","trigger":"on-enter|on-click|on-correct|...","type":"fade|move|scale|rotate|clip|path|other","from":{},"to":{},"durationMs","delayMs","easing","timelineFriendly":true|false}
],
"sounds": [{"soundId","trigger","file","volume"}],
"transitions": [{"to":"screen id","trigger":""}]
}
],
"sharedElements": [ ...same element schema ],
"overlays": [ ...same schema as screens ],
"assets": {"images":[{"file","w","h"}],"sounds":[{"id","file"}],"fonts":[{"family","file"}]},
"warnings": []
}

POSITION RULES (critical)

- x, y, w, h are the FINAL RESTING position on that screen, in stage pixels, top-left origin, after applying camera/zoom, transforms, and any layout formulas in the code (e.g. LAYOUT objects, rect/aspect functions, percentage or fraction placements, CSS).
- Image size: read the real pixel size from the image file. If the code scales it (height/width/aspect), compute the final size.
- Elements that move or change view in code (e.g. an object that slides between screens, a flying object, a box with front/angled views): for EACH screen where it can appear, output its resting position on that screen using the code's per-screen layout values. Do not output one position for all screens.
- An element present in the screen's layout but hidden by default (opacity 0, hidden, display none): still output its position as it would be when shown.
- NEVER output null for x, y, w, h. If it truly cannot be computed from the source, omit the element, and list it in "warnings" with the exact reason and the code location.

REVEAL RULES

- "none": visible from the start of the screen.
- "animation": hidden at start only because an entrance animation brings it in automatically (fade/scale/move-in/write-on). It is a normal, visible element in the final layout.
- "interaction": appears only after a user action or game event (click, correct/wrong answer, overlay open, next question).
- Buttons, logo, titles, and UI that animate in on their own are "animation", NOT "interaction".

ANIMATIONS
List every animation, but do not describe it as a position. Mark timelineFriendly=false for camera moves, path/curve flights, canvas drawing, clip-path/mask effects.

TASK 2 — /output/questions.json
Contains EVERY user-visible text and all quiz data, grouped, with stable keys:
{
"meta": {"activityId","language","direction","version":1,"loadMethod":"fetch","path":"questions.json"},
"ui": {buttons, aria labels, titles, instructions, exit confirmation},
"scoring": {...exactly as source},
"questions": [
{"id","stem":{"before","after"},"options":[{"id","text","correct":true|false,"feedbackKey|hintKey"}],"word","extra fields from source","sounds":{...}}
],
"feedback": {...all feedback/hint/reminder texts, keyed},
"result": {...titles by stars, score format, reminders},
"sounds": [{"id","file","type":"sfx|vo"}]
}
Rules: keep the source's keys/structure where sensible. Any text found in HTML/JS but not in the data file must be added under "ui" with a key and listed in warnings.

COLOR RULES

- Every font color must be a plain "#RRGGBB". If the source uses a gradient, pattern, url(), or rgba, record the nearest solid #RRGGBB in font.color, put the original in font.originalColor, and add a warning.

SHARED UI RULE

- sharedElements must list every persistent UI element (logo, close/info/mute buttons, light rays, kite, etc.) with its real position, even if CSS hides it on some screens. Put the CSS note in "notes". Do not decide which screens show it.

VALIDATION (run before finishing)

- Both files are valid JSON (UTF-8, no trailing commas).
- Zero null values in x, y, w, h anywhere.
- Every textKey in the manifest resolves to a value in questions.json.
- Every asset path exists in the source folder and its w/h match the real file.
- Every element id is unique within its screen; every screen has ≥1 element.
- Every image used in the code appears in at least one screen/sharedElements/overlays entry.
- Put all failures in "warnings".
  MESSAGE PARAMETERS
- Optional line "skip: questions" = do TASK 1 only. Do not read or overwrite output/questions.json.

SCHEMA ADDITIONS (screens and overlays)

- "clips": [{"id","role","members":[{"id","name"}],"x","y","w","h","zIndex","reveal","defaultVisible","sourceLocation"}]
- every element gets "clip": "<clip id>" or null
- Do NOT emit kind "group" any more. A group is now a clip.

CLIP RULES
A clip is a set of elements that behave as ONE object. Create a clip when:

1. The elements share one DOM container built for one purpose (an object with several looks or states, a decoration set, a note that opens and folds, pieces that join, a calendar with its sheet and label, a box with its contents, an effects set).
2. The elements are driven together by one animation entry or appear together after one event.
3. All elements of an overlay: one clip per overlay, including its backdrop, art, texts and buttons.
   Never clip: backgrounds, light rays, canvases, persistent shared UI (logo, close, info, mute), and the flying kite.
   A single element that animates alone is NOT a clip.

- clip id: "<screen*id>*<role>" in snake_case, unique across the whole file.
- member name: short snake_case word for the member's role inside the clip (e.g. off, current, gold, glow, tape, text), unique inside the clip.
- x, y, w, h = union of the members' final resting rectangles. zIndex = highest member zIndex.
- defaultVisible = true if the clip is visible at the start of its screen.
- An element belongs to at most one clip. Every clip has at least 2 members.

VALIDATION ADDITIONS

- Every clip member id exists and points back to the clip.
- Clip rectangle equals the union of its members.
- No element of kind "group" remains.

===========================
Screen ui
ROLE
You create ONE JSFL file for ONE screen (or overlay) of the web activity. You do not run Animate.

INPUTS

- screen_id: from the message
- Optional lines: "exclude: id1,id2" and "padding: N" (default 24)
- output/screens-manifest.json
- output/questions.json
- output/build_template_v2.jsfl (fixed, tested)

OUTPUT

- output/build\_<screen_id>\_v2.jsfl only. Then a 3-line summary and STOP.

ABSOLUTE RULES

1. Never modify build_template_v2.jsfl or any existing file.
2. Copy the template EXACTLY and replace ONLY the token **DATA** with the BUILD_DATA JSON.
3. Build BUILD_DATA with a script (Python). ensure_ascii=True, pure ASCII.
4. Never invent values; everything comes from the manifest and questions files.

BUILD_DATA SCHEMA
{"screenId","stage":{"w","h"},"elements":[...],"clips":[{"id","z","members":[element ids]}],"padding":[["side","px","ids"]],"counts":{"screen":n,"shared":n},"skipped":[["id","reason"]]}
Element: {"id","kind","x","y","w","h","z","asset","text","font","alpha","blend","filt","bg","clip","name"}

ELEMENT SELECTION

- Elements = screens[screen_id].elements (or the overlay with that id) + all sharedElements.
- Skip (to "skipped" with reason): kind canvas or audio-trigger; ids in the exclude line; a shared element with the same asset as a screen element on this screen.
- Skip any element without valid x, y, w, h.
- Include shared UI on every screen unless excluded. Never decide by CSS notes.
- Skip text elements whose stateOf points to another text element (text variant, set at runtime by logic). Keep the base text.
- A clip whose members were all skipped is dropped. If it keeps only one member, that member becomes a normal element.

PLACEMENT RULES

- Every element is placed at its own x, y, w, h, whether it is hidden at the start or not. Logic hides them at run time. There is no hidden-elements layer.
- "clip" and "name" come from the manifest. clips come from the manifest clips of this screen. Members keep their own coordinates (stage space).
- z = zIndex. Clip z = its clip zIndex.

FIELD RULES

- kind "shape" with an asset becomes kind "image". Other shapes keep "shape".
- asset = effects.replacementAsset or asset (only for image and button).
- text = value from questions.json via textKey, only for kind text/button, NOT when textKey starts with "ui.aria". Must be a string, else skip and report.
- Text with Arabic diacritics (U+064B-U+065F, U+0670): write it WITHOUT them. Add the id to "skipped" as "diacritics stripped (restored at runtime by logic)".
- alpha = effects.opacity\*100 when 0<opacity<1, else null. blend = effects.blendMode or null. filt = true if effects.filter is non-empty.
- font: copy as is. If font.color is not #RRGGBB, use "#F5F2E8" and note it in "skipped".
- bg = true when zIndex is 0 and w >= stage width.
- Button with a label: emit the button (text=null) and a text element "<id>\_label" with the same x, y, w, h, font, text, z = z+0.5, kind "text", asset null, same clip as the button (name "<name>\_label"), unless the manifest already has an element with that id.

SAFE-AREA PADDING (after all elements are final)

- Safe area comes from the web source layout (left, top, right, bottom). If absent, skip padding and warn.
- Objects = clips (their rectangle) and elements that are not in a clip. Exclude bg elements and objects entirely outside the safe area.
- For each side independently: violation = how far an object goes beyond (safe border minus padding, inward). Shift = the largest violation among objects on that side. Move EVERY object that violates that side by this same shift (members move with their clip). Objects that do not violate stay.
- Record each shift in "padding".

VALIDATION

- node --check on a .js copy passes; pure ASCII; **DATA** gone; diff vs template: first line only.
- Every asset path exists in the web source folder.
- Every clip member exists in elements, and each element is in at most one clip.
- No object crosses the padded safe area, except excluded ones.

FINAL CHAT OUTPUT (max 3 lines)

- file path, element count, clip count, skipped list, padding shifts.
- "Animate -> Commands -> Run Command... -> build\_<screen_id>\_v2.jsfl (from output/)".

screen_id: [screen_id_from_manifist]

Logic -core

ROLE
You read the logic of a working web activity and produce ONE JSFL file that installs the activity-wide logic into an Adobe Animate HTML5 Canvas project. You do NOT run Animate.

INPUTS

- Web source folder (all JS, HTML, CSS, data files)
- output/screens-manifest.json
- output/questions.json
- output/logic_template.jsfl (fixed, tested)
- output/build_template.jsfl (READ ONLY: naming and frame conventions)

OUTPUT

- output/logic-spec_global.json
- output/logic_global.jsfl
  Then a max 5-line summary and STOP.

ABSOLUTE RULES

1. Read-only on everything existing. Overwrite only the two outputs.
2. Derive everything from the source. Assume nothing about the activity type.
3. Never invent ids, texts, sounds or numbers. Missing needed item -> "warnings".
4. No screen-specific logic (handlers, visibility, per-screen flow). That belongs to the screen prompt.
5. No explanations in chat.

SCOPE (activity-wide logic only)

- All state variables: initial value, writers, readers.
- Pure logic with no DOM: scoring, validation, result calculation, text templating, formatting. Port behavior exactly.
- Data loading (follow meta.loadMethod in questions.json). Hold on the first frame until loaded, then go to the first screen label.
- Sound PLAYING only: play, stop, sequence, mute. Registration of sounds is done by a separate file; here check that a sound is loaded before playing, and warn if not.
- Navigation helper and full reset behavior.
- Empty async hooks for every animation-dependent point in the source. Hooks resolve immediately.
- Everything is attached to the main timeline so screen frames can call it.

ANIMATE RULES FOR THE GENERATED JS

- Frame scripts run again every time the playhead enters the frame. Wrap ALL initialization in a one-time guard stored on the timeline, so state and loaded data are never reset by a second run.
- Use the global objects directly (createjs, console, fetch). Never read them as properties of the timeline object.
- ES5 only. No animation.

STEPS

1. Write logic-spec_global.json: state, pure logic, data loading, sound playing, navigation/reset, hooks, and the exact name and signature of every function exposed on the timeline (screen prompts read this).
2. Build the JS code string from the spec.
3. Build LOGIC_DATA with a script (Python): {"key":"global","layerName":"actions","targets":[{"key":"global","label":null,"code":"<js>"}]}. ensure_ascii=True.
4. Copy logic_template.jsfl EXACTLY. Replace only the token **DATA**.

VALIDATION (failures -> "warnings")

- Spec is valid JSON. Code passes node --check. JSFL passes node --check on a .js copy, is pure ASCII, no **DATA** left.
- Every data path and sound id used exists in questions.json.
- Running the code twice in a simulated environment keeps the loaded data and state.
- No animation calls.
- Diff against the template: only the first line changed.

FINAL CHAT OUTPUT (max 5 lines)

- File paths, state count, function count, warnings count.
- "Animate -> Commands -> Run Command... -> logic_global.jsfl (from output/)".

===============
Screen logic

ROLE
You read the logic of ONE screen of a working web activity and produce ONE JSFL file that installs that screen's logic into an Adobe Animate HTML5 Canvas project. You do NOT run Animate.

INPUTS

- screen_id: from the message
- Web source folder
- output/screens-manifest.json (with clips)
- output/questions.json
- output/logic-spec_global.json and output/logic_global.jsfl (read only)
- output/logic_template.jsfl (fixed, tested)
- output/build*template_v2.jsfl and output/build*<screen_id>\_v2.jsfl (read only: names, clips, skipped elements)

OUTPUT

- output/logic-spec\_<screen_id>.json
- output/logic\_<screen_id>.jsfl
  Then a max 5-line summary and STOP.

ABSOLUTE RULES

1. Read-only on everything existing. Overwrite only the two outputs.
2. Derive everything from the source. Assume nothing about the activity type.
3. Never invent ids, texts, sounds or numbers. Missing needed element -> "warnings", not created.
4. Do not redefine anything the global logic provides. Call it.
5. No explanations in chat.

ACCESS RULES

- A standalone element is root.<id>. A clip is root.<clip id>. A clip member is root.<clip id>.<member name>.
- Text elements are movie clips that wrap a text object. Write text to the first child that has a string "text" property. Warn if none.
- Every text and "<id>\_label" element: mouseEnabled=false.
- Clips and overlays hold their own state: show or hide the whole clip with visible; show or hide members for variants.
- NEVER hard-code positions or sizes. Read them at run time from the instances (x, y, and the bounds of the instance). Members live in the clip's local space: convert between local and stage space when a calculation needs stage coordinates. Spacing numbers that exist only in the source code (gaps, scales) may be copied from the source into the spec and the code, and must be listed in the spec.
- The build may have moved edge elements inward (padding). The logic must not depend on original coordinates.

SCOPE (this screen and the overlays it opens)

- Every interactive element: id, event, guards, state changes, visual changes, sounds, destination.
- Groups of mutually exclusive variants (clip members, or elements with the same position and stateOf): which one is visible in which state.
- Dynamic texts: element id -> data path -> filling rule, including placeholders.
- Ordered flow from enter to exit.
- Every point where the source waits for an animation: the state changes immediately; call the matching global hook. Hooks receive the clip or element id to animate.
- Texts with Arabic diacritics: set the FULL original string on enter from its data path.
- Text variants skipped by the build: set the base text element's text from the active variant's data path.
- Source strings with HTML tags: plain text, tags removed, add a warning.
- Overlays are clips: open = show the clip and block the screen; close = hide it. If the clip is missing, handlers stay inert with one warning.

ANIMATE RULES

- Frame script starts with a stop for this screen.
- Frame scripts re-run on every entry: bind each listener once (guard on the timeline), call handlers through an API object on the timeline that is redefined on each entry.
- Screen state lives in one object on the timeline, created once.
- Use global objects directly (createjs, console). Never read them from the timeline object.
- Visibility uses the visible property. No tweens, no visual timers. On enter, set an explicit initial visibility for every clip, member and hidden-at-start element.
- Hook chains use promises with a token check.

STEPS

1. Write logic-spec\_<screen_id>.json with the scope items, the access paths used, and their source locations.
2. Build the JS code string. ES5.
3. Test it in a simulated environment (mock instances and clips from the build file and manifest, real global logic) through a full play of the screen. Fix errors.
4. Build LOGIC_DATA with a script (Python): {"key":"<screen_id>","layerName":"actions","targets":[{"key":"<screen_id>","label":"<screen_id>","code":"<js>"}]}. ensure_ascii=True.
5. Copy logic_template.jsfl EXACTLY. Replace only the token **DATA**.

VALIDATION (failures -> "warnings")

- Spec is valid JSON. Code passes node --check. JSFL passes node --check on a .js copy, is pure ASCII, no **DATA** left.
- The simulation finishes without exception or missing-instance warning.
- Every instance path exists in the build file. Every data path and sound id exists in questions.json.
- Every interactive element has a handler or a warning.
- No hard-coded positions. No animation calls.
- Diff against the template: only the first line changed.

FINAL CHAT OUTPUT (max 5 lines)

- File paths, handler count, warnings count.
- "Animate -> Commands -> Run Command... -> logic\_<screen_id>.jsfl (from output/)"

screen_id: [screen_id_from_manifest]

=======================
Sound prompt

ROLE
You produce ONE JSFL file that registers all sounds of a web activity in an Adobe Animate HTML5 Canvas project. You do NOT run Animate.

INPUTS

- output/questions.json (field "sounds": id, file, type)
- Web source folder (to verify files exist)
- output/logic_template.jsfl (fixed, tested)

OUTPUT

- output/register_sounds.jsfl only. Then a max 3-line summary and STOP.

ABSOLUTE RULES

1. Read-only on everything existing.
2. Use every sound in questions.json "sounds" exactly: same id, same file path. Never rename, add or skip.
3. The registration code goes on its own layer "sounds", frame 1 of the main timeline. Never on the "actions" layer.
4. Copy logic_template.jsfl EXACTLY and replace only the token **DATA** with: {"key":"sounds","layerName":"sounds","targets":[{"key":"sounds","label":null,"code":"<js>"}]}. Build it with a script (Python), ensure_ascii=True.
5. Generated JS: ES5. Register all sounds with the SoundJS API through the global createjs object (never through the timeline object). Register only once even if the frame script runs again. No playing, no mute logic. Console warning if the sound API is missing.

VALIDATION

- Code string passes node --check. JSFL passes node --check on a .js copy, is pure ASCII, no **DATA** left, diff vs template: first line only.
- Every file path exists in the web source folder.
- Registered ids count equals the count in questions.json.

FINAL CHAT OUTPUT (max 3 lines)

- Path, sound count, missing files.
- # "Animate -> Commands -> Run Command... -> register_sounds.jsfl (from output/). Copy the sound folders next to the published html, with the same relative paths as in questions.json."
