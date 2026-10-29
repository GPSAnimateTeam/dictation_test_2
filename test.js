/*LOGIC_AUTO:global*/

var root1 = this;
var state = {
  data: null,
  questions: [],
  scoring: null,
  totalQuestions: 0,
  score: { total: 0, max: 0 },
  questionIndex: 0,
  attemptsUsed: 0,
  questionSettled: false,
  questionResults: [],
  questionPoints: [],
  resultSummary: null,
  muted: false,
  activeSfx: [],
  activeVoice: null,
  voiceToken: 0,
  voiceSequence: [],
  voiceIndex: 0,
  soundIds: {},
  loadError: null,
  ready: false,
  hooks: {},
  screenLabels: ["intro", "quiz", "result"],
};
var soundWarnings = {};
root1.activityState = state;
root1.activityData = null;
root1.activityReady = false;
root1.activityLoadError = null;
function warn(message) {
  if (root1.console && root1.console.warn) {
    root1.console.warn("[activity] WARNING: " + message);
  }
}
function activityCheckAnswer(question, index) {
  return question.options[index].correct === true;
}
function activityCorrectOptionIndex(question) {
  var found = 0,
    i;
  for (i = 0; i < question.options.length; i++) {
    if (question.options[i].correct) {
      found = i;
    }
  }
  return found;
}
function activityPointsForKind(kind) {
  if (kind === "first") {
    return state.scoring.firstTry;
  }
  if (kind === "second") {
    return state.scoring.secondTry;
  }
  return state.scoring.missed;
}
function activityUpdateScore(points, maxPoints) {
  state.score.total += points;
  state.score.max += maxPoints;
  return state.score;
}
function activitySettleQuestion(index, kind) {
  state.questionResults[index] = kind;
  state.questionPoints[index] = activityPointsForKind(kind);
  activityUpdateScore(state.questionPoints[index], state.scoring.firstTry);
  state.questionSettled = true;
}
function activityComputeStars(total) {
  if (total >= state.scoring.stars.three) {
    return 3;
  }
  if (total >= state.scoring.stars.two) {
    return 2;
  }
  return 1;
}
function activityBuildResultSummary() {
  var total = state.score.total,
    max = state.score.max,
    stars = activityComputeStars(total);
  var missedKeep = false,
    missedDrop = false,
    reminderKey = "default",
    i,
    question;
  for (i = 0; i < state.questions.length; i++) {
    question = state.questions[i];
    if (state.questionResults[i] !== "first") {
      if (question.keepAlef) {
        missedKeep = true;
      } else {
        missedDrop = true;
      }
    }
  }
  if (total >= state.scoring.stars.three) {
    reminderKey = "perfect";
  } else if (missedDrop && !missedKeep) {
    reminderKey = "missLam";
  } else if (missedKeep && !missedDrop) {
    reminderKey = "missKeep";
  }
  return {
    total: total,
    max: max,
    percent: max > 0 ? Math.round((total / max) * 100) : 0,
    stars: stars,
    titleKey: stars === 3 ? "three" : stars === 2 ? "two" : "one",
    reminderKey: reminderKey,
    results: state.questionResults.slice(0),
    points: state.questionPoints.slice(0),
  };
}
function activityFillText(template, values) {
  return String(template).replace(/\{(\w+)\}/g, function (match, key) {
    return values && values[key] != null ? values[key] : match;
  });
}
function activityToArabicDigits(value) {
  return String(value).replace(/[0-9]/g, function (digit) {
    return String.fromCharCode(0x0660 + Number(digit));
  });
}
function activityNextLabelFor(index) {
  return index < state.totalQuestions - 1
    ? state.data.ui.buttons.next
    : state.data.ui.buttons.nextLast;
}
function soundApi() {
  return root1.createjs && root1.createjs.Sound ? root1.createjs.Sound : null;
}
function activitySoundAvailable(id) {
  var api = soundApi();
  return !!(
    state.soundIds[id] &&
    api &&
    typeof api.loadComplete === "function" &&
    api.loadComplete(id) === true
  );
}
function reportSoundUnavailable(id) {
  if (!soundWarnings[id]) {
    soundWarnings[id] = true;
    warn(
      "Sound ID is missing from or not loaded in the Animate library: " + id,
    );
  }
}
function activityStopAllSfx() {
  var a = state.activeSfx.slice(0),
    i;
  state.activeSfx = [];
  for (i = 0; i < a.length; i++) {
    if (a[i] && a[i].stop) {
      a[i].stop();
    }
  }
}
function activityStopVoice() {
  state.voiceToken++;
  state.voiceSequence = [];
  state.voiceIndex = 0;
  if (state.activeVoice && state.activeVoice.stop) {
    state.activeVoice.stop();
  }
  state.activeVoice = null;
}
function activityPlaySound(id, volume) {
  var api = soundApi(),
    inst,
    idx;
  if (state.muted) {
    return null;
  }
  if (!api || !activitySoundAvailable(id)) {
    reportSoundUnavailable(id);
    return null;
  }
  inst = api.play(id);
  if (!inst || inst.playState === "playFailed") {
    reportSoundUnavailable(id);
    return null;
  }
  if (typeof volume === "number") {
    inst.volume = Math.max(0, Math.min(1, volume));
  }
  state.activeSfx.push(inst);
  if (inst.addEventListener) {
    inst.addEventListener("complete", function () {
      idx = state.activeSfx.indexOf(inst);
      if (idx >= 0) {
        state.activeSfx.splice(idx, 1);
      }
    });
  }
  return inst;
}
function activityPlayVoice(ids, gapMs) {
  var token;
  activityStopVoice();
  token = ++state.voiceToken;
  state.voiceSequence = ids.slice(0);
  state.voiceIndex = 0;
  function playNext() {
    var id, api, inst;
    if (
      token !== state.voiceToken ||
      state.voiceIndex >= state.voiceSequence.length ||
      state.muted
    ) {
      return;
    }
    id = state.voiceSequence[state.voiceIndex++];
    api = soundApi();
    if (!api || !activitySoundAvailable(id)) {
      reportSoundUnavailable(id);
      playNext();
      return;
    }
    inst = api.play(id);
    if (!inst || inst.playState === "playFailed") {
      reportSoundUnavailable(id);
      playNext();
      return;
    }
    state.activeVoice = inst;
    if (inst.addEventListener) {
      inst.addEventListener("complete", function () {
        if (token === state.voiceToken) {
          setTimeout(playNext, gapMs == null ? 380 : gapMs);
        }
      });
      inst.addEventListener("failed", function () {
        if (token === state.voiceToken) {
          playNext();
        }
      });
    } else {
      warn("Sound instance has no completion event; voice sequence stopped.");
    }
  }
  playNext();
}
function activitySetMuted(value) {
  state.muted = !!value;
  if (state.muted) {
    activityStopVoice();
    activityStopAllSfx();
  }
  return state.muted;
}
function activityReset() {
  state.score.total = 0;
  state.score.max = 0;
  state.questionIndex = 0;
  state.attemptsUsed = 0;
  state.questionSettled = false;
  state.questionResults = [];
  state.questionPoints = [];
  state.resultSummary = null;
  activityStopVoice();
  activityStopAllSfx();
}
function activityGoToScreen(label) {
  var i,
    found = false;
  if (!state.ready) {
    throw new Error("Activity data is not loaded.");
  }
  for (i = 0; i < state.screenLabels.length; i++) {
    if (state.screenLabels[i] === label) {
      found = true;
      break;
    }
  }
  if (!found) {
    throw new Error("Unknown screen label: " + label);
  }
  root1.gotoAndStop(label);
}
function activityLoadData() {
  console.log("root1.activityData called");
  root1.stop();
  if (typeof fetch !== "function") {
    state.loadError = "fetch is not available";
    root1.activityLoadError = state.loadError;
    warn(
      "Data loading failed for " + "questions.json" + ": " + state.loadError,
    );
    return;
  }
  fetch("questions.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      var i, sounds;
      if (
        !data ||
        !data.meta ||
        !data.scoring ||
        !data.questions ||
        !data.ui ||
        !data.sounds
      ) {
        throw new Error("questions.json is missing required data");
      }
      state.data = data;
      state.questions = data.questions;
      state.totalQuestions = data.questions.length;
      state.scoring = data.scoring;
      sounds = data.sounds;
      for (i = 0; i < sounds.length; i++) {
        state.soundIds[sounds[i].id] = true;
      }
      root1.activityData = data;
      console.log("root1.activityData", root1.activityData);
      state.ready = true;
      root1.activityReady = true;
      activityReset();
      root1.gotoAndStop("intro");
    })
    .catch(function (error) {
      state.loadError = String(error && error.message ? error.message : error);
      root1.activityLoadError = state.loadError;
      warn(
        "Data loading failed for " + "questions.json" + ": " + state.loadError,
      );
    });
}
function resolvedHook() {
  return Promise.resolve();
}
function hook_animateEl() {
  return resolvedHook();
}
function hook_tween() {
  return resolvedHook();
}
function hook_animateCameraTo() {
  return resolvedHook();
}
function hook_animateBoxTo() {
  return resolvedHook();
}
function hook_spawnFx() {
  return resolvedHook();
}
function hook_spawnDust() {
  return resolvedHook();
}
function hook_spawnSparkle() {
  return resolvedHook();
}
function hook_spawnConfetti() {
  return resolvedHook();
}
function hook_kiteFlyRoute() {
  return resolvedHook();
}
function hook_kiteFlyBetween() {
  return resolvedHook();
}
function hook_animateIntroBoxDrop() {
  return resolvedHook();
}
function hook_animateIntroKite() {
  return resolvedHook();
}
function hook_animateIntroTitle() {
  return resolvedHook();
}
function hook_animateIntroDecoIn() {
  return resolvedHook();
}
function hook_animateIntroStartButtonIn() {
  return resolvedHook();
}
function hook_animateIntroOut() {
  return resolvedHook();
}
function hook_animateProgressStarResult() {
  return resolvedHook();
}
function hook_animateProgressIn() {
  return resolvedHook();
}
function hook_animateKiteToStar() {
  return resolvedHook();
}
function hook_animateStickyIn() {
  return resolvedHook();
}
function hook_animateStickyOut() {
  return resolvedHook();
}
function hook_animateStickyWobble() {
  return resolvedHook();
}
function hook_animateNextFlip() {
  return resolvedHook();
}
function hook_animateChalkWrite() {
  return resolvedHook();
}
function hook_animatePaperCrumple() {
  return resolvedHook();
}
function hook_animateReflowPapers() {
  return resolvedHook();
}
function hook_animateWrongAnswer() {
  return resolvedHook();
}
function hook_animateMissedQuestion() {
  return resolvedHook();
}
function hook_animateCorrectSequence() {
  return resolvedHook();
}
function hook_animateRulePieces() {
  return resolvedHook();
}
function hook_animateAdvance() {
  return resolvedHook();
}
function hook_animateQuizOut() {
  return resolvedHook();
}
function hook_animateResultKiteLegOne() {
  return resolvedHook();
}
function hook_animateResultKiteLegTwo() {
  return resolvedHook();
}
function hook_animateBoxSealAndSticker() {
  return resolvedHook();
}
function hook_animateResultTitleIn() {
  return resolvedHook();
}
function hook_animateResultStarsIn() {
  return resolvedHook();
}
function hook_animateResultStarLit() {
  return resolvedHook();
}
function hook_animateScoreCountUp() {
  return resolvedHook();
}
function hook_animateResultReminderIn() {
  return resolvedHook();
}
function hook_animateResultButtonsIn() {
  return resolvedHook();
}
function hook_animateResultOut() {
  return resolvedHook();
}
state.hooks = {
  animateEl: hook_animateEl,
  tween: hook_tween,
  animateCameraTo: hook_animateCameraTo,
  animateBoxTo: hook_animateBoxTo,
  spawnFx: hook_spawnFx,
  spawnDust: hook_spawnDust,
  spawnSparkle: hook_spawnSparkle,
  spawnConfetti: hook_spawnConfetti,
  kiteFlyRoute: hook_kiteFlyRoute,
  kiteFlyBetween: hook_kiteFlyBetween,
  animateIntroBoxDrop: hook_animateIntroBoxDrop,
  animateIntroKite: hook_animateIntroKite,
  animateIntroTitle: hook_animateIntroTitle,
  animateIntroDecoIn: hook_animateIntroDecoIn,
  animateIntroStartButtonIn: hook_animateIntroStartButtonIn,
  animateIntroOut: hook_animateIntroOut,
  animateProgressStarResult: hook_animateProgressStarResult,
  animateProgressIn: hook_animateProgressIn,
  animateKiteToStar: hook_animateKiteToStar,
  animateStickyIn: hook_animateStickyIn,
  animateStickyOut: hook_animateStickyOut,
  animateStickyWobble: hook_animateStickyWobble,
  animateNextFlip: hook_animateNextFlip,
  animateChalkWrite: hook_animateChalkWrite,
  animatePaperCrumple: hook_animatePaperCrumple,
  animateReflowPapers: hook_animateReflowPapers,
  animateWrongAnswer: hook_animateWrongAnswer,
  animateMissedQuestion: hook_animateMissedQuestion,
  animateCorrectSequence: hook_animateCorrectSequence,
  animateRulePieces: hook_animateRulePieces,
  animateAdvance: hook_animateAdvance,
  animateQuizOut: hook_animateQuizOut,
  animateResultKiteLegOne: hook_animateResultKiteLegOne,
  animateResultKiteLegTwo: hook_animateResultKiteLegTwo,
  animateBoxSealAndSticker: hook_animateBoxSealAndSticker,
  animateResultTitleIn: hook_animateResultTitleIn,
  animateResultStarsIn: hook_animateResultStarsIn,
  animateResultStarLit: hook_animateResultStarLit,
  animateScoreCountUp: hook_animateScoreCountUp,
  animateResultReminderIn: hook_animateResultReminderIn,
  animateResultButtonsIn: hook_animateResultButtonsIn,
  animateResultOut: hook_animateResultOut,
};
root1.activityCheckAnswer = activityCheckAnswer;
root1.activityCorrectOptionIndex = activityCorrectOptionIndex;
root1.activityPointsForKind = activityPointsForKind;
root1.activityUpdateScore = activityUpdateScore;
root1.activitySettleQuestion = activitySettleQuestion;
root1.activityComputeStars = activityComputeStars;
root1.activityBuildResultSummary = activityBuildResultSummary;
root1.activityFillText = activityFillText;
root1.activityToArabicDigits = activityToArabicDigits;
root1.activityNextLabelFor = activityNextLabelFor;
root1.activityReset = activityReset;
root1.activityPlaySound = activityPlaySound;
root1.activityStopAllSfx = activityStopAllSfx;
root1.activityStopVoice = activityStopVoice;
root1.activityPlayVoice = activityPlayVoice;
root1.activitySetMuted = activitySetMuted;
root1.activityGoToScreen = activityGoToScreen;
root1.activityLoadData = activityLoadData;
root1.activityRunHook = function (name) {
  return state.hooks[name] ? state.hooks[name]() : resolvedHook();
};
activityLoadData();
