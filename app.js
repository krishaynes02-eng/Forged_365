import { PHASES, WEEK_SPLIT, WORKOUTS, EXERCISE_DETAILS } from './workouts.js';import { PHASES = Math.abs(currentWeekOffset);
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

    const titleEl = document.createElement('div');
    titleEl.textContent = ex;
    titleEl.style.cursor = 'pointer';

    const check = document.createElement('div');
    check.textContent = '✓';
    check.style.cursor = 'pointer';
    check.style.opacity = completed.includes(i) ? '1' : '.3';

    header.append(titleEl, check);
    row.append(header);

    const key = Object.keys(EXERCISE_DETAILS).find(k => ex.startsWith(k));
    if (key) {
      const d = EXERCISE_DETAILS[key];
      const details = document.createElement('div');
      details.className = 'exercise-details';
      details.innerHTML =
        `<strong>Tempo:</strong> ${d.tempo}
         <ul>${d.cues.map(c => `<li>${c}</li>`).join('')}</ul>`;
      row.append(details);

      titleEl.onclick = () => details.classList.toggle('show');
    }



/* ----------------------------------
   STATE
---------------------------------- */
let currentWeekOffset = 0; // 0 = this week
let selectedDayIndex = (new Date().getDay() + 6) % 7; // Monday = 0

const intro = document.getElementById('forge-intro');
const enterBtn = document.getElementById('enter-forge-btn');
const listEl = document.getElementById('today-session-list');
const titleEl = document.getElementById('today-session-title');
const toast = document.getElementById('completion-toast');

enterBtn.onclick = () => (intro.style.display = 'none');

/* ----------------------------------
   PHASE + WORKOUT RESOLUTION
---------------------------------- */
function getCurrentPhase() {
