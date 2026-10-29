var LOGIC_DATA = __DATA__;

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
