# تحليل مشروع Adobe Animate (XFL / CreateJS)

تاريخ الفحص: 18 أغسطس 2026. تم الفحص قراءةً فقط؛ لم يتم تعديل `index.html` أو `index.js`.

## الخلاصة التنفيذية

المجلد `index` هو المصدر القابل لإعادة الفتح في Adobe Animate. الملف `index/index.xfl` صغير جداً (`PROXY-CS5`) ويعمل كمدخل/Proxy، بينما البيانات الفعلية موزعة في `DOMDocument.xml` وملفات `LIBRARY/*.xml` وملفات `bin/*.dat`. عند النشر بصيغة HTML5 Canvas/CreateJS، يقوم Animate بتحويل هذه البيانات إلى `index.js` وملفات الصور داخل `images`، ويستخدم `index.html` كقالب تشغيل.

لا ينبغي تعديل `index.js` أو `index.html` لإضافة عناصر الرسم أو الـMovieClip؛ أي تعديل بصري أو زمني داخل Animate سيُعاد توليده عند Publish وقد يستبدل التعديلات اليدوية. كود التهيئة العام الموجود في `index.html` (تحميل JSON والصوت والاستجابة) جزء من قالب التشغيل الحالي ويجب إبقاؤه منفصلاً عن كود الفيلم.

## خريطة الملفات

| المسار | الدور | ما الذي يظهر بعد النشر؟ |
|---|---|---|
| `index/index.xfl` | Proxy يفتح مستند XFL | لا يُحمّل مباشرة في المتصفح |
| `index/DOMDocument.xml` | خصائص المستند، الـStage، الـTimeline الرئيسي، المراجع للرموز، وFrame Scripts | منطق الـTimeline والـinstances داخل `index.js` |
| `index/LIBRARY/*.xml` | تعريفات الرموز (MovieClips، Shapes، Groups) وتايملاينات الرموز | constructors مثل `lib.squirrel` و`lib.title_animation` داخل `index.js` |
| `index/bin/*.dat` | بيانات Bitmap الثنائية المستوردة | تُضمّن/تُستخدم كصور atlas أو CachedBmp في `images` |
| `index/PublishSettings.xml` | إعدادات JavaScript/HTML وspritesheet وresponsive وpaths | تحدد بنية `index.js` و`images` و`libs` |
| `index/MobileSettings.xml`, `META-INF/metadata.xml` | إعدادات إضافية؛ حالياً فارغة | لا أثر مستقل ظاهر حالياً |
| `index.js` (جذر المشروع) | ناتج Publish المولّد | تعريفات CreateJS، `lib.index`، manifest، Stage وresponsive؛ لا تعدله يدوياً |
| `index.html` (جذر المشروع) | ناتج/قالب التشغيل | يحمّل CreateJS و`index.js`، ينشئ canvas، ويضيف كود التكامل الخارجي |
| `images/` | صور atlases وCachedBmp المصدّرة | تُحمّل بواسطة manifest في `index.js` |
| `libs/1.0.0/createjs.min.js` | runtime الخاص بـCreateJS | dependency وقت التشغيل |
| `sfx/` | أصوات التطبيق | تُسجّل في `index.html` بواسطة `soundsArray` |
| `fonts/` | خطوط Outfit | تُحمّل في `index.html` عبر `FontFace` |
| `scorm-handler.js` | adapter اختياري لإرسال بيانات SCORM/API | مستقل عن XFL |
| `RECOVER_index/` | نسخة Recover مطابقة للمصدر الحالي | نسخة احتياطية مفيدة قبل أي تعديل |

إجمالي `index`: 199 ملفاً تقريباً (194 XML، 3 DAT، cache وXFL)، وحجمه نحو 5.1 MB. مجلد `RECOVER_index` يحمل نفس البنية والأحجام، والملفات الأساسية المفحوصة (`DOMDocument.xml`، الرموز، وإعدادات النشر) متطابقة بالـSHA-256.

## حالة المستند الحالية

- مقاس الـStage: `1800×1200`، 24 FPS، خلفية بيضاء، Adobe Animate 22.0 build 185، XFL version 22.02.
- الـTimeline الرئيسي اسمه `Scene 1` وله 3 إطارات (0، 1، 2) و4 طبقات؛ طبقتان باسم `flash0_ai`، إحداهما مخفية/guide.
- في الإطار 0 يوجد Frame Script يوقف التشغيل ويفعّل اللمس، ويضبط `gameTitle` و`loaded_mc` ويعرّف `startGameF()` للانتقال للإطار التالي.
- في الإطار 1 يوجد `this.stop()`؛ الإطار 2 بلا script.
- الرمزان المسمّيان بوضوح في الـroot هما `squirrel` و`title_animation`. يظهران في `index.js` كـ`this.squirrel` و`this.title_animation`، ولذلك يمكن الوصول إليهما من JavaScript بعد إنشاء `exportRoot`.
- `index.js` يعرّف الجذر `lib.index`، ويضع حالة الـTimeline في ثلاث حالات رئيسية. `exportRoot.gotoAndStop(...)` مستخدم من `index.html` مع label `game_start`؛ يجب التأكد من وجود الـlabel/الامتداد في نسخة Animate التي سيُجرى عليها التعديل.

## كيف يتحول تعديل XFL إلى ملفات التشغيل

1. تعديل خصائص المستند أو طبقات الـScene يغيّر `index/DOMDocument.xml`.
2. تعديل/إنشاء MovieClip يضيف أو يغيّر ملفاً داخل `index/LIBRARY/` ويضيف `<Include>` و`<DOMSymbolInstance>` في `DOMDocument.xml` أو رمزاً آخر.
3. الرسم المتجهي يبقى في XML (Shapes/Paths/Groups). الصور المستوردة تُخزّن في `bin/*.dat` وتُصدّر كـatlas/CachedBmp إلى `images/`.
4. كتابة Action على Frame تُحفظ كـ`<Framescript><script><![CDATA[...]]>` داخل XML؛ عند النشر تتحول إلى `this.frame_N = function(){...}` في `index.js`.
5. Publish يحدّث `index.js`، وملفات `images`، ونسخ/طوابع query string في `index.html`. لذلك أي تغيير يدوي في الناتج قد يضيع في Publish التالي.

## الطريقة الموصى بها لإضافة نشاط تفاعلي

داخل Animate: أنشئ MovieClip باسم واضح (مثلاً `activity_mc`)، وضع حالاته/الأنيميشن في Timeline الداخلي، ثم أعطه Instance Name على الـScene (مثلاً `activity_mc`). أضف أزراراً أو hit areas بأسماء instances ثابتة، واكتب Frame Script في الـScene أو داخل MovieClip. بعد النشر سيظهر عادةً constructor باسم `lib.activity_mc`، وinstance باسم `exportRoot.activity_mc` أو child داخل رمز آخر.

للتفاعل، استخدم أحداث CreateJS مثل `click`, `mousedown`, `pressmove` و`pressup`، وتحكم في التشغيل عبر `activity_mc.gotoAndPlay('state')` أو `gotoAndStop(frame)`. اجعل أسماء الـinstances والـlabels ثابتة، ولا تعتمد على `instance_42` لأنها أسماء توليدية قد تتغير عند إعادة النشر.

إذا كان النشاط يحتاج JSON أو SCORM، اربط ذلك من كود التكامل الخارجي بعد جاهزية `exportRoot`، واستدعِ `sendScormData` فقط عند نقاط النتيجة. لا تضع مسارات `../library/...` داخل ملفات المصدر الرسومية؛ هذه المسارات تخص قالب التشغيل الحالي.

## قائمة الملفات التي يُتوقع أن تتغير

عند تعديل الـXFL عبر Animate، راقب `index/DOMDocument.xml`، ملف/ملفات الرمز الجديدة في `index/LIBRARY/`، و`index/bin/` عند استيراد صور. بعد Publish راقب `index.js` و`images/` و`index.html` (قد يتغير timestamp أو manifest حتى إن كان التغيير بسيطاً). لا تعدّل `index.js` و`index.html` يدوياً قبل أخذ نسخة؛ المصدر الصحيح هو XFL ثم Publish.

## فحص سريع بعد كل تعديل

- افتح `index/index.xfl` في Animate وتأكد من ظهور الـStage والـLibrary.
- تحقق من أن Frame Script لا يشير إلى instance غير موجود وأن labels مكتوبة حرفياً.
- نفّذ Publish HTML5 Canvas، ثم ابحث في `index.js` عن `lib.<اسم_الرمز>` وعن اسم الـinstance.
- افتح `index.html` عبر خادم محلي (وليس `file://` إذا كان هناك fetch/Modules)، واختبر اللمس والصوت وتغيير المقاس.
- قارن `index/` مع `RECOVER_index/` أو احتفظ بنسخة قبل كل تجربة.

