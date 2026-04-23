import { PHASES, WEEK_SPLIT, WORKOUTS, EXERCISE_DETAILS } from './workouts.js';

let currentWeekOffset = 0;
let selectedDayIndex = (new Date().getDay() + 6) % 7;

const intro = document.getElementById('forge-intro');
document.getElementById('enter-forge-btn').onclick = () => intro.style.display='none';

const titleEl = document.getElementById('today-session-title');
const listEl = document.getElementById('today-session-list');
const streakEl = document.getElementById('streak-summary');
const weeklyEl = document.getElementById('weekly-summary-text');

const prevWeekBtn = document.getElementById('prev-week');
const nextWeekBtn = document.getElementById('next-week');
const weekLabelEl = document.getElementById('week-label');

const dayPickerEl = document.getElementById('day-picker');
const dayButtons = [...dayPickerEl.querySelectorAll('button')];

const getState = () => JSON.parse(localStorage.getItem('forged_state')||'{}');
const setState = s => localStorage.setItem('forged_state',JSON.stringify(s));

function getPhase(){
  let acc=0;
  for(const p of PHASES){acc+=p.weeks;if(Math.abs(currentWeekOffset)<acc)return p;}
  return PHASES.at(-1);
}

function getWorkout(){
  const type=WEEK_SPLIT[selectedDayIndex];
  if(type==='Rest')return{title:'Rest Day',exercises:[]};
  const phase=getPhase();
  return{title:`${type} — ${phase.name} Phase`,exercises:WORKOUTS[type][phase.id]};
}

function renderWeek(){
  weekLabelEl.textContent=currentWeekOffset===0?'Current Week':`Week ${currentWeekOffset}`;
}

function renderDayPicker(){
  const s=getState(),wk=`week-${currentWeekOffset}`;
  dayButtons.forEach(b=>{
    const d=+b.dataset.day;
    b.classList.toggle('active',d===selectedDayIndex);
    b.classList.toggle('completed',s[`${wk}-day-${d}`]?.done);
  });
}

function renderWeekly(){
  const s=getState(),wk=`week-${currentWeekOffset}`;
  let done=0,total=0;
  WEEK_SPLIT.forEach((t,d)=>{if(t!=='Rest'){total++;if(s[`${wk}-day-${d}`]?.done)done++;}});
  weeklyEl.textContent=`✅ ${done} of ${total} sessions completed this week`;
}

function renderToday(){
  const {title,exercises}=getWorkout();
  titleEl.textContent=title;
  listEl.innerHTML='';
  const s=getState(),key=`week-${currentWeekOffset}-day-${selectedDayIndex}`,done=s[key]?.items||[];

  exercises.forEach((ex,i)=>{
    const row=document.createElement('div');
    row.className='exercise-row'+(done.includes(i)?' completed':'');
    row.innerHTML=`<span>${ex}</span><span>✓</span>`;

    const detail=EXERCISE_DETAILS[Object.keys(EXERCISE_DETAILS).find(k=>ex.startsWith(k))];
    const details=document.createElement('div');
    details.className='exercise-details';
    if(detail)
      details.innerHTML=`Tempo: ${detail.tempo}<ul>${detail.cues.map(c=>`<li>${c}</li>`).join('')}</ul>`;

    row.onclick=()=>{
      const idx=done.indexOf(i);
      idx===-1?done.push(i):done.splice(idx,1);
      s[key]={items:done,done:done.length===exercises.length};
      setState(s);
      renderDayPicker();renderWeekly();renderToday();
    };

    listEl.append(row);
    if(detail)listEl.append(details);
  });
}

dayPickerEl.onclick=e=>{
  const b=e.target.closest('button');if(!b)return;
  selectedDayIndex=+b.dataset.day;
  renderDayPicker();renderToday();
};

prevWeekBtn.onclick=()=>{currentWeekOffset--;selectedDayIndex=0;renderWeek();renderDayPicker();renderWeekly();renderToday();};
nextWeekBtn.onclick=()=>{currentWeekOffset++;selectedDayIndex=0;renderWeek();renderDayPicker();renderWeekly();renderToday();};

renderWeek();renderDayPicker();renderWeekly();renderToday();
``
