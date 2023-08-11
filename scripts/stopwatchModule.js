//  Variables ↓
let isFirstClick = true;
// timeElapsed Variables ↓
let timeElapsed = 0;
let millisecond = 0;
let second = 0;
let minute = 0;
let hour = 0;
let stopWatchInterval;
let isRunning = false;
let formattedMS;
let formattedSec;
let formattedMin;
let formattedHour;


// StopWatch Variables ↓
const playStopBtn = document.querySelector('.play-stopBtn');
playStopBtn.disabled = false;
const resetBtn = document.querySelector('.resetBtn');
resetBtn.disabled = true;
const lapBtn = document.querySelector('.lapBtn');
lapBtn.disabled = true;
const pauseSvg = document.querySelector('.pauseSvg');
const playSvg = document.querySelector('.playSvg')
const hourDisplay = document.querySelector('.hour');
const minDisplay = document.querySelector('.min');
const secDisplay = document.querySelector('.sec');
const msDisplay = document.querySelector('.ms');

// Lap Variables 
const lapList = document.querySelector('.lapList');
let lapStartTime = 0;
let lapDuration = 0;
let laps = [];
let emptyLapsMessage;
let lapTimer;
let fastestLap;
let fastestLapDuration = 0;
let slowestLapDuration = 0;
// Event Listeners ↓
lapBtn.addEventListener('click', () => {
  addLap();
  checkLaps();
  resetLapDuration();
})
resetBtn.addEventListener('click', () => {
  resetStopWatch();
});

playStopBtn.addEventListener('click', () => {
  if (isRunning) {
    stopStopWatch();
    lapBtn.disabled = true;
    stopLapTimer();
  } else {
    startStopWatch();
    lapBtn.disabled = false;
    startLapTimer();
    if (isFirstClick) {
      addLap();
      isFirstClick = false;
    }
  }
  resetBtn.disabled = false;
  checkLaps();
  isButtonDisabled();
  pauseSvg.classList.toggle('hidden');
  playSvg.classList.toggle('hidden');
});

// Functions ↓
checkLaps();
isButtonDisabled();

function startStopWatch() {
  stopWatchInterval = setInterval(updateStopWatch, 9.954)
  isRunning = true;
}

function updateStopWatch() {
  timeElapsed++;
  millisecond++;

  formatStopWatch()
}

function formatStopWatch() {
  if (millisecond > 99) {
    second++
    millisecond = 0;
  }

  if (second > 59) {
    minute++
    second = 0;
  }
  if (minute > 59) {
    hour++
    minute = 0;
  }

  // formatting
  formattedMS = millisecond;
  formattedSec = second;
  formattedMin = minute;
  formattedHour = hour;
  if (millisecond < 10) {
    formattedMS = `0${millisecond}`
  }
  if (second < 10) {
    formattedSec = `0${second}`
  }
  if (minute < 10) {
    formattedMin = `0${minute}`
  }
  if (hour < 10) {
    formattedHour = `0${hour}`
  }

  if ((hour === 99) && (minute === 59) && (second === 59) && (millisecond === 99)) {
    stopStopWatch();
    pauseSvg.classList.remove('hidden');
    playSvg.classList.add('hidden');
    playStopBtn.disabled = true;
  }

  if ((hour === 0) && (minute === 0) && (second === 0) && (millisecond === 0)) {
    resetBtn.disabled = true;
  } else {
    resetBtn.disabled = false;
  }
  hourDisplay.textContent = formattedHour;
  minDisplay.textContent = formattedMin;
  secDisplay.textContent = formattedSec;
  msDisplay.textContent = formattedMS;
  isButtonDisabled();
}

function stopStopWatch() {
  clearInterval(stopWatchInterval);
  isRunning = false;
}

function resetStopWatch() {
  pauseSvg.classList.remove('hidden');
  playSvg.classList.add('hidden');
  clearInterval(stopWatchInterval);
  isRunning = false;
  isFirstClick = true;
  timeElapsed = 0;
  millisecond = -1;
  second = 0;
  minute = 0;
  hour = 0;
  laps = [];
  fastestLapDuration = 0;
  slowestLapDuration = 0;
  lapList.innerHTML = '';
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  playStopBtn.disabled = false;
  isButtonDisabled();
  updateStopWatch();
  checkLaps();
  addMessage('StopWatch and Laps has been Reset');
  stopLapTimer();
  resetLapDuration();
}

function isButtonDisabled() {
  if (resetBtn.disabled) {
    resetBtn.style.backgroundColor = '#353535';
    resetBtn.style.color = '#FFE6E6)';
  } else {
    resetBtn.removeAttribute('style');
  }
  if (lapBtn.disabled) {
    lapBtn.style.backgroundColor = '#353535';
    lapBtn.style.color = '#FFE6E6)';
  } else {
    lapBtn.removeAttribute('style');
  }
}

function addMessage(text) {
  const messageContainer = document.createElement('div');
  messageContainer.textContent = text;
  messageContainer.classList.add('bg-zinc-900', 'text-white', 'bold', 'p-3', 'absolute', 'rounded-lg');
  messageContainer.style.top = '10px';
  messageContainer.style.right = '10px';
  messageContainer.style.opacity = '0.8';
  document.body.appendChild(messageContainer);
  setInterval(() => {
    messageContainer.remove();
  }, 3000)
}

function noLapsMessage() {
  emptyLapsMessage = document.createElement('div');
  emptyLapsMessage.textContent = "Nothing to see here press the flag or start the stopwatch if you wanna see stuff  ¯\\_(ツ)_/¯ ";
  emptyLapsMessage.classList.add('mt-5', 'text-zinc-500', 'font-bold', 'text-sm', 'md:text-xl', 'w-2/3', 'text-center', 'mx-auto')
  lapList.appendChild(emptyLapsMessage);
}

function removeLapsMessage() {
  if (emptyLapsMessage) {
    emptyLapsMessage.remove();
  }
}

function checkLaps() {
  if (lapList.innerHTML === '') {
    noLapsMessage();
  } else {
    removeLapsMessage();
  }
}

function addLap() {
  const lapContainer = document.createElement('div');
  const lapNumber = document.createElement('div');
  const lapTime = document.createElement('div');

  const lapEndTime = timeElapsed;
  const lapDuration = lapEndTime - lapStartTime;
  lapStartTime = lapEndTime;

  lapContainer.classList.add('mt-2', 'text-white', 'text-md', 'md:text-xl', 'lg:text-2xl', 'font-bold', 'border-b-2', 'pb-2', 'border-zinc-500', 'flex', 'justify-around');
  lapTime.classList.add('text-zinc-300', 'lapTime');

  const formattedLapTime = formatLapTime(lapDuration);
  lapTime.textContent = formattedLapTime;

  lapNumber.textContent = `Lap ${laps.length + 1}`;
  lapContainer.appendChild(lapNumber);
  lapContainer.appendChild(lapTime);

  laps.push({ container: lapContainer, duration: lapDuration });
  displayLaps();

  startLapTimer(lapDuration);
}

function formatLapTime(lapDuration) {
  const lapHour = Math.floor(lapDuration / 360000);
  const lapMinute = Math.floor((lapDuration % 360000) / 6000);
  const lapSecond = Math.floor((lapDuration % 6000) / 100);
  const lapMillisecond = lapDuration % 100;

  let formattedMS = lapMillisecond.toString().padStart(2, '0');
  let formattedSec = lapSecond.toString().padStart(2, '0');
  let formattedMin = lapMinute.toString().padStart(2, '0');
  let formattedHour = lapHour.toString().padStart(2, '0');

  return `${formattedHour}:${formattedMin}:${formattedSec}.${formattedMS}`;
}

function displayLaps() {
  lapList.innerHTML = '';
  for (let i = laps.length - 1; i >= 0; i--) {
    const lapContainer = laps[i].container;
    lapList.appendChild(lapContainer);
  }
}

function startLapTimer() {
  clearInterval(lapTimer);
  lapTimer = setInterval(() => {
    lapDuration += 1;
    const formattedLapTime = formatLapTime(lapDuration);
    const lapTimeElement = document.querySelector('.lapTime');
    lapTimeElement.textContent = formattedLapTime;
  }, 9.954);
}


function stopLapTimer() {
  clearInterval(lapTimer);
}

function resetLapDuration() {
  lapDuration = 0;
}

function sortLaps() {
  // To be Added 
}