/* =============================
   PHASE {   PHASE DEFINITIONS
    foundation: [
      'Push-ups — 3×10',
      'Incline push-ups — 3×8',
      'Shoulder taps — 3×20',
      'Bench dips — 3×8'
    ],
    strength: [
      'Push-ups — 4×15',
      'Decline push-ups — 3×10',
      'Pike push-ups — 3×8',
      'Bench dips — 4×12'
    ],
    hypertrophy: [
      'Tempo push-ups — 4×12 (3–1–1)',
      'Incline push-ups — 4×15',
      'Shoulder taps — 4×30',
      'Bench dips — 4×15'
    ]
  },

  Pull: {
    foundation: [
      'Inverted rows — 3×8',
      'Band pull-aparts — 3×15',
      'Dead hangs — 3×20s'
    ],
    strength: [
      'Inverted rows — 4×12',
      'Negative pull-ups — 4×5',
      'Dead hangs — 3×45s'
    ],
    hypertrophy: [
      'Inverted rows — 4×15',
      'Band pull-aparts — 4×20',
      'Dead hangs — 4×60s'
    ]
  },

  Legs: {
    foundation: [
      'Bodyweight squats — 4×12',
      'Reverse lunges — 3×8/side',
      'Glute bridges — 3×12',
      'Calf raises — 3×20'
    ],
    strength: [
      'Squats — 5×15',
      'Walking lunges — 4×10/side',
      'Single-leg glute bridges — 3×8/side',
      'Calf raises — 4×25'
    ],
    hypertrophy: [
      'Tempo squats — 4×15 (3–1–1)',
      'Reverse lunges — 4×12/side',
      'Glute bridges — 4×20',
      'Calf raises — 5×30'
    ]
  },

  Mobility: {
    foundation: [
      'Hip mobility flow — 10 min',
      'Thoracic rotations — 3×10',
      'Hamstring stretch — 3×30s'
    ],
    strength: [
      'Hip mobility flow — 12 min',
      'Thoracic rotations — 3×12',
      'Ankle mobility — 3×20'
    ],
    hypertrophy: [
      'Full mobility flow — 15 min',
      'Hamstring stretch — 4×30s',
      'Ankle mobility — 4×25'
    ]
  }
};

/* =============================
   EXERCISE DETAIL LIBRARY
============================= */

export const EXERCISE_DETAILS = {
  'Push-ups': {
    tempo: '2–1–1',
    cues: ['Brace core', 'Elbows ~45°', 'Full lockout']
  },
  'Incline push-ups': {
    tempo: '2–1–1',
    cues: ['Straight body line', 'Slow descent']
  },
  'Shoulder taps': {
    tempo: '2–0–2',
    cues: ['Hips stable', 'Controlled movement']
  },
  'Bench dips': {
    tempo: '2–1–1',
    cues: ['Shoulders down/back', 'No shoulder strain']
  },

  'Inverted rows': {
    tempo: '2–1–1',
    cues: ['Chest to bar', 'Squeeze shoulder blades']
  },
  'Band pull-aparts': {
    tempo: '2–1–1',
    cues: ['Arms straight', 'Pinch shoulder blades']
  },
  'Dead hangs': {
    tempo: 'Timed',
    cues: ['Relax grip', 'Breathe', 'No swing']
  }
};
``
============================= */

export const PHASES = [
  {
    id: 'foundation',
    name: 'Foundation',
    weeks: 4,
    description: 'Build movement quality and work capacity.'
  },
  {
    id: 'strength',
    name: 'Strength',
    weeks: 4,
    description: 'Increase intensity and progressions.'
  },
  {
    id: 'hypertrophy',
    name: 'Hypertrophy',
    weeks: 4,
    description: 'Increase volume and time under tension.'
  }
];

/* =============================
   WEEKLY SPLIT
============================= */

export const WEEK_SPLIT = [
  'Push',
  'Pull',
  'Legs',
  'Mobility',
  'Push',
  'Pull',
  'Rest'
];

/* =============================
   YEAR PROGRAM
============================= */

export const WORKOUTS = {
