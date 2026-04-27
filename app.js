import { WORKOUTS, WEEK_SPLIT, EXERCISE_DETAILS } from './workouts.js';

/* ================= SAFE DOM ================= */
function $(id) {
  return document.getElementById(id);
}

/* ================= STATE ================= */
let selectedDayIndex = 0;

/* ================= DOM ================= */
const intro = $('forge-intro');
const enterBtn = $('enter-forge-btn');

const viewToday = $('view-today');
const viewExercises = $('view-exercises');

const listEl = $('today-session-list');
const titleEl = $('today-session-title');
const weeklyEl = $('weekly-summary-text');
const exerciseLibraryEl = $('exercise-library');

const dayPickerEl = $('day-picker');
const dayButtons = dayPickerEl ? [...dayPickerEl.querySelectorAll('button')] : [];
const navTabs = [...document.querySelectorAll('.nav-tab')];

/* ================= INTRO ================= */
if (intro && enterBtn) {
  enterBtn.onclick = () => intro.style.display = 'none';
}

/* ================= STORAGE ================= */
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

/* ================= HELPERS ================= */
function normalize(name) {
  return name
    .toLowerCase()
    .replace(/—.*$/g, '')
    .replace(/[^a-z\s]/g, '')
    .trim();
}

function getExerciseDetails(exerciseName) {
  const cleaned = normalize(exerciseName);

  for (const key in EXERCISE_DETAILS) {
    if (cleaned.includes(normalize(key))) {
      return EXERCISE_DETAILS[key];
    }
  }

  // This should rarely be hit now, but avoids empty expansions
  return {
    overview:
      'This is a foundational movement used to build strength, control, and durability.',
    instructions: [
      'Set up in a stable position.',
      'Move through the motion under control.',
      'Return to the start before the next repetition.'
    ],
    tips: [
      'Move deliberately.',
      'Breathe naturally.',
      'Stop short of fatigue.'
    ]
  };
}

/* ================= TAB SWITCHING ================= */
function switchTab(tab) {
  viewToday.style.display = tab === 'today' ? 'block' : 'none';
  viewExercises.style.display = tab === 'exercises' ? 'block' : 'none';

  navTabs.forEach(b =>
    b.classList.toggle('active', b.dataset.tab === tab)
  );

  if (tab === 'exercises') {
    renderExerciseLibrary();
  }
}

navTabs.forEach(btn => {
  btn.onclick = () => switchTab(btn.dataset.tab);
});

/* ================= TODAY VIEW ================= */
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

    label.onclick = () => details.classList.toggle('show');
    listEl.append(details);

    check.onclick = () => {
      const idx = completed.indexOf(i);
      if (idx === -1) completed.push(i);
      else completed.splice(idx, 1);

      state[key] = {
        items: completed,
        done: completed.length === exercises.length
      };

      setState(state);
      renderToday();
    };
  });
}

/* ================= EXERCISES TAB ================= */
function renderExerciseLibrary() {
  exerciseLibraryEl.innerHTML = '';

  Object.entries(EXERCISE_DETAILS).forEach(([name, d]) => {
    const header = document.createElement('div');
    header.className = 'exercise-row';
    header.textContent = name;
    header.style.cursor = 'pointer';

    const details = document.createElement('div');
    details.className = 'exercise-details';
    details.innerHTML = `
      <strong>Overview</strong>
      <p>${d.overview}</p>

      <strong>Instructions</strong>
      <ol>${d.instructions.map(i => `<li>${i}</li>`).join('')}</ol>

      <strong>Coaching Tips</strong>
      <ul>${d.tips.map(t => `<li>${t}</li>`).join('')}</ul>
    `;

    header.onclick = () => details.classList.toggle('show');

    exerciseLibraryEl.append(header, details);
  });
}

/* ================= DAY PICKER ================= */
if (dayPickerEl) {
  dayPickerEl.onclick = e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    selectedDayIndex = Number(btn.dataset.day);
    renderToday();
  };
}

/* ================= INIT ================= */
renderToday();
