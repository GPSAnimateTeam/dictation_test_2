var LOGIC_DATA = {"key":"quiz","layerName":"actions","targets":[{"key":"quiz","label":"quiz","code":"this.stop();\nvar root = this, quizBusy = false, quizLocked = true, quizOverlay = null, quizWarned = {};\nfunction qWarn(k, m) { if (!quizWarned[k]) { quizWarned[k] = true; if (root.console && root.console.warn) { root.console.warn(\"[quiz] \" + m); } } }\nfunction qGet(n) { if (!root[n]) { qWarn(\"missing:\" + n, \"Missing instance \" + n); return null; } return root[n]; }\nfunction qVisible(n, v) { var x = qGet(n); if (x) { x.visible = !!v; } }\nfunction qText(n, v) {\n    var x = qGet(n), i, c, done = false;\n    if (!x) { return false; }\n    if (typeof x.text === \"string\") { x.text = String(v); return true; }\n    if (typeof x.textString === \"string\") { x.textString = String(v); return true; }\n    if (x.children) { for (i = 0; i < x.children.length; i++) { c = x.children[i]; if (typeof c.text === \"string\") { c.text = String(v); done = true; } } }\n    if (!done) { qWarn(\"text:\" + n, \"No writable text field in \" + n); }\n    return done;\n}\nfunction qEnable(n, v) { var x = qGet(n); if (x) { x.mouseEnabled = !!v; } }\nfunction qBind(n, f) { var x = root[n]; if (x) { x.on(\"click\", f); } else { qWarn(\"bind:\" + n, \"Cannot bind absent instance \" + n); } }\nfunction qHook(n) { return root.activityRunHook(n); }\nfunction qState() { return root.activityState; }\nfunction qData() { return root.activityData; }\nfunction qQuestion() { return qState().questions[qState().questionIndex]; }\nfunction qOverlay(id, names, visible) { var i; quizOverlay = visible ? id : null; for (i = 0; i < names.length; i++) { qVisible(names[i], visible); } }\nvar qInst = [\"inst_scrim\",\"instructions_notebook\",\"inst_region\",\"inst_title\",\"inst_number_1\",\"inst_line_1\",\"inst_number_2\",\"inst_line_2\",\"inst_number_3\",\"inst_line_3\",\"inst_actions\",\"inst_ok\"];\nvar qExit = [\"exit_scrim\",\"exit_notebook\",\"exit_region\",\"exit_title\",\"exit_warning\",\"exit_actions\",\"exit_stay\",\"exit_leave\"];\nfunction qMute() { var m = !!qState().muted; qVisible(\"shared_mute_on\", !m); qVisible(\"shared_mute_off\", m); }\nfunction qOpenInfo() {\n    var d = qData().ui.instructions;\n    if (quizOverlay) { return; }\n    root.activityStopVoice();\n    qText(\"inst_title\", d.title); qText(\"inst_line_1\", d.lines[0]); qText(\"inst_line_2\", d.lines[1]); qText(\"inst_line_3\", d.lines[2]);\n    qText(\"inst_number_1\", d.numbers[0]); qText(\"inst_number_2\", d.numbers[1]); qText(\"inst_number_3\", d.numbers[2]);\n    qOverlay(\"instructions_overlay\", qInst, true);\n}\nfunction qCloseInfo() { if (quizOverlay === \"instructions_overlay\") { qOverlay(\"instructions_overlay\", qInst, false); } }\nfunction qOpenExit() {\n    var d = qData().ui.exitConfirmation;\n    if (quizOverlay) { return; }\n    root.activityStopVoice(); qText(\"exit_title\", d.title); qText(\"exit_warning\", d.text);\n    qOverlay(\"exit_confirmation_overlay\", qExit, true);\n}\nfunction qStay() { if (quizOverlay === \"exit_confirmation_overlay\") { qOverlay(\"exit_confirmation_overlay\", qExit, false); } }\nfunction qLeave() {\n    if (quizOverlay !== \"exit_confirmation_overlay\") { return; }\n    qOverlay(\"exit_confirmation_overlay\", qExit, false); root.activityReset(); root.activityGoToScreen(\"intro\");\n}\nfunction qToggleMute() { root.activitySetMuted(!qState().muted); qMute(); }\nfunction qStar(i, s) {\n    var p = \"quiz_star_\" + (i + 1) + \"_\";\n    qVisible(p+\"off\",s===\"off\"); qVisible(p+\"current\",s===\"current\"); qVisible(p+\"gold\",s===\"gold\");\n    qVisible(p+\"grey\",s===\"grey\"); qVisible(p+\"glow\",s===\"gold\");\n}\nfunction qNext(ready) {\n    var s = qState(), label = s.questionIndex < s.totalQuestions - 1 ? qData().ui.buttons.next : qData().ui.buttons.nextLast;\n    qText(\"quiz_next_calendar\", label); qVisible(\"quiz_next_calendar\", true); qEnable(\"quiz_next_calendar\", ready && !quizOverlay);\n}\nfunction qLabels(q) {\n    var i, n;\n    for (i=0;i<3;i++) { n=\"quiz_answer_paper_\"+(i+1); if (q.options[i]) { qText(n,q.options[i].text); qVisible(n,true); qEnable(n,false); } else { qVisible(n,false); } }\n}\nfunction qRender(first) {\n    var s=qState(), q=qQuestion(), i;\n    if (!q) { qWarn(\"question\",\"Missing current question\"); return; }\n    s.attemptsUsed=0; s.questionSettled=false; quizBusy=true; quizLocked=true;\n    qText(\"quiz_sentence\",q.stem.before+q.stem.after); qLabels(q); qText(\"quiz_sticky_text\",qData().ui.sticky.guide);\n    qVisible(\"quiz_sticky_cream\",true); qVisible(\"quiz_sticky_pink\",false); qVisible(\"quiz_sticky_mint\",false); qNext(false);\n    for(i=0;i<s.totalQuestions;i++){qStar(i,i===s.questionIndex?\"current\":(i<s.questionIndex?\"gold\":\"off\"));}\n    root.activityPlaySound(\"sfx_chalk_write\",0.55);qHook(\"animateChalkWrite\").then(function(){\n        var j;if(quizOverlay){return;} quizBusy=false; quizLocked=false;\n        for(j=0;j<3;j++){if(q.options[j]){qEnable(\"quiz_answer_paper_\"+(j+1),true);}}\n        qEnable(\"quiz_play_button\",true);qEnable(\"quiz_slow_button\",true);\n        if(first&&s.questionIndex===0){root.activityPlayVoice([qData().ui.soundKeys.prompt,q.sounds.sentence,q.sounds.word]);}\n    });\n}\nfunction qPlay(slow) {\n    var q=qQuestion();if(quizOverlay||!q){return;}\n    root.activityPlayVoice(slow?[q.sounds.slow]:[q.sounds.sentence,q.sounds.word]);\n}\nfunction qSticky(kind,q,opt) {\n    var d=qData(),r=d.feedback.responses,v;\n    if(kind===\"hint\"){qVisible(\"quiz_sticky_cream\",false);qVisible(\"quiz_sticky_pink\",true);qVisible(\"quiz_sticky_mint\",false);v=d.feedback.hints[opt.hintKey]+\"\\n\"+d.ui.sticky.tryAnother;}\n    else if(kind===\"guide\"){v=d.ui.sticky.guide;}\n    else {qVisible(\"quiz_sticky_cream\",false);qVisible(\"quiz_sticky_pink\",kind===\"miss\");qVisible(\"quiz_sticky_mint\",kind!==\"miss\");v=kind===\"miss\"?r.miss+\"\\n\"+(q.keepAlef?r.rememberKeep:r.rememberDrop):(kind===\"first\"?r.first:r.second)+\"\\n\"+(q.keepAlef?r.ruleKeep:r.ruleDrop);}\n    qText(\"quiz_sticky_text\",v);\n}\nfunction qFinish(kind,q) {\n    var s=qState(),i=s.questionIndex;quizBusy=true;quizLocked=true;qSticky(kind,q,null);\n    qHook(\"animateProgressStarResult\").then(function(){qStar(i,kind===\"miss\"?\"grey\":\"gold\");qNext(true);quizBusy=false;});\n}\nfunction qChoose(i) {\n    var s=qState(),q=qQuestion(),o,k,j;\n    if(quizOverlay||quizLocked||quizBusy||s.questionSettled||!s.ready){return;}\n    if(!q||!q.options[i]){qWarn(\"option:\"+i,\"Missing option\");return;}\n    o=q.options[i];s.attemptsUsed++;quizLocked=true;quizBusy=true;root.activityStopVoice();root.activityPlaySound(\"sfx_pin_press\",0.35);\n    if(root.activityCheckAnswer(q,i)){\n        k=s.attemptsUsed===1?\"first\":\"second\";root.activitySettleQuestion(s.questionIndex,k);\n        qHook(\"animateCorrectSequence\").then(function(){qFinish(k,q);});return;\n    }\n    if(s.attemptsUsed<s.scoring.maxAttempts){\n        root.activityPlaySound(\"sfx_paper_slide\",0.5);\n        qHook(\"animateWrongAnswer\").then(function(){qSticky(\"hint\",q,o);quizBusy=false;quizLocked=false;for(j=0;j<3;j++){if(q.options[j]){qEnable(\"quiz_answer_paper_\"+(j+1),true);}}});return;\n    }\n    root.activitySettleQuestion(s.questionIndex,\"miss\");root.activityPlaySound(\"sfx_gold_glow\",0.9);\n    qHook(\"animateMissedQuestion\").then(function(){\n        var correct=root.activityCorrectOptionIndex(q);\n        return qHook(\"animateCorrectSequence\").then(function(){qSticky(\"miss\",q,null);qFinish(\"miss\",q);});\n    });\n}\nfunction qAdvance() {\n    var s=qState();if(quizOverlay||!s.questionSettled||quizBusy||!s.ready){return;}\n    quizBusy=true;quizLocked=true;root.activityStopVoice();qNext(false);root.activityPlaySound(\"sfx_pin_press\",0.5);\n    qHook(\"animateAdvance\").then(function(){\n        if(s.questionIndex<s.totalQuestions-1){s.questionIndex++;qHook(\"animateKiteToStar\").then(function(){qRender(false);});}\n        else{s.resultSummary=root.activityBuildResultSummary();qHook(\"animateQuizOut\").then(function(){root.activityGoToScreen(\"result\");});}\n    });\n}\nfunction qHandleKeydown(event) {\n    if (event.key === \"Escape\") {\n        if (quizOverlay === \"instructions_overlay\") { qCloseInfo(); }\n        else if (quizOverlay === \"exit_confirmation_overlay\") { qStay(); }\n        return;\n    }\n    if (!quizOverlay && qState().ready && event.key >= \"1\" && event.key <= \"3\") { qChoose(Number(event.key) - 1); }\n}\nfunction qEnter() {\n    var s=qState();root.activityStopVoice();quizBusy=true;quizLocked=true;quizOverlay=null;qMute();\n    qVisible(\"quiz_box_front\",false);qVisible(\"quiz_box_angled\",true);qVisible(\"quiz_box_glass_shine\",true);\n    qVisible(\"shared_close_button\",true);qVisible(\"shared_info_button\",true);\n    [\"quiz_star_1_current\", \"quiz_rule_noun_piece\", \"quiz_rule_prefix_piece\", \"quiz_rule_plus\", \"quiz_next_calendar\", \"quiz_next_page\", \"quiz_next_shade\", \"quiz_note_ink\", \"quiz_box_note_1_yellow\", \"quiz_box_note_2_yellow\", \"quiz_box_note_3_yellow\", \"quiz_box_note_4_yellow\", \"quiz_box_note_5_yellow\", \"shared_close_button\", \"shared_info_button\"].forEach(function(n){qVisible(n,false);});\n    qInst.concat(qExit).forEach(function(n){qVisible(n,false);});\n    root.activityPlaySound(\"sfx_paper_whoosh\",0.6);\n    Promise.all([qHook(\"animateCameraTo\"),qHook(\"animateBoxTo\")]).then(function(){return qHook(\"animateProgressIn\");})\n        .then(function(){return qHook(\"animateKiteToStar\");}).then(function(){return qHook(\"animateStickyIn\");})\n        .then(function(){if(s.questionIndex<0||s.questionIndex>=s.totalQuestions){s.questionIndex=0;}qRender(s.questionIndex===0);});\n}\nif(!root.__quizLogicHandlersBound){\n    qBind(\"quiz_play_button\",function(){qPlay(false);});qBind(\"quiz_slow_button\",function(){qPlay(true);});\n    qBind(\"quiz_answer_paper_1\",function(){qChoose(0);});qBind(\"quiz_answer_paper_2\",function(){qChoose(1);});qBind(\"quiz_answer_paper_3\",function(){qChoose(2);});\n    qBind(\"quiz_next_calendar\",qAdvance);qBind(\"shared_info_button\",qOpenInfo);qBind(\"shared_close_button\",qOpenExit);\n    qBind(\"shared_mute_on\",qToggleMute);qBind(\"shared_mute_off\",qToggleMute);\n    qBind(\"inst_ok\",qCloseInfo);qBind(\"inst_scrim\",qCloseInfo);qBind(\"exit_stay\",qStay);qBind(\"exit_leave\",qLeave);\n    root.__quizLogicHandlersBound=true;\n}\nif(typeof window!==\"undefined\"&&!root.__quizKeyHandlersBound){window.addEventListener(\"keydown\",qHandleKeydown);root.__quizKeyHandlersBound=true;}\nqEnter();"}]};

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
