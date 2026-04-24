import { WORKOUTS, WEEK_SPLIT } from './workouts.js';

/* ---------- STATE ---------- */
let selectedDayIndex = 0;

/* ---------- DOM ---------- */
const listEl = document.getElementById('today-session-list');
const titleEl = document.getElementById('today-session-title');
const weeklyEl = document.getElementById('weekly-summary-text');

const dayPickerEl = document.getElementById('day-picker');
const dayButtons = [...dayPickerEl.querySelectorAll('button')];

/* ---------- STORAGE ---------- */
const getState = () =>
  JSON.parse(localStorage.getItem('forged_state') || '{}');

const setState = (s) =>
  localStorage.setItem('forged_state', JSON.stringify(s));

/* ---------- WEEKLY SUMMARY ---------- */
function renderWeekly() {
  const s = getState();
  let done = 0;
  let total = 0;

  WEEK_SPLIT.forEach((day, i) => {
    if (day === 'Rest') return;
    total++;
    if (s[`day-${i}`]?.done) done++;
  });

  weeklyEl.textContent =
    `✅ ${done} of ${total} sessions completed this week`;
}

/* ---------- DAY PICKER ---------- */
function renderDayPicker() {
  const s = getState();

  dayButtons.forEach((btn) => {
    const idx = Number(btn.dataset.day);
    btn.classList.toggle('active', idx === selectedDayIndex);
    btn.classList.toggle('completed', s[`day-${idx}`]?.done === true);
  });
}

/* ---------- TODAY ---------- */
function renderToday() {
  const type = WEEK_SPLIT[selectedDayIndex];
  titleEl.textContent = `${type} — Foundation Phase`;

  listEl.innerHTML = '';

  if (!WORKOUTS[type] || !WORKOUTS[type].foundation) {
    listEl.innerHTML = '<p>Rest and recover today.</p>';
    return;
  }

  const exercises = WORKOUTS[type].foundation;
  const s = getState();
  const key = `day-${selectedDayIndex}`;
  const completed = s[key]?.items || [];

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

    /* ---------- DETAILS (LOCAL, NO RERENDER) ---------- */
    const details = document.createElement('div');
    details.className = 'exercise-details';
    details.innerHTML = '<em>Tap for detailed instructions above.</em>';

    label.onclick = () => {
      details.classList.toggle('show');
    };

    listEl.append(details);

    /* ---------- COMPLETION ---------- */
    check.onclick = (e) => {
      e.stopPropagation();

      const idx = completed.indexOf(i);
      idx === -1
        ? completed.push(i)
        : completed.splice(idx, 1);

      s[key] = {
        items: completed,
        done: completed.length === exercises.length
      };

      setState(s);
      renderDayPicker();
      renderWeekly();
      renderToday();
    };
  });
}

/* ---------- EVENTS ---------- */
dayPickerEl.onclick = (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  selectedDayIndex = Number(btn.dataset.day);
  renderDayPicker();
  renderToday();
};

/* ---------- INIT ---------- */
renderDayPicker();
renderWeekly();
renderToday();
