//  Variables ↓

  // timeElapsed Variables ↓
  let millisecond = 0;
  let second = 0;
  let minute = 0;
  let hour = 0;
  let stopWatchInterval;
  let isRunning = false;


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
  const laps = [];
  const lapIndex = laps.length + 1;
  const lapContainer = document.createElement('div');
  let lapStartTime;
  let emptyLapsMessage;
// Event Listeners ↓

resetBtn.addEventListener('click', () => {
  resetStopWatch();
});

playStopBtn.addEventListener('click', () => {
  if (isRunning) {
    stopStopWatch();
    lapBtn.disabled = true;
  } else {
    startStopWatch();
    lapBtn.disabled = false;
  }
  resetBtn.disabled = false;
  isButtonDisabled();
  pauseSvg.classList.toggle('hidden');
  playSvg.classList.toggle('hidden');
});

// Functions ↓
checkLaps();
isButtonDisabled();

function startStopWatch() {
  stopWatchInterval = setInterval(updateStopWatch, 10)
  isRunning = true;
}

function updateStopWatch() {
  millisecond++
  
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
  let formattedMS = millisecond;
  let formattedSec = second;
  let formattedMin = minute;
  let formattedHour = hour;
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

  if ((hour === 99)&&( minute === 59)&&(second === 59)&&(millisecond === 99)) {
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
  millisecond = -1;
  second = 0;
  minute = 0;
  hour = 0;
  
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  playStopBtn.disabled = false;
  isButtonDisabled();
  updateStopWatch();
  addMessage('StopWatch has been Reset');
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
  document.body.appendChild(messageContainer);
  setInterval(() => {
    messageContainer.remove();
  }, 5000)
}

function noLapsMessage() {
  emptyLapsMessage = document.createElement('div');
  emptyLapsMessage.textContent = "Nothing to see here ¯\\_(ツ)_/¯ press the flag if you wanna see stuff";
  emptyLapsMessage.classList.add('mt-5', 'text-zinc-500', 'font-bold', 'text-xl', 'w-2/3', 'text-center')
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
  const lapNumber = document.createElement('div');
  const lapTime = document.createElement('div');
  lapTime.textContent = 
  lapNumber.textContent = `Lap ${lapIndex}`
  lapContainer.appendChild(lapNumber)
  lapContainer.push(laps);
  displayLaps();
}

function displayLaps() {
  laps.forEach((lapContainer) => {
    lapList.appendChild(lapContainer);
  });
}