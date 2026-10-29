var LOGIC_DATA = {"key":"result","layerName":"actions","targets":[{"key":"result","label":"result","code":"this.stop();\nvar root = this, resultState = root.__resultLogicState;\nif (!resultState) { resultState = { busy: false, overlayOpen: false, warnings: {} }; root.__resultLogicState = resultState; }\nfunction rWarn(key, message) {\n    if (!resultState.warnings[key]) {\n        resultState.warnings[key] = true;\n        if (root.console && root.console.warn) { root.console.warn(\"[result] WARNING: \" + message); }\n    }\n}\nfunction rGet(name) {\n    if (!root[name]) { rWarn(\"missing:\" + name, \"Missing instance \" + name); return null; }\n    return root[name];\n}\nfunction rVisible(name, visible) {\n    var item = rGet(name);\n    if (item) { item.visible = !!visible; }\n}\nfunction rVisibleIfPresent(name, visible) {\n    if (root[name]) { root[name].visible = !!visible; }\n}\nfunction rText(name, value) {\n    var item = rGet(name);\n    if (!item) { return false; }\n    if (typeof item.text !== \"string\") {\n        rWarn(\"text:\" + name, \"Instance does not expose a writable text property: \" + name);\n        return false;\n    }\n    item.text = String(value);\n    return true;\n}\nfunction rTextIfPresent(name, value) {\n    if (root[name]) { return rText(name, value); }\n    return false;\n}\nfunction rBind(name, handler) {\n    var item = rGet(name);\n    if (!item) { return; }\n    item.on(\"click\", handler);\n}\nfunction rHook(name) { return root.activityRunHook(name); }\nfunction rState() { return root.activityState; }\nfunction rData() { return root.activityData; }\nfunction rSummary() {\n    if (!rState().resultSummary) { rState().resultSummary = root.activityBuildResultSummary(); }\n    return rState().resultSummary;\n}\nfunction rFormatScore() {\n    var summary = rSummary(), format = rData().result.scoreFormat;\n    format = format.replace(/<[^>]*>/g, \"\");\n    return root.activityFillText(format, {\n        score: root.activityToArabicDigits(summary.total),\n        max: root.activityToArabicDigits(summary.max)\n    });\n}\nfunction rSetMute() {\n    var muted = !!rState().muted;\n    rVisible(\"shared_mute_on\", !muted);\n    rVisible(\"shared_mute_off\", muted);\n}\nfunction rSetStar(index, lit, visible) {\n    var prefix = \"result_star_\" + (index + 1) + \"_\";\n    rVisible(prefix + \"off\", visible && !lit);\n    rVisible(prefix + \"gold\", visible && !!lit);\n    rVisible(prefix + \"glow\", false);\n}\nfunction rSetNotes() {\n    var summary = rSummary(), i, outcome, color;\n    for (i = 0; i < 5; i++) {\n        outcome = summary.results[i] || \"miss\";\n        color = outcome === \"first\" ? \"yellow\" : (outcome === \"second\" ? \"mint\" : \"grey\");\n        rVisible(\"result_note_\" + (i + 1) + \"_yellow\", color === \"yellow\");\n        rVisible(\"result_note_\" + (i + 1) + \"_mint\", color === \"mint\");\n        rVisible(\"result_note_\" + (i + 1) + \"_grey\", color === \"grey\");\n    }\n}\nfunction rSetLabelsAndText() {\n    var data = rData(), summary = rSummary(), buttonData = data.ui.buttons;\n    rText(\"result_sticker_text\", data.result.stickerText);\n    rText(\"result_title_three\", data.result.titles[summary.titleKey]);\n    rText(\"result_score\", rFormatScore());\n    rText(\"result_reminder_default\", data.result.reminders[summary.reminderKey]);\n    rText(\"result_button_again_label\", buttonData.again);\n    rText(\"result_button_answers_label\", buttonData.answers);\n    rText(\"result_button_home_label\", buttonData.home);\n    rSetAnswerTexts();\n}\nvar rAnswerInstances = [\"answers_scrim\", \"answers_notebook\", \"answers_region\", \"answers_title\",\n    \"answers_word_1\", \"answers_word_2\", \"answers_word_3\", \"answers_word_4\", \"answers_word_5\",\n    \"answers_reminder_default\", \"answers_actions\", \"answers_ok\"];\nvar rAnswerVisibleInstances = [\"answers_scrim\", \"answers_notebook\", \"answers_region\", \"answers_title\",\n    \"answers_word_1\", \"answers_word_2\", \"answers_word_3\", \"answers_word_4\", \"answers_word_5\",\n    \"answers_reminder_default\", \"answers_actions\", \"answers_ok\"];\nfunction rAnswerInstancesAvailable() {\n    var i;\n    for (i = 0; i < rAnswerInstances.length; i++) {\n        if (!root[rAnswerInstances[i]]) { return false; }\n    }\n    return true;\n}\nfunction rSetAnswerTexts() {\n    var data = rData(), questions = data.questions, summary = rSummary(), i;\n    rTextIfPresent(\"answers_title\", data.result.answersTitle);\n    for (i = 0; i < 5; i++) {\n        rTextIfPresent(\"answers_word_\" + (i + 1), questions[i].word);\n    }\n    rTextIfPresent(\"answers_reminder_default\", data.result.reminders[summary.reminderKey]);\n}\nfunction rSetAnswerVisibility(visible) {\n    var i;\n    for (i = 0; i < rAnswerVisibleInstances.length; i++) {\n        rVisibleIfPresent(rAnswerVisibleInstances[i], visible);\n    }\n}\nfunction rCloseAnswers() {\n    if (!resultState.overlayOpen) { return; }\n    rSetAnswerVisibility(false);\n    resultState.overlayOpen = false;\n    resultState.busy = false;\n}\nfunction rOpenAnswers() {\n    if (resultState.busy || resultState.overlayOpen) { return; }\n    resultState.overlayOpen = true;\n    resultState.busy = true;\n    root.activityStopVoice();\n    rSetAnswerTexts();\n    if (!rAnswerInstancesAvailable()) {\n        rWarn(\"answers-overlay-missing\", \"Answers overlay instances are absent from build_result.jsfl; Escape remains available to close the logical overlay.\");\n    }\n    rSetAnswerVisibility(true);\n    resultState.busy = false;\n}\nfunction rHandleKeydown(event) {\n    if (event.key === \"Escape\" && resultState.overlayOpen) { rCloseAnswers(); }\n}\nfunction rToggleMute() {\n    root.activitySetMuted(!rState().muted);\n    rSetMute();\n}\nfunction rPlayAgain() { rChangeScreen(\"quiz\"); }\nfunction rReturnHome() { rChangeScreen(\"intro\"); }\nfunction rChangeScreen(destination) {\n    if (resultState.busy || resultState.overlayOpen) { return; }\n    resultState.busy = true;\n    root.activityPlaySound(\"sfx_pin_press\", 0.6);\n    rHook(\"animateResultOut\").then(function () {\n        root.activityReset();\n        root.activityGoToScreen(destination);\n    });\n}\nfunction rEnter() {\n    var summary = rSummary(), i, firstLeg, secondLeg;\n    resultState.busy = true;\n    resultState.overlayOpen = false;\n    root.activityStopVoice();\n    rSetMute();\n    rVisible(\"shared_close\", false);\n    rVisible(\"shared_info\", false);\n    rVisible(\"result_background\", true);\n    rVisible(\"result_box_front\", true);\n    rVisible(\"result_box_angled\", false);\n    rVisible(\"result_box_shine\", true);\n    rVisible(\"result_sticker\", false);\n    rVisible(\"result_seal\", false);\n    rSetLabelsAndText();\n    rSetNotes();\n    for (i = 0; i < 3; i++) { rSetStar(i, i < summary.stars, false); }\n    rVisible(\"result_title_three\", false);\n    rVisible(\"result_score\", false);\n    rVisible(\"result_reminder_default\", false);\n    rVisible(\"result_button_again\", false);\n    rVisible(\"result_button_answers\", false);\n    rVisible(\"result_button_home\", false);\n    rVisible(\"result_kite\", false);\n    rVisible(\"result_spark_1\", false);\n    rVisible(\"result_spark_2\", false);\n    rVisible(\"result_spark_3\", false);\n    rVisible(\"result_spark_4\", false);\n    rSetAnswerVisibility(false);\n    if (!rAnswerInstancesAvailable()) {\n        rWarn(\"answers-overlay-missing\", \"Answers overlay instances are absent from build_result.jsfl; overlay visuals and button closing cannot be provided.\");\n    }\n    root.activityPlaySound(\"sfx_paper_whoosh\", 0.7);\n    firstLeg = rHook(\"animateResultKiteLegOne\");\n    Promise.all([rHook(\"animateCameraTo\"), rHook(\"animateBoxTo\")]).then(function () {\n        root.activityPlaySound(\"sfx_tape_stick\", 0.9);\n        return rHook(\"animateBoxSealAndSticker\").then(function () {\n            root.activityPlaySound(\"sfx_tape_stick\", 0.9);\n        });\n    }).then(function () {\n        rVisible(\"result_sticker\", true);\n        rVisible(\"result_seal\", true);\n        rHook(\"animateResultTitleIn\");\n        rHook(\"animateResultStarsIn\");\n        rVisible(\"result_title_three\", true);\n        for (i = 0; i < 3; i++) { rSetStar(i, i < summary.stars, true); }\n        root.activityPlaySound(\"sfx_jingle_end\", 0.9);\n        secondLeg = firstLeg.then(function () {\n            root.activityPlaySound(\"sfx_paper_whoosh\", 0.5);\n            return rHook(\"animateResultKiteLegTwo\");\n        });\n        for (i = 0; i < summary.stars; i++) {\n            rHook(\"animateResultStarLit\");\n            root.activityPlaySound(\"sfx_star_chalk\", 0.9);\n        }\n        return Promise.all([rHook(\"animateScoreCountUp\"), secondLeg]);\n    }).then(function () {\n        rVisible(\"result_score\", true);\n        rHook(\"animateResultReminderIn\");\n        rVisible(\"result_reminder_default\", true);\n        return rHook(\"animateResultButtonsIn\");\n    }).then(function () {\n        rVisible(\"result_button_again\", true);\n        rVisible(\"result_button_answers\", true);\n        rVisible(\"result_button_home\", true);\n        resultState.busy = false;\n    });\n}\nif (!root.__resultLogicHandlersBound) {\n    rBind(\"result_button_again\", rPlayAgain);\n    rBind(\"result_button_answers\", rOpenAnswers);\n    rBind(\"result_button_home\", rReturnHome);\n    rBind(\"shared_mute_on\", rToggleMute);\n    rBind(\"shared_mute_off\", rToggleMute);\n    if (root.answers_ok) { rBind(\"answers_ok\", rCloseAnswers); }\n    if (root.answers_scrim) { rBind(\"answers_scrim\", rCloseAnswers); }\n    root.__resultLogicHandlersBound = true;\n}\nif (typeof window !== \"undefined\" && !root.__resultKeyHandlerBound) {\n    window.addEventListener(\"keydown\", rHandleKeydown);\n    root.__resultKeyHandlerBound = true;\n}\nrEnter();"}]};

var doc, tl;
var failures = [], warnings = [], applied = 0;

function log(m) { fl.trace("[logic:" + LOGIC_DATA.key + "] " + m); }
function findLayerIdx(name) {
    var i;
    for (i = 0; i < tl.layers.length; i++) { if (String(tl.layers[i].name) === name) { return i; } }
    return -1;
}
function findLabelFrame(label) {
    var i, f, fr, L;
    for (i = 0; i < tl.layers.length; i++) {
        L = tl.layers[i];
        for (f = 0; f < L.frames.length; f++) {
            fr = L.frames[f];
            if (fr.startFrame === f && String(fr.name) === label) { return f; }
        }
    }
    return -1;
}
function ensureLayer(name) {
    var idx = findLayerIdx(name);
    if (idx >= 0) { return idx; }
    tl.currentLayer = 0;
    idx = tl.addNewLayer(name, "normal", true);
    if (idx === undefined || idx === null || idx < 0) { throw new Error("Cannot create layer " + name); }
    return idx;
}
function putCode(layerIdx, frameIdx, code, key) {
    var marker = "/*LOGIC_AUTO:" + key + "*/", fr, cur, full;
    tl.currentLayer = layerIdx;
    fr = tl.layers[layerIdx].frames[frameIdx];
    if (!fr || fr.startFrame !== frameIdx) {
        tl.currentFrame = frameIdx;
        tl.insertBlankKeyframe(frameIdx);
        fr = tl.layers[layerIdx].frames[frameIdx];
    }
    cur = String(fr.actionScript || "");
    if (cur.replace(/\s/g, "") !== "" && cur.indexOf(marker) !== 0) {
        warnings.push("frame " + frameIdx + " already has foreign code; skipped " + key);
        return false;
    }
    full = marker + "\n" + code;
    fr.actionScript = full;
    if (String(tl.layers[layerIdx].frames[frameIdx].actionScript) !== full) {
        throw new Error("read-back mismatch for " + key);
    }
    return true;
}
function build() {
    var i, t, layerIdx, fidx;
    doc = fl.getDocumentDOM();
    if (!doc) { alert("No Animate document is open."); return; }
    tl = doc.getTimeline();
    layerIdx = ensureLayer(LOGIC_DATA.layerName);
    for (i = 0; i < LOGIC_DATA.targets.length; i++) {
        t = LOGIC_DATA.targets[i];
        try {
            fidx = (t.label === null) ? 0 : findLabelFrame(t.label);
            if (fidx < 0) { throw new Error("Frame label not found: " + t.label); }
            if (putCode(layerIdx, fidx, t.code, t.key)) { applied++; }
        } catch (err) {
            failures.push({ key: t.key, error: String(err) });
            log("FAILED: " + t.key + " - " + err);
        }
    }
    log("Targets: " + LOGIC_DATA.targets.length + " Applied: " + applied);
    log("Failed: " + failures.length);
    log("Warnings: " + warnings.length);
    for (i = 0; i < warnings.length; i++) { log("WARNING: " + warnings[i]); }
    log("Document not saved or closed.");
}
try {
    if (fl.outputPanel && fl.outputPanel.clear) { fl.outputPanel.clear(); }
    build();
} catch (e) {
    log("FATAL: " + e);
    alert("Logic build stopped: " + e + "\nSee Output panel.");
}
