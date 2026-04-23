/* ----------------------------------
   IMPORTS
---------------------------------- */
import {
  PHASES,
  WEEK_SPLIT,
  WORKOUTS,
  EXERCISE_DETAILS
} from './workouts.js';

/* ----------------------------------
   STATE
---------------------------------- */
let currentWeekOffset = 0; // 0 = this week
let selectedDayIndex = (new Date().getDay() + 6) % 7; // Monday = 0

/* ----------------------------------
   DOM REFERENCES
---------------------------------- */
const intro = document.getElementById('forge-intro');
const enterBtn = document.getElementById('enter-forge-btn');

const listEl = document.getElementById('today-session-list');
const titleEl = document.getElementById('today-session-title');
const toast = document.getElementById('completion-toast');

const prevWeekBtn = document.getElementById('prev-week');
const nextWeekBtn = document.getElementById('next-week');
const weekLabelEl = document.getElementById('week-label');

const dayPickerEl = document.getElementById('day-picker');
const dayButtons = [...dayPickerEl.querySelectorAll('button')];
const streakEl = document.getElementById('streak-summary');

/* ----------------------------------
   INTRO
---------------------------------- */
enterBtn.onclick = () => {
  intro.style.display = 'none';
};

/* ----------------------------------
   STORAGE HELPERS
---------------------------------- */
function getExerciseState() {
  return JSON.parse(localStorage.getItem('forged_exercises') || '{}');
}

function setExerciseState(state) {
  localStorage.setItem('forged_exercises', JSON.stringify(state));
}

function getStreakState() {
  return JSON.parse(
    localStorage.getItem('forged_streak') ||
    '{"current":0,"best":0,"lastCompletedDate":null}'
  );
}

function setStreakState(state) {
  localStorage.setItem('forged_streak', JSON.stringify(state));
}

/* ----------------------------------
   PHASE + WORKOUT RESOLUTION
---------------------------------- */
function getCurrentPhase() {
  const absoluteWeek = Math.abs(currentWeekOffset);
  let accumulated = 0;

  for (const phase of PHASES) {
    accumulated += phase.weeks;
    if (absoluteWeek < accumulated) return phase;
  }

  return PHASES[PHASES.length - 1];
}

function getTodayWorkout() {
  const phase = getCurrentPhase();
  const dayType = WEEK_SPLIT[selectedDayIndex];

  if (dayType === 'Rest') {
    return { title: 'Rest Day', exercises: [] };
  }

  return {
    title: `${dayType} — ${phase.name} Phase`,
    exercises: WORKOUTS[dayType]?.[phase.id] || []
  };
}

/* ----------------------------------
   UI HELPERS
---------------------------------- */
function renderWeekLabel() {
  if (currentWeekOffset === 0) {
    weekLabelEl.textContent = 'Current Week';
  } else {
    const sign = currentWeekOffset > 0 ? '+' : '';
    weekLabelEl.textContent = `Week ${sign}${currentWeekOffset}`;
  }
}

function renderDayPicker() {
  const exerciseState = getExerciseState();
  const weekKey = `week-${currentWeekOffset}`;

  dayButtons.forEach(btn => {
    const day = Number(btn.dataset.day);
    btn.classList.toggle('active', day === selectedDayIndex);

    const dayKey = `${weekKey}-day-${day}`;
    btn.classList.toggle(
      'completed',
      exerciseState[dayKey]?.completed === true
    );
  });
}

function showToast(msg = 'Session Forged.') {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1400);
}

function renderStreak() {
  const streak = getStreakState();
  streakEl.textContent =
    streak.current === 0
      ? '🔥 Start your streak today'
      : `🔥 ${streak.current}-day streak (Best: ${streak.best})`;
}

/* ----------------------------------
   STREAK UPDATE LOGIC
---------------------------------- */
function updateStreakForDay(dateKey) {
  const streak = getStreakState();
  const today = new Date(dateKey);
  const last = streak.lastCompletedDate
    ? new Date(streak.lastCompletedDate)
    : null;

  if (last) {
    const diffDays = Math.round(
      (today - last) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      streak.current += 1;
    } else {
      streak.current = 1;
    }
  } else {
    streak.current = 1;
  }

  streak.best = Math.max(streak.best, streak.current);
  streak.lastCompletedDate = dateKey;
  setStreakState(streak);
}

/* ----------------------------------
   RENDERING
---------------------------------- */
function renderToday() {
  const { title, exercises } = getTodayWorkout();
  titleEl.textContent = title;
  listEl.innerHTML = '';

  const exerciseState = getExerciseState();
  const weekKey = `week-${currentWeekOffset}`;
  const dayKey = `${weekKey}-day-${selectedDayIndex}`;
  const completedList = exerciseState[dayKey]?.items || [];

  exercises.forEach((ex, i) => {
    const row = document.createElement('div');
    row.className = 'card';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';

    const exerciseTitle = document.createElement('div');
    exerciseTitle.textContent = ex;
    exerciseTitle.style.cursor = 'pointer';

    const check = document.createElement('div');
    check.textContent = '✓';
    check.style.cursor = 'pointer';
    check.style.opacity = completedList.includes(i) ? '1' : '.3';

    header.append(exerciseTitle, check);
    row.append(header);

    const key = Object.keys(EXERCISE_DETAILS).find(k =>
      ex.startsWith(k)
    );

    if (key) {
      const d = EXERCISE_DETAILS[key];
      const details = document.createElement('div');
      details.className = 'exercise-details';
      details.innerHTML =
        `<strong>Tempo:</strong> ${d.tempo}
         <ul>${d.cues.map(c => `<li>${c}</li>`).join('')}</ul>`;
      row.append(details);

      exerciseTitle.onclick = () =>
        details.classList.toggle('show');
    }

    if (completedList.includes(i)) row.classList.add('complete-ex');

    check.onclick = () => {
      const idx = completedList.indexOf(i);
      idx === -1 ? completedList.push(i) : completedList.splice(idx, 1);

      exerciseState[dayKey] = {
        items: completedList,
        completed: completedList.length === exercises.length
      };

      setExerciseState(exerciseState);

      check.style.opacity = completedList.includes(i) ? '1' : '.3';
      row.classList.toggle('complete-ex');

      if (exerciseState[dayKey].completed) {
        updateStreakForDay(new Date().toISOString().split('T')[0]);
        showToast('Day Forged.');
      }

      renderDayPicker();
      renderStreak();
    };

    listEl.append(row);
  });
}

/* ----------------------------------
   DAY PICKER
---------------------------------- */
dayPickerEl.onclick = (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  selectedDayIndex = Number(btn.dataset.day);
  renderDayPicker();
  renderToday();
};

/* ----------------------------------
   WEEK NAVIGATION
---------------------------------- */
prevWeekBtn.onclick = () => {
  currentWeekOffset -= 1;
  selectedDayIndex = 0;
  renderWeekLabel();
  renderDayPicker();
  renderToday();
};

nextWeekBtn.onclick = () => {
  currentWeekOffset += 1;
  selectedDayIndex = 0;
  renderWeekLabel();
  renderDayPicker();
  renderToday();
};

/* ----------------------------------
   INIT
---------------------------------- */
renderWeekLabel();
renderDayPicker();
renderToday();
renderStreak();
