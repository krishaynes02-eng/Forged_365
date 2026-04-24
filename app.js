import { PHASES, WEEK_SPLIT, WORKOUTS, EXERCISE_DETAILS } from './workouts.js';

let selectedDayIndex = 0;

const listEl = document.getElementById('today-session-list');
const titleEl = document.getElementById('today-session-title');

function renderToday() {
  const workout = WORKOUTS.Push.foundation;
  titleEl.textContent = 'Push — Foundation Phase';
  listEl.innerHTML = '';

  workout.forEach(ex => {
    const row = document.createElement('div');
    row.className = 'exercise-row';

    const label = document.createElement('span');
    label.textContent = ex;
    label.style.cursor = 'pointer';

    const details = document.createElement('div');
    details.className = 'exercise-details';

    const key = Object.keys(EXERCISE_DETAILS)
      .find(k => ex.startsWith(k));

    if (key) {
      const d = EXERCISE_DETAILS[key];
      details.innerHTML = `
        <strong>Overview</strong>
        <p>${d.overview}</p>
        <strong>Instructions</strong>
        <ol>${d.instructions.map(i => `<li>${i}</li>`).join('')}</ol>
        <strong>Coaching Tips</strong>
        <ul>${d.tips.map(t => `<li>${t}</li>`).join('')}</ul>
      `;
    }

    label.onclick = () => details.classList.toggle('show');

    row.append(label);
    listEl.append(row);
    listEl.append(details);
  });
}

renderToday();
