var LOGIC_DATA = {"key":"sounds","layerName":"sounds","targets":[{"key":"sounds","label":null,"code":"(function () {\n    var root = this;\n    var list = [[\"sfx_box_drop\", \"sfx/box_drop.mp3\"], [\"sfx_chalk_write\", \"sfx/chalk_write.mp3\"], [\"sfx_gold_glow\", \"sfx/gold_glow.mp3\"], [\"sfx_jingle_end\", \"sfx/jingle_end.mp3\"], [\"sfx_paper_crumple\", \"sfx/paper_crumple.mp3\"], [\"sfx_paper_fold\", \"sfx/paper_fold.mp3\"], [\"sfx_paper_slide\", \"sfx/paper_slide.mp3\"], [\"sfx_paper_tear\", \"sfx/paper_tear.mp3\"], [\"sfx_paper_whoosh\", \"sfx/paper_whoosh.mp3\"], [\"sfx_pin_press\", \"sfx/pin_press.mp3\"], [\"sfx_star_chalk\", \"sfx/star_chalk.mp3\"], [\"sfx_sticky_place\", \"sfx/sticky_place.mp3\"], [\"sfx_tape_stick\", \"sfx/tape_stick.mp3\"], [\"vo_q0_prompt\", \"vo/q0_prompt.mp3\"], [\"vo_q1_sentence\", \"vo/q1_sentence.mp3\"], [\"vo_q1_word\", \"vo/q1_word.mp3\"], [\"vo_q1_slow\", \"vo/q1_slow.mp3\"], [\"vo_q2_sentence\", \"vo/q2_sentence.mp3\"], [\"vo_q2_word\", \"vo/q2_word.mp3\"], [\"vo_q2_slow\", \"vo/q2_slow.mp3\"], [\"vo_q3_sentence\", \"vo/q3_sentence.mp3\"], [\"vo_q3_word\", \"vo/q3_word.mp3\"], [\"vo_q3_slow\", \"vo/q3_slow.mp3\"], [\"vo_q4_sentence\", \"vo/q4_sentence.mp3\"], [\"vo_q4_word\", \"vo/q4_word.mp3\"], [\"vo_q4_slow\", \"vo/q4_slow.mp3\"], [\"vo_q5_sentence\", \"vo/q5_sentence.mp3\"], [\"vo_q5_word\", \"vo/q5_word.mp3\"], [\"vo_q5_slow\", \"vo/q5_slow.mp3\"]];\n    var i, api;\n    if (root.__soundsRegistered === true) { return; }\n    api = (typeof createjs !== \"undefined\" && createjs.Sound) ? createjs.Sound : null;\n    if (!api || typeof api.registerSound !== \"function\") {\n        if (typeof console !== \"undefined\" && console.warn) { console.warn(\"[sounds] createjs.Sound is not available; sounds were not registered\"); }\n        return;\n    }\n    root.__soundsRegistered = true;\n    for (i = 0; i < list.length; i++) { api.registerSound(list[i][1], list[i][0]); }\n}).call(this);"}]};

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
