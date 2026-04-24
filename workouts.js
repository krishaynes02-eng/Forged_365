/* =====================================================
   FORGED365 — PROGRAM CORE
   Quietly tough. Disciplined. Explicit coaching.
===================================================== */

export const PHASES = [
  { id: 'foundation', name: 'Foundation', weeks: 4 },
  { id: 'resilience', name: 'Resilience', weeks: 4 },
  { id: 'capacity', name: 'Capacity', weeks: 4 }
];

export const WEEK_SPLIT = [
  'Push', 'Pull', 'Lower', 'Reset', 'Full', 'Conditioning', 'Rest'
];

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
  }
};

/* =====================================================
   EXERCISE DETAILS — COACH‑LEVEL INSTRUCTIONS
===================================================== */

export const EXERCISE_DETAILS = {

  'Dead bug': {
    overview:
      'The dead bug is a core stability exercise used to strengthen the abdominal muscles while protecting the lower back.',
    instructions: [
      'Lie on your back with your arms pointing straight up toward the ceiling.',
      'Bend your hips and knees to 90 degrees so your thighs are vertical and shins are parallel to the floor.',
      'Gently flatten your lower back into the floor and keep it there.',
      'Slowly extend one arm overhead and the opposite leg toward the floor.',
      'Return to the starting position and repeat on the opposite side.'
    ],
    tips: [
      'Move slowly and under control.',
      'Exhale as the arm and leg extend.',
      'If your back arches, shorten the range or move only arms or legs.'
    ]
  },

  'Row': {
    overview:
      'The row is a pulling exercise that strengthens the upper back, arms, and muscles responsible for good posture.',
    instructions: [
      'Anchor a towel around a sturdy object or use the edge of a solid table.',
      'Hold the towel or table edge and walk your feet forward.',
      'Lean back until your arms are straight and your body forms a straight line.',
      'Pull your chest toward your hands by bending your elbows.',
      'Lower yourself back to the starting position with control.'
    ],
    tips: [
      'Squeeze your shoulder blades at the top.',
      'Keep your body straight from head to heels.',
      'If it’s too hard, walk your feet closer.'
    ]
  },

  'Shoulder CARs': {
    overview:
      'Shoulder CARs are a joint‑mobility exercise designed to maintain and improve shoulder health.',
    instructions: [
      'Stand tall with feet hip‑width apart.',
      'Raise one arm straight in front of you.',
      'Slowly circle the arm overhead, out to the side, and behind you.',
      'Continue the circle until you return to the starting position.',
      'Repeat on the other side.'
    ],
    tips: [
      'Move as slowly as possible.',
      'Keep the rest of your body completely still.',
      'Only move through pain‑free ranges.'
    ]
  },

  'Box squat': {
    overview:
      'The box squat teaches safe squat mechanics while reducing stress on the knees and lower back.',
    instructions: [
      'Stand in front of a chair or box.',
      'Set your feet about shoulder‑width apart.',
      'Push your hips back and slowly sit down onto the box.',
      'Lightly touch the box without relaxing.',
      'Drive through your heels to stand back up.'
    ],
    tips: [
      'Control the descent.',
      'Keep your chest tall.',
      'Raise the box height if needed.'
    ]
  }
};
