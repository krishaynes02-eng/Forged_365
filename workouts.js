/* =====================================================
   FORGED365 — PROGRAM CORE
   Quietly tough. Disciplined. Built to last.
   Bodyweight · Minimal space · Explicit coaching
===================================================== */

export const PHASES = [
  {
    id: 'foundation',
    name: 'Foundation',
    weeks: 4,
    intent: 'Rebuild movement quality, joint comfort, and confidence.'
  },
  {
    id: 'resilience',
    name: 'Resilience',
    weeks: 4,
    intent: 'Increase control in deeper ranges without joint stress.'
  },
  {
    id: 'capacity',
    name: 'Capacity',
    weeks: 4,
    intent: 'Sustain effort calmly. Work harder without paying for it.'
  }
];

export const WEEK_SPLIT = [
  'Push',
  'Pull',
  'Lower',
  'Reset',
  'Full',
  'Conditioning',
  'Rest'
];

export const WORKOUTS = {
  Push: {
    foundation: [
      'Incline push-ups — 3×8 (slow)',
      'Kneeling push-ups — 3×6',
      'Scapular push-ups — 2×10',
      'Shoulder CARs — 2×5/side'
    ],
    resilience: [
      'Push-ups — 4×8 (3–1–1)',
      'Pike holds — 3×20s',
      'Scapular push-ups — 3×12',
      'Shoulder CARs — 2×6/side'
    ],
    capacity: [
      'Push-ups — 5×10',
      'Pike push-ups — 3×6',
      'Shoulder taps — 3×20',
      'Shoulder CARs — 2×8/side'
    ]
  },

  Pull: {
    foundation: [
      'Row (table or towel) — 3×8',
      'Dead bug — 3×6/side',
      'Side plank — 2×20s/side',
      'Thoracic rotations — 2×8'
    ],
    resilience: [
      'Row — 4×10',
      'Dead bug — 4×8/side',
      'Side plank — 3×30s',
      'Thoracic rotations — 2×10'
    ],
    capacity: [
      'Row — 5×12',
      'Hollow hold — 3×30s',
      'Side plank reach-through — 3×10',
      'Thoracic rotations — 2×12'
    ]
  },

  Lower: {
    foundation: [
      'Box squat — 4×8',
      'Reverse lunge — 3×6/side',
      'Glute bridge — 3×12',
      'Hip CARs — 2×5/side'
    ],
    resilience: [
      'Split squat — 4×8/side',
      'Lateral lunge — 3×6/side',
      'Single-leg glute bridge — 3×10',
      'Hip CARs — 2×6/side'
    ],
    capacity: [
      'Split squat — 5×10/side',
      'Cossack squat — 3×6/side',
      'Tempo squat — 3×12',
      'Hip CARs — 2×8/side'
    ]
  },

  Reset: {
    foundation: [
      'Breathing reset — 5 min',
      'Hip flexor stretch — 2×45s/side',
      'Adductor rocks — 2×10',
      'Spinal waves — 2×6'
    ],
    resilience: [
      'Breathing reset — 5 min',
      'Hip CARs (slow) — 2×6/side',
      'Cossack stretch — 2×30s',
      'Cat-cow — 2×10'
    ],
    capacity: [
      'Full-body flow — 12–15 min',
      'Deep squat hold — 3×45s',
      'Adductor stretch — 2×45s',
      'Nasal breathing — 5 min'
    ]
  },

  Full: {
    foundation: [
      'Push-ups — 3×10',
      'Rows — 3×10',
      'Squats — 3×12',
      'Carry or march — 5 min'
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

  Conditioning: {
    foundation: [
      'Easy walk — 20–30 min',
      'OR light jog — 10–15 min'
    ],
    resilience: [
      'Walk — 30–40 min',
      'OR jog/walk intervals — 20 min'
    ],
    capacity: [
      'Jog — 20–30 min (conversational)',
      'OR carry — 15 min'
    ]
  }
};

export const EXERCISE_DETAILS = {
  'Dead bug': {
    how: 'Lie on your back with arms reaching straight up and knees bent at 90 degrees.',
    why: 'This builds core control without stressing your lower back.',
    cues: [
      'Slowly extend opposite arm and leg',
      'Keep your lower back gently pressed down',
      'Move with control, not speed'
    ]
  },

  'Shoulder CARs': {
    how: 'Stand tall. Slowly circle one arm through its full range while keeping your body still.',
    why: 'Keeps shoulders healthy and restores lost range over time.',
    cues: [
      'Move slow and smooth',
      'No momentum',
      'Stop short of pain'
    ]
  },

  'Hip CARs': {
    how: 'Stand holding support. Lift one knee and slowly rotate the hip through its full circle.',
    why: 'Directly improves hip mobility and takes pressure off the lower back.',
    cues: [
      'Slow is the goal',
      'Only move the hip',
      'Quality beats range'
    ]
  },

  'Incline push-ups': {
    how: 'Hands elevated on a bench or wall, body straight from head to heels.',
    why: 'Joint‑friendly way to build pressing strength.',
    cues: [
      'Elbows around 45 degrees',
      'Brace lightly',
      'Leave a few reps in reserve'
    ]
  }
};
