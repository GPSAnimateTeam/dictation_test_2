// animate-data.js — every text of the activity (ANIMATE_DATA) and every sound (ANIMATE_SOUNDS).
// Both values are valid JSON; activity.js reads all its texts and sounds from here.
var ANIMATE_DATA = {
  "title": "صندوق الأحلام",
  "unitTitle": "دخول حروف (ف – ب – ك – ل) على الكلمة المعرَّفة بـ(ال)",
  "buttons": {
    "start": "ابدأ",
    "next": "التالي",
    "nextLast": "النتيجة",
    "understood": "فهمت",
    "again": "أعد المحاولة",
    "answers": "عرض الإجابات",
    "home": "العودة للبداية",
    "stay": "أكمل النشاط",
    "leave": "اخرج",
    "ok": "تمام"
  },
  "aria": {
    "play": "استمع إلى الجملة",
    "slow": "استمع إلى الكلمة ببطء",
    "info": "تعليمات النشاط",
    "close": "إغلاق النشاط",
    "mute": "كتم الصوت",
    "logo": "الامتحان",
    "option": "الكتابة: {text}",
    "points": "{points} من {max}",
    "unmute": "تشغيل الصوت",
    "next": "السؤال التالي"
  },
  "instructions": {
    "title": "كيف تلعب؟",
    "lines": [
      "اضغط زر التشغيل لتسمع الجملة، والسلحفاة لتسمع الكلمة ببطء.",
      "اختر الورقة المكتوبة كتابة صحيحة؛ لديك محاولتان.",
      "كل إجابة تضع حلمًا جديدًا في الصندوق."
    ]
  },
  "exitConfirm": {
    "title": "هل تريد الخروج؟",
    "text": "ستفقد نجوم هذه المحاولة."
  },
  "scoring": {
    "firstTry": 2,
    "secondTry": 1,
    "missed": 0,
    "maxAttempts": 2,
    "stars": {
      "three": 9,
      "two": 6
    }
  },
  "prefixNames": {
    "ب": "الباء",
    "ك": "الكاف",
    "ف": "الفاء",
    "ل": "اللام"
  },
  "hints": {
    "drop": "اقرأ الكلمة بتأنٍّ: هل ظهرت (الـ) كاملة؟",
    "split": "حرف الجر يتصل بالكلمة التي بعده ولا ينفصل عنها.",
    "lam": "ماذا يحدث لألف (الـ) عندما تدخل عليها اللام؟"
  },
  "sticky": {
    "guide": "استمع جيدًا، ثم اختر الكتابة الصحيحة.",
    "tryAnother": "جرّب ورقة أخرى"
  },
  "feedback": {
    "first": "أحسنت! إجابة صحيحة",
    "second": "أحسنت! في المحاولة الثانية",
    "miss": "الإجابة الصحيحة هنا",
    "ruleKeep": "لم تُحذف ألفُ (الـ) مع {prefixName}.",
    "ruleDrop": "حُذفت ألفُ (الـ) عند دخول اللام.",
    "rememberKeep": "تذكّر: عند دخول {prefixName} على كلمة تبدأ بـ(الـ) لا تُحذف ألفها.",
    "rememberDrop": "تذكّر: عند إضافة (لـ) إلى كلمة تبدأ بـ(الـ) نحذف الألف من (الـ)."
  },
  "result": {
    "stickerText": "صندوق الأحلام",
    "titles": {
      "three": "امتلأ صندوقُ أحلامِك بالنجوم!",
      "two": "امتلأ الصندوق! محاولة أخرى تجمع نجومًا أكثر",
      "one": "امتلأ الصندوق! جرّب من جديد لتجمع نجومًا أكثر"
    },
    "scoreFormat": "{score}<small> من {max}</small>",
    "reminders": {
      "default": "تذكّر: الفاء والباء والكاف لا تحذف ألف (الـ)، واللام تحذفها.",
      "perfect": "رائع! القاعدة واضحة عندك: لا تُحذف ألف (الـ) بعد الفاء والباء والكاف، وتُحذف بعد اللام.",
      "missLam": "راجع: عند دخول اللام على كلمة تبدأ بـ(الـ) نحذف الألف من (الـ).",
      "missKeep": "راجع: الفاء والباء والكاف لا تحذف ألف (الـ)."
    },
    "answersTitle": "إجاباتك"
  },
  "pieces": {
    "plus": "+",
    "kashida": "ـ"
  },
  "sounds": {
    "prompt": "vo_q0_prompt"
  },
  "questions": [
    {
      "id": 1,
      "prefix": "ب",
      "noun": "العلم",
      "word": "بالعلم",
      "keepAlef": true,
      "before": "تتقدَّمُ الدُّوَلُ",
      "after": "",
      "options": [
        {
          "text": "بالعلم",
          "correct": true
        },
        {
          "text": "بعلم",
          "hint": "drop"
        },
        {
          "text": "ب العلم",
          "hint": "split"
        }
      ],
      "sounds": {
        "sentence": "vo_q1_sentence",
        "word": "vo_q1_word",
        "slow": "vo_q1_slow"
      }
    },
    {
      "id": 2,
      "prefix": "ف",
      "noun": "التخطيط",
      "word": "فالتخطيط",
      "keepAlef": true,
      "before": "خطِّطْ جيِّدًا؛",
      "after": "أساسُ النَّجاحِ.",
      "options": [
        {
          "text": "فتخطيط",
          "hint": "drop"
        },
        {
          "text": "فالتخطيط",
          "correct": true
        },
        {
          "text": "ف التخطيط",
          "hint": "split"
        }
      ],
      "sounds": {
        "sentence": "vo_q2_sentence",
        "word": "vo_q2_word",
        "slow": "vo_q2_slow"
      }
    },
    {
      "id": 3,
      "prefix": "ك",
      "noun": "الأسد",
      "word": "كالأسد",
      "keepAlef": true,
      "before": "وقفَ الجُنْديُّ",
      "after": "",
      "options": [
        {
          "text": "كأسد",
          "hint": "drop"
        },
        {
          "text": "ك الأسد",
          "hint": "split"
        },
        {
          "text": "كالأسد",
          "correct": true
        }
      ],
      "sounds": {
        "sentence": "vo_q3_sentence",
        "word": "vo_q3_word",
        "slow": "vo_q3_slow"
      }
    },
    {
      "id": 4,
      "prefix": "ل",
      "noun": "العين",
      "word": "للعين",
      "keepAlef": false,
      "before": "لوَّنتُ اللوحةَ بألوانٍ مريحةٍ",
      "after": "",
      "options": [
        {
          "text": "لالعين",
          "hint": "lam"
        },
        {
          "text": "للعين",
          "correct": true
        },
        {
          "text": "ل العين",
          "hint": "split"
        }
      ],
      "sounds": {
        "sentence": "vo_q4_sentence",
        "word": "vo_q4_word",
        "slow": "vo_q4_slow"
      }
    },
    {
      "id": 5,
      "prefix": "ل",
      "noun": "الحصول",
      "word": "للحصول",
      "keepAlef": false,
      "before": "يجتهدُ التِّلميذُ",
      "after": "على أعلى الدرجاتِ.",
      "options": [
        {
          "text": "ل الحصول",
          "hint": "split"
        },
        {
          "text": "لالحصول",
          "hint": "lam"
        },
        {
          "text": "للحصول",
          "correct": true
        }
      ],
      "sounds": {
        "sentence": "vo_q5_sentence",
        "word": "vo_q5_word",
        "slow": "vo_q5_slow"
      }
    }
  ]
};

var ANIMATE_SOUNDS = [
  {"id": "sfx_box_drop", "src": "sfx/box_drop.mp3"},
  {"id": "sfx_chalk_write", "src": "sfx/chalk_write.mp3"},
  {"id": "sfx_gold_glow", "src": "sfx/gold_glow.mp3"},
  {"id": "sfx_jingle_end", "src": "sfx/jingle_end.mp3"},
  {"id": "sfx_paper_crumple", "src": "sfx/paper_crumple.mp3"},
  {"id": "sfx_paper_fold", "src": "sfx/paper_fold.mp3"},
  {"id": "sfx_paper_slide", "src": "sfx/paper_slide.mp3"},
  {"id": "sfx_paper_tear", "src": "sfx/paper_tear.mp3"},
  {"id": "sfx_paper_whoosh", "src": "sfx/paper_whoosh.mp3"},
  {"id": "sfx_pin_press", "src": "sfx/pin_press.mp3"},
  {"id": "sfx_star_chalk", "src": "sfx/star_chalk.mp3"},
  {"id": "sfx_sticky_place", "src": "sfx/sticky_place.mp3"},
  {"id": "sfx_tape_stick", "src": "sfx/tape_stick.mp3"},
  {"id": "vo_q0_prompt", "src": "vo/q0_prompt.mp3"},
  {"id": "vo_q1_sentence", "src": "vo/q1_sentence.mp3"},
  {"id": "vo_q1_word", "src": "vo/q1_word.mp3"},
  {"id": "vo_q1_slow", "src": "vo/q1_slow.mp3"},
  {"id": "vo_q2_sentence", "src": "vo/q2_sentence.mp3"},
  {"id": "vo_q2_word", "src": "vo/q2_word.mp3"},
  {"id": "vo_q2_slow", "src": "vo/q2_slow.mp3"},
  {"id": "vo_q3_sentence", "src": "vo/q3_sentence.mp3"},
  {"id": "vo_q3_word", "src": "vo/q3_word.mp3"},
  {"id": "vo_q3_slow", "src": "vo/q3_slow.mp3"},
  {"id": "vo_q4_sentence", "src": "vo/q4_sentence.mp3"},
  {"id": "vo_q4_word", "src": "vo/q4_word.mp3"},
  {"id": "vo_q4_slow", "src": "vo/q4_slow.mp3"},
  {"id": "vo_q5_sentence", "src": "vo/q5_sentence.mp3"},
  {"id": "vo_q5_word", "src": "vo/q5_word.mp3"},
  {"id": "vo_q5_slow", "src": "vo/q5_slow.mp3"}
];
