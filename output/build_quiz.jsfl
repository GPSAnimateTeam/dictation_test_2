var BUILD_DATA = {"screenId":"quiz","stage":{"w":1800,"h":1200},"direction":"rtl","screenCount":84,"sharedCount":6,"totalCount":90,"elements":[{"id":"quiz_background","kind":"image","domId":"#actBg","x":0,"y":0,"w":1800,"h":1200,"zIndex":0,"asset":"images/bg_plate.jpg","textKey":null,"font":null,"states":["default"],"reveal":"none","notes":"Camera zoom 1/origin 0; image scale 2/3.","source":"screen","textValue":null},{"id":"quiz_box_angled","kind":"image","domId":"#actBoxView2 img","x":145.7386,"y":695,"w":458.5227,"h":269,"zIndex":8,"asset":"images/shared_box_angled.png","textKey":null,"font":null,"states":["default"],"reveal":"none","notes":"","source":"screen","textValue":null},{"id":"quiz_box_glass_shine","kind":"image","domId":"#actBoxShine2","x":145.7386,"y":695,"w":458.5227,"h":269,"zIndex":8,"asset":"images/shared_glass_shine.png","textKey":null,"font":null,"states":["default"],"reveal":"none","notes":"","source":"screen","textValue":null},{"id":"quiz_box_front","kind":"image","domId":"#actBoxView1 img","x":155.109,"y":695,"w":439.782,"h":269,"zIndex":8,"asset":"images/shared_box_front.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Cross-fades during screen transition; opacity 0 at quiz rest.","source":"screen","textValue":null,"skipReason":"Alternate box view; opacity is zero at quiz rest."},{"id":"quiz_kite_trail","kind":"canvas","domId":"#actKiteCanvas","x":0,"y":0,"w":1800,"h":1200,"zIndex":9,"asset":"images/shared_chalk_strong.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Canvas trail is a sampled spline.","source":"screen","textValue":null,"skipReason":"skipped (code-drawn / non-visual)"},{"id":"quiz_kite","kind":"image","domId":"#actKite img","x":1349,"y":229.2941,"w":40,"h":29.4118,"zIndex":15,"asset":"images/shared_kite.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Center hovers at first progress star (1369,244).","source":"screen","textValue":null},{"id":"quiz_star_1_off","kind":"image","domId":"#actStar0 .act-ps-off","x":1272,"y":206.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_off.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Star state off; center (1308,240).","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_1_current."},{"id":"quiz_star_1_current","kind":"image","domId":"#actStar0 .act-ps-current","x":1272,"y":206.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_current.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Star state current; center (1308,240).","source":"screen","textValue":null},{"id":"quiz_star_1_gold","kind":"image","domId":"#actStar0 .act-ps-gold","x":1272,"y":206.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_gold.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Star state gold; center (1308,240).","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_1_current."},{"id":"quiz_star_1_grey","kind":"image","domId":"#actStar0 .act-ps-grey","x":1272,"y":206.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_grey.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Star state grey; center (1308,240).","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_1_current."},{"id":"quiz_star_1_glow","kind":"image","domId":"#actStar0 .act-pglow","x":1242,"y":174,"w":132,"h":132,"zIndex":13,"asset":"images/shared_star_glow.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_1_current."},{"id":"quiz_star_2_off","kind":"image","domId":"#actStar1 .act-ps-off","x":1148,"y":192.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_off.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Star state off; center (1184,226).","source":"screen","textValue":null},{"id":"quiz_star_2_current","kind":"image","domId":"#actStar1 .act-ps-current","x":1148,"y":192.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_current.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Star state current; center (1184,226).","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_2_off."},{"id":"quiz_star_2_gold","kind":"image","domId":"#actStar1 .act-ps-gold","x":1148,"y":192.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_gold.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Star state gold; center (1184,226).","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_2_off."},{"id":"quiz_star_2_grey","kind":"image","domId":"#actStar1 .act-ps-grey","x":1148,"y":192.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_grey.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Star state grey; center (1184,226).","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_2_off."},{"id":"quiz_star_2_glow","kind":"image","domId":"#actStar1 .act-pglow","x":1118,"y":160,"w":132,"h":132,"zIndex":13,"asset":"images/shared_star_glow.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_2_off."},{"id":"quiz_star_3_off","kind":"image","domId":"#actStar2 .act-ps-off","x":1024,"y":212.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_off.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Star state off; center (1060,246).","source":"screen","textValue":null},{"id":"quiz_star_3_current","kind":"image","domId":"#actStar2 .act-ps-current","x":1024,"y":212.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_current.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Star state current; center (1060,246).","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_3_off."},{"id":"quiz_star_3_gold","kind":"image","domId":"#actStar2 .act-ps-gold","x":1024,"y":212.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_gold.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Star state gold; center (1060,246).","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_3_off."},{"id":"quiz_star_3_grey","kind":"image","domId":"#actStar2 .act-ps-grey","x":1024,"y":212.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_grey.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Star state grey; center (1060,246).","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_3_off."},{"id":"quiz_star_3_glow","kind":"image","domId":"#actStar2 .act-pglow","x":994,"y":180,"w":132,"h":132,"zIndex":13,"asset":"images/shared_star_glow.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_3_off."},{"id":"quiz_star_4_off","kind":"image","domId":"#actStar3 .act-ps-off","x":901,"y":192.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_off.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Star state off; center (937,226).","source":"screen","textValue":null},{"id":"quiz_star_4_current","kind":"image","domId":"#actStar3 .act-ps-current","x":901,"y":192.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_current.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Star state current; center (937,226).","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_4_off."},{"id":"quiz_star_4_gold","kind":"image","domId":"#actStar3 .act-ps-gold","x":901,"y":192.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_gold.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Star state gold; center (937,226).","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_4_off."},{"id":"quiz_star_4_grey","kind":"image","domId":"#actStar3 .act-ps-grey","x":901,"y":192.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_grey.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Star state grey; center (937,226).","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_4_off."},{"id":"quiz_star_4_glow","kind":"image","domId":"#actStar3 .act-pglow","x":871,"y":160,"w":132,"h":132,"zIndex":13,"asset":"images/shared_star_glow.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_4_off."},{"id":"quiz_star_5_off","kind":"image","domId":"#actStar4 .act-ps-off","x":777,"y":215.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_off.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Star state off; center (813,249).","source":"screen","textValue":null},{"id":"quiz_star_5_current","kind":"image","domId":"#actStar4 .act-ps-current","x":777,"y":215.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_current.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Star state current; center (813,249).","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_5_off."},{"id":"quiz_star_5_gold","kind":"image","domId":"#actStar4 .act-ps-gold","x":777,"y":215.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_gold.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Star state gold; center (813,249).","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_5_off."},{"id":"quiz_star_5_grey","kind":"image","domId":"#actStar4 .act-ps-grey","x":777,"y":215.3551,"w":72,"h":67.2897,"zIndex":13,"asset":"images/shared_star_grey.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Star state grey; center (813,249).","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_5_off."},{"id":"quiz_star_5_glow","kind":"image","domId":"#actStar4 .act-pglow","x":747,"y":183,"w":132,"h":132,"zIndex":13,"asset":"images/shared_star_glow.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"","source":"screen","textValue":null,"skipReason":"Alternate progress-star state; quiz rest uses quiz_star_5_off."},{"id":"quiz_sticky_cream","kind":"image","domId":"#actSticky .act-st-cream","x":340,"y":238,"w":290,"h":302,"zIndex":7,"asset":"images/quiz_hint_cream.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"","source":"screen","textValue":null},{"id":"quiz_sticky_pink","kind":"image","domId":"#actSticky .act-st-pink","x":340,"y":238,"w":290,"h":302,"zIndex":7,"asset":"images/quiz_hint_pink.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"","source":"screen","textValue":null,"skipReason":"Alternate color view of quiz_sticky_cream."},{"id":"quiz_sticky_mint","kind":"image","domId":"#actSticky .act-st-mint","x":340,"y":238,"w":290,"h":302,"zIndex":7,"asset":"images/quiz_hint_mint.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"","source":"screen","textValue":null,"skipReason":"Alternate color view of quiz_sticky_cream."},{"id":"quiz_sticky_tape","kind":"image","domId":"#actStickyTape","x":420.5,"y":216,"w":129,"h":46,"zIndex":7,"asset":"images/quiz_hint_tape.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"","source":"screen","textValue":null},{"id":"quiz_sticky_text","kind":"text","domId":"#actStickyText","x":370,"y":288,"w":230,"h":210,"zIndex":7,"asset":null,"textKey":"feedback.sticky.guide","font":{"family":"ActReadex","size":30,"weight":430,"color":"#3F2E1E","align":"right"},"states":["default"],"reveal":"animation","notes":"Dynamic guide/hint/feedback; font fitted from 30 down to 20px.","source":"screen","textValue":"\u0627\u0633\u062a\u0645\u0639 \u062c\u064a\u062f\u064b\u0627\u060c \u062b\u0645 \u0627\u062e\u062a\u0631 \u0627\u0644\u0643\u062a\u0627\u0628\u0629 \u0627\u0644\u0635\u062d\u064a\u062d\u0629."},{"id":"quiz_sentence","kind":"text","domId":"#actStem","x":650,"y":292,"w":820,"h":130,"zIndex":5,"asset":"images/shared_chalk_white.png","textKey":"questions.0.stem","font":{"family":"ActReadex","size":58,"weight":400,"color":"#F5F2E8","align":"center"},"states":["default"],"reveal":"animation","notes":"Question host; actual font 30\u201358px is measured in browser.","source":"screen","textValue":{"before":"\u062a\u062a\u0642\u062f\u064e\u0651\u0645\u064f \u0627\u0644\u062f\u064f\u0651\u0648\u064e\u0644\u064f","after":""}},{"id":"quiz_chalk_piece","kind":"image","domId":"#actChalkPiece","x":0,"y":0,"w":121,"h":65,"zIndex":9,"asset":"images/quiz_chalk_piece.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Starts at 0,0 then travels over measured sentence; hides afterward.","source":"screen","textValue":null,"skipReason":"Transient chalk animation; hidden at rest."},{"id":"quiz_play_button","kind":"button","domId":"#actBtnPlay","x":1548,"y":297,"w":110,"h":110,"zIndex":6,"asset":"images/quiz_btn_play.png","textKey":"ui.aria.play","font":{"family":"ActReadex","size":20,"weight":400,"color":"#4B3322","align":"right"},"states":["default"],"reveal":"animation","notes":"","source":"screen","textValue":"\u0627\u0633\u062a\u0645\u0639 \u0625\u0644\u0649 \u0627\u0644\u062c\u0645\u0644\u0629"},{"id":"quiz_slow_button","kind":"button","domId":"#actBtnSlow","x":1514,"y":356,"w":62,"h":62,"zIndex":7,"asset":"images/quiz_btn_slow.png","textKey":"ui.aria.slow","font":{"family":"ActReadex","size":20,"weight":400,"color":"#4B3322","align":"right"},"states":["default"],"reveal":"animation","notes":"","source":"screen","textValue":"\u0627\u0633\u062a\u0645\u0639 \u0625\u0644\u0649 \u0627\u0644\u0643\u0644\u0645\u0629 \u0628\u0628\u0637\u0621"},{"id":"quiz_answer_paper_1","kind":"button","domId":"#actPapers .act-paper","x":546.5,"y":548,"w":315,"h":139,"zIndex":5,"asset":"images/quiz_paper_yellow.png","textKey":"questions.0.options.0.text","font":{"family":"ActReadex","size":56,"weight":500,"color":"#2A2A3C","align":"center"},"states":["default"],"reveal":"animation","notes":"Three repeated papers; text font auto-fits 28\u201356px.","source":"screen","textValue":"\u0628\u0627\u0644\u0639\u0644\u0645"},{"id":"quiz_answer_paper_2","kind":"button","domId":"#actPapers .act-paper","x":902.5,"y":548,"w":315,"h":139,"zIndex":5,"asset":"images/quiz_paper_yellow.png","textKey":"questions.0.options.1.text","font":{"family":"ActReadex","size":56,"weight":500,"color":"#2A2A3C","align":"center"},"states":["default"],"reveal":"animation","notes":"Three repeated papers; text font auto-fits 28\u201356px.","source":"screen","textValue":"\u0628\u0639\u0644\u0645"},{"id":"quiz_answer_paper_3","kind":"button","domId":"#actPapers .act-paper","x":1258.5,"y":548,"w":315,"h":139,"zIndex":5,"asset":"images/quiz_paper_yellow.png","textKey":"questions.0.options.2.text","font":{"family":"ActReadex","size":56,"weight":500,"color":"#2A2A3C","align":"center"},"states":["default"],"reveal":"animation","notes":"Three repeated papers; text font auto-fits 28\u201356px.","source":"screen","textValue":"\u0628 \u0627\u0644\u0639\u0644\u0645"},{"id":"quiz_rule_noun_piece","kind":"image","domId":"#actEq .act-piece-noun","x":664.55,"y":548,"w":357,"h":180,"zIndex":6,"asset":"images/quiz_piece_noun.png","textKey":"questions.0.noun","font":{"family":"ActReadex","size":104,"weight":500,"color":"#2A2A3C","align":"right"},"states":["default"],"reveal":"interaction","notes":"Final joined position; content changes with question.","source":"screen","textValue":"\u0627\u0644\u0639\u0644\u0645"},{"id":"quiz_rule_prefix_piece","kind":"image","domId":"#actEq .act-piece-prefix","x":1152.45,"y":551.9,"w":149,"h":180,"zIndex":6,"asset":"images/quiz_piece_prefix.png","textKey":"questions.0.prefix","font":{"family":"ActReadex","size":112,"weight":600,"color":"#B8321A","align":"right"},"states":["default"],"reveal":"interaction","notes":"Final joined position; source-generated kashida count varies.","source":"screen","textValue":"\u0628"},{"id":"quiz_rule_plus","kind":"text","domId":"#actEq .act-plus","x":1020,"y":586,"w":80,"h":84,"zIndex":6,"asset":"images/shared_chalk_white.png","textKey":"ui.pieces.plus","font":{"family":"ActReadex","size":84,"weight":300,"color":"#F5F2E8","align":"center"},"states":["default"],"reveal":"interaction","notes":"","source":"screen","textValue":"+"},{"id":"quiz_next_calendar","kind":"button","domId":"#actNext .act-next-base","x":815,"y":788,"w":340,"h":204,"zIndex":7,"asset":"images/quiz_next_calendar.png","textKey":"ui.buttons.next","font":{"family":"ActReadex","size":56,"weight":700,"color":"#8A2D10","align":"center"},"states":["default"],"reveal":"interaction","notes":"Disabled until settled; final label uses nextLast.","source":"screen","textValue":"\u0627\u0644\u062a\u0627\u0644\u064a"},{"id":"quiz_next_page","kind":"image","domId":"#actNextPage","x":815,"y":828,"w":340,"h":152,"zIndex":7,"asset":"images/quiz_next_page.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"","source":"screen","textValue":null},{"id":"quiz_next_shade","kind":"shape","domId":"#actNextShade","x":839,"y":828,"w":292,"h":146,"zIndex":7,"asset":null,"textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"CSS gradient shadow.","source":"screen","textValue":null},{"id":"quiz_note_ink","kind":"text","domId":"#actNoteInk","x":598.5,"y":547.5,"w":211,"h":140,"zIndex":21,"asset":null,"textKey":"questions.0.word","font":{"family":"ActReadex","size":46,"weight":500,"color":"#2A2A3C","align":"center"},"states":["default"],"reveal":"interaction","notes":"Position is centered on selected paper; example is option 1.","source":"screen","textValue":"\u0628\u0627\u0644\u0639\u0644\u0645"},{"id":"quiz_note_yellow_open","kind":"image","domId":"#actNoteImg","x":598.5,"y":547.5,"w":211,"h":140,"zIndex":21,"asset":"images/quiz_note_open_yellow.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Selected-paper center example; folds, flies to angled box, then rests inside.","source":"screen","textValue":null,"skipReason":"Transient selected-paper folding/flight state; resting notes use quiz_box_note_*."},{"id":"quiz_note_yellow_half","kind":"image","domId":"#actNoteImg","x":618.0,"y":573.5,"w":172,"h":88,"zIndex":21,"asset":"images/quiz_note_half_yellow.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Selected-paper center example; folds, flies to angled box, then rests inside.","source":"screen","textValue":null,"skipReason":"Transient selected-paper folding/flight state; resting notes use quiz_box_note_*."},{"id":"quiz_note_yellow_fold","kind":"image","domId":"#actNoteImg","x":637.0,"y":562.0,"w":134,"h":111,"zIndex":21,"asset":"images/quiz_note_fold_yellow.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Selected-paper center example; folds, flies to angled box, then rests inside.","source":"screen","textValue":null,"skipReason":"Transient selected-paper folding/flight state; resting notes use quiz_box_note_*."},{"id":"quiz_note_mint_open","kind":"image","domId":"#actNoteImg","x":598.5,"y":547.5,"w":211,"h":140,"zIndex":21,"asset":"images/quiz_note_open_mint.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Selected-paper center example; folds, flies to angled box, then rests inside.","source":"screen","textValue":null,"skipReason":"Transient selected-paper folding/flight state; resting notes use quiz_box_note_*."},{"id":"quiz_note_mint_half","kind":"image","domId":"#actNoteImg","x":618.0,"y":573.5,"w":172,"h":88,"zIndex":21,"asset":"images/quiz_note_half_mint.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Selected-paper center example; folds, flies to angled box, then rests inside.","source":"screen","textValue":null,"skipReason":"Transient selected-paper folding/flight state; resting notes use quiz_box_note_*."},{"id":"quiz_note_mint_fold","kind":"image","domId":"#actNoteImg","x":637.0,"y":562.0,"w":134,"h":111,"zIndex":21,"asset":"images/quiz_note_fold_mint.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Selected-paper center example; folds, flies to angled box, then rests inside.","source":"screen","textValue":null,"skipReason":"Transient selected-paper folding/flight state; resting notes use quiz_box_note_*."},{"id":"quiz_note_grey_open","kind":"image","domId":"#actNoteImg","x":598.5,"y":547.5,"w":211,"h":140,"zIndex":21,"asset":"images/quiz_note_open_grey.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Selected-paper center example; folds, flies to angled box, then rests inside.","source":"screen","textValue":null,"skipReason":"Transient selected-paper folding/flight state; resting notes use quiz_box_note_*."},{"id":"quiz_note_grey_half","kind":"image","domId":"#actNoteImg","x":618.0,"y":573.5,"w":172,"h":88,"zIndex":21,"asset":"images/quiz_note_half_grey.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Selected-paper center example; folds, flies to angled box, then rests inside.","source":"screen","textValue":null,"skipReason":"Transient selected-paper folding/flight state; resting notes use quiz_box_note_*."},{"id":"quiz_note_grey_fold","kind":"image","domId":"#actNoteImg","x":637.0,"y":562.0,"w":134,"h":111,"zIndex":21,"asset":"images/quiz_note_fold_grey.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Selected-paper center example; folds, flies to angled box, then rests inside.","source":"screen","textValue":null,"skipReason":"Transient selected-paper folding/flight state; resting notes use quiz_box_note_*."},{"id":"quiz_box_note_1_yellow","kind":"image","domId":"#actBoxIn2 .act-box-note","x":234.5879,"y":852.3468,"w":106.9642,"h":88.6047,"zIndex":8,"asset":"images/quiz_note_fold_yellow.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Folded-note resting location 1; rotation -7deg from NOTE_REST.","source":"screen","textValue":null},{"id":"quiz_box_note_1_mint","kind":"image","domId":"#actBoxIn2 .act-box-note","x":234.5879,"y":852.3468,"w":106.9642,"h":88.6047,"zIndex":8,"asset":"images/quiz_note_fold_mint.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Folded-note resting location 1; rotation -7deg from NOTE_REST.","source":"screen","textValue":null,"skipReason":"Alternate color view for resting note slot 1."},{"id":"quiz_box_note_1_grey","kind":"image","domId":"#actBoxIn2 .act-box-note","x":234.5879,"y":852.3468,"w":106.9642,"h":88.6047,"zIndex":8,"asset":"images/quiz_note_fold_grey.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Folded-note resting location 1; rotation -7deg from NOTE_REST.","source":"screen","textValue":null,"skipReason":"Alternate color view for resting note slot 1."},{"id":"quiz_box_note_2_yellow","kind":"image","domId":"#actBoxIn2 .act-box-note","x":314.4545,"y":854.4402,"w":106.9642,"h":88.6047,"zIndex":8,"asset":"images/quiz_note_fold_yellow.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Folded-note resting location 2; rotation 5deg from NOTE_REST.","source":"screen","textValue":null},{"id":"quiz_box_note_2_mint","kind":"image","domId":"#actBoxIn2 .act-box-note","x":314.4545,"y":854.4402,"w":106.9642,"h":88.6047,"zIndex":8,"asset":"images/quiz_note_fold_mint.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Folded-note resting location 2; rotation 5deg from NOTE_REST.","source":"screen","textValue":null,"skipReason":"Alternate color view for resting note slot 2."},{"id":"quiz_box_note_2_grey","kind":"image","domId":"#actBoxIn2 .act-box-note","x":314.4545,"y":854.4402,"w":106.9642,"h":88.6047,"zIndex":8,"asset":"images/quiz_note_fold_grey.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Folded-note resting location 2; rotation 5deg from NOTE_REST.","source":"screen","textValue":null,"skipReason":"Alternate color view for resting note slot 2."},{"id":"quiz_box_note_3_yellow","kind":"image","domId":"#actBoxIn2 .act-box-note","x":394.321,"y":851.3001,"w":106.9642,"h":88.6047,"zIndex":8,"asset":"images/quiz_note_fold_yellow.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Folded-note resting location 3; rotation -5deg from NOTE_REST.","source":"screen","textValue":null},{"id":"quiz_box_note_3_mint","kind":"image","domId":"#actBoxIn2 .act-box-note","x":394.321,"y":851.3001,"w":106.9642,"h":88.6047,"zIndex":8,"asset":"images/quiz_note_fold_mint.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Folded-note resting location 3; rotation -5deg from NOTE_REST.","source":"screen","textValue":null,"skipReason":"Alternate color view for resting note slot 3."},{"id":"quiz_box_note_3_grey","kind":"image","domId":"#actBoxIn2 .act-box-note","x":394.321,"y":851.3001,"w":106.9642,"h":88.6047,"zIndex":8,"asset":"images/quiz_note_fold_grey.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Folded-note resting location 3; rotation -5deg from NOTE_REST.","source":"screen","textValue":null,"skipReason":"Alternate color view for resting note slot 3."},{"id":"quiz_box_note_4_yellow","kind":"image","domId":"#actBoxIn2 .act-box-note","x":269.5295,"y":810.4781,"w":106.9642,"h":88.6047,"zIndex":8,"asset":"images/quiz_note_fold_yellow.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Folded-note resting location 4; rotation 9deg from NOTE_REST.","source":"screen","textValue":null},{"id":"quiz_box_note_4_mint","kind":"image","domId":"#actBoxIn2 .act-box-note","x":269.5295,"y":810.4781,"w":106.9642,"h":88.6047,"zIndex":8,"asset":"images/quiz_note_fold_mint.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Folded-note resting location 4; rotation 9deg from NOTE_REST.","source":"screen","textValue":null,"skipReason":"Alternate color view for resting note slot 4."},{"id":"quiz_box_note_4_grey","kind":"image","domId":"#actBoxIn2 .act-box-note","x":269.5295,"y":810.4781,"w":106.9642,"h":88.6047,"zIndex":8,"asset":"images/quiz_note_fold_grey.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Folded-note resting location 4; rotation 9deg from NOTE_REST.","source":"screen","textValue":null,"skipReason":"Alternate color view for resting note slot 4."},{"id":"quiz_box_note_5_yellow","kind":"image","domId":"#actBoxIn2 .act-box-note","x":349.3961,"y":814.6649,"w":106.9642,"h":88.6047,"zIndex":8,"asset":"images/quiz_note_fold_yellow.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Folded-note resting location 5; rotation -8deg from NOTE_REST.","source":"screen","textValue":null},{"id":"quiz_box_note_5_mint","kind":"image","domId":"#actBoxIn2 .act-box-note","x":349.3961,"y":814.6649,"w":106.9642,"h":88.6047,"zIndex":8,"asset":"images/quiz_note_fold_mint.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Folded-note resting location 5; rotation -8deg from NOTE_REST.","source":"screen","textValue":null,"skipReason":"Alternate color view for resting note slot 5."},{"id":"quiz_box_note_5_grey","kind":"image","domId":"#actBoxIn2 .act-box-note","x":349.3961,"y":814.6649,"w":106.9642,"h":88.6047,"zIndex":8,"asset":"images/quiz_note_fold_grey.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Folded-note resting location 5; rotation -8deg from NOTE_REST.","source":"screen","textValue":null,"skipReason":"Alternate color view for resting note slot 5."},{"id":"quiz_crumple_half","kind":"image","domId":"#actPapers .act-pi","x":1184.5,"y":709,"w":211,"h":153,"zIndex":9,"asset":"images/quiz_crumple_half.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Wrong-answer state; event-selected paper lands at trayY 856 and landX.","source":"screen","textValue":null,"skipReason":"Alternate wrong-answer crumple state; transient interaction effect."},{"id":"quiz_crumple_ball","kind":"image","domId":"#actPapers .act-pi","x":1239.5,"y":753,"w":101,"h":109,"zIndex":9,"asset":"images/quiz_crumple_ball.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Wrong-answer state; event-selected paper lands at trayY 856 and landX.","source":"screen","textValue":null,"skipReason":"Alternate wrong-answer crumple state; transient interaction effect."},{"id":"quiz_correct_glow","kind":"image","domId":"#actPapers .act-glow","x":1053.75,"y":485.45,"w":472.5,"h":264.1,"zIndex":4,"asset":"images/quiz_glow.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Glow follows reflowed correct paper; example uses rightmost answer paper.","source":"screen","textValue":null,"skipReason":"Transient answer feedback glow; not visible at quiz rest."},{"id":"quiz_dust_fx_1","kind":"image","domId":"#actFx .act-fx-img","x":1177.5,"y":747.0,"w":225,"h":206,"zIndex":25,"asset":"images/shared_fx_dust1.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Random effect variant at paper crumple point.","source":"screen","textValue":null},{"id":"quiz_dust_fx_2","kind":"image","domId":"#actFx .act-fx-img","x":1177.5,"y":788.0,"w":225,"h":124,"zIndex":25,"asset":"images/shared_fx_dust2.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Random effect variant at paper crumple point.","source":"screen","textValue":null,"skipReason":"Alternate random dust-effect variant."},{"id":"quiz_dust_fx_3","kind":"image","domId":"#actFx .act-fx-img","x":1177.5,"y":734.0,"w":225,"h":232,"zIndex":25,"asset":"images/shared_fx_dust3.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Random effect variant at paper crumple point.","source":"screen","textValue":null,"skipReason":"Alternate random dust-effect variant."},{"id":"quiz_spark_fx_1","kind":"image","domId":"#actFx .act-fx-img","x":1030.0,"y":576.2338,"w":130,"h":123.5323,"zIndex":25,"asset":"images/shared_fx_spark1.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Random sparkle at joined-piece point (example).","source":"screen","textValue":null,"skipReason":"Transient random sparkle effect; not a resting-state element."},{"id":"quiz_spark_fx_2","kind":"image","domId":"#actFx .act-fx-img","x":1030.0,"y":577.8872,"w":130,"h":120.2256,"zIndex":25,"asset":"images/shared_fx_spark2.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Random sparkle at joined-piece point (example).","source":"screen","textValue":null,"skipReason":"Transient random sparkle effect; not a resting-state element."},{"id":"quiz_spark_fx_3","kind":"image","domId":"#actFx .act-fx-img","x":1030.0,"y":573.8333,"w":130,"h":128.3333,"zIndex":25,"asset":"images/shared_fx_spark3.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Random sparkle at joined-piece point (example).","source":"screen","textValue":null,"skipReason":"Transient random sparkle effect; not a resting-state element."},{"id":"quiz_spark_fx_4","kind":"image","domId":"#actFx .act-fx-img","x":1030.0,"y":579.5344,"w":130,"h":116.9312,"zIndex":25,"asset":"images/shared_fx_spark4.png","textKey":null,"font":null,"states":["default"],"reveal":"animation","notes":"Random sparkle at joined-piece point (example).","source":"screen","textValue":null,"skipReason":"Transient random sparkle effect; not a resting-state element."},{"id":"shared_logo","kind":"image","domId":"#actLogo","x":120,"y":190,"w":242,"h":62,"zIndex":30,"asset":"images/ui_logo.png","textKey":null,"font":null,"states":["default"],"reveal":"none","notes":"Persistent logo; accessible alt text is ui.aria.logo.","source":"shared","textValue":null},{"id":"shared_close_button","kind":"button","domId":"#actBtnClose","x":1610,"y":190,"w":60,"h":60,"zIndex":30,"asset":"images/ui_btn_close.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Quiz-only via .act-quiz-only; opens exit confirmation.","source":"shared","textValue":null},{"id":"shared_info_button","kind":"button","domId":"#actBtnInfo","x":1538,"y":190,"w":60,"h":60,"zIndex":30,"asset":"images/ui_btn_info.png","textKey":null,"font":null,"states":["default"],"reveal":"interaction","notes":"Quiz-only via .act-quiz-only; opens instructions.","source":"shared","textValue":null},{"id":"shared_mute_on","kind":"button","domId":"#actBtnMute .act-mute-on","x":1466,"y":190,"w":60,"h":60,"zIndex":30,"asset":"images/ui_btn_mute.png","textKey":null,"font":null,"states":["default"],"reveal":"none","notes":"Hidden in intro; state swaps when muted.","source":"shared","textValue":null},{"id":"shared_mute_off","kind":"button","domId":"#actBtnMute .act-mute-off","x":1466,"y":190,"w":60,"h":60,"zIndex":30,"asset":"images/ui_btn_mute_off.png","textKey":null,"font":null,"states":["default"],"reveal":"none","notes":"Opacity 0 until muted.","source":"shared","textValue":null,"skipReason":"Alternate mute-button state; manifest says opacity is zero until muted."},{"id":"shared_light_rays","kind":"image","domId":"#actRays","x":0,"y":0,"w":1800,"h":1200,"zIndex":1,"asset":"images/bg_light_rays.png","textKey":null,"font":null,"states":["default"],"reveal":"none","notes":"Opacity .4 and CSS drift \u00b120px every 14s.","source":"shared","textValue":null}]};

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
        throw new Error("Resolved text value for '" + e.textKey + "' is not a scalar string; no text was invented.");
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
