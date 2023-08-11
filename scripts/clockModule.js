// Variables
const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="delete-icon">
<path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
</svg>
`
const clockList = document.querySelector('.clock-list');
const addClockBtn = document.querySelector('.add-clock');
const showDeleteBtn = document.querySelector('.show-deleteBtn');
addClock.disabled = false;
showDeleteBtn.disabled = true;
  // Date Index

const daysIndexMap = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
}

const monthIndexMap = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};
// Event Listeners
addClockBtn.addEventListener('click', addClock);
showDeleteBtn.addEventListener('click', showDeleteIcons);
clockList.addEventListener('click', event => {
  if (event.target.classList.contains('delete-icon')) {
    showPrompt(shouldDelete => {
      if (shouldDelete) {
        const clockContainer = event.target.closest('.clock-container');
        clockContainer.remove();
        clockEmpty();
      }
    });
  }
})
// Functions
clockEmpty();

function showPrompt(callback) {
  const overlay = document.createElement('div');
  const container = document.createElement('div');
  const optionContainer = document.createElement('div');
  const yesBtn = document.createElement('button');
  const noBtn = document.createElement('button');
  
  const message = 'Are you sure you want to remove this clock? (You can add it back)';
  yesBtn.textContent = 'Yes';
  noBtn.textContent = 'No';
  optionContainer.appendChild(yesBtn);
  optionContainer.appendChild(noBtn);
  
  container.textContent = message;

  optionContainer.classList.add('promptOptions');
  yesBtn.classList.add('yesBtn');
  noBtn.classList.add('noBtn')
  overlay.classList.add('overlay');
  overlay.style.display = 'flex';
  container.classList.add('prompt');
  container.appendChild(optionContainer);
  overlay.append(container);
  document.body.appendChild(overlay);

  yesBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    callback(true) ;
  });
  noBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    callback(false) ;
  });
}
function getTime() {
  const currentTime = document.querySelector('.currentTime');
  const dateContainer = document.querySelector('.date-container');
  let date = new Date();

  // Current Time
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  
  let ampm = hour >= 12 ? 'pm' : 'am';

  hour = hour % 12;
  hour = hour === 0 || hour === 12 ? 12 : hour;
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;

  currentTime.textContent = `${hour}:${minute}:${second} ${ampm}`

  let weekday = date.getDay();
  let dayOfMonth = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  dateContainer.textContent = `${daysIndexMap[weekday]}, ${monthIndexMap[month]} ${dayOfMonth}, ${year} ${timezone}`
} 

setInterval(getTime, 1000);

function addClock() {
  showDeleteBtn.disabled = false;
  isButtonDisabled();
  createClock();
  clockEmpty();
}

function showDeleteIcons() {
  isButtonDisabled();
  const deleteBtns = document.querySelectorAll('.delete-btn');
  deleteBtns.forEach(btn => {
    if (btn.style.width === '24px') {
      btn.style.width = '0px';
    } else {
      btn.style.width = '24px';
    }
  })
}
function removeClock(container) {
  isButtonDisabled();
  container.remove();
  clockEmpty();
}

function createClock() {
  // Declaration of Variables
  const location = 'No Location Set';
  const day = 'Today';
  const hrDifference = '+0HRS';
  const clockTime = '00:00:00';
    // Create Element
  const removeBtn = document.createElement('button');
  const newClockContainer = document.createElement('div');
  const clockAddInfo = document.createElement('div');
  const clockMainContent = document.createElement('div');
  const newClockTime = document.createElement('div');
  const newClockLocation = document.createElement('div');
  // Container Stylings
  removeBtn.classList.add('delete-btn');
  removeBtn.style.width = '0px';
  removeBtn.style.transform = 'translateX(-1em)';
  removeBtn.style.backgroundColor = 'red';
  newClockContainer.classList.add('clock-container', 'mt-5', 'bg-zinc-900', 'rounded-lg', 'px-3');
  clockMainContent.classList.add('clockMainContent', 'flex', 'justify-around', 'text-xl', 'md:text-3xl');
  clockAddInfo.classList.add('clockExtraInfo', 'px-2', 'bg-blue-600', 'rounded-lg', 'whitespace-nowrap', 'text-lg', 'sm:text-xl');
  clockAddInfo.style.width = 'min-content';
  
  // Add Clock Content
  removeBtn.innerHTML = deleteIcon;
  clockAddInfo.textContent = `${day}, ${hrDifference}`;
  newClockTime.textContent = clockTime;
  newClockLocation.textContent = location;
  clockMainContent.appendChild(removeBtn);
  clockMainContent.appendChild(newClockLocation);
  clockMainContent.appendChild(newClockTime);
  newClockContainer.appendChild(clockAddInfo);
  newClockContainer.appendChild(clockMainContent);
  clockList.appendChild(newClockContainer);
}

function clockEmpty() {
  const container = document.querySelector('.clockEmpty');
  const message = "Looks like you haven't added any clocks yet. You can add more clocks using the buttons at the bottom left";

  if (clockList.textContent === '') {
    if (!container) {
      const newContainer = document.createElement('div');
      newContainer.textContent = message;
      newContainer.classList.add('clockEmpty', 'mt-5', 'text-zinc-500', 'font-bold', 'text-sm', 'md:text-2xl', 'text-center', 'mx-auto');
      clockList.appendChild(newContainer);
    }
  } else if (container) {
    container.remove();
  }
}