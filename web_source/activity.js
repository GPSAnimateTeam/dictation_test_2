// =========================================================================
// activity.js — G4 · U1 · L2 · الإملاء — «دخول حروف (ف – ب – ك – ل) على الكلمة المعرَّفة بـ(ال)»
// Theme «صندوق الأحلام» · template «تمييز» · 5 words · 2 / 1 / 0 points · score out of 10 · stars ≥ 9 → 3, ≥ 6 → 2, else 1
//
// HOW IT IS BUILT
//   Stage 1800 × 1200. Every element at rest sits inside the invisible safe area x 120–1670, y 190–1025 (checked by script).
//   Background = ONE image, images/bg_plate.jpg (2700 × 1800 = the 1800 × 1200 stage × the 1.5 camera zoom). The camera is only a
//   CSS transform of that image; every other element is placed in stage pixels and is never scaled by the camera.
//   Files: images/ (separate PNG/JPG, nothing embedded) · sfx/ and vo/ (separate mp3) · fonts/ · animate-data.js
//   (ANIMATE_DATA = every text, the questions and the scoring · ANIMATE_SOUNDS = every sound).
//   index.html works when opened by double-click: no server, no internet, no fetch(), no CSS masks, no Web Audio, no libraries.
//   Chalk look = the chalk texture image (images/shared_chalk_white.png) used as a text fill (background-clip:text), an SVG pattern
//   (the title and its underline), a canvas pattern (the kite's trail lines) or baked into the star / kite PNGs.
// =========================================================================

// ---- measured data (do not edit by hand) ----
// Box art meta: polygon of the glass interior (clip for notes), hole rect and slot, all as fractions of the box image. SIZE-SENSITIVE: measured on shared_box_front.png / shared_box_angled.png.
var BOX_META = {"1":{"poly":[[0.0749,0.2398],[0.0724,0.2834],[0.0641,0.3025],[0.0649,0.8392],[0.0733,0.8542],[0.0758,0.8924],[0.0783,0.8965],[0.1007,0.9005],[0.1066,0.9101],[0.1091,0.9251],[0.8909,0.9251],[0.8934,0.9101],[0.9034,0.8965],[0.9201,0.8965],[0.9259,0.8856],[0.9267,0.8542],[0.9351,0.8379],[0.9367,0.3025],[0.9276,0.2834],[0.9267,0.2452],[0.9226,0.233],[0.9142,0.2234],[0.5612,0.2207],[0.5587,0.2711],[0.5495,0.2861],[0.5279,0.2861],[0.5237,0.3025],[0.5179,0.3106],[0.4804,0.3106],[0.4738,0.3025],[0.4688,0.2875],[0.4463,0.2847],[0.4355,0.2643],[0.4355,0.2207],[0.0899,0.2207],[0.0808,0.2275]],"hole":[0.0641,0.2207,0.9367,0.9251],"slot":[0.2923,0.0531,0.7044,0.0722],"slotLeftY":0.0631,"slotRightY":0.0619},"2":{"poly":[[0.9352,0.2186],[0.924,0.2036],[0.5848,0.2186],[0.5864,0.2596],[0.5776,0.2801],[0.5576,0.2828],[0.5536,0.2992],[0.548,0.306],[0.52,0.3074],[0.512,0.3033],[0.5056,0.2855],[0.4904,0.2869],[0.476,0.276],[0.4712,0.2637],[0.4712,0.2295],[0.4688,0.2254],[0.204,0.2391],[0.1968,0.2432],[0.1912,0.2541],[0.1872,0.2541],[0.1872,0.2992],[0.1824,0.3156],[0.1736,0.3238],[0.172,0.3361],[0.172,0.8374],[0.1792,0.8429],[0.1872,0.8607],[0.1872,0.8934],[0.2088,0.8975],[0.2168,0.9112],[0.2192,0.9221],[0.8208,0.8743],[0.908,0.8634],[0.9144,0.8429],[0.932,0.8374],[0.9352,0.832],[0.9368,0.7978],[0.9432,0.7842],[0.9488,0.7801],[0.9496,0.2842],[0.9384,0.2678]],"hole":[0.172,0.2036,0.9496,0.9221],"slot":[0.2872,0.0492,0.676,0.082],"slotLeftY":0.072,"slotRightY":0.0584}};
// Notebook art meta (shared_notebook.png, 1400×965 reference size): ruled-line pitch and first line, red margin x. SIZE-SENSITIVE.
var NOTEBOOK_META = {"size": [1400, 965], "marginX": 1301, "firstLineY": 185.857, "pitch": 51.868, "lines": 14};
// Kite route traced from "kite path.png" (1275 × 530). Normalised points (x/1275, y/530): starts at the right end, ends at the top-left. The route is never drawn.
var KITE_ROUTE_SIZE = [1275, 530];
var KITE_ROUTE_NORM = [[0.9969,0.6094],[0.988,0.625],[0.9793,0.6412],[0.9716,0.6599],[0.9642,0.6794],[0.9564,0.698],[0.9477,0.7139],[0.9382,0.7273],[0.9287,0.7405],[0.9193,0.7542],[0.9098,0.7676],[0.9002,0.7805],[0.8905,0.7926],[0.8806,0.804],[0.8706,0.8148],[0.8604,0.8251],[0.8502,0.8349],[0.8399,0.8437],[0.8294,0.8513],[0.8187,0.8578],[0.808,0.8636],[0.7973,0.8691],[0.7866,0.875],[0.776,0.8818],[0.7656,0.8902],[0.7554,0.9001],[0.7453,0.9107],[0.7351,0.92],[0.7245,0.9274],[0.7138,0.9332],[0.703,0.9382],[0.6922,0.9425],[0.6813,0.9454],[0.6703,0.9463],[0.6593,0.9458],[0.6484,0.9447],[0.6374,0.9435],[0.6264,0.9423],[0.6155,0.9409],[0.6045,0.9393],[0.5936,0.9369],[0.5827,0.9332],[0.5719,0.9279],[0.5614,0.9205],[0.5513,0.9101],[0.542,0.8962],[0.5334,0.8797],[0.5254,0.8617],[0.5176,0.8432],[0.5098,0.8245],[0.5021,0.8057],[0.4947,0.7862],[0.4879,0.7654],[0.4823,0.7427],[0.4778,0.7186],[0.4742,0.6937],[0.4712,0.6682],[0.4689,0.6425],[0.4669,0.6165],[0.4654,0.5903],[0.465,0.5639],[0.4656,0.5376],[0.4671,0.5114],[0.469,0.4854],[0.4717,0.4598],[0.4756,0.4351],[0.4816,0.413],[0.4896,0.3951],[0.4985,0.3795],[0.5075,0.3643],[0.5169,0.3508],[0.5271,0.3408],[0.5377,0.3345],[0.5485,0.3303],[0.5595,0.3278],[0.5705,0.3271],[0.5814,0.3276],[0.5924,0.3286],[0.6034,0.3297],[0.6143,0.331],[0.6253,0.3336],[0.636,0.3388],[0.6464,0.3475],[0.6562,0.3593],[0.6655,0.3733],[0.6744,0.3888],[0.6829,0.4056],[0.6909,0.4237],[0.6984,0.4429],[0.7054,0.4631],[0.7121,0.4841],[0.7184,0.5058],[0.7241,0.5284],[0.7284,0.5526],[0.7314,0.5781],[0.7337,0.6039],[0.7361,0.6296],[0.7386,0.6553],[0.74,0.6815],[0.7391,0.7078],[0.7363,0.7333],[0.7327,0.7582],[0.7285,0.7827],[0.7239,0.8067],[0.7188,0.83],[0.7125,0.8516],[0.7048,0.8704],[0.6959,0.886],[0.6863,0.8989],[0.6764,0.9099],[0.6661,0.9194],[0.6557,0.9279],[0.6453,0.9359],[0.6348,0.9437],[0.6243,0.9515],[0.6137,0.9589],[0.6031,0.9655],[0.5923,0.9706],[0.5815,0.9741],[0.5705,0.9763],[0.5596,0.9778],[0.5486,0.9791],[0.5376,0.9805],[0.5267,0.9823],[0.5157,0.9841],[0.5047,0.9853],[0.4938,0.9847],[0.4829,0.9819],[0.4721,0.9771],[0.4615,0.9699],[0.4514,0.9599],[0.4417,0.9474],[0.4324,0.9333],[0.4233,0.9185],[0.4143,0.9034],[0.4053,0.8882],[0.3964,0.8728],[0.3876,0.857],[0.379,0.8407],[0.3706,0.8236],[0.3624,0.806],[0.3543,0.7881],[0.3463,0.7701],[0.3383,0.7519],[0.3308,0.7327],[0.3239,0.7122],[0.3174,0.6908],[0.3113,0.6689],[0.3055,0.6465],[0.3,0.6236],[0.2948,0.6003],[0.2898,0.5769],[0.2845,0.5537],[0.2789,0.531],[0.2729,0.5088],[0.2668,0.4869],[0.261,0.4644],[0.2555,0.4416],[0.25,0.4187],[0.2443,0.3961],[0.2387,0.3734],[0.2334,0.3503],[0.2283,0.3268],[0.2231,0.3036],[0.2171,0.2814],[0.2103,0.2608],[0.2027,0.2417],[0.1947,0.2238],[0.1864,0.2063],[0.1782,0.1888],[0.1699,0.1715],[0.1611,0.1558],[0.1517,0.142],[0.1422,0.129],[0.1326,0.1162],[0.1229,0.1036],[0.1133,0.091],[0.1037,0.078],[0.0941,0.065],[0.0844,0.053],[0.0742,0.0431],[0.0639,0.0339],[0.0535,0.0252],[0.0429,0.0187],[0.0321,0.0144],[0.0212,0.0109],[0.0103,0.008],[0.0082,0.0075]];


// ===== SHARED =====
// Data, constants, layout, sounds, state, helpers, screens, reset, and the shared elements (background camera, box, kite, fx).

var QUESTIONS = ANIMATE_DATA.questions;
var TOTAL_QUESTIONS = QUESTIONS.length;
var SCORING = ANIMATE_DATA.scoring;

// ---------- LAYOUT: every position is in STAGE pixels (1800 × 1200; x from the left, y from the top) ----------
// Everything at rest is inside the safe area x 120–1670, y 190–1025.
var LAYOUT = {
  safe: { left: 120, top: 190, right: 1670, bottom: 1025 },

  // Background camera. The bg image is 2700 × 1800 (= stage × 1.5). zoom 1 shows the whole image on the stage.
  // originX / originY = the image pixel (in the 2700 × 1800 file) that sits at the stage's top-left corner.
  cameras: {
    intro:  { zoom: 1.5, originX: 644, originY: 447 },   // close-up on the board, board centred
    quiz:   { zoom: 1,   originX: 0,   originY: 0 },     // whole picture
    result: { zoom: 1.2, originX: 419, originY: 150 }    // slightly closer, board centred
  },

  // The dream box. view 0 = front, view 1 = angled; the two crossfade while the box moves.
  box: {
    intro:  { centerX: 900, bottom: 1003, height: 348, view: 0 },
    quiz:   { centerX: 375, bottom: 964,  height: 269, view: 1 },
    result: { centerX: 900, bottom: 1018, height: 255, view: 0 }
  },

  intro: {
    title:       { x: 352, y: 195, w: 1097, h: 274 },
    startButton: { x: 720, y: 482, w: 359, h: 129, fontSize: 46 },
    // decorative chalk stars on the left, all on the green board (x, y = centre, size = width, phase = animation offset in seconds)
    deco: [
      { x: 215, y: 335, size: 60, phase: 0.0 },
      { x: 400, y: 300, size: 40, phase: 0.6 },
      { x: 300, y: 460, size: 52, phase: 1.1 },
      { x: 470, y: 535, size: 36, phase: 0.3 },
      { x: 185, y: 600, size: 44, phase: 0.9 },
      { x: 360, y: 665, size: 56, phase: 1.5 }
    ],
    // kite: the WHOLE traced route is on the board. It enters from the right edge, follows the route and ends just before the title.
    kite: { endX: 1322, endY: 330, scale: 0.38, leadIn: 260, ms: 3600, size: 68, hold: 800, fade: 1100 }
  },

  quiz: {
    progress: {                                        // stars of the progress bar (question 1 is the right-most)
      centersX: [1308, 1184, 1060, 937, 813],
      centersY: [240, 226, 246, 226, 249],
      starWidth: 72, glowWidth: 132,
      hoverDx: 61, hoverDy: 4, kiteSize: 40,
      kiteEntry: { x: 1500, y: 320 }
    },
    sticky: { x: 340, y: 238, w: 290, h: 302, tapeW: 129, tapeTop: -22, fontMax: 30, fontMin: 20 },
    stem:   { x: 650, y: 292, w: 820, h: 130, fontMax: 58, fontMin: 30, gap: 24 },
    playButton: { x: 1548, y: 297, size: 110 },
    slowButton: { x: 1514, y: 356, size: 62 },
    papers: { top: 548, w: 315, h: 139, centersX: [704, 1060, 1416], gap: 41, reflowCenterX: 1060, fontMax: 56, fontMin: 28 },
    crumple: { trayY: 856, landX: [1290, 1215], ballW: 101, halfW: 211 },
    next:   { x: 815, y: 788, w: 340, h: 204, labelFont: 56, hingeY: 40, flipMs: 700 },   // the desk calendar on the table (centred between box and pencil pot)
    equation: { centerX: 1060, top: 548, startOffset: 121, noun: [357, 180], prefix: [149, 180], joinDx: 333.9, joinDy: 3.9,
                fontMax: 104, fontMin: 56, nounPadRight: 31, nounPadLeft: 14, prefixPadLeft: 18, prefixPadRight: 14 },
    note:   { openW: 211, halfW: 172, foldW: 134 }
  },

  result: {
    title:    { x: 330, y: 200, w: 1140, h: 130, fontSize: 48 },
    stars:    { centerX: 900, top: 338, size: 98, gap: 22 },
    score:    { x: 600, y: 440, w: 600, h: 86, fontSize: 78 },
    reminder: { x: 340, y: 528, w: 1120, h: 86, fontSize: 28 },
    buttons:  { top: 624, w: 280, h: 100, centersX: [1235, 900, 565], fontSize: 36 },
    // kite: leg 1 starts in the middle of the screen and leaves to the left; leg 2 enters from the right and ends at the score.
    // Its trace line stays visible for a moment behind it and then fades away bit by bit.
    kite: { size: 68, hold: 1500, fade: 1900, leg1: { startX: 900, startY: 600, scale: 0.9, ms: 3000 }, leg2: { endX: 1020, endY: 466, scale: 0.6, leadIn: 200, ms: 2500 } },
    sticker: { widthFraction: 0.66, leftFraction: 0.17, topFraction: 0.573, rotate: -1.6 },
    seal: { widthOverSlot: 1.25, rotate: -1.5 }
  },

  overlays: {
    instructions: { x: 400, y: 240, w: 1000 },       // notebook (1000 × 689)
    exit:         { x: 520, y: 330, w: 760 },
    answers:      { x: 400, y: 240, w: 1000 }
  }
};

// ---------- sounds: plain HTML audio (works from a double-clicked index.html; no Web Audio, no library) ----------
var SOUND_SRC = {};
ANIMATE_SOUNDS.forEach(function (sound) { SOUND_SRC[sound.id] = sound.src; });
var soundBank = {};                                    // one <audio> per file, created at start-up so the browser has the file ready
var muted = false;
var activeSfx = [];
var activeVoice = null;
var voiceToken = 0;

function preloadSounds() {
  ANIMATE_SOUNDS.forEach(function (sound) {
    try { var audio = new Audio(); audio.preload = "auto"; audio.src = sound.src; soundBank[sound.id] = audio; audio.load(); } catch (error) {}
  });
}
function startAudio(id, volume) {                      // returns the playing <audio> (or null: muted, missing file, blocked before the first tap)
  var src = SOUND_SRC[id];
  if (!src || muted) { return null; }
  var audio;
  try {
    audio = new Audio(src);
    audio.volume = Math.max(0, Math.min(1, volume == null ? 1 : volume));
    var promise = audio.play();
    if (promise && promise.catch) { promise.catch(function () {}); }
  } catch (error) { return null; }
  return audio;
}
function playSfx(name, options) {                       // sound effect, e.g. playSfx("paper_slide", { vol: 0.6 })
  if (skipping && winSequenceActive) { return null; }
  var audio = startAudio("sfx_" + name, options && options.vol);
  if (!audio) { return null; }
  activeSfx.push(audio);
  audio.addEventListener("ended", function () { activeSfx = activeSfx.filter(function (a) { return a !== audio; }); });
  return audio;
}
function stopAllSfx() {
  activeSfx.forEach(function (audio) { try { audio.pause(); } catch (error) {} });
  activeSfx = [];
}
function stopVoice() {
  voiceToken++;
  try { if (activeVoice) { activeVoice.pause(); } } catch (error) {}
  activeVoice = null;
}
function playVoice(ids, gapMs) {                        // plays the ids one after the other; any new playVoice / stopVoice cancels it
  stopVoice();
  var token = ++voiceToken, index = 0;
  function playNext() {
    if (token !== voiceToken || index >= ids.length || muted) { return; }
    var audio = startAudio(ids[index++], 1);
    if (!audio) { playNext(); return; }
    activeVoice = audio;
    audio.addEventListener("ended", function () { if (token === voiceToken) { setTimeout(playNext, gapMs != null ? gapMs : 380); } });
    audio.addEventListener("error", function () { if (token === voiceToken) { playNext(); } });
  }
  playNext();
}
function setMuted(value) {                              // the sound button: mutes / unmutes everything (voice and effects)
  muted = !!value;
  document.body.classList.toggle("act-muted", muted);
  var button = byId("actBtnMute");
  button.setAttribute("aria-pressed", muted ? "true" : "false");
  button.setAttribute("aria-label", muted ? ANIMATE_DATA.aria.unmute : ANIMATE_DATA.aria.mute);
  if (muted) { stopVoice(); stopAllSfx(); }
}

// ---------- state ----------
var currentScreen = null;
var score = { total: 0, max: 0 };   // points earned / possible so far (max grows by 2 when a question is settled)
var questionIndex = 0;
var attemptsUsed = 0;
var answerLocked = true;
var flowBusy = false;
var questionSettled = false;
var questionResults = [];        // "first" | "second" | "miss" per question
var questionPoints = [];
var notesInBox = 0;
var resultSummary = null;
var runToken = 0;
var skipping = false;
var winSequenceActive = false;
var timeScale = 1;               // 1 = normal speed (a test can set it lower to run faster)
var reducedMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
var liveAnimations = [];
var pendingTimers = [];
var imageCache = {};             // natural sizes of every image, filled at start-up
var DEAD_TOKEN = {};

// ---------- small helpers ----------
function byId(id) { return document.getElementById(id); }
function toArabicDigits(value) { return String(value).replace(/\d/g, function (digit) { return "٠١٢٣٤٥٦٧٨٩".charAt(+digit); }); }
function fillText(template, values) { return String(template).replace(/\{(\w+)\}/g, function (match, key) { return values && values[key] != null ? values[key] : match; }); }
function escapeHtml(text) { return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
function lerp(a, b, u) { return a + (b - a) * u; }
function easeInOut(u) { return u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; }
function easeInOutSine(u) { return -(Math.cos(Math.PI * u) - 1) / 2; }
function easeOut(u) { return 1 - Math.pow(1 - u, 3); }
function placeEl(element, box) {
  if (typeof element === "string") { element = byId(element); }
  element.style.left = box.x + "px"; element.style.top = box.y + "px";
  if (box.w != null) { element.style.width = box.w + "px"; }
  if (box.h != null) { element.style.height = box.h + "px"; }
}
function imageHeight(name, width) { var size = imageCache[name]; return size ? width * size.h / size.w : width; }
function guardToken(token, value) { return Promise.resolve(value).then(function (result) { if (token !== runToken) { throw DEAD_TOKEN; } return result; }); }

function later(callback, ms) {                          // setTimeout that is cancelled when the screen exits
  var id = setTimeout(function () { pendingTimers = pendingTimers.filter(function (t) { return t !== id; }); callback(); }, ms * timeScale);
  pendingTimers.push(id);
  return id;
}
function clearPendingTimers() { pendingTimers.forEach(function (id) { clearTimeout(id); }); pendingTimers = []; }
function waitMs(ms) { return new Promise(function (resolve) { if (skipping || reducedMotion) { resolve(); return; } later(resolve, ms); }); }

function animateEl(element, keyframes, options) {        // Web Animations wrapper (all animations go through it so they can be skipped / cancelled)
  if (!element) { return Promise.resolve(); }
  var settings = Object.assign({ fill: "both", easing: "ease" }, options || {});
  settings.duration = (skipping || reducedMotion) ? 1 : Math.max(1, (settings.duration || 300) * timeScale);
  if (settings.delay) { settings.delay = (skipping || reducedMotion) ? 0 : settings.delay * timeScale; }
  var animation;
  try { animation = element.animate(keyframes, settings); } catch (error) { return Promise.resolve(); }
  liveAnimations.push(animation);
  return animation.finished.then(function () {}, function () {}).then(function () {
    liveAnimations = liveAnimations.filter(function (a) { return a !== animation; });
    try { animation.commitStyles(); } catch (error) {}
    try { animation.cancel(); } catch (error) {}
  });
}
function tween(ms, onFrame, easing) {                   // requestAnimationFrame tween, onFrame(u) with u 0 → 1
  return new Promise(function (resolve) {
    if (skipping || reducedMotion || ms <= 0) { onFrame(1); resolve(); return; }
    var start = performance.now(), total = ms * timeScale;
    (function step(now) {
      if (skipping) { onFrame(1); resolve(); return; }
      var u = Math.min(1, Math.max(0, (now - start) / total));
      onFrame((easing || easeInOut)(u));
      if (u < 1) { requestAnimationFrame(step); } else { resolve(); }
    })(start);
  });
}
function skipAllAnimations() {                          // a tap during the answer sequence jumps to its end
  skipping = true;
  liveAnimations.slice().forEach(function (animation) { try { animation.finish(); } catch (error) {} });
  stopAllSfx();
}
function cancelAllAnimations() {
  liveAnimations.slice().forEach(function (animation) { try { animation.cancel(); } catch (error) {} });
  liveAnimations = [];
}

// ---------- screens ----------
var SCREENS = {
  intro:  { enter: introEnter,  exit: introExit },
  quiz:   { enter: quizEnter,   exit: quizExit },
  result: { enter: resultEnter, exit: resultExit }
};
var SCREEN_SECTIONS = { intro: "actScreenIntro", quiz: "actScreenQuiz", result: "actScreenResult" };

function goToScreen(name) {
  var from = currentScreen;
  if (from) { SCREENS[from].exit(); }
  currentScreen = name;
  showScreen(name);                       // HTML: show only this screen's elements. In Animate this becomes gotoAndStop.
  SCREENS[name].enter(from);
}
function showScreen(name) {
  Object.keys(SCREEN_SECTIONS).forEach(function (screenName) { byId(SCREEN_SECTIONS[screenName]).hidden = (screenName !== name); });
  document.body.setAttribute("data-screen", name);
}

function resetActivity() {                              // retake and back-to-start: everything returns to its first state
  score.total = 0; score.max = 0;
  questionIndex = 0; attemptsUsed = 0; answerLocked = true; flowBusy = false; questionSettled = false;
  questionResults = []; questionPoints = []; notesInBox = 0; resultSummary = null;
  winSequenceActive = false; skipping = false;
  runToken++;
  stopVoice(); stopAllSfx();
  boxClearNotes();
  boxHideSticker();
}

// ---------- SHARED ELEMENT: background camera ----------
var cameraState = { zoom: 1, originX: 0, originY: 0 };
function applyCamera() {
  var scale = cameraState.zoom * 2 / 3;                 // stage px per image px (the image is 2700 wide = stage × 1.5)
  byId("actBg").style.transform = "translate(" + (-cameraState.originX * scale) + "px," + (-cameraState.originY * scale) + "px) scale(" + scale + ")";
}
function setCamera(name) {
  var target = LAYOUT.cameras[name];
  cameraState.zoom = target.zoom; cameraState.originX = target.originX; cameraState.originY = target.originY;
  applyCamera();
}
function animateCameraTo(name, ms) {                    // zoom in log space, the point under the stage centre moves in a straight line
  var target = LAYOUT.cameras[name], from = { zoom: cameraState.zoom, originX: cameraState.originX, originY: cameraState.originY };
  var scaleFrom = from.zoom * 2 / 3, scaleTo = target.zoom * 2 / 3;
  var centerFrom = { x: from.originX + 900 / scaleFrom, y: from.originY + 600 / scaleFrom };
  var centerTo = { x: target.originX + 900 / scaleTo, y: target.originY + 600 / scaleTo };
  return tween(ms, function (u) {
    var zoom = Math.exp(lerp(Math.log(from.zoom), Math.log(target.zoom), u)), scale = zoom * 2 / 3;
    cameraState.zoom = zoom;
    cameraState.originX = lerp(centerFrom.x, centerTo.x, u) - 900 / scale;
    cameraState.originY = lerp(centerFrom.y, centerTo.y, u) - 600 / scale;
    applyCamera();
  });
}

// ---------- SHARED ELEMENT: the dream box ----------
var boxState = { centerX: 900, bottom: 1003, height: 348, view: 0 };
var noteKinds = [];                                    // "yellow" | "mint" | "grey" for each note inside the box
var NOTE_REST = [[0.04, 0.98, -7], [0.36, 1, 5], [0.68, 0.97, -5], [0.18, 0.58, 9], [0.5, 0.62, -8]];   // resting spots of the notes inside the box

function polygonCss(points) { return "polygon(" + points.map(function (p) { return (p[0] * 100).toFixed(2) + "% " + (p[1] * 100).toFixed(2) + "%"; }).join(",") + ")"; }
function boxAspect(view) { var size = imageCache[view === 1 ? "shared_box_front.png" : "shared_box_angled.png"]; return size.w / size.h; }
function boxRect(view, state) {
  state = state || boxState;
  var height = state.height, width = height * boxAspect(view);
  return { x: state.centerX - width / 2, y: state.bottom - height, w: width, h: height };
}
function buildBox() {                                   // SHARED ELEMENT: builds both views of the box once
  var host = byId("actBox");
  host.innerHTML = "";
  [1, 2].forEach(function (view) {
    var element = document.createElement("div");
    element.className = "act-box-view"; element.id = "actBoxView" + view;
    var inside = document.createElement("div");
    inside.className = "act-box-in"; inside.id = "actBoxIn" + view; inside.style.clipPath = polygonCss(BOX_META[view].poly);
    var image = document.createElement("img");
    image.className = "act-box-img"; image.alt = ""; image.src = view === 1 ? "images/shared_box_front.png" : "images/shared_box_angled.png";
    var shine = document.createElement("div");
    shine.className = "act-box-shine"; shine.id = "actBoxShine" + view; shine.style.clipPath = polygonCss(BOX_META[view].poly);
    element.appendChild(inside); element.appendChild(image); element.appendChild(shine);
    host.appendChild(element);
  });
  // sticker (the «outro» image with the live title) and the tape that seals the slot: front view only
  var front = byId("actBoxView1");
  var sticker = document.createElement("div");
  sticker.id = "actStickerWrap";
  sticker.innerHTML = '<img alt="" src="images/result_sticker.png"><div id="actStickerText"></div>';
  front.appendChild(sticker);
  var seal = document.createElement("div");
  seal.id = "actSeal";
  seal.innerHTML = '<img alt="" src="images/result_box_seal.png">';
  front.appendChild(seal);
  byId("actStickerText").textContent = ANIMATE_DATA.result.stickerText;
  applyBox();
}
function applyBox() {
  var view = boxState.view;
  var opacityAngled = Math.min(1, view * 2), opacityFront = view < 0.5 ? 1 : Math.max(0, 1 - (view - 0.5) * 2);
  [1, 2].forEach(function (number) {
    var rect = boxRect(number), element = byId("actBoxView" + number);
    element.style.left = rect.x + "px"; element.style.top = rect.y + "px"; element.style.width = rect.w + "px"; element.style.height = rect.h + "px";
    var opacity = number === 1 ? opacityFront : opacityAngled;
    element.style.opacity = opacity; element.style.visibility = opacity < 0.01 ? "hidden" : "visible";
  });
  layoutBoxExtras();
}
function layoutBoxExtras() {                            // sticker and seal follow the front view
  var rect = boxRect(1), spec = LAYOUT.result.sticker, sticker = byId("actStickerWrap"), seal = byId("actSeal");
  if (!sticker) { return; }
  var width = rect.w * spec.widthFraction, height = imageHeight("result_sticker.png", width);
  sticker.style.width = width + "px"; sticker.style.height = height + "px";
  sticker.style.left = (rect.w * spec.leftFraction) + "px"; sticker.style.top = (rect.h * spec.topFraction - height / 2) + "px";
  sticker.style.transform = "rotate(" + spec.rotate + "deg)";
  var text = byId("actStickerText"), meta = { size: [1695, 874], marginX: 1528 };
  text.style.left = (width * 0.06) + "px"; text.style.right = (width * ((1 - meta.marginX / meta.size[0]) + 0.03)) + "px";
  text.style.top = (height * 0.12) + "px"; text.style.bottom = (height * 0.12) + "px"; text.style.fontSize = (width * 0.115) + "px";
  var slot = BOX_META[1].slot, slotWidth = (slot[2] - slot[0]) * rect.w, sealWidth = slotWidth * LAYOUT.result.seal.widthOverSlot, sealHeight = imageHeight("result_box_seal.png", sealWidth);
  var slotCenterY = (BOX_META[1].slotLeftY + BOX_META[1].slotRightY) / 2 * rect.h;
  seal.style.width = sealWidth + "px"; seal.style.height = sealHeight + "px";
  seal.style.left = (rect.w * (slot[0] + slot[2]) / 2 - sealWidth / 2) + "px"; seal.style.top = (slotCenterY - sealHeight / 2) + "px";
  seal.style.transform = "rotate(" + LAYOUT.result.seal.rotate + "deg)";
}
function setBox(name) {
  var target = LAYOUT.box[name];
  boxState.centerX = target.centerX; boxState.bottom = target.bottom; boxState.height = target.height; boxState.view = target.view;
  applyBox();
}
function animateBoxTo(name, ms) {                       // the box slides to its place on the next screen and turns
  var target = LAYOUT.box[name], from = { centerX: boxState.centerX, bottom: boxState.bottom, height: boxState.height, view: boxState.view };
  return tween(ms, function (u) {
    boxState.centerX = lerp(from.centerX, target.centerX, u); boxState.bottom = lerp(from.bottom, target.bottom, u);
    boxState.height = lerp(from.height, target.height, u); boxState.view = lerp(from.view, target.view, u);
    applyBox();
  });
}
function noteImageName(kind, frame) { return "images/quiz_note_" + frame + "_" + kind + ".png"; }
function noteLayoutIn(view, index) {                    // where note number `index` rests inside the box (fractions of the view)
  var meta = BOX_META[view], hole = meta.hole, holeW = hole[2] - hole[0], holeH = hole[3] - hole[1], noteW = 0.3 * holeW;
  var rect = boxRect(view), noteWidthPx = noteW * rect.w, noteHeightPx = noteWidthPx * imageCache["quiz_note_fold_yellow.png"].h / imageCache["quiz_note_fold_yellow.png"].w;
  var noteH = noteHeightPx / rect.h, rest = NOTE_REST[index % NOTE_REST.length];
  return { left: (hole[0] + rest[0] * (holeW - noteW)) * 100, top: (hole[1] + rest[1] * (holeH - noteH)) * 100, width: noteW * 100, rotate: rest[2] };
}
function createBoxNote(view, index, kind) {
  var element = document.createElement("div"), place = noteLayoutIn(view, index), size = imageCache["quiz_note_fold_yellow.png"];
  element.className = "act-box-note";
  element.style.left = place.left + "%"; element.style.top = place.top + "%"; element.style.width = place.width + "%";
  element.style.aspectRatio = size.w + "/" + size.h; element.style.transform = "rotate(" + place.rotate + "deg)";
  element.style.backgroundImage = "url(" + noteImageName(kind, "fold") + ")";
  return element;
}
function boxRebuildNotes() {
  [1, 2].forEach(function (view) {
    var inside = byId("actBoxIn" + view); inside.innerHTML = "";
    noteKinds.forEach(function (kind, index) { inside.appendChild(createBoxNote(view, index, kind)); });
  });
}
function boxClearNotes() { noteKinds = []; boxRebuildNotes(); }
function boxSlotPoint() {                               // stage point of the slot in the angled view
  var rect = boxRect(2), meta = BOX_META[2];
  return [rect.x + rect.w * (meta.slot[0] + meta.slot[2]) / 2, rect.y + rect.h * (meta.slotLeftY + meta.slotRightY) / 2];
}
function boxHideSticker() { byId("actStickerWrap").style.opacity = 0; byId("actSeal").style.opacity = 0; }

// ---------- SHARED ELEMENT: fx (sparkles, dust, confetti) ----------
function spawnFx(name, x, y, width, options) {
  options = options || {};
  var image = document.createElement("img");
  image.className = "act-fx-img"; image.alt = ""; image.src = "images/" + name + ".png";
  var height = imageHeight(name + ".png", width);
  image.style.left = (x - width / 2) + "px"; image.style.top = (y - height / 2) + "px"; image.style.width = width + "px"; image.style.height = height + "px";
  byId("actFx").appendChild(image);
  var done = animateEl(image, [
    { opacity: 0, transform: "scale(" + (options.scaleFrom || 0.4) + ") rotate(" + (options.rotate || 0) + "deg)" },
    { opacity: options.opacity || 1, transform: "scale(1) rotate(" + ((options.rotate || 0) / 2) + "deg)", offset: 0.35 },
    { opacity: 0, transform: "scale(" + (options.scaleTo || 1.25) + ") rotate(0deg)" }
  ], { duration: options.duration || 800, easing: "ease-out" });
  done.then(function () { image.remove(); });
  return done;
}
function spawnDust(x, y, width) { return spawnFx("shared_fx_dust" + (1 + Math.floor(Math.random() * 3)), x, y, width || 225, { opacity: 0.8, scaleFrom: 0.3, scaleTo: 1.1, duration: 900 }); }
function spawnSparkle(x, y, width) { return spawnFx("shared_fx_spark" + (1 + Math.floor(Math.random() * 4)), x, y, width || 120, { opacity: 1, scaleFrom: 0.3, scaleTo: 1.3, rotate: -40, duration: 700 }); }
function spawnConfetti(count) {
  var host = byId("actFx"), colours = ["#F6A5C0", "#FFE27A", "#8FD0F5", "#9EDFA8", "#C4A8F0", "#E4572E"];
  for (var n = 0; n < count; n++) {
    var piece = document.createElement("span");
    piece.className = "act-confetti";
    piece.style.left = (Math.random() * 1800) + "px"; piece.style.background = colours[n % colours.length];
    piece.style.animationDuration = (2.4 + Math.random() * 2) + "s"; piece.style.animationDelay = (Math.random() * 0.9) + "s";
    host.appendChild(piece);
    (function (element) { later(function () { element.remove(); }, 5600); })(piece);
  }
}
function clearFx() { byId("actFx").innerHTML = ""; }


// ---------- SHARED ELEMENT: the kite (paper plane) ----------
// Used on the intro (one flight along the traced route), on the quiz (progress flights between stars)
// and on the result (two flights along the same route). The route itself is never drawn; only the kite and its chalk trail are.
var KITE_NOSE_ANGLE = Math.atan2(-370, -500);          // direction of the nose inside the sprite art (up-left)
var kite = { visible: false, opacity: 0, x: 0, y: 0, rot: KITE_NOSE_ANGLE, size: 68, wobble: 1, hover: null, loopRunning: false, last: 0 };
var kiteTrails = [];
var KITE_TRAIL_DASH = [15, 11];
var KITE_TRAIL_WIDTH = 4.8;
var chalkImage = new Image();                          // chalk texture used as the stroke fill of the trail lines (canvas pattern)
chalkImage.src = "images/shared_chalk_strong.png";
var chalkPattern = null;
function kiteTrailStyle(context) {
  if (!chalkPattern && chalkImage.complete && chalkImage.naturalWidth) {
    try {
      chalkPattern = context.createPattern(chalkImage, "repeat");
      if (chalkPattern && chalkPattern.setTransform) { chalkPattern.setTransform(new DOMMatrix().scale(0.42)); }
    } catch (error) { chalkPattern = null; }
  }
  return chalkPattern || "#F5F2E8";
}

function kiteEnsureLoop() {
  if (kite.loopRunning) { return; }
  kite.loopRunning = true; kite.last = performance.now();
  requestAnimationFrame(kiteFrame);
}
function kiteFrame(now) {
  var dt = Math.min(0.05, (now - kite.last) / 1000);
  kite.last = now;
  if (kite.hover) {                                    // resting just before a star: a very small float
    kite.x = kite.hover.x + Math.sin(now / 1000 * 2.1) * 2.2;
    kite.y = kite.hover.y + Math.cos(now / 1000 * 1.7) * 2.2;
    var diff = KITE_NOSE_ANGLE - kite.rot;
    while (diff > Math.PI) { diff -= 2 * Math.PI; } while (diff < -Math.PI) { diff += 2 * Math.PI; }
    kite.rot += diff * Math.min(1, dt * 5);
  }
  kiteDrawTrails(now);
  kiteUpdateSprite(now);
  if (kite.visible || kiteTrails.length) { requestAnimationFrame(kiteFrame); } else { kite.loopRunning = false; kiteClearCanvas(); }
}
function kiteUpdateSprite(now) {
  var element = byId("actKite"), sprite = imageCache["shared_kite.png"];
  var width = kite.size, height = width * sprite.h / sprite.w;
  var wobble = (Math.sin(now / 1000 * 4.2) * 0.07 + Math.sin(now / 1000 * 1.9) * 0.035) * kite.wobble;   // smooth wiggle
  element.style.width = width + "px"; element.style.height = height + "px";
  element.style.transform = "translate(" + (kite.x - width / 2) + "px," + (kite.y - height / 2) + "px) rotate(" + (kite.rot - KITE_NOSE_ANGLE + wobble) + "rad)";
  element.style.opacity = kite.visible ? kite.opacity : 0;
}
function kiteClearCanvas() { var canvas = byId("actKiteCanvas"), context = canvas.getContext("2d"); context.clearRect(0, 0, canvas.width, canvas.height); }

// trails: "dash" = dashed chalk line that fades away quickly, "solid" = permanent chalk line between two stars
function kiteTrailNew(style, options) {
  options = options || {};
  var trail = { style: style, points: [], length: 0, hold: options.hold != null ? options.hold : 700, fade: options.fade != null ? options.fade : 1000, alpha: options.alpha != null ? options.alpha : 0.9, erase: null };
  kiteTrails.push(trail);
  return trail;
}
function kiteTrailAdd(trail, x, y) {
  var last = trail.points[trail.points.length - 1];
  if (last && Math.hypot(x - last.x, y - last.y) < 2.5) { return; }
  if (last) { trail.length += Math.hypot(x - last.x, y - last.y); }
  trail.points.push({ x: x, y: y, s: trail.length, t: performance.now() });
}
function kiteDrawTrails(now) {
  var canvas = byId("actKiteCanvas"), context = canvas.getContext("2d");
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineCap = "round"; context.lineJoin = "round"; context.strokeStyle = kiteTrailStyle(context); context.lineWidth = KITE_TRAIL_WIDTH;
  kiteTrails = kiteTrails.filter(function (trail) {
    var eraseFactor = 1;
    if (trail.erase) { eraseFactor = 1 - Math.min(1, (now - trail.erase.start) / Math.max(1, trail.erase.ms)); if (eraseFactor <= 0) { return false; } }
    if (trail.style === "dash") {
      var hold = trail.hold * timeScale, fade = trail.fade * timeScale;
      trail.points = trail.points.filter(function (p) { return now - p.t < hold + fade; });
      if (!trail.points.length && trail.done) { return false; }
      kiteDrawDashes(context, trail.points, function (p) { var age = now - p.t; return (age < hold ? 1 : Math.max(0, 1 - (age - hold) / fade)) * trail.alpha * eraseFactor; });
    } else {
      if (trail.points.length > 1) {
        context.globalAlpha = trail.alpha * eraseFactor; context.beginPath(); context.moveTo(trail.points[0].x, trail.points[0].y);
        for (var n = 1; n < trail.points.length; n++) { context.lineTo(trail.points[n].x, trail.points[n].y); }
        context.stroke(); context.globalAlpha = 1;
      }
    }
    return true;
  });
}
function kiteDrawDashes(context, points, alphaOf) {
  var period = KITE_TRAIL_DASH[0] + KITE_TRAIL_DASH[1], index = 0, count = points.length;
  while (index < count) {
    var cycle = Math.floor(points[index].s / period), position = points[index].s - cycle * period;
    if (position >= KITE_TRAIL_DASH[0]) { index++; continue; }
    var end = index, run = [points[index]];
    while (end + 1 < count && Math.floor(points[end + 1].s / period) === cycle && (points[end + 1].s - cycle * period) < KITE_TRAIL_DASH[0]) { end++; run.push(points[end]); }
    var alpha = alphaOf(run[Math.floor(run.length / 2)]);
    if (alpha > 0.01 && run.length > 1) {
      context.globalAlpha = alpha; context.beginPath(); context.moveTo(run[0].x, run[0].y);
      for (var m = 1; m < run.length; m++) { context.lineTo(run[m].x, run[m].y); }
      context.stroke();
    }
    index = end + 1;
  }
  context.globalAlpha = 1;
}
function kiteEraseSolidTrails(ms) {                     // the lines between the stars fade away at the end of the quiz
  kiteTrails.forEach(function (trail) { if (trail.style === "solid") { trail.erase = { start: performance.now(), ms: ms * timeScale }; } });
}

// the route: normalised points → stage points (anchor = its start or its end) → smooth, evenly spaced polyline
function buildKiteRoute(anchor, x, y, scale, leadIn) {
  var first = KITE_ROUTE_NORM[0], last = KITE_ROUTE_NORM[KITE_ROUTE_NORM.length - 1], ref = anchor === "start" ? first : last;
  var points = KITE_ROUTE_NORM.map(function (p) {
    return { x: x + (p[0] - ref[0]) * KITE_ROUTE_SIZE[0] * scale, y: y + (p[1] - ref[1]) * KITE_ROUTE_SIZE[1] * scale };
  });
  if (leadIn) {                                          // a short straight lead-in before the first point, so the kite comes in from outside the stage
    var p0 = points[0], p3 = points[Math.min(3, points.length - 1)], dx = p0.x - p3.x, dy = p0.y - p3.y, length = Math.hypot(dx, dy) || 1;
    points.unshift({ x: p0.x + dx / length * leadIn, y: p0.y + dy / length * leadIn });
  }
  return resampleSpline(points, 3);
}
function resampleSpline(points, step) {
  var dense = [];
  for (var n = 0; n < points.length - 1; n++) {
    var p0 = points[Math.max(0, n - 1)], p1 = points[n], p2 = points[n + 1], p3 = points[Math.min(points.length - 1, n + 2)];
    var segments = Math.max(1, Math.ceil(Math.hypot(p2.x - p1.x, p2.y - p1.y) / step));
    for (var s = 0; s < segments; s++) {
      var u = s / segments, u2 = u * u, u3 = u2 * u;
      dense.push({
        x: 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * u + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * u2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * u3),
        y: 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * u + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * u2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * u3)
      });
    }
  }
  dense.push(points[points.length - 1]);
  var cumulative = [0];
  for (var k = 1; k < dense.length; k++) { cumulative.push(cumulative[k - 1] + Math.hypot(dense[k].x - dense[k - 1].x, dense[k].y - dense[k - 1].y)); }
  return { points: dense, cumulative: cumulative, length: cumulative[cumulative.length - 1] };
}
function routePointAt(route, distance) {
  var cumulative = route.cumulative, low = 0, high = cumulative.length - 1;
  distance = Math.max(0, Math.min(route.length, distance));
  while (high - low > 1) { var mid = (low + high) >> 1; if (cumulative[mid] <= distance) { low = mid; } else { high = mid; } }
  var span = cumulative[high] - cumulative[low] || 1, u = (distance - cumulative[low]) / span;
  return { x: lerp(route.points[low].x, route.points[high].x, u), y: lerp(route.points[low].y, route.points[high].y, u) };
}
function kiteTurnToward(angle, amount) {
  var diff = angle - kite.rot;
  while (diff > Math.PI) { diff -= 2 * Math.PI; } while (diff < -Math.PI) { diff += 2 * Math.PI; }
  kite.rot += diff * amount;
}

function kiteAppear(x, y, size, ms) {                   // fades in at a point (used on the result screen, in the middle of the stage)
  kite.visible = true; kite.hover = null; kite.x = x; kite.y = y; kite.size = size; kite.wobble = 1; kite.opacity = 0;
  kiteEnsureLoop();
  return tween(ms, function (u) { kite.opacity = u; });
}
function kiteFadeOut(ms) {
  var from = kite.opacity;
  return tween(ms, function (u) { kite.opacity = from * (1 - u); }).then(function () { kite.visible = false; kite.hover = null; });
}
function kiteFlyRoute(route, ms, options) {              // follows the route from its start to its end with a dashed trail that fades quickly
  options = options || {};
  return new Promise(function (resolve) {
    kite.visible = true; kite.hover = null; kite.opacity = options.keepOpacity ? kite.opacity : 1; kite.size = options.size || kite.size; kite.wobble = 1;
    var start = routePointAt(route, 0), ahead = routePointAt(route, 14);
    kite.x = start.x; kite.y = start.y; kite.rot = Math.atan2(ahead.y - start.y, ahead.x - start.x);
    var trail = kiteTrailNew("dash", { hold: options.hold != null ? options.hold : 600, fade: options.fade != null ? options.fade : 900 });
    kiteEnsureLoop();
    var added = 0;                                       // distance along the route that is already in the trail
    tween(ms, function (u) {
      var distance = u * route.length, point = routePointAt(route, distance), next = routePointAt(route, distance + 14);
      kite.x = point.x; kite.y = point.y;
      if (Math.hypot(next.x - point.x, next.y - point.y) > 0.5) { kiteTurnToward(Math.atan2(next.y - point.y, next.x - point.x), 0.25); }
      while (added + 3 < distance) { added += 3; var step = routePointAt(route, added); kiteTrailAdd(trail, step.x, step.y); }
      kiteTrailAdd(trail, point.x, point.y);
    }, options.easing || easeInOutSine).then(function () { trail.done = true; resolve(); });
  });
}
function kiteFlyBetween(from, to, ms, options) {         // progress flight: gentle wiggle, solid chalk line that stays until the quiz ends
  options = options || {};
  return new Promise(function (resolve) {
    var dx = to[0] - from[0], dy = to[1] - from[1], distance = Math.hypot(dx, dy) || 1, nx = -dy / distance, ny = dx / distance;
    var bow = options.bow != null ? options.bow : Math.min(16, distance * 0.08), amplitude = options.amplitude != null ? options.amplitude : 5;
    var cycles = Math.max(2, Math.round(distance / 150)), steps = Math.max(30, Math.round(distance / 3)), points = [];
    for (var n = 0; n <= steps; n++) {
      var u = n / steps, envelope = Math.pow(Math.sin(Math.PI * u), 0.8), wave = Math.sin(u * cycles * 2 * Math.PI) * amplitude * envelope;
      points.push({ x: from[0] + dx * u + nx * (bow * Math.sin(Math.PI * u) + wave), y: from[1] + dy * u + ny * (bow * Math.sin(Math.PI * u) + wave) });
    }
    kite.visible = true; kite.hover = null; kite.opacity = 1; kite.wobble = 0.8;
    if (options.size) { kite.size = options.size; }
    kite.x = points[0].x; kite.y = points[0].y;
    var trail = kiteTrailNew(options.dashed ? "dash" : "solid", { alpha: 0.86, hold: 600, fade: 900 });
    kiteEnsureLoop();
    var lastIndex = -1;
    tween(ms, function (u) {
      var index = Math.min(points.length - 1, Math.round(u * (points.length - 1))), point = points[index], next = points[Math.min(points.length - 1, index + 4)];
      kite.x = point.x; kite.y = point.y;
      if (Math.hypot(next.x - point.x, next.y - point.y) > 0.5) { kiteTurnToward(Math.atan2(next.y - point.y, next.x - point.x), 0.18); }
      for (var n = lastIndex + 1; n <= index; n++) { kiteTrailAdd(trail, points[n].x, points[n].y); }
      lastIndex = index;
    }, easeInOutSine).then(function () { trail.done = true; resolve(); });
  });
}
function kiteHoverAt(x, y, size) {                       // rests at a point (just before a star)
  kite.visible = true; kite.opacity = 1; kite.hover = { x: x, y: y }; kite.wobble = 0.6;
  if (size) { kite.size = size; }
  kiteEnsureLoop();
}
function kiteReset() {                                    // used by screen exits and by resetActivity
  kite.visible = false; kite.hover = null; kite.opacity = 0; kiteTrails = [];
  byId("actKite").style.opacity = 0; kiteClearCanvas();
}


// ===== SCREEN 1: INTRO =====
// Title «صندوق الأحلام» written in chalk on the board, the box on the table, the kite flying in along the traced route.
var introStarting = false;

function introEnter(from) {
  var token = ++runToken;
  skipping = false; winSequenceActive = false; introStarting = false;
  stopVoice();
  layoutIntro();
  resetIntroElements();
  boxHideSticker();
  (async function () {
    try {
      if (from) {                                      // coming back from another screen: camera and box move to the intro view
        await guardToken(token, Promise.all([animateCameraTo("intro", 1300), animateBoxTo("intro", 1300)]));
      } else {                                         // first start: the box drops onto the table
        setCamera("intro"); setBox("intro");
        animateIntroBoxDrop();
        await guardToken(token, waitMs(300));
      }
      var spec = LAYOUT.intro.kite;
      var flight = animateIntroKite();
      await guardToken(token, waitMs(spec.ms - 600));  // the title starts being written as the kite reaches it
      playSfx("chalk_write", { vol: 0.6 });
      await guardToken(token, animateIntroTitle());
      await guardToken(token, flight);
      animateIntroDecoIn();
      await guardToken(token, waitMs(350));
      animateIntroStartButtonIn();
    } catch (error) { if (error !== DEAD_TOKEN) { throw error; } }
  })();
}
function introExit() {                                  // stops everything the intro started
  runToken++;
  clearPendingTimers(); cancelAllAnimations(); stopVoice(); stopAllSfx(); kiteReset(); clearFx();
  byId("actStartBtn").onclick = null;
}

function layoutIntro() {
  var spec = LAYOUT.intro;
  placeEl("actTitle", spec.title);
  placeEl("actStartBtn", spec.startButton);
  byId("actStartBtn").style.fontSize = spec.startButton.fontSize + "px";
  byId("actStartBtn").onclick = onStartClicked;
}
function resetIntroElements() {
  byId("actTitleMaskPath").style.strokeDashoffset = 1; byId("actTitleUnder").style.strokeDashoffset = 1;
  byId("actTitle").style.opacity = 1;
  var start = byId("actStartBtn");
  start.style.opacity = 0; start.style.transform = ""; start.style.pointerEvents = "none"; start.hidden = false;
  buildIntroDeco();
}
function buildIntroDeco() {                             // fixed, evenly spread positions on the left (see LAYOUT.intro.deco)
  var host = byId("actDeco"), size = imageCache["intro_star.png"];
  host.innerHTML = "";
  LAYOUT.intro.deco.forEach(function (star) {
    var element = document.createElement("img");
    element.className = "act-deco-star"; element.alt = ""; element.src = "images/intro_star.png";
    var height = star.size * size.h / size.w;
    element.style.left = (star.x - star.size / 2) + "px"; element.style.top = (star.y - height / 2) + "px";
    element.style.width = star.size + "px"; element.style.height = height + "px";
    element.style.animation = "actTwinkle " + (2.6 + star.phase) + "s ease-in-out " + (star.phase * 1.5) + "s infinite";
    host.appendChild(element);
  });
}

// --- animations of the intro ---
function animateIntroBoxDrop() {
  playSfxLater("box_drop", 650, 0.9);
  return animateEl(byId("actBox"), [
    { opacity: 0, transform: "translateY(-120px) scale(.96)" },
    { opacity: 1, transform: "translateY(10px)", offset: 0.7 },
    { opacity: 1, transform: "none" }
  ], { duration: 850, easing: "cubic-bezier(.4,0,.6,1)" });
}
function playSfxLater(name, ms, volume) { later(function () { playSfx(name, { vol: volume }); }, ms); }
function animateIntroKite() {                           // enters from the right, follows the route and fades just before the title
  var spec = LAYOUT.intro.kite, route = buildKiteRoute("end", spec.endX, spec.endY, spec.scale, spec.leadIn);
  playSfxLater("paper_whoosh", 100, 0.6);
  return kiteFlyRoute(route, spec.ms, { size: spec.size, hold: spec.hold, fade: spec.fade }).then(function () { return kiteFadeOut(600); });
}
function animateIntroTitle() {                          // chalk writes the curved title from right to left, then underlines it
  var written = animateEl(byId("actTitleMaskPath"), [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 1700, easing: "ease-in-out" });
  return written.then(function () { return animateEl(byId("actTitleUnder"), [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 800, easing: "ease-in-out" }); });
}
function animateIntroDecoIn() {
  Array.prototype.forEach.call(byId("actDeco").children, function (star, index) {
    later(function () {
      animateEl(star, [{ opacity: 0, transform: "scale(.2)" }, { opacity: 1, transform: "scale(1.25)", offset: 0.6 }, { opacity: 1, transform: "scale(1)" }], { duration: 420 });
    }, index * 140);
  });
}
function animateIntroStartButtonIn() {
  var button = byId("actStartBtn");
  button.style.pointerEvents = "auto";
  return animateEl(button, [{ opacity: 0, transform: "scale(.6)" }, { opacity: 1, transform: "scale(1)" }], { duration: 450, easing: "cubic-bezier(.3,1.4,.5,1)" });
}
function animateIntroOut() {                            // the intro's own elements leave before the screen changes
  var parts = [
    animateEl(byId("actTitle"), [{ opacity: 1 }, { opacity: 0 }], { duration: 450, easing: "ease-in" }),
    animateEl(byId("actStartBtn"), [{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(.7)" }], { duration: 300 })
  ];
  Array.prototype.forEach.call(byId("actDeco").children, function (star) { parts.push(animateEl(star, [{ opacity: 1 }, { opacity: 0 }], { duration: 400 })); });
  return Promise.all(parts);
}
function onStartClicked() {
  if (introStarting) { return; }
  introStarting = true;
  byId("actStartBtn").style.pointerEvents = "none";
  playSfx("pin_press", { vol: 0.6 });
  animateIntroOut().then(function () { goToScreen("quiz"); });
}


// ===== SCREEN 2: QUIZ =====
// Listen → choose the correct paper → the rule pieces join → the note goes into the box → the kite flies to the next star.
var quizPapers = [];
var stemPaper = null;
var blankElement = null;
var sentenceFontSize = 0;
var crumpledCount = 0;
var stickyVisible = false;

// ---------- quiz logic (no DOM here) ----------
function checkAnswer(question, optionIndex) { return question.options[optionIndex].correct === true; }
function correctOptionIndex(question) { var found = 0; question.options.forEach(function (option, index) { if (option.correct) { found = index; } }); return found; }
function pointsForKind(kind) { return kind === "first" ? SCORING.firstTry : (kind === "second" ? SCORING.secondTry : SCORING.missed); }
function updateScore(points, maxPoints) { score.total += points; score.max += maxPoints; }
function settleQuestion(index, kind) {                   // the question is over (correct, or out of attempts): score it now
  questionResults[index] = kind;
  questionPoints[index] = pointsForKind(kind);
  updateScore(questionPoints[index], SCORING.firstTry);
  questionSettled = true;
}
function computeStars(totalScore) { return totalScore >= SCORING.stars.three ? 3 : (totalScore >= SCORING.stars.two ? 2 : 1); }
function buildResultSummary() {                          // all final values, computed before the result screen is entered
  var total = score.total, max = score.max, stars = computeStars(total), missedKeep = false, missedDrop = false;
  QUESTIONS.forEach(function (question, index) {
    if (questionResults[index] !== "first") { if (question.keepAlef) { missedKeep = true; } else { missedDrop = true; } }
  });
  var reminderKey = "default";
  if (total >= SCORING.stars.three) { reminderKey = "perfect"; }
  else if (missedDrop && !missedKeep) { reminderKey = "missLam"; }
  else if (missedKeep && !missedDrop) { reminderKey = "missKeep"; }
  return { total: total, max: max, percent: max > 0 ? Math.round(total / max * 100) : 0, stars: stars, titleKey: stars === 3 ? "three" : (stars === 2 ? "two" : "one"), reminderKey: reminderKey,
           results: questionResults.slice(), points: questionPoints.slice() };
}

// ---------- texts for the sticky note ----------
function stickyGuideHtml() { return "<span>" + escapeHtml(ANIMATE_DATA.sticky.guide) + "</span>"; }
function stickyHintHtml(hintKey) { return "<span>" + escapeHtml(ANIMATE_DATA.hints[hintKey]) + "</span><em>" + escapeHtml(ANIMATE_DATA.sticky.tryAnother) + "</em>"; }
function stickyFeedbackHtml(question, kind) {
  var feedback = ANIMATE_DATA.feedback, values = { prefixName: ANIMATE_DATA.prefixNames[question.prefix] }, head, sub;
  if (kind === "first") { head = feedback.first; sub = fillText(question.keepAlef ? feedback.ruleKeep : feedback.ruleDrop, values); }
  else if (kind === "second") { head = feedback.second; sub = fillText(question.keepAlef ? feedback.ruleKeep : feedback.ruleDrop, values); }
  else { head = feedback.miss; sub = fillText(question.keepAlef ? feedback.rememberKeep : feedback.rememberDrop, values); }
  return "<b>" + escapeHtml(head) + "</b><span>" + escapeHtml(sub) + "</span>";
}

// ---------- layout ----------
function stageRect(element) {                            // rectangle of an element in stage pixels (works with transforms and with the preview scale)
  var box = element.getBoundingClientRect(), stage = byId("actStage").getBoundingClientRect(), scale = stage.width / 1800;
  return { x: (box.left - stage.left) / scale, y: (box.top - stage.top) / scale, w: box.width / scale, h: box.height / scale };
}
function layoutQuiz() {
  var spec = LAYOUT.quiz;
  buildProgressStars();
  placeEl("actSticky", spec.sticky);
  var tapeWidth = spec.sticky.tapeW, tapeHeight = imageHeight("quiz_hint_tape.png", tapeWidth), tape = byId("actStickyTape");
  placeEl(tape, { x: (spec.sticky.w - tapeWidth) / 2, y: spec.sticky.tapeTop, w: tapeWidth, h: tapeHeight });
  placeEl("actBtnPlay", { x: spec.playButton.x, y: spec.playButton.y, w: spec.playButton.size, h: spec.playButton.size });
  placeEl("actBtnSlow", { x: spec.slowButton.x, y: spec.slowButton.y, w: spec.slowButton.size, h: spec.slowButton.size });
  byId("actBtnSlow").style.zIndex = 7;
  placeEl("actNext", spec.next);
  var hinge = spec.next.hingeY, sheetHeight = imageHeight("quiz_next_page.png", spec.next.w);
  placeEl("actNextPage", { x: 0, y: hinge, w: spec.next.w, h: sheetHeight });
  placeEl("actNextShade", { x: 24, y: hinge, w: spec.next.w - 48, h: sheetHeight - 6 });
  byId("actNext").querySelector(".act-next-label").style.fontSize = spec.next.labelFont + "px";
  byId("actBtnPlay").setAttribute("aria-label", ANIMATE_DATA.aria.play);
  byId("actBtnSlow").setAttribute("aria-label", ANIMATE_DATA.aria.slow);
}
function resetQuizElements() {
  clearQuizBoard();
  byId("actSticky").style.display = "none"; byId("actSticky").style.opacity = ""; byId("actSticky").style.transform = "";
  byId("actSticky").setAttribute("data-tone", "cream"); stickyVisible = false;
  byId("actBtnPlay").style.opacity = 0; byId("actBtnSlow").style.opacity = 0;
  byId("actBtnPlay").style.pointerEvents = "none"; byId("actBtnSlow").style.pointerEvents = "none";
  resetNextCalendar(); byId("actNext").querySelector(".act-next-label").textContent = ANIMATE_DATA.buttons.next;
  var stem = byId("actStem"); stem.innerHTML = ""; stem.style.opacity = 1; stem.style.clipPath = "";
  byId("actProgress").style.opacity = 1;
}
function clearQuizBoard() {                              // the answer area: papers, rule pieces, note, glow
  byId("actPapers").innerHTML = ""; byId("actEq").innerHTML = ""; byId("actNote").style.display = "none";
  byId("actChalkPiece").style.display = "none"; quizPapers = []; stemPaper = null; crumpledCount = 0;
}

// ---------- progress stars (star.png in four looks: faint / current / gold / grey) ----------
function buildProgressStars() {
  var spec = LAYOUT.quiz.progress, host = byId("actProgress"), starHeight = imageHeight("shared_star_gold.png", spec.starWidth);
  host.innerHTML = "";
  for (var index = 0; index < TOTAL_QUESTIONS; index++) {
    var star = document.createElement("div");
    star.className = "act-pstar"; star.id = "actStar" + index; star.setAttribute("data-state", "off");
    star.style.left = (spec.centersX[index] - spec.starWidth / 2) + "px"; star.style.top = (spec.centersY[index] - starHeight / 2) + "px";
    star.style.width = spec.starWidth + "px"; star.style.height = starHeight + "px";
    var glowSize = spec.glowWidth;
    star.innerHTML = '<img class="act-pglow" alt="" src="images/shared_star_glow.png" style="left:' + ((spec.starWidth - glowSize) / 2) + 'px;top:' + ((starHeight - glowSize) / 2) + 'px;width:' + glowSize + 'px;height:' + glowSize + 'px">' +
      '<img class="act-ps act-ps-off" alt="" src="images/shared_star_off.png"><img class="act-ps act-ps-current" alt="" src="images/shared_star_current.png">' +
      '<img class="act-ps act-ps-gold" alt="" src="images/shared_star_gold.png"><img class="act-ps act-ps-grey" alt="" src="images/shared_star_grey.png">';
    star.style.opacity = 0;
    host.appendChild(star);
  }
}
function setProgressStar(index, state) {                // "off" | "current" | "gold" | "grey"
  var star = byId("actStar" + index);
  if (star) { star.setAttribute("data-state", state); }
}
function animateProgressStarResult(index, kind) {        // gold + round glow when answered correctly (1st or 2nd try), grey when missed
  var star = byId("actStar" + index), glow = star.querySelector(".act-pglow");
  setProgressStar(index, kind === "miss" ? "grey" : "gold");
  var center = [LAYOUT.quiz.progress.centersX[index], LAYOUT.quiz.progress.centersY[index]];
  if (kind === "miss") {
    animateEl(star, [{ transform: "scale(1)" }, { transform: "scale(.82)", offset: 0.4 }, { transform: "scale(1)" }], { duration: 420 });
    return;
  }
  playSfx("star_chalk", { vol: 0.9 });
  animateEl(star, [{ transform: "scale(.4) rotate(-50deg)" }, { transform: "scale(1.45) rotate(8deg)", offset: 0.55 }, { transform: "scale(1) rotate(0)" }], { duration: 620 });
  animateEl(glow, [{ opacity: 0, transform: "scale(.5)" }, { opacity: 1, transform: "scale(1.08)", offset: 0.5 }, { opacity: 0.85, transform: "scale(1)" }], { duration: 700 });
  spawnSparkle(center[0], center[1], 96);
}
function animateProgressIn() {
  Array.prototype.forEach.call(byId("actProgress").children, function (star, index) {
    animateEl(star, [{ opacity: 0, transform: "scale(.5)" }, { opacity: 1, transform: "scale(1)" }], { duration: 380, delay: index * 90 });
  });
}
function starHoverPoint(index) {                         // where the kite rests when it stops just before a star (the stars are reached from the right)
  var spec = LAYOUT.quiz.progress;
  return [spec.centersX[index] + spec.hoverDx, spec.centersY[index] + spec.hoverDy];
}
async function animateKiteToStar(index, fromEntry) {
  var spec = LAYOUT.quiz.progress, to = starHoverPoint(index);
  var from = fromEntry ? [spec.kiteEntry.x, spec.kiteEntry.y] : starHoverPoint(index - 1);
  playSfx("paper_whoosh", { vol: 0.5 });
  if (fromEntry) { kite.size = spec.kiteSize; kite.opacity = 1; }
  await kiteFlyBetween(from, to, fromEntry ? 1500 : 1900, { size: spec.kiteSize, dashed: fromEntry });
  kiteHoverAt(to[0], to[1], spec.kiteSize);
  setProgressStar(index, "current");
  playSfx("pin_press", { vol: 0.4 });
}

// ---------- sticky note: guide (cream) / hint (pink) / feedback (mint) ----------
function setStickyTone(tone) { byId("actSticky").setAttribute("data-tone", tone); }
function fitStickyText() {
  var spec = LAYOUT.quiz.sticky, text = byId("actStickyText"), size = spec.fontMax, guard = 0;
  function apply() { text.style.fontSize = size + "px"; Array.prototype.forEach.call(text.querySelectorAll("b"), function (bold) { bold.style.fontSize = (size * 1.14) + "px"; }); }
  apply();
  while ((text.scrollHeight > text.clientHeight + 1 || text.scrollWidth > text.clientWidth + 1) && size > spec.fontMin && guard++ < 24) { size -= 1; apply(); }
}
function setStickyText(html, animate) {
  var text = byId("actStickyText");
  if (animate && stickyVisible) {
    return animateEl(text, [{ opacity: 1 }, { opacity: 0 }], { duration: 160 }).then(function () {
      text.innerHTML = html; fitStickyText();
      return animateEl(text, [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 260 });
    });
  }
  text.innerHTML = html; fitStickyText();
  return Promise.resolve();
}
function animateStickyIn() {
  var sticky = byId("actSticky");
  setStickyTone("cream"); sticky.style.display = "block"; stickyVisible = true;
  byId("actStickyText").innerHTML = stickyGuideHtml(); fitStickyText();
  playSfx("sticky_place", { vol: 0.85 });
  return animateEl(sticky, [
    { opacity: 0, transform: "translateY(-40px) rotate(-10deg) scale(.7)" },
    { opacity: 1, transform: "rotate(2deg) scale(1.04)", offset: 0.6 },
    { opacity: 1, transform: "rotate(-1deg) scale(1)" }
  ], { duration: 560, easing: "ease-out" });
}
function animateStickyOut() {
  var sticky = byId("actSticky");
  stickyVisible = false;
  return animateEl(sticky, [{ opacity: 1 }, { opacity: 0, transform: "translateY(16px) rotate(2deg)" }], { duration: 380 }).then(function () {
    sticky.style.display = "none"; sticky.style.transform = ""; sticky.style.opacity = "";
  });
}
function animateStickyWobble() {
  return animateEl(byId("actSticky"), [{ transform: "rotate(-1deg)" }, { transform: "rotate(2.2deg)" }, { transform: "rotate(-1.4deg)" }, { transform: "rotate(.6deg)" }], { duration: 420 });
}

// ---------- Next (a desk calendar on the table: a blank page flips up and shows «التالي») ----------
var nextOpen = false;
function resetNextCalendar() {                          // closed = the blank top sheet lies flat over the label
  nextOpen = false;
  var next = byId("actNext"), page = byId("actNextPage"), shade = byId("actNextShade");
  page.getAnimations().forEach(function (animation) { animation.cancel(); });
  shade.getAnimations().forEach(function (animation) { animation.cancel(); });
  page.style.transform = ""; page.style.opacity = ""; page.style.filter = ""; shade.style.opacity = "";
  next.classList.remove("act-ready", "act-nudge"); next.disabled = true;
}
function animateNextFlip(open) {
  var page = byId("actNextPage"), shade = byId("actNextShade"), ms = LAYOUT.quiz.next.flipMs, persp = "perspective(850px) ";
  playSfx("paper_whoosh", { vol: 0.35 });
  if (open) {
    animateEl(shade, [{ opacity: 0 }, { opacity: 0.8, offset: 0.4 }, { opacity: 0 }], { duration: ms, easing: "ease-in-out" });
    return animateEl(page, [
      { transform: persp + "rotateX(0deg)", opacity: 1, filter: "brightness(1)" },
      { transform: persp + "rotateX(80deg)", opacity: 1, filter: "brightness(.95)", offset: 0.45 },
      { transform: persp + "rotateX(125deg)", opacity: 1, filter: "brightness(.9)", offset: 0.78 },
      { transform: persp + "rotateX(165deg)", opacity: 0, filter: "brightness(.88)" }
    ], { duration: ms, easing: "ease-in-out" });
  }
  animateEl(shade, [{ opacity: 0 }, { opacity: 0.8, offset: 0.6 }, { opacity: 0 }], { duration: ms * 0.7, easing: "ease-in-out" });
  return animateEl(page, [
    { transform: persp + "rotateX(165deg)", opacity: 0, filter: "brightness(.88)" },
    { transform: persp + "rotateX(125deg)", opacity: 1, filter: "brightness(.9)", offset: 0.25 },
    { transform: persp + "rotateX(0deg)", opacity: 1, filter: "brightness(1)" }
  ], { duration: ms * 0.7, easing: "ease-in-out" });
}
function setNextReady(ready, label) {
  var next = byId("actNext");
  if (label) { next.querySelector(".act-next-label").textContent = label; }
  next.disabled = !ready;
  next.classList.toggle("act-ready", !!ready);
  if (ready && !nextOpen) {                              // the page flips up, then the calendar nudges now and then to call attention
    nextOpen = true;
    animateNextFlip(true).then(function () { if (nextOpen) { next.classList.add("act-nudge"); } });
  } else if (!ready && nextOpen) {
    nextOpen = false; next.classList.remove("act-nudge");
    animateNextFlip(false);
  } else if (!ready) {
    next.classList.remove("act-nudge");
  }
}
function nextLabelFor(index) { return index < TOTAL_QUESTIONS - 1 ? ANIMATE_DATA.buttons.next : ANIMATE_DATA.buttons.nextLast; }

// ---------- the sentence ----------
function blankWidthFor(fontSize) { return Math.max(180, Math.min(250, Math.round(fontSize * 5.2))); }
function measureSentenceWidth(question, fontSize) {      // width of "before + blank + after" on one line at this font size
  var probe = document.createElement("div");
  probe.style.cssText = "position:absolute;left:-9999px;top:0;display:flex;flex-wrap:nowrap;white-space:nowrap;align-items:center;direction:rtl;width:max-content;gap:0 " + LAYOUT.quiz.stem.gap + "px;font-size:" + fontSize + "px;line-height:1.55";
  var html = "";
  if (question.before) { html += "<span>" + escapeHtml(question.before) + "</span>"; }
  html += '<span style="display:inline-block;width:' + blankWidthFor(fontSize) + 'px;height:10px"></span>';
  if (question.after) { html += "<span>" + escapeHtml(question.after) + "</span>"; }
  probe.innerHTML = html;
  byId("actStage").appendChild(probe);
  var width = probe.offsetWidth;
  probe.remove();
  return width;
}
function ensureSentenceFont() {                          // one font size for all five sentences = the biggest size at which the longest one stays on ONE line
  if (sentenceFontSize) { return; }
  var spec = LAYOUT.quiz.stem, best = spec.fontMax;
  QUESTIONS.forEach(function (question) {
    var size = spec.fontMax;
    while (size > spec.fontMin && measureSentenceWidth(question, size) > spec.w) { size -= 1; }
    best = Math.min(best, size);
  });
  sentenceFontSize = best;
}
function buildSentence(question) {
  var stem = byId("actStem"), spec = LAYOUT.quiz.stem, html = "";
  if (question.before) { html += "<span>" + escapeHtml(question.before) + "</span>"; }
  html += '<span class="act-blank" id="actBlank"></span>';
  if (question.after) { html += "<span>" + escapeHtml(question.after) + "</span>"; }
  stem.innerHTML = html; stem.style.opacity = 1; stem.style.clipPath = "inset(0 0 0 100%)";
  placeEl(stem, spec);
  stem.style.fontSize = sentenceFontSize + "px"; stem.style.gap = "0 " + spec.gap + "px";
  blankElement = byId("actBlank");
  blankElement.style.width = blankWidthFor(sentenceFontSize) + "px";
  blankElement.style.height = Math.round(sentenceFontSize * 1.7) + "px";
}
function animateChalkWrite(element, ms, withChalk) {      // chalk writes the sentence from right to left
  var done = animateEl(element, [{ clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)" }], { duration: ms, easing: "linear" });
  if (withChalk) {
    var children = element.children, left = 1e9, right = -1e9;
    Array.prototype.forEach.call(children, function (child) { var box = stageRect(child); left = Math.min(left, box.x); right = Math.max(right, box.x + box.w); });
    var piece = byId("actChalkPiece"), width = 121, height = imageHeight("quiz_chalk_piece.png", width), y = stageRect(element).y + stageRect(element).h * 0.55;
    piece.style.width = width + "px"; piece.style.height = height + "px"; piece.style.display = "block"; piece.style.left = "0px"; piece.style.top = "0px";
    var x0 = right - 30, x1 = left + 30;
    animateEl(piece, [
      { transform: "translate(" + x0 + "px," + (y - 56) + "px) rotate(-18deg)", opacity: 0 },
      { opacity: 1, offset: 0.08 },
      { transform: "translate(" + ((x0 + x1) / 2) + "px," + (y - 44) + "px) rotate(-12deg)", offset: 0.5 },
      { transform: "translate(" + x1 + "px," + (y - 56) + "px) rotate(-18deg)", opacity: 1, offset: 0.92 },
      { transform: "translate(" + (x1 - 14) + "px," + (y - 96) + "px) rotate(-24deg)", opacity: 0 }
    ], { duration: ms + 250, easing: "linear" }).then(function () { piece.style.display = "none"; });
  }
  return done;
}

// ---------- listening: play (sentence + word) and turtle (word, slowly) ----------
function sayQuestion(slow) {
  var sounds = QUESTIONS[questionIndex].sounds;
  playVoice(slow ? [sounds.slow] : [sounds.sentence, sounds.word]);
  var button = byId(slow ? "actBtnSlow" : "actBtnPlay");
  button.classList.add("act-pulse");
  later(function () { button.classList.remove("act-pulse"); }, slow ? 1800 : 3500);
}


// ---------- enter / exit ----------
function quizEnter(from) {
  var token = ++runToken;
  skipping = false; winSequenceActive = false; flowBusy = true; answerLocked = true;
  stopVoice();
  ensureSentenceFont();
  layoutQuiz();
  resetQuizElements();
  (async function () {
    try {
      playSfx("paper_whoosh", { vol: 0.6 });
      // moving on from the intro / result: the camera pulls back and the box slides to the left corner and turns
      await guardToken(token, Promise.all([animateCameraTo("quiz", 1500), animateBoxTo("quiz", 1500)]));
      animateProgressIn();
      await guardToken(token, waitMs(350));
      await guardToken(token, animateKiteToStar(0, true));
      await guardToken(token, animateStickyIn());
      await guardToken(token, waitMs(350));
      renderQuestion(true);
    } catch (error) { if (error !== DEAD_TOKEN) { throw error; } }
  })();
}
function quizExit() {                                    // stops everything the quiz started
  runToken++;
  clearPendingTimers(); cancelAllAnimations(); stopVoice(); stopAllSfx(); kiteReset(); clearFx();
  skipping = false; winSequenceActive = false; flowBusy = false;
  closeAllOverlays();
}

// ---------- one question ----------
function buildPapers(question) {
  var spec = LAYOUT.quiz.papers, host = byId("actPapers");
  host.innerHTML = ""; quizPapers = [];
  question.options.forEach(function (option, index) {
    var paper = document.createElement("button");
    paper.className = "act-paper"; paper.setAttribute("data-index", index);
    paper.setAttribute("aria-label", fillText(ANIMATE_DATA.aria.option, { text: option.text }));
    paper.style.left = (spec.centersX[index] - spec.w / 2) + "px"; paper.style.top = spec.top + "px"; paper.style.width = spec.w + "px"; paper.style.height = spec.h + "px";
    paper.innerHTML = '<img class="act-pi" alt="" src="images/quiz_paper_yellow.png"><div class="act-pt"><span>' + escapeHtml(option.text) + "</span></div>";
    paper.style.opacity = 0;
    host.appendChild(paper);
    fitPaperText(paper);
    quizPapers.push(paper);
  });
}
function fitPaperText(paper) {
  var spec = LAYOUT.quiz.papers, text = paper.querySelector(".act-pt"), span = text.querySelector("span"), size = spec.fontMax, guard = 0;
  text.style.fontSize = size + "px";
  while (span.offsetWidth > spec.w * 0.84 && size > spec.fontMin && guard++ < 30) { size -= 2; text.style.fontSize = size + "px"; }
}
function paperGeometry(paper) {                          // [centre x, centre y, width, height] from the inline layout
  var w = parseFloat(paper.style.width), h = parseFloat(paper.style.height);
  return [parseFloat(paper.style.left) + w / 2, parseFloat(paper.style.top) + h / 2, w, h];
}
function livePaperIndexes() { return quizPapers.map(function (paper, index) { return paper.classList.contains("act-dead") ? -1 : index; }).filter(function (index) { return index >= 0; }); }

function renderQuestion(isFirstQuestion) {
  var token = ++runToken;
  stopVoice(); skipping = false; winSequenceActive = false;
  var question = QUESTIONS[questionIndex];
  attemptsUsed = 0; questionSettled = false; flowBusy = true; answerLocked = true;
  clearQuizBoard();
  setNextReady(false, nextLabelFor(questionIndex));
  setStickyTone("cream"); setStickyText(stickyGuideHtml(), true);
  buildSentence(question); buildPapers(question);
  byId("actBtnPlay").style.pointerEvents = "auto"; byId("actBtnSlow").style.pointerEvents = "auto";
  (async function () {
    try {
      playSfx("chalk_write", { vol: 0.55 });
      var written = animateChalkWrite(byId("actStem"), 900, true);
      animateEl(byId("actBtnPlay"), [{ opacity: 0, transform: "scale(.5)" }, { opacity: 1, transform: "scale(1)" }], { duration: 380, easing: "cubic-bezier(.3,1.4,.5,1)" });
      animateEl(byId("actBtnSlow"), [{ opacity: 0, transform: "scale(.5)" }, { opacity: 1, transform: "scale(1)" }], { duration: 380, delay: 120, easing: "cubic-bezier(.3,1.4,.5,1)" });
      await guardToken(token, written);
      for (var index = 0; index < quizPapers.length; index++) {
        animateEl(quizPapers[index], [{ opacity: 0, transform: "translateY(-52px) rotate(" + (index % 2 ? -5 : 5) + "deg) scale(1.08)" }, { opacity: 1, transform: "none" }], { duration: 340, easing: "cubic-bezier(.3,1.4,.5,1)" });
        playSfxLater("tape_stick", 0, 0.4);
        await guardToken(token, waitMs(170));
      }
      await guardToken(token, waitMs(300));
      answerLocked = false; flowBusy = false;
      playVoice(isFirstQuestion ? [ANIMATE_DATA.sounds.prompt, question.sounds.sentence, question.sounds.word] : [question.sounds.sentence, question.sounds.word]);
    } catch (error) { if (error !== DEAD_TOKEN) { throw error; } }
  })();
}

// ---------- the learner answers ----------
function onOptionChosen(optionIndex) {                   // flow function: logic first, then UI
  if (answerLocked || flowBusy || currentScreen !== "quiz") { return; }
  var question = QUESTIONS[questionIndex];
  attemptsUsed++; answerLocked = true; flowBusy = true;
  var isCorrect = checkAnswer(question, optionIndex);
  if (isCorrect) {
    var kind = attemptsUsed === 1 ? "first" : "second";
    settleQuestion(questionIndex, kind);
    animateCorrectSequence(optionIndex, kind, false);
  } else if (attemptsUsed >= SCORING.maxAttempts) {
    settleQuestion(questionIndex, "miss");
    animateMissedQuestion(optionIndex);
  } else {
    animateWrongAnswer(optionIndex);
  }
}

async function animatePaperCrumple(token, index, quick) {  // the wrong paper shakes, flies to the board ledge and turns into a crumpled ball
  var paper = quizPapers[index], geometry = paperGeometry(paper), spec = LAYOUT.quiz.crumple;
  paper.classList.add("act-dead"); paper.style.zIndex = 9;
  playSfx("paper_slide", { vol: 0.5 });
  await guardToken(token, animateEl(paper, [{ transform: "rotate(0)" }, { transform: "rotate(-8deg)", offset: 0.25 }, { transform: "rotate(7deg)", offset: 0.5 }, { transform: "rotate(-5deg)", offset: 0.75 }, { transform: "rotate(0)" }], { duration: quick ? 340 : 480 }));
  var landX = spec.landX[Math.min(crumpledCount, 1)], dx = landX - geometry[0], dy = spec.trayY - geometry[3] * 0.55 - geometry[1];
  playSfx("paper_whoosh", { vol: 0.7 });
  await guardToken(token, animateEl(paper, [
    { transform: "none" },
    { transform: "rotate(-10deg) translate(" + (dx * 0.3) + "px," + (dy * 0.1) + "px)", offset: 0.3 },
    { transform: "rotate(8deg) translate(" + dx + "px," + dy + "px)" }
  ], { duration: quick ? 520 : 660, easing: "cubic-bezier(.5,0,.9,.7)" }));
  playSfx("paper_crumple", { vol: 0.9 }); spawnDust(landX, spec.trayY - 6, 225);
  var image = paper.querySelector(".act-pi"), text = paper.querySelector(".act-pt");
  animateEl(text, [{ opacity: 1 }, { opacity: 0 }], { duration: 120 });
  paper.style.transform = "none";
  function setBox(width, height) { paper.style.width = width + "px"; paper.style.height = height + "px"; paper.style.left = (landX - width / 2) + "px"; paper.style.top = (spec.trayY - height + 6) + "px"; }
  image.src = "images/quiz_crumple_half.png"; setBox(spec.halfW, imageHeight("quiz_crumple_half.png", spec.halfW));
  await guardToken(token, animateEl(paper, [{ transform: "scale(1.12,.84)" }, { transform: "scale(.94,1.06)" }, { transform: "none" }], { duration: 240 }));
  image.src = "images/quiz_crumple_ball.png"; setBox(spec.ballW, imageHeight("quiz_crumple_ball.png", spec.ballW));
  await guardToken(token, animateEl(paper, [{ transform: "scale(1.2)" }, { transform: "scale(.92)" }, { transform: "none" }], { duration: 260 }));
  paper.classList.add("act-crumpled"); crumpledCount++;
}
async function animateReflowPapers(token, ms) {          // the remaining papers slide together, centred
  var spec = LAYOUT.quiz.papers, alive = livePaperIndexes(), count = alive.length;
  var total = count * spec.w + (count - 1) * spec.gap, x0 = spec.reflowCenterX - total / 2;
  var order = alive.slice().sort(function (a, b) { return spec.centersX[b] - spec.centersX[a]; });   // right-most first (reading order)
  await guardToken(token, Promise.all(order.map(function (index, position) {
    var paper = quizPapers[index], target = x0 + total - (position + 1) * spec.w - position * spec.gap;
    return animateEl(paper, [{ left: paper.style.left }, { left: target + "px" }], { duration: ms, easing: "ease-in-out" });
  })));
}
async function animateWrongAnswer(optionIndex) {          // first wrong try: crumple, pink hint on the sticky note, try again
  var token = ++runToken, question = QUESTIONS[questionIndex], option = question.options[optionIndex];
  try {
    await animatePaperCrumple(token, optionIndex, false);
    setStickyTone("pink");
    setStickyText(stickyHintHtml(option.hint), true);
    animateStickyWobble();
    playSfx("sticky_place", { vol: 0.5 });
    await animateReflowPapers(token, 560);
    flowBusy = false; answerLocked = false;
  } catch (error) { if (error !== DEAD_TOKEN) { throw error; } }
}
async function animateMissedQuestion(optionIndex) {      // second wrong try: crumple, then the correct paper glows and the answer is shown
  var token = ++runToken, question = QUESTIONS[questionIndex];
  try {
    await animatePaperCrumple(token, optionIndex, true);
    var correctIndex = correctOptionIndex(question), paper = quizPapers[correctIndex];
    await animateReflowPapers(token, 520);
    var geometry = paperGeometry(paper);
    playSfx("gold_glow", { vol: 0.9 });
    var glow = document.createElement("img");
    glow.className = "act-glow"; glow.alt = ""; glow.src = "images/quiz_glow.png";
    glow.style.cssText = "left:" + (geometry[0] - geometry[2] * 0.75) + "px;top:" + (geometry[1] - geometry[3] * 0.95) + "px;width:" + (geometry[2] * 1.5) + "px;height:" + (geometry[3] * 1.9) + "px;opacity:0;z-index:4";
    byId("actPapers").appendChild(glow);
    animateEl(glow, [{ opacity: 0, transform: "scale(.6)" }, { opacity: 1, transform: "scale(1)", offset: 0.4 }, { opacity: 0.7, transform: "scale(1.06)" }], { duration: 900 });
    await guardToken(token, animateEl(paper, [{ transform: "scale(1)" }, { transform: "scale(1.08)", offset: 0.35 }, { transform: "scale(1)", offset: 0.6 }, { transform: "scale(1.06)" }], { duration: 900 }));
    paper.style.filter = "drop-shadow(0 0 12px #F7D96B) drop-shadow(0 0 4px #fff)";
    await guardToken(token, waitMs(300));
    glow.remove();
    await animateCorrectSequence(correctIndex, "miss", true);
  } catch (error) { if (error !== DEAD_TOKEN) { throw error; } }
}


// ---------- the correct answer sequence ----------
async function animateCorrectSequence(index, kind, fromReveal) {
  var token = ++runToken, question = QUESTIONS[questionIndex];
  winSequenceActive = true; flowBusy = true; answerLocked = true; skipping = false;
  var paper = quizPapers[index], geometry = paperGeometry(paper);
  try {
    quizPapers.forEach(function (other, otherIndex) {    // the other papers are wiped away
      if (otherIndex !== index && !other.classList.contains("act-dead")) { other.classList.add("act-dead"); animateEl(other, [{ opacity: 1 }, { opacity: 0, transform: "translateY(18px) scale(.94)" }], { duration: 380 }); }
    });
    paper.classList.add("act-dead"); paper.style.zIndex = 9; paper.style.filter = "";
    if (kind === "miss") { paper.classList.add("act-gray"); }
    stemPaper = paper;
    // 1. the chosen paper goes to the blank of the sentence
    var blank = stageRect(blankElement), scale = Math.min(1, (blank.w * 0.98) / geometry[2]);
    var dx = blank.x + blank.w / 2 - geometry[0], dy = blank.y + blank.h / 2 - geometry[1] + 3;
    playSfx("paper_slide", { vol: 0.6 });
    await guardToken(token, animateEl(paper, [{ transform: "none" }, { transform: "translate(" + dx + "px," + dy + "px) scale(" + scale + ")" }], { duration: 640, easing: "cubic-bezier(.4,0,.2,1)" }));
    paper.style.transform = "translate(" + dx + "px," + dy + "px) scale(" + scale + ")";
    playSfx("tape_stick", { vol: 0.9 });
    await guardToken(token, animateEl(paper, [{ transform: "translate(" + dx + "px," + dy + "px) scale(" + scale + ")" }, { transform: "translate(" + dx + "px," + dy + "px) scale(" + (scale * 1.07) + ")", offset: 0.4 }, { transform: "translate(" + dx + "px," + dy + "px) scale(" + scale + ")" }], { duration: 240 }));
    await guardToken(token, waitMs(250));
    // 2. the two torn pieces (prefix + noun) join like a puzzle
    await animateRulePieces(token, question);
    // 3. feedback on the sticky note, star in the progress bar, Next
    setStickyTone(kind === "miss" ? "pink" : "mint");
    setStickyText(stickyFeedbackHtml(question, kind), true);
    playSfx("sticky_place", { vol: 0.5 });
    animateProgressStarResult(questionIndex, kind);
    setNextReady(true, nextLabelFor(questionIndex));
    skipping = false; winSequenceActive = false; flowBusy = false;
  } catch (error) { if (error !== DEAD_TOKEN) { throw error; } }
}

function createRulePiece(kind, x, y, size, html, fontSize) {
  var piece = document.createElement("div");
  piece.className = "act-piece act-piece-" + kind;
  piece.style.cssText = "left:" + x + "px;top:" + y + "px;width:" + size[0] + "px;height:" + size[1] + "px;font-size:" + fontSize + "px;opacity:0";
  piece.innerHTML = '<img alt="" src="images/quiz_piece_' + kind + '.png"><span class="act-piece-text">' + html + "</span>";
  return piece;
}
var pieceFontSize = 0;
function measurePiece(html, size) {                      // width of a piece text at a given size (measured off-screen, inside the stage so the fonts match)
  var probe = document.createElement("div");
  probe.className = "act-piece";
  probe.style.cssText = "position:absolute;left:-9999px;top:0;width:auto;height:auto;font-size:" + size + "px";
  probe.innerHTML = '<span class="act-piece-text">' + html + "</span>";
  byId("actStage").appendChild(probe);
  var width = probe.querySelector(".act-piece-text").offsetWidth;
  probe.remove();
  return width;
}
function nounPieceHtml(question) {                       // only the TEXT is coloured: «ال» blue; when the alef is dropped it carries a red strike line (drawn, then animated)
  var al = question.noun.slice(0, 2), rest = question.noun.slice(2);
  if (question.keepAlef) { return '<span class="act-al">' + escapeHtml(al) + "</span>" + escapeHtml(rest); }
  return '<span class="act-alef-cut"><span class="act-strike"></span>' + escapeHtml(al.charAt(0)) + '</span><span class="act-al">' + escapeHtml(al.charAt(1)) + "</span>" + escapeHtml(rest);
}
function ensurePieceFont() {                             // one big size for all five words = the biggest size at which the longest one fits its piece
  if (pieceFontSize) { return pieceFontSize; }
  var spec = LAYOUT.quiz.equation, available = spec.noun[0] - spec.nounPadRight - spec.nounPadLeft, best = spec.fontMax;
  QUESTIONS.forEach(function (question) {
    var size = spec.fontMax;
    while (size > spec.fontMin && measurePiece(nounPieceHtml(question), size) > available) { size -= 2; }
    best = Math.min(best, size);
  });
  pieceFontSize = best;
  return best;
}
function prefixPieceHtml(question, size) {               // the letter + as many kashidas as fit the piece (it reads «كـ» = connected to the word that follows)
  var spec = LAYOUT.quiz.equation, available = spec.prefix[0] - spec.prefixPadLeft - spec.prefixPadRight, count = 1;
  function html(n) { return '<span class="act-prefix-letter">' + escapeHtml(question.prefix) + new Array(n + 1).join(ANIMATE_DATA.pieces.kashida) + "</span>"; }
  while (count < 14 && measurePiece(html(count + 1), size) <= available) { count++; }
  return html(count);
}

async function animateRulePieces(token, question) {
  var spec = LAYOUT.quiz.equation, host = byId("actEq");
  host.innerHTML = "";
  var total = spec.joinDx + spec.prefix[0], nounEnd = spec.centerX - total / 2, prefixEnd = nounEnd + spec.joinDx;
  var nounStart = nounEnd - spec.startOffset, prefixStart = prefixEnd + spec.startOffset;
  var size = ensurePieceFont(), prefixSize = Math.round(size * 1.08);
  var noun = createRulePiece("noun", nounStart, spec.top, spec.noun, nounPieceHtml(question), size);
  var prefix = createRulePiece("prefix", prefixStart, spec.top + spec.joinDy, spec.prefix, prefixPieceHtml(question, prefixSize), prefixSize);
  noun.style.zIndex = 1; prefix.style.zIndex = 2;
  noun.style.paddingRight = spec.nounPadRight + "px"; noun.style.paddingLeft = spec.nounPadLeft + "px"; noun.style.justifyContent = "flex-start";     // the word sits against the join (RTL: flex-start = right)
  prefix.style.paddingLeft = spec.prefixPadLeft + "px"; prefix.style.paddingRight = spec.prefixPadRight + "px"; prefix.style.justifyContent = "flex-end";   // the kashida tail points at the word (flex-end = left)
  var plus = document.createElement("div");
  plus.className = "act-plus act-chalk"; plus.textContent = ANIMATE_DATA.pieces.plus;
  plus.style.cssText = "left:" + (spec.centerX - 40) + "px;top:" + (spec.top + spec.noun[1] / 2 - 52) + "px;opacity:0";
  host.appendChild(noun); host.appendChild(prefix); host.appendChild(plus);
  playSfx("paper_tear", { vol: 0.55 });
  animateEl(noun, [{ opacity: 0, transform: "translateX(-70px) rotate(-5deg)" }, { opacity: 1, transform: "none" }], { duration: 460, easing: "ease-out" });
  animateEl(prefix, [{ opacity: 0, transform: "translateX(70px) rotate(5deg)" }, { opacity: 1, transform: "none" }], { duration: 460, easing: "ease-out" });
  await guardToken(token, animateEl(plus, [{ opacity: 0, transform: "scale(.2)" }, { opacity: 1, transform: "scale(1.2)", offset: 0.6 }, { opacity: 1, transform: "scale(1)" }], { duration: 400, delay: 240 }));
  await guardToken(token, waitMs(450));
  if (!question.keepAlef) {                              // the alef of «ال» is crossed out (no words written, just the strike)
    playSfx("chalk_write", { vol: 0.5 });
    await guardToken(token, animateEl(noun.querySelector(".act-strike"), [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 420, easing: "ease-out" }));
    await guardToken(token, waitMs(320));
  }
  animateEl(plus, [{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(.2)" }], { duration: 280 });
  playSfx("paper_slide", { vol: 0.45 });
  await guardToken(token, Promise.all([
    animateEl(noun, [{ left: nounStart + "px" }, { left: nounEnd + "px" }], { duration: 460, easing: "ease-in-out" }),
    animateEl(prefix, [{ left: prefixStart + "px" }, { left: prefixEnd + "px" }], { duration: 460, easing: "ease-in-out" })
  ]));
  playSfx("tape_stick", { vol: 0.8 });
  spawnSparkle(prefixEnd + 8, spec.top + spec.noun[1] * 0.5, 130);
  await guardToken(token, animateEl(noun, [{ transform: "translateY(0)" }, { transform: "translateY(-4px)" }, { transform: "translateY(0)" }], { duration: 200 }));
  await guardToken(token, waitMs(300));
}

// ---------- Next: the note is folded, goes into the box, the kite flies on ----------
function onNextClicked() {
  if (!questionSettled || flowBusy || currentScreen !== "quiz") { return; }
  animateAdvance();
}
async function animateAdvance() {
  var token = ++runToken, question = QUESTIONS[questionIndex];
  flowBusy = true; winSequenceActive = true; skipping = false;
  var result = questionResults[questionIndex], kind = result === "first" ? "yellow" : (result === "second" ? "mint" : "grey");
  setNextReady(false); stopVoice(); playSfx("pin_press", { vol: 0.5 });
  try {
    var rect = stageRect(stemPaper), centerX = rect.x + rect.w / 2, centerY = rect.y + rect.h / 2;
    animateEl(byId("actStem"), [{ opacity: 1 }, { opacity: 0 }], { duration: 420 });
    Array.prototype.forEach.call(byId("actEq").children, function (piece) { animateEl(piece, [{ opacity: 1 }, { opacity: 0, transform: "translateY(10px)" }], { duration: 380 }); });
    var note = byId("actNote"), noteImage = byId("actNoteImg"), ink = byId("actNoteInk"), spec = LAYOUT.quiz.note;
    function setFrame(frame, width) {
      var height = imageHeight("quiz_note_" + frame + "_" + kind + ".png", width);
      noteImage.src = noteImageName(kind, frame);
      note.style.cssText = "display:block;left:" + (centerX - width / 2) + "px;top:" + (centerY - height / 2) + "px;width:" + width + "px;height:" + height + "px";
      return [width, height];
    }
    setFrame("open", spec.openW);
    ink.textContent = question.word; ink.style.fontSize = "46px"; ink.style.opacity = 1; ink.style.color = kind === "grey" ? "#4a4a55" : "#2A2A3C";
    note.style.opacity = 0;
    animateEl(note, [{ opacity: 0, transform: "scale(.9)" }, { opacity: 1, transform: "scale(1)" }], { duration: 260 });
    animateEl(stemPaper, [{ opacity: 1 }, { opacity: 0 }], { duration: 260 });
    await guardToken(token, waitMs(300));
    playSfx("paper_fold", { vol: 0.9 });                  // open → half → folded
    animateEl(ink, [{ opacity: 1 }, { opacity: 0 }], { duration: 200 });
    await guardToken(token, animateEl(note, [{ transform: "scaleY(1)" }, { transform: "scaleY(.92)" }], { duration: 140 }));
    setFrame("half", spec.halfW); ink.style.opacity = 0;
    await guardToken(token, animateEl(note, [{ transform: "scale(1.06)" }, { transform: "scale(1)" }], { duration: 200 }));
    await guardToken(token, waitMs(90));
    setFrame("fold", spec.foldW);
    await guardToken(token, animateEl(note, [{ transform: "scale(1.12)" }, { transform: "scale(1)" }], { duration: 220 }));
    // it flies to the slot of the box
    var slot = boxSlotPoint(), dx = slot[0] - centerX, dy = slot[1] - centerY - 12;
    playSfx("paper_whoosh", { vol: 0.9 });
    await guardToken(token, animateEl(note, [
      { transform: "translate(0,0) rotate(0) scale(1)" },
      { transform: "translate(" + (dx * 0.5) + "px," + (dy * 0.4 - 120) + "px) rotate(-110deg) scale(.9)", offset: 0.5 },
      { transform: "translate(" + dx + "px," + dy + "px) rotate(-200deg) scale(.52)" }
    ], { duration: 820, easing: "ease-in-out" }));
    note.style.display = "none"; note.style.transform = "none";
    // it slides in through the slot and rests inside the box
    var boxRectAngled = boxRect(2), landed = createBoxNote(2, notesInBox, kind);
    landed.style.opacity = 0; byId("actBoxIn2").appendChild(landed);
    byId("actBoxIn1").appendChild(createBoxNote(1, notesInBox, kind)); noteKinds.push(kind);
    playSfx("box_drop", { vol: 0.9 });
    var place = noteLayoutIn(2, notesInBox), noteHeight = (place.width / 100 * boxRectAngled.w) * imageCache["quiz_note_fold_yellow.png"].h / imageCache["quiz_note_fold_yellow.png"].w;
    var fall = (place.top / 100 * boxRectAngled.h) - (BOX_META[2].hole[1] * boxRectAngled.h) + noteHeight + 6;
    await guardToken(token, animateEl(landed, [
      { opacity: 1, transform: "translateY(" + (-fall) + "px) rotate(28deg) scale(.6)" },
      { opacity: 1, transform: "translateY(0) rotate(" + (place.rotate - 4) + "deg) scale(1.06)", offset: 0.72 },
      { opacity: 1, transform: "rotate(" + place.rotate + "deg) scale(1)" }
    ], { duration: 560, easing: "cubic-bezier(.4,0,.8,.6)" }));
    animateEl(byId("actBoxView2"), [{ transform: "none" }, { transform: "translateY(2px) scale(1.015)" }, { transform: "none" }], { duration: 420 });
    animateEl(byId("actBoxShine2"), [{ opacity: 0.4 }, { opacity: 0.9 }, { opacity: 0.4 }], { duration: 700 });
    spawnSparkle(slot[0], slot[1] + 26, 120);
    notesInBox++;
    await guardToken(token, waitMs(280));
    byId("actPapers").innerHTML = ""; byId("actEq").innerHTML = ""; byId("actStem").innerHTML = ""; stemPaper = null;
    if (questionIndex < TOTAL_QUESTIONS - 1) {
      await guardToken(token, animateKiteToStar(questionIndex + 1, false));
      await guardToken(token, waitMs(300));
      questionIndex++;
      renderQuestion(false);
    } else {
      winSequenceActive = false;
      onQuizFinished(token);
    }
  } catch (error) { if (error !== DEAD_TOKEN) { throw error; } }
}

// ---------- the end of the quiz ----------
async function onQuizFinished(token) {
  resultSummary = buildResultSummary();                  // logic first: totals, stars and texts are final before the result screen starts
  try {
    await guardToken(token, animateQuizOut());
    goToScreen("result");
  } catch (error) { if (error !== DEAD_TOKEN) { throw error; } }
}
function animateQuizOut() {                              // the quiz's own elements leave before the screen changes
  kiteEraseSolidTrails(700);
  var parts = [
    animateStickyOut(),
    kiteFadeOut(500),
    animateEl(byId("actBtnPlay"), [{ opacity: 1 }, { opacity: 0 }], { duration: 400 }),
    animateEl(byId("actBtnSlow"), [{ opacity: 1 }, { opacity: 0 }], { duration: 400 }),
    animateEl(byId("actProgress"), [{ opacity: 1 }, { opacity: 0 }], { duration: 600 })
  ];
  return Promise.all(parts).then(function () { return waitMs(150); });
}


// ===== SCREEN 3: RESULT =====
// The box is sealed and labelled, the stars are counted, the score is shown, the kite flies its last two legs.
function resultEnter(from) {
  var token = ++runToken;
  skipping = false; winSequenceActive = false;
  stopVoice();
  // SCORM: sent from the Animate result frame
  var summary = resultSummary;
  layoutResult(summary);
  resetResultElements();
  (async function () {
    try {
      var spec = LAYOUT.result;
      playSfx("paper_whoosh", { vol: 0.7 });
      var legOne = animateResultKiteLegOne();             // starts in the middle of the screen and leaves to the left
      await guardToken(token, Promise.all([animateCameraTo("result", 1500), animateBoxTo("result", 1500)]));
      await guardToken(token, animateBoxSealAndSticker(token));
      await guardToken(token, waitMs(300));
      animateResultTitleIn();
      animateResultStarsIn();
      spawnConfetti(60); playSfx("jingle_end", { vol: 0.9 });
      var legTwo = legOne.then(function () { return animateResultKiteLegTwo(); });   // enters from the right and ends at the score
      for (var index = 0; index < 3; index++) {
        await guardToken(token, waitMs(420));
        if (index < summary.stars) { animateResultStarLit(index); }
      }
      await guardToken(token, waitMs(300));
      await guardToken(token, animateScoreCountUp(summary));
      await guardToken(token, legTwo);
      animateResultReminderIn();
      await guardToken(token, waitMs(250));
      animateResultButtonsIn();
    } catch (error) { if (error !== DEAD_TOKEN) { throw error; } }
  })();
}
function resultExit() {                                  // stops everything the result screen started
  runToken++;
  clearPendingTimers(); cancelAllAnimations(); stopVoice(); stopAllSfx(); kiteReset(); clearFx();
  ["actBtnAgain", "actBtnAnswers", "actBtnHome"].forEach(function (id) { byId(id).onclick = null; });
  closeAllOverlays();
}

function layoutResult(summary) {
  var spec = LAYOUT.result, data = ANIMATE_DATA;
  var title = byId("actResultTitle");
  placeEl(title, spec.title); title.style.fontSize = spec.title.fontSize + "px"; title.textContent = data.result.titles[summary.titleKey];
  var stars = byId("actResultStars");
  var starsWidth = 3 * spec.stars.size + 2 * spec.stars.gap, starHeight = imageHeight("shared_star_gold.png", spec.stars.size);
  placeEl(stars, { x: spec.stars.centerX - starsWidth / 2, y: spec.stars.top, w: starsWidth, h: starHeight });
  stars.style.gap = spec.stars.gap + "px"; stars.innerHTML = "";
  for (var n = 0; n < 3; n++) {
    var star = document.createElement("div");
    star.className = "act-rstar"; star.style.width = spec.stars.size + "px"; star.style.height = starHeight + "px";
    var glow = spec.stars.size * 1.5;
    star.innerHTML = '<img class="act-rstar-glow" alt="" src="images/shared_star_glow.png" style="left:' + ((spec.stars.size - glow) / 2) + 'px;top:' + ((starHeight - glow) / 2) + 'px;width:' + glow + 'px;height:' + glow + 'px">' +
      '<img class="act-rstar-off" alt="" src="images/shared_star_off.png"><img class="act-rstar-on" alt="" src="images/shared_star_gold.png" style="opacity:0">';
    stars.appendChild(star);
  }
  var score = byId("actScore");
  placeEl(score, spec.score); score.style.fontSize = spec.score.fontSize + "px";
  score.innerHTML = fillText(data.result.scoreFormat, { score: toArabicDigits(0), max: toArabicDigits(summary.max) });
  var reminder = byId("actReminder");
  placeEl(reminder, spec.reminder); reminder.style.fontSize = spec.reminder.fontSize + "px"; reminder.textContent = data.result.reminders[summary.reminderKey];
  var labels = [data.buttons.again, data.buttons.answers, data.buttons.home], scale = spec.buttons.w / 359;
  ["actBtnAgain", "actBtnAnswers", "actBtnHome"].forEach(function (id, position) {
    var button = byId(id);
    button.querySelector("span").textContent = labels[position];
    button.setAttribute("data-scale", scale);
    button.style.cssText = "position:absolute;left:" + (spec.buttons.centersX[position] - 359 / 2) + "px;top:" + (spec.buttons.top + spec.buttons.h / 2 - 129 / 2) + "px;--act-btn-scale:" + scale + ";opacity:0;pointer-events:none";
  });
  byId("actResultButtons").style.cssText = "left:0;top:0;width:1800px;height:1200px;position:absolute";
  byId("actBtnAgain").onclick = onAgainClicked; byId("actBtnAnswers").onclick = openAnswers; byId("actBtnHome").onclick = onHomeClicked;
}
function resetResultElements() {
  ["actResultTitle", "actResultStars", "actScore", "actReminder"].forEach(function (id) { byId(id).style.opacity = 0; byId(id).style.transform = ""; });
  ["actBtnAgain", "actBtnAnswers", "actBtnHome"].forEach(function (id) { byId(id).style.opacity = 0; byId(id).style.transform = ""; });
  boxHideSticker();
}

// --- animations of the result screen ---
function animateResultKiteLegOne() {                    // «starts from the middle of the screen, follows the route to the left until it exits»
  var spec = LAYOUT.result.kite, route = buildKiteRoute("start", spec.leg1.startX, spec.leg1.startY, spec.leg1.scale);
  return kiteAppear(spec.leg1.startX, spec.leg1.startY, spec.size, 350).then(function () {
    return kiteFlyRoute(route, spec.leg1.ms, { size: spec.size, keepOpacity: true, hold: spec.hold, fade: spec.fade });
  }).then(function () { kite.visible = false; });
}
function animateResultKiteLegTwo() {                    // «enters from the right, follows the route until it reaches the score and fades for the last time»
  var spec = LAYOUT.result.kite, route = buildKiteRoute("end", spec.leg2.endX, spec.leg2.endY, spec.leg2.scale, spec.leg2.leadIn);
  playSfx("paper_whoosh", { vol: 0.5 });
  return kiteFlyRoute(route, spec.leg2.ms, { size: spec.size, hold: spec.hold, fade: spec.fade }).then(function () { return kiteFadeOut(600); });
}
function animateBoxSealAndSticker(token) {              // tape across the slot, then the label is stuck on the front (no fly-in)
  var seal = byId("actSeal"), sticker = byId("actStickerWrap"), rotate = LAYOUT.result.sticker.rotate;
  playSfx("tape_stick", { vol: 0.9 });
  var sealed = animateEl(seal, [{ opacity: 0, transform: "rotate(" + LAYOUT.result.seal.rotate + "deg) scale(1.35)" }, { opacity: 1, transform: "rotate(" + LAYOUT.result.seal.rotate + "deg) scale(1)" }], { duration: 320, easing: "ease-out" });
  return guardToken(token, sealed).then(function () {
    playSfx("tape_stick", { vol: 0.9 });
    return animateEl(sticker, [{ opacity: 0, transform: "rotate(" + rotate + "deg) scale(1.06)" }, { opacity: 1, transform: "rotate(" + rotate + "deg) scale(1)" }], { duration: 380, easing: "ease-out" });
  }).then(function () { sticker.style.opacity = 1; seal.style.opacity = 1; });
}
function animateResultTitleIn() { return animateEl(byId("actResultTitle"), [{ opacity: 0, transform: "translateY(14px)" }, { opacity: 1, transform: "none" }], { duration: 450 }); }
function animateResultStarsIn() { return animateEl(byId("actResultStars"), [{ opacity: 0 }, { opacity: 1 }], { duration: 400 }); }
function animateResultStarLit(index) {
  var star = byId("actResultStars").children[index], size = LAYOUT.result.stars.size;
  playSfx("star_chalk", { vol: 0.9 });
  animateEl(star.querySelector(".act-rstar-on"), [{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
  animateEl(star.querySelector(".act-rstar-glow"), [{ opacity: 0, transform: "scale(.5)" }, { opacity: 1, transform: "scale(1.08)", offset: 0.5 }, { opacity: 0.85, transform: "scale(1)" }], { duration: 700 });
  animateEl(star, [{ transform: "scale(.5) rotate(-40deg)" }, { transform: "scale(1.3) rotate(6deg)", offset: 0.55 }, { transform: "scale(1) rotate(0)" }], { duration: 560 });
  var box = stageRect(star);
  spawnSparkle(box.x + box.w / 2, box.y + box.h / 2, size * 1.4);
}
function animateScoreCountUp(summary) {                 // numbers count up from ٠ to the score
  var score = byId("actScore"), data = ANIMATE_DATA.result;
  animateEl(score, [{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
  return tween(700, function (u) {
    score.innerHTML = fillText(data.scoreFormat, { score: toArabicDigits(Math.round(summary.total * u)), max: toArabicDigits(summary.max) });
  }, easeOut);
}
function animateResultReminderIn() { return animateEl(byId("actReminder"), [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 0.92, transform: "none" }], { duration: 450 }); }
function animateResultButtonsIn() {
  ["actBtnAgain", "actBtnAnswers", "actBtnHome"].forEach(function (id, position) {
    var button = byId(id), scale = button.getAttribute("data-scale");
    button.style.pointerEvents = "auto";
    animateEl(button, [{ opacity: 0, transform: "translateY(16px) scale(" + scale + ")" }, { opacity: 1, transform: "scale(" + scale + ")" }], { duration: 350, delay: position * 110 }).then(function () { button.style.transform = ""; });
  });
}
function animateResultOut() {                           // the result's own elements leave before the screen changes
  var parts = ["actResultTitle", "actResultStars", "actScore", "actReminder", "actBtnAgain", "actBtnAnswers", "actBtnHome"].map(function (id) {
    return animateEl(byId(id), [{ opacity: 1 }, { opacity: 0 }], { duration: 350 });
  });
  parts.push(animateEl(byId("actStickerWrap"), [{ opacity: 1 }, { opacity: 0 }], { duration: 350 }));
  parts.push(animateEl(byId("actSeal"), [{ opacity: 1 }, { opacity: 0 }], { duration: 350 }));
  return Promise.all(parts);
}
function onAgainClicked() {                              // retake: everything is reset, the quiz starts again
  playSfx("pin_press", { vol: 0.6 });
  animateResultOut().then(function () { resetActivity(); goToScreen("quiz"); });
}
function onHomeClicked() {                               // back to start: everything is reset, the intro plays again
  playSfx("pin_press", { vol: 0.6 });
  animateResultOut().then(function () { resetActivity(); goToScreen("intro"); });
}


// ===== OVERLAY: INSTRUCTIONS =====
// «كيف تلعب؟» on a notebook page. Opened only by the (i) button; closing returns to exactly where the learner was.
var CHIP_ICONS = {
  ok: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  no: '<svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg>'
};

function stageScale() { return byId("actStage").getBoundingClientRect().width / 1800; }
function buildNotebookPage(host, spec) {                  // notebook art + a text box whose lines sit on the ruled lines
  var meta = NOTEBOOK_META, k = spec.w / meta.size[0], height = meta.size[1] * k, pitch = meta.pitch * k, firstLine = meta.firstLineY * k;
  host.innerHTML = "";
  var page = document.createElement("div");
  page.className = "act-nb"; page.style.left = spec.x + "px"; page.style.top = spec.y + "px"; page.style.width = spec.w + "px"; page.style.height = height + "px";
  page.innerHTML = '<img class="act-nb-bg" alt="" src="images/shared_notebook.png">';
  var text = document.createElement("div");
  text.className = "act-nb-text";
  var lastLine = firstLine + meta.lines * pitch + pitch * 0.2;
  text.style.cssText = "right:" + ((meta.size[0] - (meta.marginX - 26)) * k) + "px;left:" + (46 * k) + "px;top:0;height:" + lastLine + "px;line-height:" + (2 * pitch) + "px";
  page.appendChild(text);
  host.appendChild(page);
  return { page: page, text: text, k: k, pitch: pitch, firstLine: firstLine, lastLine: lastLine, height: height };
}
function alignNotebookText(notebook) {                    // puts the first baseline on the first ruled line
  var marker = notebook.text.querySelector(".act-nb-baseline");
  if (!marker) { return; }
  var offset = marker.offsetTop;
  notebook.text.style.top = (notebook.firstLine - offset) + "px";
  notebook.text.style.height = (notebook.lastLine - (notebook.firstLine - offset)) + "px";
}
function fitNotebookText(notebook, baseSize, singleLineItems, rowsDown) {
  var text = notebook.text, size = baseSize, guard = 0, heading = text.querySelector("h2");
  function apply(withNowrap) {
    text.style.fontSize = size + "px"; if (heading) { heading.style.fontSize = (size * 1.22) + "px"; }
    Array.prototype.forEach.call(text.querySelectorAll(singleLineItems), function (item) { item.style.whiteSpace = withNowrap ? "nowrap" : ""; });
  }
  function itemsFit() { return Array.prototype.every.call(text.querySelectorAll(singleLineItems), function (item) { return item.scrollWidth <= text.clientWidth + 1; }); }
  apply(true);
  while (!itemsFit() && size > notebook.pitch * 0.72 && guard++ < 40) { size -= 1; apply(true); }
  if (!itemsFit()) { size = baseSize; apply(false); guard = 0; while (text.scrollHeight > text.clientHeight + 1 && size > notebook.pitch * 0.7 && guard++ < 40) { size -= 1; apply(false); } }
  alignNotebookText(notebook);
  if (rowsDown) {                                         // moves the block down by whole writing rows (a row = two ruled lines)
    var shift = rowsDown * 2 * notebook.pitch;
    notebook.text.style.top = (parseFloat(notebook.text.style.top) + shift) + "px"; notebook.text.style.height = (parseFloat(notebook.text.style.height) - shift) + "px";
  }
}
function makePlaque(label, isRed, scale) {                // a wooden plaque button scaled to `scale` inside a wrapper that has the scaled size
  var wrapper = document.createElement("div");
  wrapper.style.cssText = "position:relative;width:" + (359 * scale) + "px;height:" + (129 * scale) + "px;flex:none";
  var button = document.createElement("button");
  button.className = "act-plaque" + (isRed ? " act-red" : "");
  button.style.cssText = "position:absolute;left:0;top:0;transform-origin:0 0;--act-btn-scale:" + scale;
  button.innerHTML = "<span></span>"; button.querySelector("span").textContent = label;
  wrapper.appendChild(button);
  return { wrapper: wrapper, button: button };
}

var activeOverlay = null;
function showOverlay(id) { activeOverlay = id; byId(id).hidden = false; }
function hideOverlay(id) { byId(id).hidden = true; byId(id).innerHTML = ""; if (activeOverlay === id) { activeOverlay = null; } }
function closeAllOverlays() { ["actOverlayInstructions", "actOverlayExit", "actOverlayAnswers"].forEach(function (id) { hideOverlay(id); }); }

function openInstructions() {
  if (activeOverlay) { return; }
  stopVoice();
  var data = ANIMATE_DATA.instructions, host = byId("actOverlayInstructions");
  showOverlay("actOverlayInstructions");
  var notebook = buildNotebookPage(host, LAYOUT.overlays.instructions);
  var html = '<i class="act-nb-baseline" style="display:inline-block;width:0;height:0"></i><h2>' + escapeHtml(data.title) + "</h2><ol>";
  data.lines.forEach(function (line, index) { html += "<li><b>" + toArabicDigits(index + 1) + "</b>" + escapeHtml(line) + "</li>"; });
  notebook.text.innerHTML = html + "</ol>";
  fitNotebookText(notebook, notebook.pitch * 1.3, "li");
  var plaque = makePlaque(ANIMATE_DATA.buttons.understood, false, 0.72);
  var actions = document.createElement("div");
  actions.className = "act-nb-actions"; actions.style.cssText = "left:0;right:0;bottom:" + (notebook.height * 0.07) + "px;height:" + (129 * 0.72) + "px";
  actions.appendChild(plaque.wrapper); notebook.page.appendChild(actions);
  plaque.button.onclick = closeInstructions;
  host.onclick = function (event) { if (event.target === host) { closeInstructions(); } };
  animateEl(notebook.page, [{ opacity: 0, transform: "translateY(-40px) rotate(-2deg)" }, { opacity: 1, transform: "none" }], { duration: 380, easing: "cubic-bezier(.3,.9,.4,1)" });
}
function closeInstructions() { hideOverlay("actOverlayInstructions"); }

// ===== OVERLAY: EXIT CONFIRMATION =====
// Opened by the close (×) button on the question screen; «ابقَ» closes it, «اخرج» returns to the start.
function openExitConfirm() {
  if (activeOverlay) { return; }
  stopVoice();
  var data = ANIMATE_DATA.exitConfirm, host = byId("actOverlayExit");
  showOverlay("actOverlayExit");
  var notebook = buildNotebookPage(host, LAYOUT.overlays.exit);
  notebook.text.innerHTML = '<i class="act-nb-baseline" style="display:inline-block;width:0;height:0"></i><h2>' + escapeHtml(data.title) + '</h2><p class="act-nb-note" style="text-align:center">' + escapeHtml(data.text) + "</p>";
  fitNotebookText(notebook, notebook.pitch * 1.25, "p", 1);
  var scale = 0.56, stay = makePlaque(ANIMATE_DATA.buttons.stay, false, scale), leave = makePlaque(ANIMATE_DATA.buttons.leave, true, scale);
  var actions = document.createElement("div");
  actions.className = "act-nb-actions"; actions.style.cssText = "left:0;right:0;bottom:" + (notebook.height * 0.07) + "px;height:" + (129 * scale) + "px;gap:24px;direction:rtl";
  actions.appendChild(stay.wrapper); actions.appendChild(leave.wrapper); notebook.page.appendChild(actions);
  stay.button.onclick = closeExitConfirm;
  leave.button.onclick = function () { closeExitConfirm(); onExitConfirmed(); };
  animateEl(notebook.page, [{ opacity: 0, transform: "translateY(-40px) rotate(-2deg)" }, { opacity: 1, transform: "none" }], { duration: 380, easing: "cubic-bezier(.3,.9,.4,1)" });
}
function closeExitConfirm() { hideOverlay("actOverlayExit"); }
function onExitConfirmed() {                              // «اخرج»: back to the start (the template may replace this with its own exit)
  resetActivity();
  goToScreen("intro");
}

// ===== OVERLAY: ANSWERS =====
// «إجاباتك»: the five words with how each was answered, opened from the result screen.
function openAnswers() {
  if (activeOverlay) { return; }
  var data = ANIMATE_DATA, host = byId("actOverlayAnswers"), summary = resultSummary;
  showOverlay("actOverlayAnswers");
  var notebook = buildNotebookPage(host, LAYOUT.overlays.answers);
  var colours = { first: "#B97F00", second: "#1E9E6E", miss: "#6B7A92" };
  var html = '<i class="act-nb-baseline" style="display:inline-block;width:0;height:0"></i><h2>' + escapeHtml(data.result.answersTitle) + '</h2><ul class="act-answers-list">';
  QUESTIONS.forEach(function (question, index) {
    var result = summary.results[index] || "miss";
    html += '<li title="' + escapeHtml(fillText(data.aria.points, { points: toArabicDigits(summary.points[index] || 0), max: toArabicDigits(SCORING.firstTry) })) + '"><span class="act-chip" style="background:' + colours[result] + '">' + (result === "miss" ? CHIP_ICONS.no : CHIP_ICONS.ok) + "</span>" + escapeHtml(question.word) + "</li>";
  });
  html += '</ul><p class="act-nb-note">' + escapeHtml(data.result.reminders[summary.reminderKey]) + "</p>";
  notebook.text.innerHTML = html;
  fitNotebookText(notebook, notebook.pitch * 1.1, ".act-nb-note");
  var plaque = makePlaque(data.buttons.ok, false, 0.62);
  var actions = document.createElement("div");
  actions.className = "act-nb-actions"; actions.style.cssText = "left:0;right:0;bottom:" + (notebook.height * 0.05) + "px;height:" + (129 * 0.62) + "px";
  actions.appendChild(plaque.wrapper); notebook.page.appendChild(actions);
  plaque.button.onclick = closeAnswers;
  host.onclick = function (event) { if (event.target === host) { closeAnswers(); } };
  animateEl(notebook.page, [{ opacity: 0, transform: "translateY(-40px) rotate(-2deg)" }, { opacity: 1, transform: "none" }], { duration: 380, easing: "cubic-bezier(.3,.9,.4,1)" });
}
function closeAnswers() { hideOverlay("actOverlayAnswers"); }


// ===== BOOT =====
// Start-up: load images (natural sizes), fonts and sounds, write every text from ANIMATE_DATA, wire the buttons, then goToScreen("intro").
var IMAGE_FILES = ["bg_light_rays.png", "bg_plate.jpg", "intro_star.png", "quiz_btn_play.png", "quiz_btn_slow.png", "quiz_chalk_piece.png", "quiz_crumple_ball.png", "quiz_crumple_half.png", "quiz_glow.png", "quiz_hint_cream.png", "quiz_hint_mint.png", "quiz_hint_pink.png", "quiz_hint_tape.png", "quiz_next_calendar.png", "quiz_next_page.png", "quiz_note_fold_grey.png", "quiz_note_fold_mint.png", "quiz_note_fold_yellow.png", "quiz_note_half_grey.png", "quiz_note_half_mint.png", "quiz_note_half_yellow.png", "quiz_note_open_grey.png", "quiz_note_open_mint.png", "quiz_note_open_yellow.png", "quiz_paper_yellow.png", "quiz_piece_noun.png", "quiz_piece_prefix.png", "result_box_seal.png", "result_sticker.png", "shared_box_angled.png", "shared_box_front.png", "shared_btn_plaque.png", "shared_btn_plaque_red.png", "shared_chalk_strong.png", "shared_chalk_white.png", "shared_fx_dust1.png", "shared_fx_dust2.png", "shared_fx_dust3.png", "shared_fx_spark1.png", "shared_fx_spark2.png", "shared_fx_spark3.png", "shared_fx_spark4.png", "shared_glass_shine.png", "shared_kite.png", "shared_notebook.png", "shared_star_current.png", "shared_star_glow.png", "shared_star_gold.png", "shared_star_grey.png", "shared_star_off.png", "ui_btn_close.png", "ui_btn_info.png", "ui_btn_mute.png", "ui_btn_mute_off.png", "ui_logo.png"];

function preloadImages() {
  return Promise.all(IMAGE_FILES.map(function (name) {
    return new Promise(function (resolve) {
      var image = new Image();
      image.onload = function () { imageCache[name] = { w: image.naturalWidth, h: image.naturalHeight }; resolve(); };
      image.onerror = function () { imageCache[name] = { w: 100, h: 100 }; resolve(); };
      image.src = "images/" + name;
    });
  }));
}
function waitForFonts() {
  if (!(document.fonts && document.fonts.load)) { return Promise.resolve(); }
  return Promise.all([
    document.fonts.load("500 40px ActReadex", ANIMATE_DATA.title),
    document.fonts.load("600 40px ActReadex", ANIMATE_DATA.buttons.start),
    document.fonts.load("560 60px ActPlaypen", ANIMATE_DATA.title)
  ]).catch(function () {});
}
function writeStaticTexts() {                            // every on-screen text comes from ANIMATE_DATA
  var data = ANIMATE_DATA;
  document.title = data.title;
  byId("actTitleText").textContent = data.title;
  byId("actStartBtn").querySelector("span").textContent = data.buttons.start;
  byId("actNext").querySelector(".act-next-label").textContent = data.buttons.next;
  byId("actBtnInfo").setAttribute("aria-label", data.aria.info);
  byId("actBtnClose").setAttribute("aria-label", data.aria.close);
  byId("actLogo").setAttribute("alt", data.aria.logo);
  byId("actTitle").setAttribute("aria-label", data.title);
  ["actBtnAgain", "actBtnAnswers", "actBtnHome"].forEach(function (id, index) {
    byId(id).querySelector("span").textContent = [data.buttons.again, data.buttons.answers, data.buttons.home][index];
  });
}
function wireButtons() {
  byId("actBtnPlay").onclick = function () { sayQuestion(false); };
  byId("actBtnSlow").onclick = function () { sayQuestion(true); };
  byId("actPapers").addEventListener("click", function (event) {
    var paper = event.target.closest(".act-paper");
    if (paper && paper.hasAttribute("data-index")) { playSfx("pin_press", { vol: 0.35 }); onOptionChosen(+paper.getAttribute("data-index")); }
  });
  byId("actNext").onclick = onNextClicked;
  byId("actBtnInfo").onclick = openInstructions;
  byId("actBtnClose").onclick = openExitConfirm;
  byId("actBtnMute").onclick = function () { setMuted(!muted); };
  byId("actStage").addEventListener("pointerdown", function (event) {
    if (!event.target.closest("#actBtnPlay,#actBtnSlow")) { stopVoice(); }                          // any interaction stops the sentence voice
    if (winSequenceActive && !event.target.closest("button")) { skipAllAnimations(); }               // a tap during the answer sequence jumps to its end
  }, true);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (activeOverlay === "actOverlayInstructions") { closeInstructions(); }
      else if (activeOverlay === "actOverlayAnswers") { closeAnswers(); }
      else if (activeOverlay === "actOverlayExit") { closeExitConfirm(); }
      return;
    }
    if (currentScreen !== "quiz" || activeOverlay) { return; }
    if (event.key >= "1" && event.key <= "3") {
      var paper = quizPapers[+event.key - 1];
      if (paper && !paper.classList.contains("act-dead")) { onOptionChosen(+event.key - 1); }
    }
  });
}
function fitStageToWindow() {                            // the 1800 × 1200 stage is scaled to fit whatever window it is opened in
  document.documentElement.style.setProperty("--act-fit", Math.min(window.innerWidth / 1800, window.innerHeight / 1200));
}
function bootActivity() {
  fitStageToWindow();
  window.addEventListener("resize", fitStageToWindow);
  window.addEventListener("orientationchange", function () { setTimeout(fitStageToWindow, 120); });
  writeStaticTexts();
  preloadSounds();
  setMuted(false);
  Promise.all([preloadImages(), waitForFonts()]).then(function () {
    buildBox();
    setCamera("intro"); setBox("intro");
    wireButtons();
    goToScreen("intro");
    window.activityReady = true;
  });
}
bootActivity();

