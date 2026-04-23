import { PHASES, WEEK_SPLIT, WORKOUTS, EXERCISE_DETAILS } from './workouts.js';

/* ---------- STATE ---------- */
let currentWeekOffset = 0;
let selectedDayIndex = (new Date().getDay() + 6) % 7;

/* ---------- DOM ---------- */
const intro = document.getElementById('forge-intro');
const enterBtn = document.getElementById('enter-forge-btn');
const titleEl = document.getElementById('today-session-title');
const listEl = document.getElementById('today-session-list');
const streakEl = document.getElementById('streak-summary');
const weeklyEl = document.getElementById('weekly-summary-text');

const prevWeekBtn = document.getElementById('prev-week');
const nextWeekBtn = document.getElementById('next-week');
const weekLabelEl = document.getElementById('week-label');

const dayPickerEl = document.getElementById('day-picker');
const dayButtons = [...dayPickerEl.querySelectorAll('button')];

enterBtn.onclick = () => (intro.style.display = 'none');

/* ---------- STORAGE ---------- */
const getState = () =>
  JSON.parse(localStorage.getItem('forged_state') || '{}');

const setState = (s) =>
  localStorage.setItem('forged_state', JSON.stringify(s));

/* ---------- PROGRAM ---------- */
function getPhase() {
  let acc = 0;
  for (const p of PHASES) {
    acc += p.weeks;
    if (Math.abs(currentWeekOffset) < acc) return p;
  }
  return PHASES.at(-1);
}

function getWorkout() {
  const type = WEEK_SPLIT[selectedDayIndex];
  if (type === 'Rest') return { title: 'Rest Day', exercises: [] };
  const phase = getPhase();
  return {
    title: `${type} — ${phase.name} Phase`,
    exercises: WORKOUTS[type][phase.id]
  };
}

/* ---------- UI ---------- */
function renderWeekLabel() {
  weekLabelEl.textContent =
    currentWeekOffset === 0
      ? 'Current Week'
      : `Week ${currentWeekOffset > 0 ? '+' : ''}${currentWeekOffset}`;
}

function renderDayPicker() {
  const s = getState();
  const wk = `week-${currentWeekOffset}`;

  dayButtons.forEach((b) => {
    const d = Number(b.dataset.day);
    b.classList.toggle('active', d === selectedDayIndex);
    b.classList.toggle('completed', s[`${wk}-day-${d}`]?.done === true);
  });
}

function renderWeekly() {
  const s = getState();
  const wk = `week-${currentWeekOffset}`;
  let done = 0, total = 0;

  WEEK_SPLIT.forEach((t, d) => {
    if (t === 'Rest') return;
    total++;
    if (s[`${wk}-day-${d}`]?.done) done++;
  });

  weeklyEl.textContent = `✅ ${done} of ${total} sessions completed this week`;
}

/* ---------- TODAY ---------- */
function renderToday() {
  const { title, exercises } = getWorkout();
  titleEl.textContent = title;
  listEl.innerHTML = '';

  const s = getState();
  const key = `week-${currentWeekOffset}-day-${selectedDayIndex}`;
  const completed = s[key]?.items || [];

  exercises.forEach((ex, i) => {
    const row = document.createElement('div');
    row.className = 'exercise-row' + (completed.includes(i) ? ' completed' : '');

    const label = document.createElement('span');
    label.textContent = ex;

    const check = document.createElement('span');
    check.textContent = '✓';
    check.style.cursor = 'pointer';

    /* ---------- EXPANSION ---------- */
    const details = document.createElement('div');
    details.className = 'exercise-details';

    const detailKey = Object.keys(EXERCISE_DETAILS)
      .find(k => ex.startsWith(k));

    if (detailKey) {
      const d = EXERCISE_DETAILS[detailKey];
      details.innerHTML = `
        <strong>Intent:</strong> ${d.tempo}
        <ul>${d.cues.map(c => `<li>${c}</li>`).join('')}</ul>
      `;
      label.onclick = () =>
        details.classList.toggle('show');
    }

    /* ---------- COMPLETION ---------- */
    check.onclick = (e) => {
      e.stopPropagation();

      const idx = completed.indexOf(i);
      idx === -1 ? completed.push(i) : completed.splice(idx, 1);

      s[key] = {
        items: completed,
        done: completed.length === exercises.length
      };

      setState(s);
      renderDayPicker();
      renderWeekly();
      renderToday();
    };

    row.append(label, check);
    listEl.append(row);
    if (detailKey) listEl.append(details);
  });
}

/* ---------- EVENTS ---------- */
dayPickerEl.onclick = (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  selectedDayIndex = Number(b.dataset.day);
  renderDayPicker();
  renderToday();
};

prevWeekBtn.onclick = () => {
  currentWeekOffset--;
  selectedDayIndex = 0;
  renderWeekLabel();
  renderDayPicker();
  renderWeekly();
  renderToday();
};

nextWeekBtn.onclick = () => {
  currentWeekOffset++;
  selectedDayIndex = 0;
  renderWeekLabel();
  renderDayPicker();
  renderWeekly();
  renderToday();
};

/* ---------- INIT ---------- */
renderWeekLabel();
renderDayPicker();
renderWeekly();
renderToday();
