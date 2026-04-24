import { WORKOUTS, WEEK_SPLIT, EXERCISE_DETAILS } from './workouts.js';

/* ===============================
   SAFE DOM ACCESS
================================ */
function $(id) {
  return document.getElementById(id) || null;
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
   INTRO DISMISSAL (FIX)
================================ */
if (enterBtn && intro) {
  enterBtn.onclick = () => {
    intro.style.display = 'none';
  };
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
  if (!dayButtons.length) return;
  const state = getState();

  dayButtons.forEach(btn => {
    const idx = Number(btn.dataset.day);
    btn.classList.toggle('active', idx === selectedDayIndex);
    btn.classList.toggle('completed', state[`day-${idx}`]?.done);
  });
}

/* ===============================
   TODAY SESSION
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
    const details = document.createElement('div');
    details.className = 'exercise-details';

    const detailKey =
      Object.keys(EXERCISE_DETAILS)
        .find(k => ex.startsWith(k));

    if (detailKey) {
      const d = EXERCISE_DETAILS[detailKey];
      details.innerHTML = `
        <strong>${d.overview}</strong>
        <ol>${d.instructions.map(s => `<li>${s}</li>`).join('')}</ol>
        <ul>${d.tips.map(t => `<li>${t}</li>`).join('')}</ul>
      `;
    }

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
