var LOGIC_DATA = {"key":"result","layerName":"actions","targets":[{"key":"result","label":"result","code":"this.stop();\nvar root = this;\nvar KINDS = [\"yellow\", \"mint\", \"grey\"];\nvar OVL = [\"answers_scrim\", \"answers_notebook\", \"answers_title\", \"answers_word_1\", \"answers_word_2\", \"answers_word_3\", \"answers_word_4\", \"answers_word_5\", \"answers_reminder_default\", \"answers_ok\", \"answers_ok_label\"];\nvar warned = {};\nfunction warn(m) { if (!warned[m]) { warned[m] = true; if (typeof console !== \"undefined\" && console.warn) { console.warn(\"[result] \" + m); } } }\nfunction S() { return root.activityState; }\nfunction D() { return root.activityData; }\nfunction hook(n) { return root.activityRunHook(n); }\nfunction sfx(n, v) { root.activityPlaySound(\"sfx_\" + n, v); }\nfunction vis(n, f) { var o = root[n]; if (!o) { warn(\"Missing instance: \" + n); return; } o.visible = !!f; }\nfunction visList(a, f) { var i; for (i = 0; i < a.length; i++) { vis(a[i], f); } }\nfunction txtObj(o) {\n    var i, c;\n    if (o && typeof o.text === \"string\") { return o; }\n    if (o && o.children) { for (i = 0; i < o.children.length; i++) { c = o.children[i]; if (c && typeof c.text === \"string\") { return c; } } }\n    return null;\n}\nfunction setText(n, s) {\n    var o = root[n], t;\n    if (!o) { warn(\"Missing instance: \" + n); return; }\n    t = txtObj(o);\n    if (!t) { warn(\"No text object inside: \" + n); return; }\n    t.text = s;\n}\nfunction bind(n, fn) { var o = root[n]; if (!o) { warn(\"Missing instance: \" + n); return; } o.on(\"click\", fn); }\nfunction syncMute() { var m = !!S().muted; vis(\"shared_mute_on\", !m); vis(\"shared_mute_off\", m); }\nfunction overlayBuilt() { return !!root[OVL[0]]; }\nfunction setOverlay(f) { var i; for (i = 0; i < OVL.length; i++) { if (root[OVL[i]]) { root[OVL[i]].visible = !!f; } } }\n\nif (!root.__result) { root.__result = { token: 0, busy: false, overlay: false, sum: null }; }\nvar Z = root.__result;\n\nfunction scoreText(sum) {\n    var d = D();\n    return root.activityFillText(d.result.scoreFormat, { score: root.activityToArabicDigits(sum.total), max: root.activityToArabicDigits(sum.max) }).replace(/<\\/?small>/g, \"\");\n}\nfunction showNotes(sum) {\n    var k, i, kind, res;\n    for (k = 0; k < 5; k++) {\n        res = sum.results[k];\n        kind = res === \"first\" ? \"yellow\" : (res === \"second\" ? \"mint\" : (res ? \"grey\" : null));\n        for (i = 0; i < KINDS.length; i++) { vis(\"result_note_\" + (k + 1) + \"_\" + KINDS[i], KINDS[i] === kind); }\n    }\n}\nfunction showStars(sum) {\n    var n;\n    for (n = 1; n <= 3; n++) { vis(\"result_star_\" + n + \"_off\", true); vis(\"result_star_\" + n + \"_gold\", n <= sum.stars); vis(\"result_star_\" + n + \"_glow\", n <= sum.stars); }\n}\nfunction openAnswers() {\n    var d = D(), sum = Z.sum, i;\n    if (Z.overlay || Z.busy) { return; }\n    if (!overlayBuilt()) { warn(\"Overlay elements not found in this frame: answers\"); return; }\n    setText(\"answers_title\", d.result.answersTitle);\n    for (i = 0; i < d.questions.length; i++) { setText(\"answers_word_\" + (i + 1), d.questions[i].word); }\n    setText(\"answers_reminder_default\", d.result.reminders[sum.reminderKey]);\n    setText(\"answers_ok_label\", d.ui.buttons.ok);\n    Z.overlay = true; setOverlay(true);\n}\nfunction closeAnswers() { if (Z.overlay) { setOverlay(false); Z.overlay = false; } }\nfunction leaveTo(screen) {\n    var tok;\n    if (Z.busy || Z.overlay) { return; }\n    Z.busy = true; tok = Z.token;\n    sfx(\"pin_press\", 0.6);\n    hook(\"animateResultOut\").then(function () {\n        if (tok !== Z.token) { return; }\n        root.activityReset();\n        root.activityGoToScreen(screen);\n    });\n}\nfunction onMute() { root.activitySetMuted(!S().muted); syncMute(); }\n\nfunction enter() {\n    var st = S(), d = D(), sum, tok, i, chain, labels;\n    if (!root.activityReady) { warn(\"Activity data is not ready\"); return; }\n    tok = ++Z.token; Z.busy = false; Z.overlay = false;\n    sum = st.resultSummary || root.activityBuildResultSummary();\n    Z.sum = sum;\n    visList([\"result_box_angled\", \"result_kite\", \"result_spark_1\", \"result_spark_2\", \"result_spark_3\", \"result_spark_4\", \"shared_close\", \"shared_info\"], false);\n    setOverlay(false);\n    visList([\"shared_logo\", \"result_box_front\", \"result_box_shine\", \"result_sticker\", \"result_sticker_text\", \"result_seal\", \"result_title_three\", \"result_score\", \"result_reminder_default\",\n        \"result_button_again\", \"result_button_again_label\", \"result_button_answers\", \"result_button_answers_label\", \"result_button_home\", \"result_button_home_label\"], true);\n    labels = [\"result_sticker_text\", \"result_title_three\", \"result_score\", \"result_reminder_default\", \"result_button_again_label\", \"result_button_answers_label\", \"result_button_home_label\", \"answers_ok_label\"];\n    for (i = 0; i < labels.length; i++) { if (root[labels[i]]) { root[labels[i]].mouseEnabled = false; } }\n    setText(\"result_title_three\", d.result.titles[sum.titleKey]);\n    setText(\"result_score\", scoreText(sum));\n    setText(\"result_reminder_default\", d.result.reminders[sum.reminderKey]);\n    showStars(sum); showNotes(sum); syncMute();\n    sfx(\"paper_whoosh\", 0.7);\n    chain = hook(\"animateResultKiteLegOne\").then(function () {\n        if (tok !== Z.token) { return; }\n        sfx(\"tape_stick\", 0.9);\n        return hook(\"animateBoxSealAndSticker\");\n    }).then(function () {\n        if (tok !== Z.token) { return; }\n        hook(\"animateResultTitleIn\"); hook(\"animateResultStarsIn\");\n        sfx(\"jingle_end\", 0.9);\n        return hook(\"spawnConfetti\");\n    });\n    for (i = 0; i < sum.stars; i++) {\n        chain = chain.then(function () {\n            if (tok !== Z.token) { return; }\n            sfx(\"star_chalk\", 0.9);\n            return hook(\"animateResultStarLit\");\n        });\n    }\n    chain.then(function () {\n        if (tok !== Z.token) { return; }\n        return hook(\"animateScoreCountUp\");\n    }).then(function () {\n        if (tok !== Z.token) { return; }\n        return hook(\"animateResultKiteLegTwo\");\n    }).then(function () {\n        if (tok !== Z.token) { return; }\n        hook(\"animateResultReminderIn\");\n        return hook(\"animateResultButtonsIn\");\n    });\n}\n\nif (!root.__resultLogicHandlersBound) {\n    bind(\"result_button_again\", function () { root.__resultApi.leave(\"quiz\"); });\n    bind(\"result_button_home\", function () { root.__resultApi.leave(\"intro\"); });\n    bind(\"result_button_answers\", function () { root.__resultApi.answers(); });\n    bind(\"shared_mute_on\", function () { root.__resultApi.mute(); });\n    bind(\"shared_mute_off\", function () { root.__resultApi.mute(); });\n    bind(\"answers_ok\", function () { root.__resultApi.close(); });\n    bind(\"answers_scrim\", function () { root.__resultApi.close(); });\n    root.__resultLogicHandlersBound = true;\n}\nroot.__resultApi = { leave: leaveTo, answers: openAnswers, close: closeAnswers, mute: onMute };\nenter();\n"}]};

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
