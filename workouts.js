/* =====================================================
   FORGED365 — PROGRAM DATA (FOUNDATION)
   Quietly tough. Disciplined. Complete weekly structure.
===================================================== */

export const PHASES = [
  { id: 'foundation', name: 'Foundation', weeks: 4 },
  { id: 'resilience', name: 'Resilience', weeks: 4 },
  { id: 'capacity', name: 'Capacity', weeks: 4 }
];

export const WEEK_SPLIT = [
  'Push',        // Monday
  'Pull',        // Tuesday
  'Lower',       // Wednesday
  'Reset',       // Thursday
  'Full',        // Friday
  'Conditioning',// Saturday
  'Rest'         // Sunday
];

export const WORKOUTS = {

  /* ================= PUSH ================= */
  Push: {
    foundation: [
      'Incline push-ups — 3×8',
      'Kneeling push-ups — 3×6',
      'Scapular push-ups — 2×10',
      'Shoulder CARs — 2×5/side'
    ]
  },

  /* ================= PULL ================= */
  Pull: {
    foundation: [
      'Row — 3×8',
      'Dead bug — 3×6/side',
      'Side plank — 2×20s/side',
      'Thoracic rotations — 2×8'
    ]
  },

  /* ================= LOWER ================= */
  Lower: {
    foundation: [
      'Box squat — 4×8',
      'Reverse lunge — 3×6/side',
      'Glute bridge — 3×12',
      'Hip CARs — 2×5/side'
    ]
  },

  /* ================= RESET (ACTIVE RECOVERY) ================= */
  Reset: {
    foundation: [
      'Breathing reset — 5 min',
      'Hip flexor stretch — 2×45s/side',
      'Adductor rocks — 2×10',
      'Spinal waves — 2×6'
    ]
  },

  /* ================= FULL BODY ================= */
  Full: {
    foundation: [
      'Push-ups — 3×10',
      'Rows — 3×10',
      'Bodyweight squats — 3×12',
      'Bear crawl — 3×20 steps'
    ]
  },

  /* ================= CONDITIONING (OPTIONAL BUT GUIDED) ================= */
  Conditioning: {
    foundation: [
      'Easy walk — 20–30 min',
      'OR light jog — 10–15 min',
      'Optional mobility flow — 10 min'
    ]
  },

  /* ================= REST ================= */
  Rest: {
    foundation: []
  }
};

/* =====================================================
   EXERCISE DETAILS
   (unchanged from your last working version – expansion safe)
===================================================== */

export const EXERCISE_DETAILS = {
  'Dead bug': {
    overview:
      'The dead bug is a core stability exercise used to strengthen the abdominal muscles while protecting the lower back.',
    instructions: [
      'Lie on your back with your arms pointing straight up.',
      'Bend your hips and knees to 90 degrees.',
      'Flatten your lower back gently into the floor.',
      'Extend the opposite arm and leg slowly.',
      'Return to the start and switch sides.'
    ],
    tips: [
      'Exhale as you extend.',
      'Move slowly.',
      'Shorten range if your back arches.'
    ]
  },

  'Row': {
    overview:
      'Rows strengthen the upper back and arms and help improve posture.',
    instructions: [
      'Anchor a towel or hold a sturdy surface.',
      'Lean back with arms straight.',
      'Pull chest toward hands.',
      'Lower under control.'
    ],
    tips: [
      'Squeeze shoulder blades.',
      'Keep body straight.',
      'Walk feet closer to regress.'
    ]
  },

  'Shoulder CARs': {
    overview:
      'Shoulder Controlled Articular Rotations maintain shoulder joint health.',
    instructions: [
      'Stand tall.',
      'Raise one arm.',
      'Move it slowly through a full circle.',
      'Return to start.'
    ],
    tips: [
      'Move slowly.',
      'No momentum.',
      'Pain‑free range only.'
    ]
  },

  'Hip CARs': {
    overview:
      'Hip CARs improve hip mobility and reduce strain on the lower back.',
    instructions: [
      'Stand holding support.',
      'Lift one knee.',
      'Slowly rotate the hip in a circle.'
    ],
    tips: [
      'Move slow.',
      'Keep pelvis steady.',
      'Controlled range only.'
    ]
  }
};
