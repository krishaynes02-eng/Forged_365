/* =====================================================
   FORGED365 — PROGRAM DATA + EXERCISE LIBRARY
   (Authoritative, stable exports)
===================================================== */

/* ================= WEEK STRUCTURE ================= */

export const WEEK_SPLIT = [
  'Push',        // Monday
  'Pull',        // Tuesday
  'Lower',       // Wednesday
  'Reset',       // Thursday
  'Full',        // Friday
  'Conditioning',// Saturday
  'Rest'         // Sunday
];

/* ================= WORKOUT PROGRAM ================= */

export const WORKOUTS = {

  Push: {
    foundation: [
      'Incline push-ups — 3×8',
      'Kneeling push-ups — 3×6',
      'Scapular push-ups — 2×10',
      'Shoulder CARs — 2×5/side'
    ]
  },

  Pull: {
    foundation: [
      'Row — 3×8',
      'Dead bug — 3×6/side',
      'Side plank — 2×20s/side',
      'Thoracic rotations — 2×8'
    ]
  },

  Lower: {
    foundation: [
      'Box squat — 4×8',
      'Reverse lunge — 3×6/side',
      'Glute bridge — 3×12',
      'Hip CARs — 2×5/side'
    ]
  },

  Reset: {
    foundation: [
      'Breathing reset — 5 min',
      'Hip flexor stretch — 2×45s/side',
      'Adductor rocks — 2×10',
      'Spinal waves — 2×6'
    ]
  },

  Full: {
    foundation: [
      'Push-ups — 3×10',
      'Rows — 3×10',
      'Bodyweight squats — 3×12',
      'Bear crawl — 3×20 steps'
    ]
  },

  Conditioning: {
    foundation: [
      'Easy walk — 20–30 min',
      'OR light jog — 10–15 min'
    ]
  },

  Rest: {
    foundation: []
  }
};

/* ================= EXERCISE DETAILS ================= */

export const EXERCISE_DETAILS = {

  /* ---------- CORE ---------- */

  'Dead bug': {
    overview:
      'The dead bug is a core stability exercise used to strengthen the abs while protecting the lower back.',
    instructions: [
      'Lie on your back with arms reaching toward the ceiling.',
      'Bend hips and knees to 90 degrees.',
      'Press lower back gently into the floor.',
      'Extend opposite arm and leg slowly.',
      'Return and switch sides.'
    ],
    tips: [
      'Move slowly.',
      'Exhale during extension.',
      'Shorten range if your back arches.'
    ]
  },

  'Side plank': {
    overview:
      'The side plank strengthens the muscles along the side of the torso to stabilize the spine.',
    instructions: [
      'Lie on your side with elbow under shoulder.',
      'Lift hips to create a straight line.',
      'Hold while breathing steadily.'
    ],
    tips: [
      'Do not let hips sag.',
      'Keep neck relaxed.',
      'Bend knees to regress.'
    ]
  },

  /* ---------- PUSH ---------- */

  'Incline push-ups': {
    overview:
      'Incline push-ups build pressing strength with less joint stress.',
    instructions: [
      'Place hands on a bench, box, or wall.',
      'Step feet back into a straight body line.',
      'Lower chest toward hands.',
      'Press back up.'
    ],
    tips: [
      'Elbows about 45 degrees.',
      'Brace lightly.',
      'Control the descent.'
    ]
  },

  'Kneeling push-ups': {
    overview:
      'Kneeling push-ups reinforce good push-up mechanics with reduced load.',
    instructions: [
      'Kneel on the floor with hands under shoulders.',
      'Keep body straight from knees to head.',
      'Lower chest.',
      'Press back up.'
    ],
    tips: [
      'Avoid flared elbows.',
      'Control the tempo.',
      'Breathe steadily.'
    ]
  },

  'Push-ups': {
    overview:
      'Push-ups build upper-body and core strength.',
    instructions: [
      'Start in a plank position.',
      'Lower chest toward the floor.',
      'Press back to full arm extension.'
    ],
    tips: [
      'Keep body straight.',
      'Stop before failure.',
      'Move smoothly.'
    ]
  },

  'Scapular push-ups': {
    overview:
      'Scapular push-ups strengthen the shoulder blades for shoulder health.',
    instructions: [
      'Start in plank with arms straight.',
      'Let chest sink slightly.',
      'Push floor away, spreading shoulder blades.'
    ],
    tips: [
      'Arms stay straight.',
      'Small controlled motion.',
      'No rushing.'
    ]
  },

  'Shoulder CARs': {
    overview:
      'Shoulder CARs maintain shoulder mobility and joint strength.',
    instructions: [
      'Stand tall.',
      'Raise one arm.',
      'Slowly circle it overhead and behind you.'
    ],
    tips: [
      'Slow and controlled.',
      'No momentum.',
      'Pain-free range.'
    ]
  },

  /* ---------- PULL ---------- */

  'Row': {
    overview:
      'Rows strengthen the upper back and support posture.',
    instructions: [
      'Hold a sturdy surface or towel.',
      'Lean back with arms extended.',
      'Pull chest toward hands.',
      'Lower under control.'
    ],
    tips: [
      'Squeeze shoulder blades.',
      'Keep body straight.',
      'Walk feet closer to scale down.'
    ]
  },

  'Thoracic rotations': {
    overview:
      'Thoracic rotations improve upper-back mobility.',
    instructions: [
      'Lie on side or set up on all fours.',
      'Rotate upper back open.',
      'Return under control.'
    ],
    tips: [
      'Move slowly.',
      'Breathe with motion.',
      'Keep hips stable.'
    ]
  },

  /* ---------- LOWER ---------- */

  'Box squat': {
    overview:
      'Box squats teach safe squat mechanics.',
    instructions: [
      'Stand in front of a box or chair.',
      'Sit back under control.',
      'Lightly touch.',
      'Stand through heels.'
    ],
    tips: [
      'Control descent.',
      'Chest tall.',
      'Raise box if needed.'
    ]
  },

  'Glute bridge': {
    overview:
      'Glute bridges strengthen the hips and protect the lower back.',
    instructions: [
      'Lie on back with knees bent.',
      'Press feet into floor.',
      'Lift hips.',
      'Lower slowly.'
    ],
    tips: [
      'Squeeze glutes.',
      'No arching.',
      'Controlled reps.'
    ]
  },

  'Reverse lunge': {
    overview:
      'Reverse lunges build leg strength with less knee stress.',
    instructions: [
      'Stand tall.',
      'Step one foot back.',
      'Lower into a lunge.',
      'Return to standing.'
    ],
    tips: [
      'Upright torso.',
      'Slow movement.',
      'Use support if needed.'
    ]
  },

  'Bear crawl': {
    overview:
      'Bear crawls develop full-body coordination and core strength.',
    instructions: [
      'Start on hands and knees.',
      'Lift knees slightly.',
      'Move opposite hand and foot.'
    ],
    tips: [
      'Move slowly.',
      'Stay low.',
      'Control breathing.'
    ]
  }
};
