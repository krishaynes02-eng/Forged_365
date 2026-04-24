import { PHASES, WEEK_SPLIT, WORKOUTS, EXERCISE_DETAILS } from './workouts.js';

/* ---------- STATE ---------- */
let currentWeekOffset = 0;
let selectedDayIndex = (new Date().getDay() + 6) % 7;

/* ---------- DOM ---------- */
const intro = document.getElementById('forge-intro');
document.getElementById('enter-forge-btn').onclick =
  () => intro.style.display = 'none';

const titleEl = document.getElementById('today-session-title');
const listEl = document.getElementById('today-session-list');
const weeklyEl = document.getElementById('weekly-summary-text');

const prevWeekBtn = document.getElementById('prev-week');
const nextWeekBtn = document.getElementById('next-week');
const weekLabelEl = document.getElementById('week-label');

const dayPickerEl = document.getElementById('day-picker');
const dayButtons = [...dayPickerEl.querySelectorAll('button')];

/* ---------- STORAGE ---------- */
const getState = () =>
  JSON.parse(localStorage.getItem('forged_state') || '{}');

const setState = s =>
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
  const state = getState();
  const weekKey = `week-${currentWeekOffset}`;

  dayButtons.forEach(btn => {
    const d = Number(btn.dataset.day);
    btn.classList.toggle('active', d === selectedDayIndex);
    btn.classList.toggle(
      'completed',
      state[`${weekKey}-day-${d}`]?.done === true
    );
  });
}

function renderWeekly() {
  const state = getState();
  const weekKey = `week-${currentWeekOffset}`;

  let done = 0, total = 0;
  WEEK_SPLIT.forEach((t, d) => {
    if (t === 'Rest') return;
    total++;
    if (state[`${weekKey}-day-${d}`]?.done) done++;
  });

  weeklyEl.textContent =
    `✅ ${done} of ${total} sessions completed this week`;
}

/* ---------- TODAY ---------- */
function renderToday() {
  const { title, exercises } = getWorkout();
  titleEl.textContent = title;
  listEl.innerHTML = '';

  const state = getState();
  const dayKey =
    `week-${currentWeekOffset}-day-${selectedDayIndex}`;
  const completed = state[dayKey]?.items || [];

  exercises.forEach((ex, i) => {
    const row = document.createElement('div');
    row.className =
      'exercise-row' +
      (completed.includes(i) ? ' completed' : '');

    const label = document.createElement('span');
    label.textContent = ex;
    label.style.cursor = 'pointer';

    const check = document.createElement('span');
    check.textContent = '✓';
    check.style.cursor = 'pointer';

    row.append(label, check);
    listEl.append(row);

    /* ---------- DETAILS (EXPAND) ---------- */
    const detailKey =
      Object.keys(EXERCISE_DETAILS)
        .find(k => ex.startsWith(k));

    if (detailKey) {
      const info = EXERCISE_DETAILS[detailKey];
      const details = document.createElement('div');
      details.className = 'exercise-details';
      details.innerHTML = `
        <strong>Focus:</strong> ${info.tempo}
        <ul>${info.cues.map(c => `<li>${c}</li>`).join('')}</ul>
      `;

      label.onclick = () => {
        details.classList.toggle('show');
      };

      listEl.append(details);
    }

    /* ---------- COMPLETION ---------- */
    check.onclick = (e) => {
      e.stopPropagation();

      const idx = completed.indexOf(i);
      idx === -1
        ? completed.push(i)
        : completed.splice(idx, 1);

      state[dayKey] = {
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

/* ---------- EVENTS ---------- */
dayPickerEl.onclick = e => {
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
