// Generated add-only builder for the intro screen.
// This script never saves the document. Review the output panel after running.
var BUILD_DATA = {"screenId":"intro","stage":{"w":1800,"h":1200},"elements":[{"id":"intro_background","kind":"image","domId":"#actBg","x":-644,"y":-447,"w":2700,"h":1800,"zIndex":0,"asset":"images/bg_plate.jpg","textKey":null,"font":null,"states":["default"],"reveal":"none","notes":"Intro camera zoom 1.5/origin 644,447; image scale 1.","textValue":null},{"id":"intro_box_front","kind":"image","domId":"#actBoxView1 img","x":615.5313,"y":655,"w":568.9373,"h":348,"zIndex":8,"asset":"images/shared_box_front.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"","textValue":null},{"id":"intro_box_shine","kind":"image","domId":"#actBoxShine1","x":615.5313,"y":655,"w":568.9373,"h":348,"zIndex":8,"asset":"images/shared_glass_shine.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Glass clip follows box front.","textValue":null},{"id":"intro_box_angled","kind":"image","domId":"#actBoxView2 img","x":603.4091,"y":655,"w":593.1818,"h":348,"zIndex":8,"asset":"images/shared_box_angled.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Hidden at intro rest; crossfades during screen transition.","textValue":null},{"id":"intro_kite_trail","kind":"canvas","domId":"#actKiteCanvas","x":0,"y":0,"w":1800,"h":1200,"zIndex":9,"asset":"images/shared_chalk_strong.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Canvas draws route spline and trail.","textValue":null},{"id":"intro_kite","kind":"image","domId":"#actKite img","x":1288,"y":305,"w":68,"h":50,"zIndex":15,"asset":"images/shared_kite.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Center rest point (1322,330), then fades after route.","textValue":null},{"id":"intro_title_txt","kind":"text","domId":"#actTitle","x":352,"y":195,"w":1097,"h":274,"zIndex":6,"asset":"images/shared_chalk_white.png","textKey":"ui.title","font":{"family":"ActPlaypen","size":60,"weight":560,"color":"#F5F2E8","align":"center"},"states":["default"],"reveal":"animation","notes":"Curved SVG text/underline; texture-filled and chalk-write reveal.","textValue":"صندوق الأحلام"},{"id":"intro_deco_star_1","kind":"image","domId":"#actDeco .act-deco-star","x":185.0,"y":307.0,"w":60,"h":56.0,"zIndex":5,"asset":"images/intro_star.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Twinkle phase 0s.","textValue":null},{"id":"intro_deco_star_2","kind":"image","domId":"#actDeco .act-deco-star","x":380.0,"y":281.3333,"w":40,"h":37.3333,"zIndex":5,"asset":"images/intro_star.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Twinkle phase 0.6s.","textValue":null},{"id":"intro_deco_star_3","kind":"image","domId":"#actDeco .act-deco-star","x":274.0,"y":435.7333,"w":52,"h":48.5333,"zIndex":5,"asset":"images/intro_star.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Twinkle phase 1.1s.","textValue":null},{"id":"intro_deco_star_4","kind":"image","domId":"#actDeco .act-deco-star","x":452.0,"y":518.2,"w":36,"h":33.6,"zIndex":5,"asset":"images/intro_star.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Twinkle phase 0.3s.","textValue":null},{"id":"intro_deco_star_5","kind":"image","domId":"#actDeco .act-deco-star","x":163.0,"y":579.4667,"w":44,"h":41.0667,"zIndex":5,"asset":"images/intro_star.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Twinkle phase 0.9s.","textValue":null},{"id":"intro_deco_star_6","kind":"image","domId":"#actDeco .act-deco-star","x":332.0,"y":638.8667,"w":56,"h":52.2667,"zIndex":5,"asset":"images/intro_star.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Twinkle phase 1.5s.","textValue":null},{"id":"intro_start_button","kind":"button","domId":"#actStartBtn","x":720,"y":482,"w":359,"h":129,"zIndex":12,"asset":"images/shared_btn_plaque.png","textKey":"ui.buttons.start","font":{"family":"ActReadex","size":44,"weight":600,"color":"#4A2208","align":"center"},"states":["default"],"reveal":"animation","notes":"Automatic scale/fade entrance; text in centered plaque span.","textValue":"ابدأ"},{"id":"shared_logo","kind":"image","domId":"#actLogo","x":120,"y":190,"w":242,"h":62,"zIndex":30,"asset":"images/ui_logo.png","textKey":null,"font":null,"states":["default"],"reveal":"none","notes":"Persistent logo; accessible alt text is ui.aria.logo.","textValue":null},{"id":"shared_close_button","kind":"button","domId":"#actBtnClose","x":1610,"y":190,"w":60,"h":60,"zIndex":30,"asset":"images/ui_btn_close.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Quiz-only via .act-quiz-only; opens exit confirmation.","textValue":null},{"id":"shared_info_button","kind":"button","domId":"#actBtnInfo","x":1538,"y":190,"w":60,"h":60,"zIndex":30,"asset":"images/ui_btn_info.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Quiz-only via .act-quiz-only; opens instructions.","textValue":null},{"id":"shared_mute_on","kind":"button","domId":"#actBtnMute .act-mute-on","x":1466,"y":190,"w":60,"h":60,"zIndex":30,"asset":"images/ui_btn_mute.png","textKey":null,"font":null,"states":["default"],"reveal":"none","notes":"Hidden in intro; state swaps when muted.","textValue":null},{"id":"shared_mute_off","kind":"button","domId":"#actBtnMute .act-mute-off","x":1466,"y":190,"w":60,"h":60,"zIndex":30,"asset":"images/ui_btn_mute_off.png","textKey":null,"font":null,"states":["default"],"reveal":"none","notes":"Opacity 0 until muted.","textValue":null},{"id":"shared_light_rays","kind":"image","domId":"#actRays","x":0,"y":0,"w":1800,"h":1200,"zIndex":1,"asset":"images/bg_light_rays.png","textKey":null,"font":null,"states":["default"],"reveal":"none","notes":"Opacity .4 and CSS drift ±20px every 14s.","textValue":null}]};
var placedCount = 0;
var skipped = [];
var warnings = [];
var differences = [];
var importedByAsset = {};
var usedItemNames = {};
var usedInstanceNames = {};
var usedLayerNames = {};
var doc = null;
var timeline = null;
var library = null;
var originalLayers = [];
var originalItems = [];
var originalWidth = 0;
var originalHeight = 0;
var frameN = 0;
var folderName = "";
var timelineFolderName = "";

function traceLine(s) { fl.trace("[" + BUILD_DATA.screenId + "] " + s); }
function startsWith(s, p) { return s.indexOf(p) === 0; }
function safeName(base, table) {
  var name = base, n = 2;
  while (table[name]) { name = base + "_" + n; n++; }
  table[name] = true;
  return name;
}
function prefixedName(name) {
  var prefix = BUILD_DATA.screenId + "_";
  return startsWith(name, prefix) ? name : prefix + name;
}
function snapshotLibraryNames() {
  var result = [];
  var items = library.items;
  for (var i = 0; i < items.length; i++) {
    if (items[i] && items[i].name !== undefined) { result.push(String(items[i].name)); }
  }
  return result;
}
function snapshotLayers() {
  var result = [];
  for (var i = 0; i < timeline.layers.length; i++) {
    var layer = timeline.layers[i];
    result.push({index:i, name:String(layer.name), frameCount:layer.frames ? layer.frames.length : 0});
  }
  return result;
}
function hasName(arr, name) {
  for (var i = 0; i < arr.length; i++) { if (arr[i] === name) { return true; } }
  return false;
}
function libraryHasName(name) {
  var items = library.items;
  for (var i = 0; i < items.length; i++) {
    if (items[i] && String(items[i].name) === name) { return true; }
  }
  return false;
}
function outputSnapshotDifferences() {
  var afterLayers = snapshotLayers();
  var afterItems = snapshotLibraryNames();
  for (var i = 0; i < originalLayers.length; i++) {
    var before = originalLayers[i], match = null;
    for (var j = 0; j < afterLayers.length; j++) {
      if (afterLayers[j].index === before.index && afterLayers[j].name === before.name) { match = afterLayers[j]; break; }
    }
    if (!match) {
      for (var k = 0; k < afterLayers.length; k++) {
        if (afterLayers[k].name === before.name) { match = afterLayers[k]; break; }
      }
    }
    if (!match) { differences.push("Existing layer missing: " + before.name); }
    else if (match.frameCount !== before.frameCount) {
      differences.push("Existing layer frame count changed: " + before.name + " (" + before.frameCount + " -> " + match.frameCount + ")");
    }
  }
  for (var m = 0; m < originalItems.length; m++) {
    if (!hasName(afterItems, originalItems[m])) { differences.push("Existing library item missing/renamed: " + originalItems[m]); }
  }
  if (doc.width !== originalWidth || doc.height !== originalHeight) {
    differences.push("Document stage changed: " + originalWidth + "x" + originalHeight + " -> " + doc.width + "x" + doc.height);
  }
}
function findNewLibraryItem(beforeNames, rawBase) {
  var items = library.items;
  for (var i = 0; i < items.length; i++) {
    var nm = items[i] && String(items[i].name);
    if (nm && !hasName(beforeNames, nm) && (nm === rawBase || nm.indexOf(rawBase + "_") === 0 || nm.toLowerCase().indexOf(rawBase.toLowerCase()) >= 0)) { return nm; }
  }
  for (var j = 0; j < items.length; j++) {
    var other = items[j] && String(items[j].name);
    if (other && !hasName(beforeNames, other)) { return other; }
  }
  return null;
}
function makeAssetURI(asset) {
  var uri = String(fl.scriptURI);
  var cut = uri.lastIndexOf("/");
  if (cut < 0) { throw new Error("Cannot derive output directory from fl.scriptURI: " + uri); }
  uri = uri.substring(0, cut);
  cut = uri.lastIndexOf("/");
  if (cut < 0) { throw new Error("Cannot derive project root from fl.scriptURI: " + uri); }
  var rootURI = uri.substring(0, cut + 1);
  var clean = String(asset).replace(/^images\//, "");
  return rootURI + "web_source/images/" + clean;
}
function createLibraryFolder() {
  var requested = BUILD_DATA.screenId;
  folderName = requested;
  var n = 2;
  while (libraryHasName(folderName)) { folderName = requested + "_" + n; n++; }
  try { library.newFolder(folderName); }
  catch (err) { throw new Error("Cannot create Library folder '" + folderName + "': " + err); }
  timelineFolderName = safeName(BUILD_DATA.screenId, usedLayerNames);
  var folderIndex = timeline.addNewLayer(timelineFolderName, "folder", false);
  if (folderIndex === undefined || folderIndex === null || folderIndex < 0) { folderIndex = timeline.currentLayer; }
  timeline.currentLayer = folderIndex;
}
function ensureImportedAsset(asset) {
  if (importedByAsset[asset]) { return importedByAsset[asset]; }
  var uri = makeAssetURI(asset);
  if (!FLfile.exists(uri)) { throw new Error("Asset does not exist: " + uri); }
  var base = asset.substring(asset.lastIndexOf("/") + 1);
  // Avoid import dialogs and possible replacement of any existing library item.
  if (libraryHasName(base)) { return null; }
  var before = snapshotLibraryNames();
  doc.importFile(uri, true);
  var imported = findNewLibraryItem(before, base);
  if (!imported) { throw new Error("Animate did not add a detectable Library item for " + asset); }
  var leaf = base.replace(/\.[^.]+$/, "");
  var desired = safeName(BUILD_DATA.screenId + "_" + leaf, usedItemNames);
  while (libraryHasName(desired)) { desired = safeName(BUILD_DATA.screenId + "_" + leaf, usedItemNames); }
  try {
    library.selectItem(imported);
    library.renameItem(desired);
    library.moveToFolder(folderName, desired, false);
  } catch (renameErr) {
    throw new Error("Could not prefix/move imported item '" + imported + "' into '" + folderName + "': " + renameErr);
  }
  var resultName = folderName + "/" + desired;
  var actualName = libraryHasName(resultName) ? resultName : (libraryHasName(desired) ? desired : null);
  if (!actualName) {
    var currentItems = library.items;
    for (var k = 0; k < currentItems.length; k++) {
      var candidate = currentItems[k] && String(currentItems[k].name);
      if (candidate && candidate.indexOf("/" + desired) === candidate.length - desired.length - 1) { actualName = candidate; break; }
    }
  }
  if (!actualName) { throw new Error("Could not verify renamed Library item " + desired + " after moving it to " + folderName); }
  importedByAsset[asset] = actualName;
  return actualName;
}
function activateLayerAtN(layerIndex) {
  timeline.currentLayer = layerIndex;
  timeline.currentFrame = frameN;
  timeline.insertBlankKeyframe(frameN);
}
function placeLibraryItem(itemName, x, y, w, h) {
  doc.library.addItemToDocument({x:x, y:y}, itemName);
  if (!doc.selection || doc.selection.length < 1) { throw new Error("Library item was not placed on the stage: " + itemName); }
  var item = doc.selection[0];
  try {
    doc.setSelectionRect({left:x, top:y, right:x+w, bottom:y+h}, false);
  } catch (rectErr) {
    try { item.x = x; item.y = y; item.width = w; item.height = h; }
    catch (sizeErr) { throw new Error("Cannot size placed item '" + itemName + "': " + rectErr + " / " + sizeErr); }
  }
  item = doc.selection[0];
  item.x = x; item.y = y;
  return item;
}
function setInstanceName(element, name) {
  if (!element) { throw new Error("Cannot name empty instance " + name); }
  element.name = name;
  if (element.name !== name) { warnings.push("Animate did not retain instance name '" + name + "'."); }
  usedInstanceNames[name] = true;
}
function setTextProperties(textValue, font) {
  if (textValue === null || textValue === undefined || typeof textValue !== "string") {
    throw new Error("Text has no scalar text value in the embedded questions data.");
  }
  doc.addNewText({left:0, top:0, right:1, bottom:1});
  if (!doc.selection || doc.selection.length < 1) { throw new Error("Animate did not create a text selection."); }
  var textElement = doc.selection[0];
  try { textElement.textType = "dynamic"; } catch (typeErr) { warnings.push("Could not set textType property to dynamic: " + typeErr); }
  doc.setTextString(textValue);
  textElement = doc.selection[0];
  try { textElement.textType = "dynamic"; } catch (typeErr2) {}
  if (font) {
    var face = font.family || "Arial";
    var fontList = null;
    try { if (fl.getFontList) { fontList = fl.getFontList(); } } catch (fontErr) { fontList = null; }
    if (fontList) {
      var found = false;
      for (var f = 0; f < fontList.length; f++) { if (String(fontList[f]) === face) { found = true; break; } }
      if (!found) { warnings.push("Font '" + face + "' is not installed; using Arial for '" + textValue + "'."); face = "Arial"; }
    } else { warnings.push("Cannot verify font availability for '" + face + "'; requested family retained."); }
    try { doc.setTextAttr("face", face); } catch (faceErr) { warnings.push("Could not set font family '" + face + "': " + faceErr); }
    if (font.size !== undefined && font.size !== null) { try { doc.setTextAttr("size", Number(font.size)); } catch (sizeErr) { warnings.push("Could not set font size: " + sizeErr); } }
    if (font.color) { try { doc.setTextAttr("fillColor", font.color); } catch (colorErr) { warnings.push("Could not set text color: " + colorErr); } }
    if (font.align) { try { doc.setTextAttr("alignment", font.align); } catch (alignErr) { warnings.push("Could not set text alignment: " + alignErr); } }
  }
  try { doc.setTextAttr("direction", "rtl"); } catch (rtlErr) { warnings.push("Animate did not accept RTL text attribute: " + rtlErr); }
  return doc.selection[0];
}
function setTextRect(textElement, e) {
  doc.selection = [textElement];
  try { doc.setSelectionRect({left:e.x, top:e.y, right:e.x+e.w, bottom:e.y+e.h}, false); }
  catch (err) { textElement.x=e.x; textElement.y=e.y; }
  return doc.selection[0];
}
function groupFor(e) {
  if (e.reveal === "interaction") { return "dynamic"; }
  if (e.zIndex <= 1 || /background/i.test(e.id)) { return "bg"; }
  if (/box|board/i.test(e.id)) { return "board"; }
  if (e.kind === "button" || /logo|close|info|mute/i.test(e.id)) { return "ui"; }
  if (e.kind === "canvas" || /star|kite|fx|ray/i.test(e.id)) { return "fx"; }
  return "content";
}
function makeShapePlaceholder(e) {
  try { doc.addNewRectangle({left:e.x, top:e.y, right:e.x+e.w, bottom:e.y+e.h}, 0); }
  catch (rectErr) { throw new Error("Could not create shape placeholder: " + rectErr); }
  if (doc.selection && doc.selection.length) { setInstanceName(doc.selection[0], prefixedName(e.id)); }
  warnings.push("Shape/CSS-only placeholder used for '" + e.id + "'; its original styling is not represented by a source asset.");
}
function buildOneElement(e) {
  var layerCategory = groupFor(e);
  var layerBase = BUILD_DATA.screenId + "_" + layerCategory + "_" + e.id + "_layer";
  var layerName = safeName(layerBase, usedLayerNames);
  var layerIndex = timeline.addNewLayer(layerName, "normal", true);
  if (layerIndex === undefined || layerIndex === null || layerIndex < 0) { layerIndex = timeline.currentLayer; }
  activateLayerAtN(layerIndex);
  var instanceName = prefixedName(e.id);
  if (usedInstanceNames[instanceName]) { instanceName = safeName(instanceName, usedInstanceNames); }
  if (e.kind === "image") {
    if (!e.asset) { skipped.push(e.id + ": image has no asset path."); return; }
    var itemName = ensureImportedAsset(e.asset);
    if (!itemName) { skipped.push(e.id + ": required asset was not imported because a same-name Library item already exists."); return; }
    var placed = placeLibraryItem(itemName, Number(e.x), Number(e.y), Number(e.w), Number(e.h));
    setInstanceName(placed, instanceName);
    placedCount++;
    return;
  }
  if (e.kind === "text") {
    if (e.textValue === null || typeof e.textValue !== "string") { skipped.push(e.id + ": textKey missing or does not resolve to a single string."); return; }
    var text = setTextProperties(e.textValue, e.font);
    text = setTextRect(text, e);
    setInstanceName(text, instanceName);
    placedCount++;
    return;
  }
  if (e.kind === "button") {
    if (!e.asset) { skipped.push(e.id + ": button has no background image."); return; }
    if (e.textValue !== null && typeof e.textValue !== "string") { skipped.push(e.id + ": button label is not a scalar text value."); return; }
    var buttonAsset = ensureImportedAsset(e.asset);
    if (!buttonAsset) { skipped.push(e.id + ": required button image has a same-name Library collision."); return; }
    var bg = placeLibraryItem(buttonAsset, Number(e.x), Number(e.y), Number(e.w), Number(e.h));
    var buttonSelection = [bg];
    if (e.textValue !== null) {
      var label = setTextProperties(e.textValue, e.font);
      label = setTextRect(label, e);
      buttonSelection.push(label);
    } else { warnings.push("Button  + e.id +  has no visible text in source; created image-only MovieClip."); }
    doc.selection = buttonSelection;
    var symbolName = safeName(BUILD_DATA.screenId + "_" + e.id + "_mc", usedItemNames);
    try { doc.convertToSymbol("movie clip", symbolName, "center"); }
    catch (symErr) { throw new Error("Cannot create MovieClip button '" + e.id + "': " + symErr); }
    if (!doc.selection || !doc.selection.length) { throw new Error("Button MovieClip was not created for " + e.id); }
    var symbolInstance = doc.selection[0];
    setInstanceName(symbolInstance, instanceName);
    placedCount++;
    return;
  }
  if (e.kind === "shape" || e.kind === "canvas" || e.kind === "group") {
    makeShapePlaceholder(e);
    placedCount++;
    if (e.kind === "canvas") { warnings.push("Canvas '" + e.id + "' represented by a static placeholder; drawing is not implemented."); }
    if (e.kind === "group") { warnings.push("Group '" + e.id + "' represented by a static shape placeholder."); }
    return;
  }
  skipped.push(e.id + ": unsupported element kind '" + e.kind + "'.");
}
function build() {
  doc = fl.getDocumentDOM();
  if (!doc) { alert("No Adobe Animate document is open. Open the target document and run this JSFL again."); return; }
  timeline = (doc.timelines && doc.timelines.length) ? doc.timelines[0] : doc.getTimeline();
  library = doc.library;
  originalLayers = snapshotLayers();
  originalItems = snapshotLibraryNames();
  for (var i = 0; i < originalItems.length; i++) { usedItemNames[originalItems[i]] = true; }
  for (var j = 0; j < originalLayers.length; j++) { usedLayerNames[originalLayers[j].name] = true; }
  originalWidth = Number(doc.width); originalHeight = Number(doc.height);
  frameN = Number(timeline.frameCount);
  if (originalWidth !== Number(BUILD_DATA.stage.w) || originalHeight !== Number(BUILD_DATA.stage.h)) {
    warnings.push("Stage size differs from manifest (document " + originalWidth + "x" + originalHeight + ", manifest " + BUILD_DATA.stage.w + "x" + BUILD_DATA.stage.h + "); document was not changed.");
  }
  createLibraryFolder();
  // New layers are added from lowest zIndex to highest so Animate's above-current insertion keeps high zIndex layers on top.
  var ordered = BUILD_DATA.elements.slice(0);
  ordered.sort(function(a,b) { return Number(a.zIndex) - Number(b.zIndex); });
  var firstNewLayer = null;
  for (var n = 0; n < ordered.length; n++) {
    var e = ordered[n];
    if (e.x === null || e.y === null || e.w === null || e.h === null || isNaN(Number(e.x)) || isNaN(Number(e.y)) || isNaN(Number(e.w)) || isNaN(Number(e.h))) {
      skipped.push(e.id + ": missing or invalid x/y/w/h.");
      continue;
    }
    if (e.textKey && (e.textValue === null || typeof e.textValue !== "string") && (e.kind === "text" || e.kind === "button")) {
      skipped.push(e.id + ": missing/non-scalar text value for " + e.textKey + ".");
      continue;
    }
    var beforeLayerCount = timeline.layers.length;
    buildOneElement(e);
    if (timeline.layers.length > beforeLayerCount && firstNewLayer === null) { firstNewLayer = timeline.layers[timeline.currentLayer]; }
  }
  if (firstNewLayer && firstNewLayer.frames && firstNewLayer.frames[frameN]) {
    firstNewLayer.frames[frameN].name = BUILD_DATA.screenId;
    firstNewLayer.frames[frameN].labelType = "name";
  } else {
    warnings.push("Could not set the frame label on the first new layer at index " + frameN + ".");
  }
  outputSnapshotDifferences();
  traceLine("Frame index: " + frameN + "; new folder: " + folderName);
  traceLine("Elements placed: " + placedCount);
  traceLine("Elements skipped: " + skipped.length);
  for (var s = 0; s < skipped.length; s++) { traceLine("SKIPPED: " + skipped[s]); }
  traceLine("Warnings: " + warnings.length);
  for (var w = 0; w < warnings.length; w++) { traceLine("WARNING: " + warnings[w]); }
  traceLine("Pre-existing layer/library snapshot differences: " + differences.length);
  for (var d = 0; d < differences.length; d++) { traceLine("DIFFERENCE: " + differences[d]); }
  if (differences.length) { alert("Add-only verification found differences. No cleanup was attempted. See the Output panel for details."); }
  else { traceLine("Verification passed for all snapshotted pre-existing layer names/frame counts and Library item names."); }
  traceLine("Document was not saved or closed.");
}

try {
  if (fl.outputPanel && fl.outputPanel.clear) { fl.outputPanel.clear(); }
  build();
} catch (error) {
  traceLine("ERROR; stopped without cleanup: " + error);
  alert("The " + BUILD_DATA.screenId + " build stopped: " + error + "\nSee the Output panel. No cleanup was attempted.");
}
