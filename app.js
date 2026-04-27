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

/* ================= TODAY ================= */
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
    row.className = 'exercise-row';

    const label = document.createElement('span');
    label.textContent = ex;

    const check = document.createElement('span');
    check.textContent = '✓';

    row.append(label, check);
    listEl.append(row);

    const d = Object.values(EXERCISE_DETAILS)
      .find(e => ex.toLowerCase().includes(e.overview.split(' ')[1]?.toLowerCase()));

    const details = document.createElement('div');
    details.className = 'exercise-details';

    if (d) {
      details.innerHTML = `
        <strong>Overview</strong>
        <p>${d.overview}</p>
        <strong>Instructions</strong>
        <ol>${d.instructions.map(s => `<li>${s}</li>`).join('')}</ol>
        <strong>Coaching Tips</strong>
        <ul>${d.tips.map(t => `<li>${t}</li>`).join('')}</ul>
      `;
    }

    label.onclick = () => details.classList.toggle('show');
    listEl.append(details);
  });
}

/* ================= EXERCISES LIBRARY ================= */
function renderExerciseLibrary() {
  if (!exerciseLibraryEl) return;

  exerciseLibraryEl.innerHTML = '';

  Object.entries(EXERCISE_DETAILS).forEach(([name, d]) => {
    const row = document.createElement('div');
    row.className = 'exercise-row';

    const label = document.createElement('strong');
    label.textContent = name;
    label.style.cursor = 'pointer';

    const details = document.createElement('div');
    details.className = 'exercise-details';
    details.innerHTML = `
      <p>${d.overview}</p>
      <strong>Instructions</strong>
      <ol>${d.instructions.map(i => `<li>${i}</li>`).join('')}</ol>
      <strong>Coaching Tips</strong>
      <ul>${d.tips.map(t => `<li>${t}</li>`).join('')}</ul>
    `;

    label.onclick = () => details.classList.toggle('show');

    exerciseLibraryEl.append(label, details);
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
