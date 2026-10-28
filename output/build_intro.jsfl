var BUILD_DATA = {"screenId":"intro","stage":{"w":1800,"h":1200},"direction":"rtl","screenCount":14,"sharedCount":6,"totalCount":20,"elements":[{"source":"screen","id":"intro_background","kind":"image","x":-644,"y":-447,"w":2700,"h":1800,"zIndex":0,"asset":"images/bg_plate.jpg","font":null,"reveal":"none","textKey":null,"textValue":null},{"source":"screen","id":"intro_box_front","kind":"image","x":615.5313,"y":655,"w":568.9373,"h":348,"zIndex":8,"asset":"images/shared_box_front.png","font":null,"reveal":"animation","textKey":null,"textValue":null},{"source":"screen","id":"intro_box_shine","kind":"image","x":615.5313,"y":655,"w":568.9373,"h":348,"zIndex":8,"asset":"images/shared_glass_shine.png","font":null,"reveal":"animation","textKey":null,"textValue":null},{"source":"screen","id":"intro_box_angled","kind":"image","x":603.4091,"y":655,"w":593.1818,"h":348,"zIndex":8,"asset":"images/shared_box_angled.png","font":null,"reveal":"animation","textKey":null,"textValue":null,"skipReason":"alternate view of intro_box_front; hidden at intro rest"},{"source":"screen","id":"intro_kite_trail","kind":"canvas","x":0,"y":0,"w":1800,"h":1200,"zIndex":9,"asset":"images/shared_chalk_strong.png","font":null,"reveal":"animation","textKey":null,"textValue":null},{"source":"screen","id":"intro_kite","kind":"image","x":1288,"y":305,"w":68,"h":50,"zIndex":15,"asset":"images/shared_kite.png","font":null,"reveal":"animation","textKey":null,"textValue":null},{"source":"screen","id":"intro_title_txt","kind":"text","x":352,"y":195,"w":1097,"h":274,"zIndex":6,"asset":"images/shared_chalk_white.png","font":{"family":"ActPlaypen","size":60,"weight":560,"color":"#F5F2E8","align":"center"},"reveal":"animation","textKey":"ui.title","textValue":"\u0635\u0646\u062f\u0648\u0642 \u0627\u0644\u0623\u062d\u0644\u0627\u0645"},{"source":"screen","id":"intro_deco_star_1","kind":"image","x":185,"y":307,"w":60,"h":56,"zIndex":5,"asset":"images/intro_star.png","font":null,"reveal":"animation","textKey":null,"textValue":null},{"source":"screen","id":"intro_deco_star_2","kind":"image","x":380,"y":281.3333,"w":40,"h":37.3333,"zIndex":5,"asset":"images/intro_star.png","font":null,"reveal":"animation","textKey":null,"textValue":null},{"source":"screen","id":"intro_deco_star_3","kind":"image","x":274,"y":435.7333,"w":52,"h":48.5333,"zIndex":5,"asset":"images/intro_star.png","font":null,"reveal":"animation","textKey":null,"textValue":null},{"source":"screen","id":"intro_deco_star_4","kind":"image","x":452,"y":518.2,"w":36,"h":33.6,"zIndex":5,"asset":"images/intro_star.png","font":null,"reveal":"animation","textKey":null,"textValue":null},{"source":"screen","id":"intro_deco_star_5","kind":"image","x":163,"y":579.4667,"w":44,"h":41.0667,"zIndex":5,"asset":"images/intro_star.png","font":null,"reveal":"animation","textKey":null,"textValue":null},{"source":"screen","id":"intro_deco_star_6","kind":"image","x":332,"y":638.8667,"w":56,"h":52.2667,"zIndex":5,"asset":"images/intro_star.png","font":null,"reveal":"animation","textKey":null,"textValue":null},{"source":"screen","id":"intro_start_button","kind":"button","x":720,"y":482,"w":359,"h":129,"zIndex":12,"asset":"images/shared_btn_plaque.png","font":{"family":"ActReadex","size":44,"weight":600,"color":"#4A2208","align":"center"},"reveal":"animation","textKey":"ui.buttons.start","textValue":"\u0627\u0628\u062f\u0623"},{"source":"shared","id":"shared_logo","kind":"image","x":120,"y":190,"w":242,"h":62,"zIndex":30,"asset":"images/ui_logo.png","font":null,"reveal":"none","textKey":null,"textValue":null},{"source":"shared","id":"shared_close_button","kind":"button","x":1610,"y":190,"w":60,"h":60,"zIndex":30,"asset":"images/ui_btn_close.png","font":null,"reveal":"interaction","textKey":null,"textValue":null},{"source":"shared","id":"shared_info_button","kind":"button","x":1538,"y":190,"w":60,"h":60,"zIndex":30,"asset":"images/ui_btn_info.png","font":null,"reveal":"interaction","textKey":null,"textValue":null},{"source":"shared","id":"shared_mute_on","kind":"button","x":1466,"y":190,"w":60,"h":60,"zIndex":30,"asset":"images/ui_btn_mute.png","font":null,"reveal":"none","textKey":null,"textValue":null},{"source":"shared","id":"shared_mute_off","kind":"button","x":1466,"y":190,"w":60,"h":60,"zIndex":30,"asset":"images/ui_btn_mute_off.png","font":null,"reveal":"none","textKey":null,"textValue":null},{"source":"shared","id":"shared_light_rays","kind":"image","x":0,"y":0,"w":1800,"h":1200,"zIndex":1,"asset":"images/bg_light_rays.png","font":null,"reveal":"none","textKey":null,"textValue":null}]};

var doc = null;
var timeline = null;
var library = null;
var frameN = 0;
var placedCount = 0;
var skipped = [];
var failures = [];
var warnings = [];
var differences = [];
var originalLayers = [];
var originalItems = [];
var usedLayerNames = {};
var usedLibraryNames = {};
var usedInstanceNames = {};
var assetCache = {};
var preparedLayers = {};
var elementLayerNames = {};
var textChecks = [];
var firstLayerName = "";
var dynamicLayerName = "";
var timelineFolderName = "";
var libraryFolderName = "";
var currentChildLayer = -1;

function log(message) {
    fl.trace("[" + BUILD_DATA.screenId + "] " + message);
}

function nameExists(names, name) {
    var i;
    for (i = 0; i < names.length; i++) {
        if (names[i] === name) {
            return true;
        }
    }
    return false;
}

function uniqueName(base, table) {
    var name = base;
    var suffix = 2;
    while (table[name] === true) {
        name = base + "_" + suffix;
        suffix++;
    }
    table[name] = true;
    return name;
}

function snapshotLayers() {
    var result = [];
    var i;
    for (i = 0; i < timeline.layers.length; i++) {
        result.push({
            name: String(timeline.layers[i].name),
            frameCount: timeline.layers[i].frames ? timeline.layers[i].frames.length : 0
        });
    }
    return result;
}

function snapshotLibraryItems() {
    var result = [];
    var items = library.items;
    var i;
    for (i = 0; i < items.length; i++) {
        if (items[i] && items[i].name !== undefined) {
            result.push(String(items[i].name));
        }
    }
    return result;
}

function libraryHasName(name) {
    var items = library.items;
    var i;
    for (i = 0; i < items.length; i++) {
        if (items[i] && String(items[i].name) === name) {
            return true;
        }
    }
    return false;
}

function libraryHasLeafName(name) {
    var items = library.items;
    var fullName;
    var slash;
    var i;
    for (i = 0; i < items.length; i++) {
        if (items[i] && items[i].name !== undefined) {
            fullName = String(items[i].name);
            slash = fullName.lastIndexOf("/");
            if ((slash < 0 ? fullName : fullName.substring(slash + 1)) === name) {
                return true;
            }
        }
    }
    return false;
}

function verifyBeforeAfter() {
    var afterLayers = snapshotLayers();
    var afterItems = snapshotLibraryItems();
    var i;
    var j;
    var match;

    for (i = 0; i < originalLayers.length; i++) {
        match = null;
        for (j = 0; j < afterLayers.length; j++) {
            if (afterLayers[j].name === originalLayers[i].name) {
                match = afterLayers[j];
                break;
            }
        }
        if (!match) {
            differences.push("Pre-existing layer missing or renamed: " + originalLayers[i].name);
        } else if (match.frameCount !== originalLayers[i].frameCount) {
            differences.push("Pre-existing layer frame count changed: " + originalLayers[i].name);
        }
    }
    for (i = 0; i < originalItems.length; i++) {
        if (!nameExists(afterItems, originalItems[i])) {
            differences.push("Pre-existing Library item missing or renamed: " + originalItems[i]);
        }
    }
}

function assetURI(asset) {
    var uri = String(fl.scriptURI).replace(/\\/g, "/");
    var slash;
    var outputFolder;
    var projectRoot;

    if (uri.indexOf("file://") !== 0) {
        uri = "file:///" + uri;
    }
    slash = uri.lastIndexOf("/");
    if (slash < 0) {
        throw new Error("Cannot derive output directory from fl.scriptURI: " + uri);
    }
    outputFolder = uri.substring(0, slash);
    slash = outputFolder.lastIndexOf("/");
    if (slash < 0) {
        throw new Error("Cannot derive project root from fl.scriptURI: " + uri);
    }
    projectRoot = outputFolder.substring(0, slash);
    return projectRoot + "/web_source/" + String(asset).replace(/\\/g, "/");
}

function addFolders() {
    var i;
    var folderIndex;
    for (i = 0; i < originalLayers.length; i++) {
        usedLayerNames[originalLayers[i].name] = true;
    }
    for (i = 0; i < originalItems.length; i++) {
        usedLibraryNames[originalItems[i]] = true;
    }

    timelineFolderName = uniqueName(BUILD_DATA.screenId, usedLayerNames);
    folderIndex = timeline.addNewLayer(timelineFolderName, "folder", true);
    if (folderIndex === undefined || folderIndex === null || folderIndex < 0) {
        throw new Error("Could not create timeline folder '" + timelineFolderName + "'.");
    }
    timeline.currentLayer = folderIndex;

    libraryFolderName = uniqueName(BUILD_DATA.screenId, usedLibraryNames);
    while (libraryHasName(libraryFolderName)) {
        libraryFolderName = uniqueName(BUILD_DATA.screenId, usedLibraryNames);
    }
    library.newFolder(libraryFolderName);
}

function validBounds(e) {
    return e.x !== null && e.x !== undefined &&
        e.y !== null && e.y !== undefined &&
        e.w !== null && e.w !== undefined &&
        e.h !== null && e.h !== undefined &&
        !isNaN(Number(e.x)) && !isNaN(Number(e.y)) &&
        !isNaN(Number(e.w)) && !isNaN(Number(e.h)) &&
        Number(e.w) > 0 && Number(e.h) > 0;
}

function isNonVisual(e) {
    return e.kind === "canvas" || e.kind === "audio-trigger";
}

function category(e) {
    if (e.reveal === "interaction") {
        return "dynamic";
    }
    if (e.zIndex <= 1 || /background|ray/i.test(e.id)) {
        return "bg";
    }
    if (/box|board/i.test(e.id)) {
        return "board";
    }
    if (e.kind === "button" || /logo|close|info|mute/i.test(e.id)) {
        return "ui";
    }
    return "content";
}

function getVisualElements() {
    var result = [];
    var i;
    var e;
    var at;
    for (i = 0; i < BUILD_DATA.elements.length; i++) {
        e = BUILD_DATA.elements[i];
        if (isNonVisual(e) || e.skipReason || !validBounds(e)) {
            continue;
        }
        at = result.length;
        while (at > 0 && Number(result[at - 1].zIndex) > Number(e.zIndex)) {
            at--;
        }
        result.splice(at, 0, e);
    }
    return result;
}

function findLayerIndex(name) {
    var i;
    for (i = 0; i < timeline.layers.length; i++) {
        if (String(timeline.layers[i].name) === name) {
            return i;
        }
    }
    throw new Error("Could not find new layer '" + name + "'.");
}

function createLayers(elements) {
    var i;
    var e;
    var kind;
    var layerName;
    var layerIndex;
    var dynamicMembers = [];

    for (i = 0; i < elements.length; i++) {
        if (elements[i].reveal === "interaction") {
            dynamicMembers.push(elements[i]);
        }
    }

    for (i = 0; i < elements.length; i++) {
        e = elements[i];
        kind = category(e);
        if (kind === "dynamic" && dynamicLayerName) {
            elementLayerNames[e.id] = dynamicLayerName;
            continue;
        }
        if (kind === "dynamic") {
            layerName = uniqueName(BUILD_DATA.screenId + "_dynamic", usedLayerNames);
            dynamicLayerName = layerName;
        } else {
            layerName = uniqueName(BUILD_DATA.screenId + "_" + kind + "_" + e.id, usedLayerNames);
        }
        if (currentChildLayer < 0) {
            timeline.currentLayer = findLayerIndex(timelineFolderName);
            layerIndex = timeline.addNewLayer(layerName, "normal", true);
        } else {
            timeline.currentLayer = currentChildLayer;
            layerIndex = timeline.addNewLayer(layerName, "normal", true);
        }
        if (layerIndex === undefined || layerIndex === null || layerIndex < 0) {
            throw new Error("Could not create timeline layer '" + layerName + "'.");
        }
        timeline.currentLayer = layerIndex;
        currentChildLayer = layerIndex;
        timeline.currentFrame = frameN;
        timeline.insertBlankKeyframe(frameN);
        if (!firstLayerName) {
            firstLayerName = layerName;
        }
        preparedLayers[layerName] = true;
        elementLayerNames[e.id] = layerName;
        if (kind === "dynamic") {
            var d;
            for (d = 0; d < dynamicMembers.length; d++) {
                elementLayerNames[dynamicMembers[d].id] = layerName;
            }
        }
    }
}

function ensureLayerFrame(e) {
    var layerName = elementLayerNames[e.id];
    var layerIndex;
    if (!layerName) {
        throw new Error("No newly created layer assigned to element '" + e.id + "'.");
    }
    layerIndex = findLayerIndex(layerName);
    timeline.currentLayer = layerIndex;
    timeline.currentFrame = frameN;
    if (!preparedLayers[layerName]) {
        timeline.insertBlankKeyframe(frameN);
        preparedLayers[layerName] = true;
    }
}

function newLibraryItemsComparedTo(before) {
    var after = snapshotLibraryItems();
    var result = [];
    var i;
    for (i = 0; i < after.length; i++) {
        if (!nameExists(before, after[i])) {
            result.push(after[i]);
        }
    }
    return result;
}

function importAsset(asset) {
    var uri;
    var base;
    var before;
    var additions;
    var importedName;
    var leaf;
    var desiredName;
    var finalName;
    var i;
    var slash;

    if (assetCache[asset]) {
        return assetCache[asset];
    }
    uri = assetURI(asset);
    if (!FLfile.exists(uri)) {
        throw new Error("Asset does not exist: " + uri);
    }
    base = String(asset).substring(String(asset).lastIndexOf("/") + 1);
    if (libraryHasLeafName(base)) {
        throw new Error("Import would collide with existing Library item '" + base + "'; no existing item was reused.");
    }
    before = snapshotLibraryItems();
    doc.importFile(uri, true);
    additions = newLibraryItemsComparedTo(before);
    if (additions.length < 1) {
        throw new Error("Animate did not add a new Library item for '" + asset + "'.");
    }
    importedName = null;
    for (i = 0; i < additions.length; i++) {
        slash = additions[i].lastIndexOf("/");
        if ((slash < 0 ? additions[i] : additions[i].substring(slash + 1)) === base) {
            importedName = additions[i];
            break;
        }
    }
    if (!importedName) {
        importedName = additions[0];
    }

    leaf = base.replace(/\.[^.]+$/, "");
    desiredName = uniqueName(BUILD_DATA.screenId + "_" + leaf, usedLibraryNames);
    while (libraryHasName(desiredName) || libraryHasLeafName(desiredName)) {
        desiredName = uniqueName(BUILD_DATA.screenId + "_" + leaf, usedLibraryNames);
    }
    library.selectItem(importedName);
    library.renameItem(desiredName);
    library.moveToFolder(libraryFolderName, desiredName, false);
    finalName = libraryFolderName + "/" + desiredName;
    if (!libraryHasName(finalName)) {
        if (libraryHasName(desiredName)) {
            finalName = desiredName;
        } else {
            throw new Error("Could not verify prefixed Library item '" + desiredName + "'.");
        }
    }
    assetCache[asset] = finalName;
    return finalName;
}

function setInstanceName(element, requestedName) {
    var finalName = requestedName;
    if (usedInstanceNames[finalName] === true) {
        finalName = uniqueName(finalName, usedInstanceNames);
        warnings.push("Duplicate instance name '" + requestedName + "' became '" + finalName + "'.");
    } else {
        usedInstanceNames[finalName] = true;
    }
    element.name = finalName;
    if (String(element.name) !== finalName) {
        warnings.push("Animate did not retain instance name '" + finalName + "'.");
    }
}

function setBounds(element, e, textElement) {
    var rectError = null;
    try {
        doc.selection = [element];
        doc.setSelectionRect({
            left: Number(e.x),
            top: Number(e.y),
            right: Number(e.x) + Number(e.w),
            bottom: Number(e.y) + Number(e.h)
        }, false);
    } catch (selectionError) {
        rectError = selectionError;
    }
    element = doc.selection && doc.selection.length ? doc.selection[0] : element;
    try {
        if (textElement) {
            element.left = Number(e.x);
            element.top = Number(e.y);
        } else {
            element.x = Number(e.x);
            element.y = Number(e.y);
        }
        element.width = Number(e.w);
        element.height = Number(e.h);
    } catch (boundsError) {
        throw new Error("Could not set exact bounds for '" + e.id + "': " + boundsError +
            (rectError ? " (selection rectangle failed: " + rectError + ")" : ""));
    }
    return element;
}

function placeImage(itemName, e) {
    doc.library.addItemToDocument({x: Number(e.x), y: Number(e.y)}, itemName);
    if (!doc.selection || doc.selection.length < 1) {
        throw new Error("Animate did not place Library item '" + itemName + "'.");
    }
    return setBounds(doc.selection[0], e, false);
}

function configureText(element, e) {
    var font = e.font || {};
    var family = font.family ? String(font.family) : "Arial";
    var fonts = null;
    var found = false;
    var i;
    var length = String(e.textValue).length;

    if (typeof element.setTextAttr !== "function") {
        throw new Error("Text element does not provide setTextAttr; required font formatting was not applied.");
    }

    try {
        if (fl.getFontList) {
            fonts = fl.getFontList();
        }
    } catch (fontListError) {
        warnings.push("Could not check font '" + family + "' for '" + e.id + "': " + fontListError);
    }
    if (fonts) {
        for (i = 0; i < fonts.length; i++) {
            if (String(fonts[i]) === family) {
                found = true;
                break;
            }
        }
        if (!found) {
            warnings.push("Font '" + family + "' is unavailable for '" + e.id + "'; using Arial.");
            family = "Arial";
        }
    } else {
        warnings.push("Font '" + family + "' could not be verified for '" + e.id + "'; using Arial.");
        family = "Arial";
    }

    element.setTextAttr("face", family, 0, length);
    if (font.size !== undefined && font.size !== null) {
        element.setTextAttr("size", Number(font.size), 0, length);
    }
    if (font.color) {
        element.setTextAttr("fillColor", String(font.color), 0, length);
    }
    if (font.align) {
        element.setTextAttr("alignment", String(font.align), 0, length);
    }
    if (font.weight !== undefined) {
        try {
            element.setTextAttr("bold", Number(font.weight) >= 600, 0, length);
        } catch (weightError) {
            warnings.push("Could not apply font weight for '" + e.id + "': " + weightError);
        }
    }
    try {
        element.setTextAttr("direction", BUILD_DATA.direction, 0, length);
    } catch (directionError) {
        warnings.push("Could not apply RTL direction for '" + e.id + "': " + directionError);
    }
    element.textType = "dynamic";
    return element;
}

function createText(e, isButtonLabel) {
    var element;
    var textAfterWrite;
    if (typeof e.textValue !== "string") {
        throw new Error("Text value for '" + e.textKey + "' is missing or not a string.");
    }
    doc.addNewText({
        left: Number(e.x),
        top: Number(e.y),
        right: Number(e.x) + Number(e.w),
        bottom: Number(e.y) + Number(e.h)
    });
    if (!doc.selection || doc.selection.length < 1) {
        throw new Error("Animate did not create text for '" + e.id + "'.");
    }
    element = doc.selection[0];
    doc.setTextString(e.textValue);
    element = doc.selection[0];
    element = configureText(element, e);
    element = setBounds(element, e, true);
    textAfterWrite = String(element.textString);
    textChecks.push({
        id: e.id,
        element: element,
        intended: e.textValue,
        initial: textAfterWrite
    });
    if (!isButtonLabel) {
        setInstanceName(element, e.id);
    }
    return element;
}

function effectsFor(e) {
    return e.effects || null;
}

function hasReplacementAsset(e) {
    var effects = effectsFor(e);
    return !!(e.replacementAsset || (effects && effects.replacementAsset));
}

function assetFor(e) {
    var effects = effectsFor(e);
    if (effects && effects.replacementAsset) {
        return effects.replacementAsset;
    }
    if (e.replacementAsset) {
        return e.replacementAsset;
    }
    return e.asset;
}

function applyEffects(element, e) {
    var effects = effectsFor(e);
    if (!effects || hasReplacementAsset(e)) {
        return;
    }
    if (effects.opacity !== undefined && effects.opacity !== null) {
        try {
            element.colorMode = "alpha";
            element.colorAlphaPercent = Number(effects.opacity) * 100;
        } catch (opacityError) {
            warnings.push("Animate could not apply opacity to '" + e.id + "': " + opacityError);
        }
    }
    if (effects.blendMode) {
        try {
            element.blendMode = String(effects.blendMode);
        } catch (blendError) {
            warnings.push("Animate could not apply blend mode to '" + e.id + "': " + blendError);
        }
    }
    if (effects.filter) {
        warnings.push("Filter effect is unsupported by this builder for '" + e.id + "'.");
    }
}

function createShape(e) {
    if (!e.geometry) {
        throw new Error("Shape has no manifest geometry; no placeholder was invented.");
    }
    doc.addNewRectangle({
        left: Number(e.x),
        top: Number(e.y),
        right: Number(e.x) + Number(e.w),
        bottom: Number(e.y) + Number(e.h)
    }, 0);
    if (!doc.selection || doc.selection.length < 1) {
        throw new Error("Animate did not create a rectangle for '" + e.id + "'.");
    }
    var shape = setBounds(doc.selection[0], e, false);
    setInstanceName(shape, e.id);
    warnings.push("Shape '" + e.id + "' is represented by a rectangle placeholder.");
    return shape;
}

function buildElement(e) {
    var asset;
    var itemName;
    var instance;
    var label;
    var selection;
    var symbolName;

    if (e.kind === "image") {
        asset = assetFor(e);
        if (!asset) {
            throw new Error("Image has no asset path.");
        }
        itemName = importAsset(asset);
        ensureLayerFrame(e);
        instance = placeImage(itemName, e);
        setInstanceName(instance, e.id);
        applyEffects(instance, e);
        placedCount++;
        return;
    }
    if (e.kind === "text") {
        ensureLayerFrame(e);
        createText(e, false);
        placedCount++;
        return;
    }
    if (e.kind === "button") {
        asset = assetFor(e);
        if (!asset) {
            throw new Error("Button has no background image.");
        }
        itemName = importAsset(asset);
        ensureLayerFrame(e);
        instance = placeImage(itemName, e);
        selection = [instance];
        if (e.textValue !== null && e.textValue !== undefined) {
            label = createText(e, true);
            selection.push(label);
        }
        doc.selection = selection;
        symbolName = uniqueName(BUILD_DATA.screenId + "_" + e.id + "_symbol", usedLibraryNames);
        doc.convertToSymbol("movie clip", symbolName, "center");
        if (!doc.selection || doc.selection.length < 1) {
            throw new Error("Animate did not create a MovieClip for '" + e.id + "'.");
        }
        instance = setBounds(doc.selection[0], e, false);
        setInstanceName(instance, e.id);
        applyEffects(instance, e);
        placedCount++;
        return;
    }
    if (e.kind === "shape") {
        ensureLayerFrame(e);
        instance = createShape(e);
        applyEffects(instance, e);
        placedCount++;
        return;
    }
    throw new Error("Unsupported element kind '" + e.kind + "'.");
}

function recordSkips() {
    var i;
    var e;
    for (i = 0; i < BUILD_DATA.elements.length; i++) {
        e = BUILD_DATA.elements[i];
        if (isNonVisual(e)) {
            skipped.push({id: e.id, reason: "skipped (code-drawn / non-visual)"});
        } else if (e.skipReason) {
            skipped.push({id: e.id, reason: e.skipReason});
        } else if (!validBounds(e)) {
            skipped.push({id: e.id, reason: "missing or invalid x, y, w, h"});
        }
    }
}

function verifyTextFields() {
    var i;
    var check;
    var actual;
    var width;
    var height;
    for (i = 0; i < textChecks.length; i++) {
        check = textChecks[i];
        try {
            actual = String(check.element.textString);
        } catch (textError) {
            warnings.push("Could not read textString for '" + check.id + "': " + textError);
            actual = check.initial;
        }
        if (actual !== check.intended) {
            warnings.push("Text verification mismatch for '" + check.id + "'.");
        }
        try {
            width = Number(check.element.width);
            height = Number(check.element.height);
            if (width === 0 || height === 0) {
                warnings.push("Text field '" + check.id + "' has zero width or height.");
            }
        } catch (boundsError) {
            warnings.push("Could not verify bounds for text field '" + check.id + "': " + boundsError);
        }
    }
}

function reportResults() {
    var i;
    doc.selectNone();
    verifyTextFields();
    doc.selectNone();
    verifyBeforeAfter();
    log("Source counts: screens=" + BUILD_DATA.screenCount + ", sharedElements=" +
        BUILD_DATA.sharedCount + ", total=" + BUILD_DATA.totalCount);
    log("Elements placed: " + placedCount);
    log("Elements skipped: " + skipped.length);
    for (i = 0; i < skipped.length; i++) {
        log("SKIPPED: " + skipped[i].id + " - " + skipped[i].reason);
    }
    log("Elements failed: " + failures.length);
    for (i = 0; i < failures.length; i++) {
        log("FAILED: " + failures[i].id + " - " + failures[i].error);
    }
    log("Warnings: " + warnings.length);
    for (i = 0; i < warnings.length; i++) {
        log("WARNING: " + warnings[i]);
    }
    log("Pre-existing layer/Library differences: " + differences.length);
    for (i = 0; i < differences.length; i++) {
        log("DIFFERENCE: " + differences[i]);
    }
    if (differences.length > 0) {
        alert("Add-only verification found differences. See the Output panel. The document was not saved or closed.");
    }
    log("Document was not saved or closed.");
}

function build() {
    var elements;
    var i;
    var e;
    var frame;

    doc = fl.getDocumentDOM();
    if (!doc) {
        alert("No Adobe Animate document is open. Open the target document and run this JSFL again.");
        return;
    }
    timeline = doc.getTimeline();
    library = doc.library;
    originalLayers = snapshotLayers();
    originalItems = snapshotLibraryItems();
    frameN = Number(timeline.frameCount);

    if (Number(doc.width) !== Number(BUILD_DATA.stage.w) ||
            Number(doc.height) !== Number(BUILD_DATA.stage.h)) {
        warnings.push("Stage size differs from manifest (" + doc.width + "x" + doc.height +
            " vs " + BUILD_DATA.stage.w + "x" + BUILD_DATA.stage.h + "); it was not changed.");
    }

    recordSkips();
    elements = getVisualElements();

    try {
        addFolders();
        createLayers(elements);
    } catch (layerError) {
        log("LAYER/FOLDER ERROR; element placement stopped: " + layerError);
        alert("Could not create the new screen folder or its layers: " + layerError +
            "\nSee the Output panel. No cleanup was attempted.");
        return;
    }

    for (i = 0; i < elements.length; i++) {
        e = elements[i];
        if (!validBounds(e)) {
            continue;
        }
        try {
            doc.selectNone();
            buildElement(e);
        } catch (elementError) {
            failures.push({id: e.id, error: String(elementError)});
            log("FAILED: " + e.id + " - " + elementError);
        }
    }

    if (firstLayerName) {
        try {
            timeline.currentLayer = findLayerIndex(firstLayerName);
            timeline.currentFrame = frameN;
            frame = timeline.layers[timeline.currentLayer].frames[frameN];
            if (!frame) {
                throw new Error("No new frame at index " + frameN + ".");
            }
            frame.name = BUILD_DATA.screenId;
            frame.labelType = "name";
        } catch (labelError) {
            warnings.push("Could not set frame label '" + BUILD_DATA.screenId + "': " + labelError);
        }
    }
    reportResults();
}

try {
    if (fl.outputPanel && fl.outputPanel.clear) {
        fl.outputPanel.clear();
    }
    build();
} catch (error) {
    log("FATAL ERROR; stopped without cleanup: " + error);
    alert("The " + BUILD_DATA.screenId + " build stopped: " + error +
        "\nSee the Output panel. No cleanup was attempted.");
}
