/* =========================================================
   FORGED365 — PROGRAM CORE
   Quietly tough. Disciplined. Built to last.
   Bodyweight only · Mat-friendly · Men 40+
========================================================= */

/* =======================
   PHASES (Intent > Volume)
======================= */

export const PHASES = [
  {
    id: 'foundation',
    name: 'Foundation',
    weeks: 4,
    intent:
      'Restore movement quality, joint capacity, and work tolerance. ' +
      'Build discipline through consistency, not intensity.'
  },
  {
    id: 'resilience',
    name: 'Resilience',
    weeks: 4,
    intent:
      'Increase control in deeper ranges and under fatigue. ' +
      'Strengthen hips, spine, and shoulders so effort feels safer.'
  },
  {
    id: 'capacity',
    name: 'Capacity',
    weeks: 4,
    intent:
      'Sustain effort with calm control. ' +
      'You work harder now—but your joints stay quiet.'
  }
];

/* =======================
   WEEK STRUCTURE
======================= */

export const WEEK_SPLIT = [
  'Push',        // Monday
  'Pull',        // Tuesday
  'Lower',       // Wednesday
  'Reset',       // Thursday (flexible)
  'Full',        // Friday
  'Conditioning',// Saturday (optional)
  'Rest'         // Sunday
];

/* =======================
   PROGRAM PRINCIPLES
======================= */
/*
- No equipment required beyond a mat
- Submaximal sets (leave reps in reserve)
- Tempo > speed
- Mobility integrated, not isolated
- Optional conditioning never affects streaks
*/

/* =======================
   WORKOUTS
======================= */

export const WORKOUTS = {

  /* ---------- PUSH (Shoulders + Pressing) ---------- */
  Push: {
    foundation: [
      'Incline push-ups — 3×8 (slow)',
      'Kneeling push-ups — 3×6',
      'Scapular push-ups — 2×10',
      'Shoulder CARs — 2×5/side'
    ],
    resilience: [
      'Push-ups — 4×8 (3–1–1 tempo)',
      'Pike holds — 3×20s',
      'Scapular push-ups — 3×12',
      'Shoulder CARs — 2×6/side'
    ],
    capacity: [
      'Push-ups — 5×10 (broken sets if needed)',
      'Pike push-ups — 3×6',
      'Shoulder taps — 3×20',
      'Shoulder CARs — 2×8/side'
    ]
  },

  /* ---------- PULL + CORE (Posture, Spine Relief) ---------- */
  Pull: {
    foundation: [
      'Table rows / towel rows — 3×8',
      'Dead bug — 3×6/side (slow)',
      'Side plank — 2×20s/side',
      'Thoracic rotations — 2×8'
    ],
    resilience: [
      'Rows — 4×10',
      'Dead bug — 4×8/side',
      'Side plank — 3×30s/side',
      'Thoracic rotations — 2×10'
    ],
    capacity: [
      'Rows — 5×12',
      'Hollow hold — 3×30s',
      'Side plank reach-through — 3×10',
      'Thoracic rotations — 2×12'
    ]
  },

  /* ---------- LOWER BODY FLOW (Hips, Groin, Glutes) ---------- */
  Lower: {
    foundation: [
      'Box squats — 4×8',
      'Reverse lunges — 3×6/side',
      'Glute bridges — 3×12',
      'Hip CARs — 2×5/side'
    ],
    resilience: [
      'Split squats — 4×8/side',
      'Lateral lunges (short range) — 3×6/side',
      'Single‑leg glute bridges — 3×10',
      'Hip CARs — 2×6/side'
    ],
    capacity: [
      'Split squats — 5×10/side',
      'Cossack squats (controlled) — 3×6/side',
      'Tempo squats (3–1–2) — 3×12',
      'Hip CARs — 2×8/side'
    ]
  },

  /* ---------- RESET / MOBILITY (Flexible Day) ---------- */
  Reset: {
    foundation: [
      'Breathing reset (90/90) — 5 min',
      'Hip flexor stretch — 2×45s/side',
      'Adductor rocks — 2×10',
      'Spinal waves — 2×6'
    ],
    resilience: [
      'Breathing reset — 5 min',
      'Half‑kneeling hip CARs — 2×6/side',
      'Cossack stretch — 2×30s/side',
      'Cat‑cow (slow) — 2×10'
    ],
    capacity: [
      'Flow sequence (hips–spine) — 12–15 min',
      'Deep squat hold — 3×45s',
      'Adductor stretch — 2×45s/side',
      'Long exhale breathing — 5 min'
    ]
  },

  /* ---------- FULL BODY (Quiet Grind) ---------- */
  Full: {
    foundation: [
      'Push-ups — 3×10',
      'Rows — 3×10',
      'Squats — 3×12',
      'Farmer carry (optional) — 5 min'
    ],
    resilience: [
      'Push-ups — 4×10',
      'Rows — 4×10',
      'Split squats — 3×8/side',
      'Bear crawl — 3×20 steps'
    ],
    capacity: [
      'Push-ups — 5×12',
      'Rows — 5×12',
      'Squats — 4×15',
      'Ground crawl — 4×30s'
    ]
  },

  /* ---------- OPTIONAL CONDITIONING ---------- */
  Conditioning: {
    foundation: [
      'Walk — 20–30 min (easy)',
      'OR light jog — 10–15 min'
    ],
    resilience: [
      'Walk — 30–40 min',
      'OR jog/walk intervals — 20 min'
    ],
    capacity: [
      'Jog — 20–30 min (conversational pace)',
      'OR loaded carry — 15 min'
    ]
  }
};

/* =======================
   EXERCISE DETAILS
   (Used in expansion UI)
======================= */

export const EXERCISE_DETAILS = {
  'Push-ups': {
    tempo: 'Controlled, stop shy of failure',
    cues: [
      'Brace lightly before lowering',
      'Elbows about 45°',
      'Move smoothly, no rushing'
    ]
  },
  'Split squats': {
    tempo: 'Slow down, control the bottom',
    cues: [
      'Stay tall through the torso',
      'Feel the front glute engage',
      'Depth over load'
    ]
  },
  'Cossack squats': {
    tempo: 'Deliberate, shallow is fine',
    cues: [
      'Only go as deep as control allows',
      'Use hands for balance if needed',
      'Groin strength comes before range'
    ]
  },
  'Rows': {
    tempo: 'Pause briefly at the top',
    cues: [
      'Chest proud',
      'Squeeze shoulder blades',
      'No jerking'
    ]
  },
  'Breathing reset': {
    tempo: 'Slow, nasal breathing',
    cues: [
      'Long exhales',
      'Ribs down',
      'Let tension drop'
    ]
  }
};
