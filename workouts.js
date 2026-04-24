/* =====================================================
   FORGED365 — PROGRAM CORE
   Quietly tough. Disciplined. Explicit coaching.
   Bodyweight · Mat · Garage-ready · Men 40+
===================================================== */

export const PHASES = [
  {
    id: 'foundation',
    name: 'Foundation',
    weeks: 4,
    intent: 'Restore movement quality, joint comfort, and confidence.'
  },
  {
    id: 'resilience',
    name: 'Resilience',
    weeks: 4,
    intent: 'Build strength and control in deeper, safer ranges.'
  },
  {
    id: 'capacity',
    name: 'Capacity',
    weeks: 4,
    intent: 'Sustain effort calmly. Work hard without paying for it.'
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
      'Pike hold — 3×20s',
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
      'Side plank — 3×30s/side',
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
      'March or carry — 5 min'
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

/* =====================================================
   EXERCISE DETAILS — STEP BY STEP COACHING
===================================================== */

export const EXERCISE_DETAILS = {
  'Row': {
    how:
      'Anchor a towel around a sturdy object or use the edge of a table. ' +
      'Hold on, walk your feet forward, and lean back so your body is straight.',
    why:
      'This strengthens your upper back and helps improve posture, which takes strain off your neck and lower back.',
    cues: [
      'Pull your chest toward your hands',
      'Squeeze shoulder blades together',
      'Move slow, lower with control'
    ]
  },

  'Dead bug': {
    how:
      'Lie on your back with arms straight up and knees bent at 90 degrees. ' +
      'Slowly extend one arm and the opposite leg while keeping your lower back flat.',
    why:
      'Builds core strength without stressing your spine. Excellent for protecting the lower back.',
    cues: [
      'Keep your ribs down',
      'Move slow and controlled',
      'Stop if your back arches'
    ]
  },

  'Shoulder CARs': {
    how:
      'Stand tall. Raise one arm and slowly draw the biggest circle you can with it. ' +
      'Your torso stays still the entire time.',
    why:
      'Restores shoulder mobility and keeps joints healthy as you age.',
    cues: [
      'Slow, smooth movement',
      'No momentum',
      'Only move what you can control'
    ]
  },

  'Hip CARs': {
    how:
      'Stand holding support. Lift one knee and slowly rotate your hip in a full circle.',
    why:
      'Improves hip range and reduces pressure on the lower back.',
    cues: [
      'Move slowly',
      'Keep pelvis steady',
      'Pain-free range only'
    ]
  },

  'Box squat': {
    how:
      'Stand in front of a chair or box. Sit back onto it under control, then stand up.',
    why:
      'Builds leg strength while teaching safe squat mechanics.',
    cues: [
      'Push through heels',
      'Stay tall',
      'Control the descent'
    ]
  },

  'Push-ups': {
    how:
      'Start in a plank with hands under shoulders. Lower chest to the floor, then press up.',
    why:
      'Builds upper-body strength and core stability.',
    cues: [
      'Keep body straight',
      'Elbows at 45 degrees',
      'Leave reps in reserve'
    ]
  },

  'Incline push-ups': {
    how:
      'Place hands on a bench or wall. Keep body straight as you lower and press up.',
    why:
      'Joint-friendly way to build pressing strength.',
    cues: [
      'Smooth tempo',
      'Controlled range',
      'Breathe steadily'
    ]
  },

  'Cossack squat': {
    how:
      'Stand wide. Shift weight to one side, bending that knee while the other leg stays straight.',
    why:
      'Strengthens groin and hips, improving flexibility safely.',
    cues: [
      'Only go as low as control allows',
      'Move slowly',
      'Use hands for balance if needed'
    ]
  }
};
``
