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

  dateContainer.textContent = `${daysIndexMap[weekday]}, ${dayOfMonth} ${monthIndexMap[month]} ${year}`
}

setInterval(getTime, 1000);
