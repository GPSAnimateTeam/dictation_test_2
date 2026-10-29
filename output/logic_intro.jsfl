var LOGIC_DATA = {"key":"intro","layerName":"actions","targets":[{"key":"intro","label":"intro","code":"this.stop();\nvar root = this;\nfunction introSetVisible(name, visible) {\n    if (!root[name]) { if (root.console && root.console.warn) { root.console.warn(\"[intro] Missing instance: \" + name); } return; }\n    root[name].visible = visible;\n}\nfunction introRunHook(name) { return root.activityRunHook(name); }\nfunction introEnter() {\n    var muted = !!root.activityState.muted;\n    root.__introStartLocked = false;\n    root.intro_title.text = root.activityData.ui.activityTitle;\n    root.intro_start_label.text = root.activityData.ui.buttons.start;\n    introSetVisible(\"intro_title\", true);\n    introSetVisible(\"intro_underline\", true);\n    introSetVisible(\"intro_box_front\", true);\n    introSetVisible(\"intro_box_angled\", false);\n    introSetVisible(\"intro_box_shine\", true);\n    introSetVisible(\"shared_rays\", true);\n    introSetVisible(\"shared_logo\", true);\n    introSetVisible(\"shared_close\", false);\n    introSetVisible(\"shared_info\", false);\n    introSetVisible(\"shared_mute_on\", !muted);\n    introSetVisible(\"shared_mute_off\", muted);\n    introSetVisible(\"intro_kite\", false);\n    introSetVisible(\"intro_start\", false);\n    introSetVisible(\"intro_start_label\", false);\n    root.intro_start.mouseEnabled = false;\n    introSetVisible(\"intro_deco_star_1\", false);\n    introSetVisible(\"intro_deco_star_2\", false);\n    introSetVisible(\"intro_deco_star_3\", false);\n    introSetVisible(\"intro_deco_star_4\", false);\n    introSetVisible(\"intro_deco_star_5\", false);\n    introSetVisible(\"intro_deco_star_6\", false);\n    if (root.__introHasEntered) {\n        return Promise.all([introRunHook(\"animateCameraTo\"), introRunHook(\"animateBoxTo\")]).then(introContinue);\n    }\n    root.activityPlaySound(\"sfx_box_drop\", 0.9);\n    return introRunHook(\"animateIntroBoxDrop\").then(introContinue);\n}\nfunction introContinue() {\n    root.activityPlaySound(\"sfx_paper_whoosh\", 0.6);\n    var flight = introRunHook(\"animateIntroKite\");\n    return flight.then(function () {\n        root.activityPlaySound(\"sfx_chalk_write\", 0.6);\n        return introRunHook(\"animateIntroTitle\");\n    }).then(function () {\n        return flight;\n    }).then(function () {\n        return introRunHook(\"animateIntroDecoIn\");\n    }).then(function () {\n        introSetVisible(\"intro_deco_star_1\", true);\n        introSetVisible(\"intro_deco_star_2\", true);\n        introSetVisible(\"intro_deco_star_3\", true);\n        introSetVisible(\"intro_deco_star_4\", true);\n        introSetVisible(\"intro_deco_star_5\", true);\n        introSetVisible(\"intro_deco_star_6\", true);\n        return introRunHook(\"animateIntroStartButtonIn\");\n    }).then(function () {\n        root.__introHasEntered = true;\n        introSetVisible(\"intro_start\", true);\n        introSetVisible(\"intro_start_label\", true);\n        root.intro_start.mouseEnabled = true;\n    });\n}\nfunction onIntroStartClick() {\n    if (root.__introStartLocked) { return; }\n    root.__introStartLocked = true;\n    root.intro_start.mouseEnabled = false;\n    root.activityPlaySound(\"sfx_pin_press\", 0.6);\n    introRunHook(\"animateIntroOut\").then(function () {\n        root.activityStopVoice();\n        root.activityStopAllSfx();\n        introSetVisible(\"intro_title\", false);\n        introSetVisible(\"intro_underline\", false);\n        introSetVisible(\"intro_start\", false);\n        introSetVisible(\"intro_start_label\", false);\n        introSetVisible(\"intro_deco_star_1\", false);\n        introSetVisible(\"intro_deco_star_2\", false);\n        introSetVisible(\"intro_deco_star_3\", false);\n        introSetVisible(\"intro_deco_star_4\", false);\n        introSetVisible(\"intro_deco_star_5\", false);\n        introSetVisible(\"intro_deco_star_6\", false);\n        introSetVisible(\"intro_kite\", false);\n        root.activityGoToScreen(\"quiz\");\n    });\n}\nfunction onIntroMuteClick() {\n    var muted = !root.activityState.muted;\n    root.activitySetMuted(muted);\n    introSetVisible(\"shared_mute_on\", !muted);\n    introSetVisible(\"shared_mute_off\", muted);\n}\nif (!root.__introLogicHandlersBound) {\n    root.intro_start.on(\"click\", onIntroStartClick);\n    root.shared_mute_on.on(\"click\", onIntroMuteClick);\n    root.shared_mute_off.on(\"click\", onIntroMuteClick);\n    root.__introLogicHandlersBound = true;\n}\nintroEnter();"}]};

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
