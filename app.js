import { PHASES, WEEK_SPLIT, WORKOUTS, EXERCISE_DETAILS } from './workouts.js';

let currentWeekOffset = 0; // 0 = this week
let selectedDayIndex = (new Date().getDay() + 6) % 7; // Monday = 0
const intro = document.getElementById('forge-intro');
const enterBtn = document.getElementById('enter-forge-btn');
const listEl = document.getElementById('today-session-list');
const titleEl = document.getElementById('today-session-title');
const toast = document.getElementById('completion-toast');
const { title, exercises } = getTodayWorkout();
titleEl.textContent = title;
enterBtn.onclick = () => intro.style.display = 'none';

function renderToday() {
  titleEl.textContent = 'Push Session';
  listEl.innerHTML = '';

  const completed = JSON.parse(localStorage.getItem('completed') || '[]');

  WORKOUTS.Push.forEach((ex, i) => {
    const row = document.createElement('div');
    row.className = 'card';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';

    const title = document.createElement('div');
    title.textContent = ex;

    const check = document.createElement('div');
    check.textContent = '✓';
    check.style.cursor = 'pointer';
    check.style.opacity = completed.includes(i) ? '1' : '.3';

    header.append(title, check);
    row.append(header);

    const key = Object.keys(EXERCISE_DETAILS).find(k => ex.startsWith(k));
    if (key) {
      const d = EXERCISE_DETAILS[key];
      const details = document.createElement('div');
      details.className = 'exercise-details';
      details.innerHTML = `<strong>Tempo:</strong> ${d.tempo}<ul>${d.cues.map(c=>`<li>${c}</li>`).join('')}</ul>`;
      row.append(details);
      title.onclick = () => details.classList.toggle('show');
    }

    if (completed.includes(i)) row.classList.add('complete-ex');

    check.onclick = () => {
      row.classList.toggle('complete-ex');
      check.style.opacity = row.classList.contains('complete-ex') ? '1' : '.3';

      const idx = completed.indexOf(i);
      idx === -1 ? completed.push(i) : completed.splice(idx,1);
      localStorage.setItem('completed', JSON.stringify(completed));
      showToast();
    };

    listEl.append(row);
  });
}

function showToast() {
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),1200);
}
function getCurrentPhase() {
  const absoluteWeek = Math.abs(currentWeekOffset);
  let accumulated = 0;

  for (const phase of PHASES) {
    accumulated += phase.weeks;
    if (absoluteWeek < accumulated) return phase;
  }

  return PHASES[PHASES.length - 1];
}
function getCurrentPhase() {
  const absoluteWeek = Math.abs(currentWeekOffset);
  let accumulated = 0;

  for (const phase of PHASES) {
    accumulated += phase.weeks;
    if (absoluteWeek < accumulated) return phase;
  }

  return PHASES[PHASES.length - 1];
}
renderToday();
