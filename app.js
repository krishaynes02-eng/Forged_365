/* ----------------------------------
   IMPORTS
---------------------------------- */
import { PHASES, WEEK_SPLIT, WORKOUTS, EXERCISE_DETAILS } from './workouts.js';

/* ----------------------------------
   STATE
---------------------------------- */
let currentWeekOffset = 0; // 0 = this week
let selectedDayIndex = (new Date().getDay() + 6) % 7; // Monday = 0

/* ----------------------------------
   DOM REFERENCES
---------------------------------- */
const prevWeekBtn = document.getElementById('prev-week');
const nextWeekBtn = document.getElementById('next-week');
const weekLabelEl = document.getElementById('week-label');

const intro = document.getElementById('forge-intro');
const enterBtn = document.getElementById('enter-forge-btn');
const listEl = document.getElementById('today-session-list');
const titleEl = document.getElementById('today-session-title');
const toast = document.getElementById('completion-toast');

/* ----------------------------------
   INTRO
---------------------------------- */
enterBtn.onclick = () => intro.style.display = 'none';

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
    return {
      title: 'Rest Day',
      exercises: []
    };
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

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1200);
}

/* ----------------------------------
   RENDERING
---------------------------------- */
function renderToday() {
  const { title, exercises } = getTodayWorkout();
  titleEl.textContent = title;
  listEl.innerHTML = '';

  const completed = JSON.parse(localStorage.getItem('completed') || '[]');

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
    check.style.opacity = completed.includes(i) ? '1' : '.3';

    header.append(exerciseTitle, check);
    row.append(header);

    const key = Object.keys(EXERCISE_DETAILS).find(k => ex.startsWith(k));
    if (key) {
      const d = EXERCISE_DETAILS[key];
      const details = document.createElement('div');
      details.className = 'exercise-details';
      details.innerHTML = `
        <strong>Tempo:</strong> ${d.tempo}
        <ul>${d.cues.map(c => `<li>${c}</li>`).join('')}</ul>
      `;
      row.append(details);

      exerciseTitle.onclick = () => details.classList.toggle('show');
    }

    if (completed.includes(i)) row.classList.add('complete-ex');

    check.onclick = () => {
      row.classList.toggle('complete-ex');
      check.style.opacity = row.classList.contains('complete-ex') ? '1' : '.3';

      const idx = completed.indexOf(i);
      idx === -1 ? completed.push(i) : completed.splice(idx, 1);
      localStorage.setItem('completed', JSON.stringify(completed));
      showToast();
    };

    listEl.append(row);
  });
}

/* ----------------------------------
   WEEK NAVIGATION
---------------------------------- */
prevWeekBtn.onclick = () => {
  currentWeekOffset -= 1;
  renderWeekLabel();
  renderToday();
};

nextWeekBtn.onclick = () => {
  currentWeekOffset += 1;
  renderWeekLabel();
  renderToday();
};

/* ----------------------------------
   INIT
---------------------------------- */
renderWeekLabel();
renderToday();
