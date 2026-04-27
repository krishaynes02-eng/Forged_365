import { WORKOUTS, WEEK_SPLIT, EXERCISE_DETAILS } from './workouts.js';

/* ===============================
   SAFE DOM
================================ */
function $(id) {
  return document.getElementById(id);
}

/* ===============================
   STATE
================================ */
let selectedDayIndex = 0;

/* ===============================
   DOM
================================ */
const intro = $('forge-intro');
const enterBtn = $('enter-forge-btn');
const listEl = $('today-session-list');
const titleEl = $('today-session-title');
const weeklyEl = $('weekly-summary-text');
const dayPickerEl = $('day-picker');

const dayButtons = dayPickerEl
  ? [...dayPickerEl.querySelectorAll('button')]
  : [];

/* ===============================
   INTRO
================================ */
if (intro && enterBtn) {
  enterBtn.onclick = () => intro.style.display = 'none';
}

/* ===============================
   STORAGE
================================ */
function getState() {
  try {
    return JSON.parse(localStorage.getItem('forged_state')) || {};
  } catch {
    return {};
  }
}

function setState(state) {
  localStorage.setItem('forged_state', JSON.stringify(state));
}

/* ===============================
   HELPERS
================================ */
function normalize(name) {
  return name
    .toLowerCase()
    .replace(/—.*$/, '')
    .replace(/[^a-z\s]/g, '')
    .trim();
}

function getExerciseDetails(exerciseName) {
  const clean = normalize(exerciseName);

  for (const key in EXERCISE_DETAILS) {
    if (clean.includes(normalize(key))) {
      return EXERCISE_DETAILS[key];
    }
  }

  /* ✅ Fallback coaching — never vague */
  return {
    overview:
      'This is a foundational movement used to build strength, control, and durability.',
    instructions: [
      'Set yourself up in a strong, balanced position.',
      'Move through the range under control.',
      'Return to the start before beginning the next repetition.'
    ],
    tips: [
      'Move slowly and deliberately.',
      'Stay within a range you can control.',
      'Leave a few reps in reserve.'
    ]
  };
}

/* ===============================
   WEEKLY SUMMARY
================================ */
function renderWeekly() {
  if (!weeklyEl) return;

  const state = getState();
  let done = 0, total = 0;

  WEEK_SPLIT.forEach((day, i) => {
    if (day === 'Rest') return;
    total++;
    if (state[`day-${i}`]?.done) done++;
  });

  weeklyEl.textContent =
    `✅ ${done} of ${total} sessions completed this week`;
}

/* ===============================
   DAY PICKER
================================ */
function renderDayPicker() {
  const state = getState();

  dayButtons.forEach(btn => {
    const idx = Number(btn.dataset.day);
    btn.classList.toggle('active', idx === selectedDayIndex);
    btn.classList.toggle('completed', state[`day-${idx}`]?.done);
  });
}

/* ===============================
   TODAY
================================ */
function renderToday() {
  if (!listEl || !titleEl) return;

  const dayType = WEEK_SPLIT[selectedDayIndex];
  titleEl.textContent = `${dayType} — Foundation Phase`;
  listEl.innerHTML = '';

  const exercises = WORKOUTS[dayType]?.foundation || [];

  if (!exercises.length) {
    listEl.innerHTML = '<p>Rest and recover today.</p>';
    return;
  }

  const state = getState();
  const key = `day-${selectedDayIndex}`;
  const completed = state[key]?.items || [];

  exercises.forEach((ex, i) => {
    const row = document.createElement('div');
    row.className =
      'exercise-row' + (completed.includes(i) ? ' completed' : '');

    const label = document.createElement('span');
    label.textContent = ex;
    label.style.cursor = 'pointer';

    const check = document.createElement('span');
    check.textContent = '✓';
    check.style.cursor = 'pointer';

    row.append(label, check);
    listEl.append(row);

    /* ---------- DETAILS ---------- */
    const d = getExerciseDetails(ex);

    const details = document.createElement('div');
    details.className = 'exercise-details';
    details.innerHTML = `
      <strong>Overview</strong>
      <p>${d.overview}</p>

      <strong>Instructions</strong>
      <ol>${d.instructions.map(s => `<li>${s}</li>`).join('')}</ol>

      <strong>Coaching Tips</strong>
      <ul>${d.tips.map(t => `<li>${t}</li>`).join('')}</ul>
    `;

    label.onclick = () => {
      details.classList.toggle('show');
    };

    listEl.append(details);

    /* ---------- COMPLETION ---------- */
    check.onclick = () => {
      const idx = completed.indexOf(i);
      if (idx === -1) completed.push(i);
      else completed.splice(idx, 1);

      state[key] = {
        items: completed,
        done: completed.length === exercises.length
      };

      setState(state);
      renderDayPicker();
      renderWeekly();
      renderToday();
    };
  });
}

/* ===============================
   EVENTS
================================ */
if (dayPickerEl) {
  dayPickerEl.onclick = e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    selectedDayIndex = Number(btn.dataset.day);
    renderDayPicker();
    renderToday();
  };
}

/* ===============================
   INIT
================================ */
renderDayPicker();
renderWeekly();
renderToday();
