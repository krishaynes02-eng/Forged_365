import {
  PHASES,
  WEEK_SPLIT,
  WORKOUTS,
  EXERCISE_DETAILS
} from './workouts.js';

/* ---------- STATE ---------- */
let currentWeekOffset = 0;
let selectedDayIndex = (new Date().getDay() + 6) % 7;

/* ---------- DOM ---------- */
const intro = document.getElementById('forge-intro');
const enterBtn = document.getElementById('enter-forge-btn');
const titleEl = document.getElementById('today-session-title');
const listEl = document.getElementById('today-session-list');
const toast = document.getElementById('completion-toast');
const streakEl = document.getElementById('streak-summary');

const prevWeekBtn = document.getElementById('prev-week');
const nextWeekBtn = document.getElementById('next-week');
const weekLabelEl = document.getElementById('week-label');

const dayPickerEl = document.getElementById('day-picker');
const dayButtons = Array.from(dayPickerEl.querySelectorAll('button'));

/* ---------- INTRO ---------- */
enterBtn.onclick = () => {
  intro.style.display = 'none';
};

/* ---------- STORAGE ---------- */
const getExerciseState = () =>
  JSON.parse(localStorage.getItem('forged_exercises') || '{}');

const setExerciseState = s =>
  localStorage.setItem('forged_exercises', JSON.stringify(s));

const getStreakState = () =>
  JSON.parse(localStorage.getItem('forged_streak') ||
    '{"current":0,"best":0,"lastCompletedDate":null}');

const setStreakState = s =>
  localStorage.setItem('forged_streak', JSON.stringify(s));

/* ---------- PROGRAM ---------- */
function getCurrentPhase() {
  let total = 0;
  for (const phase of PHASES) {
    total += phase.weeks;
    if (Math.abs(currentWeekOffset) < total) return phase;
  }
  return PHASES[PHASES.length - 1];
}

function getTodayWorkout() {
  const phase = getCurrentPhase();
  const type = WEEK_SPLIT[selectedDayIndex];
  if (type === 'Rest') return { title: 'Rest Day', exercises: [] };
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
  const state = getExerciseState();
  const weekKey = `week-${currentWeekOffset}`;
  dayButtons.forEach(btn => {
    const d = Number(btn.dataset.day);
    btn.classList.toggle('active', d === selectedDayIndex);
    btn.classList.toggle(
      'completed',
      state[`${weekKey}-day-${d}`]?.completed
    );
  });
}

function renderStreak() {
  const s = getStreakState();
  streakEl.textContent =
    s.current === 0
      ? '🔥 Start your streak today'
      : `🔥 ${s.current}-day streak (Best: ${s.best})`;
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1200);
}

/* ---------- RENDER ---------- */
function renderToday() {
  const { title, exercises } = getTodayWorkout();
  titleEl.textContent = title;
  listEl.innerHTML = '';

  const state = getExerciseState();
  const key = `week-${currentWeekOffset}-day-${selectedDayIndex}`;
  const done = state[key]?.items || [];

  exercises.forEach((ex, i) => {
    const row = document.createElement('div');
    row.className = 'card';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';

    const label = document.createElement('div');
    label.textContent = ex;

    const check = document.createElement('div');
    check.textContent = '✓';
    check.style.opacity = done.includes(i) ? '1' : '0.3';

    header.append(label, check);
    row.append(header);

    const k = Object.keys(EXERCISE_DETAILS).find(x => ex.startsWith(x));
    if (k) {
      const d = EXERCISE_DETAILS[k];
      const details = document.createElement('div');
      details.className = 'exercise-details';
      details.innerHTML =
        `<strong>Tempo:</strong> ${d.tempo}<ul>${d.cues.map(c => `<li>${c}</li>`).join('')}</ul>`;
      row.append(details);
      label.onclick = () => details.classList.toggle('show');
    }

    if (done.includes(i)) row.classList.add('complete-ex');

    check.onclick = () => {
      const idx = done.indexOf(i);
      idx === -1 ? done.push(i) : done.splice(idx, 1);
      state[key] = { items: done, completed: done.length === exercises.length };
      setExerciseState(state);

      if (state[key].completed) {
        const today = new Date().toISOString().split('T')[0];
        const streak = getStreakState();
        streak.current =
          streak.lastCompletedDate === today
            ? streak.current
            : streak.current + 1;
        streak.best = Math.max(streak.best, streak.current);
        streak.lastCompletedDate = today;
        setStreakState(streak);
        showToast('Day Forged.');
      }

      renderDayPicker();
      renderStreak();
      renderToday();
    };

    listEl.append(row);
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
  renderToday();
};

nextWeekBtn.onclick = () => {
  currentWeekOffset++;
  selectedDayIndex = 0;
  renderWeekLabel();
  renderDayPicker();
  renderToday();
};

/* ---------- INIT ---------- */
renderWeekLabel();
renderDayPicker();
renderToday();
renderStreak();
