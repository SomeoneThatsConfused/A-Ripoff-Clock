// Variables
const clockList = document.querySelector('.clock-list');
const addClockBtn = document.querySelector('.add-clock');
const deleteClockBtn = document.querySelector('.delete-clock')
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
deleteClockBtn.addEventListener('click', removeClock);
// Functions

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

  // Date
  let weekday = date.getDay();
  let dayOfMonth = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  dateContainer.textContent = `${daysIndexMap[weekday]}, ${monthIndexMap[dayOfMonth]} ${dayOfMonth}, ${year} ${timezone}`
} 

setInterval(getTime, 1000);

function addClock() {
  createClock();
}

function removeClock(e) {
  clockList.innerHTML = ""
}

function createClock() {
  // Declaration of Variables
  const timezone = 'No Timezone Set';
  const location = 'No Location Set';
  const day = 'Today';
  const hrDifference = '+0HRS';
  const clockTime = '00:00:00';
    // Create Element
  const addClockBtn = document.querySelector('.add-clock');
  const newClockContainer = document.createElement('div');
  const clockAddInfo = document.createElement('div');
  const clockMainContent = document.createElement('div');
  const newClockTime = document.createElement('div');
  const newClockLocation = document.createElement('div');
  // Container Stylings
  newClockContainer.classList.add('clock-container', 'mt-5', 'bg-zinc-900', 'rounded-lg', 'px-3');
  clockMainContent.classList.add('clockMainContent', 'flex', 'justify-around', 'text-2xs', 'sm:text-lg', 'md:text-3xl');
  clockAddInfo.classList.add('clockExtraInfo', 'px-2', 'bg-blue-600', 'rounded-lg', 'whitespace-nowrap', 'text-lg', 'sm:text-xl');
  clockAddInfo.style.width = 'min-content';
  
  // Add Clock Content
  clockAddInfo.textContent = `${day}, ${hrDifference}`;
  newClockTime.textContent = clockTime;
  newClockLocation.textContent = location;
  clockMainContent.appendChild(newClockLocation);
  clockMainContent.appendChild(newClockTime);
  newClockContainer.appendChild(clockAddInfo);
  newClockContainer.appendChild(clockMainContent);
  clockList.appendChild(newClockContainer);
}