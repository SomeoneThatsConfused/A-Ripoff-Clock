const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="delete-icon" aria-label="Delete">
<path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
</svg>
`;
const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" aria-label="Copy">
<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
</svg>
`;
let askToDel = true;
const clockList = document.querySelector(".clock-list");
const addClockBtn = document.querySelector(".add-clock");
const editBtn = document.querySelector(".editBtn");
addClock.disabled = false;
editBtn.disabled = true;

// Date Index
const daysIndexMap = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

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
addClockBtn.addEventListener("click", addClock);
editBtn.addEventListener("click", showEditIcons);
clockList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-icon")) {
    console.log("working");
    const clockContainer = event.target.closest(".clock-container");
    if (askToDel) {
      showPrompt((shouldDelete) => {
        if (shouldDelete) {
          clockContainer.remove();
          clockEmpty();
        }
      });
    } else {
      clockContainer.remove();
      clockEmpty();
    }
  }
});

// Functions
clockEmpty();

function showPrompt(callback) {
  const overlay = document.createElement("div");
  const container = document.createElement("div");
  const optionContainer = document.createElement("div");
  const yesBtn = document.createElement("button");
  const noBtn = document.createElement("button");
  const ignorePromptContainer = document.createElement("div");
  const ignorePromptBox = document.createElement("input");
  const labelText = document.createElement("label");
  const noteText = document.createElement("span");
  noteText.style.display = "block";
  noteText.style.fontSize = ".7em";
  ignorePromptBox.type = "checkbox";
  ignorePromptBox.id = "ignoreCheckbox";
  ignorePromptBox.setAttribute("aria-label", "Do not show this prompt again");
  labelText.textContent = "Don't ask me again.";
  noteText.textContent = "(can be changed in the settings *not yet available)";
  labelText.style.fontSize = ".8em";
  labelText.setAttribute("for", "ignoreCheckbox");
  ignorePromptContainer.appendChild(ignorePromptBox);
  ignorePromptContainer.appendChild(labelText);
  ignorePromptContainer.appendChild(noteText);
  const message =
    "Are you sure you want to remove this clock? (You can add it back)";
  yesBtn.textContent = "Yes";
  noBtn.textContent = "No";
  optionContainer.appendChild(yesBtn);
  optionContainer.appendChild(noBtn);

  container.textContent = message;
  container.setAttribute("role", "dialog");

  optionContainer.classList.add("promptOptions");
  yesBtn.classList.add("yesBtn");
  noBtn.classList.add("noBtn");
  overlay.classList.add("overlay");
  overlay.style.display = "flex";
  container.classList.add("prompt");
  container.style.zIndex = "40";
  container.appendChild(ignorePromptContainer);
  container.appendChild(optionContainer);
  overlay.append(container);
  document.body.appendChild(overlay);

  yesBtn.addEventListener("click", () => {
    if (ignorePromptBox.checked) {
      askToDel = false;
    }
    overlay.style.display = "none";
    callback(true);
  });

  noBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    return;
  });

  ignorePromptBox.addEventListener("change", () => {
    if (ignorePromptBox.checked) {
      noBtn.disabled = true;
    } else {
      noBtn.disabled = false;
    }
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.style.display = "none";
    }
  });
}

function getTime() {
  const currentTime = document.querySelector(".currentTime");
  const dateContainer = document.querySelector(".date-container");
  const date = new Date();
  let location = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // Current Time

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const formattedTime = date.toLocaleTimeString("en-US", options);

  currentTime.textContent = formattedTime;

  let weekday = date.getDay();
  let dayOfMonth = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  dateContainer.textContent = `${daysIndexMap[weekday]}, ${monthIndexMap[month]} ${dayOfMonth}, ${year} ${location}`;
}

setInterval(getTime, 1000);

function addClock() {
  editBtn.disabled = false;
  isButtonDisabled();
  createClock();
  clockEmpty();
}

function showEditIcons() {
  isButtonDisabled();
  const deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach((btn) => {
    if (btn.style.width === "24px") {
      btn.style.width = "0px";
    } else {
      btn.style.width = "24px";
    }
  });
}

function removeClock(container) {
  isButtonDisabled();
  container.remove();
  clockEmpty();
}

function createClock(timezone) {
  // Declaration of Variables
  let hrDifference;
  let day;
  const location = timezone;
  const clockTime = "00:00:00";

  // Create Elements
  const removeBtn = document.createElement("button");
  const newClockContainer = document.createElement("article");
  const clockAddInfo = document.createElement("div");
  const clockMainContent = document.createElement("div");
  const newClockTime = document.createElement("div");
  const newClockLocation = document.createElement("div");
  const upperContainer = document.createElement("div");
  const copyBtn = document.createElement("button");

  // Container Stylings
  newClockLocation.style.fontSize = "0.75em";
  newClockLocation.style.width = "50%";
  newClockLocation.style.textAlign = "start";
  newClockLocation.style.marginLeft = "5%";
  newClockTime.style.width = "50%";
  newClockTime.style.textAlign = "center";
  upperContainer.classList.add("flex", "justify-between", "w-full");
  copyBtn.innerHTML = copyIcon;
  copyBtn.classList.add(
    "copyIcon",
    "px-2",
    "hover:bg-zinc-800",
    "rounded-lg",
    "text-lg",
    "sm:text-xl",
    "mt-1",
    "h-6"
  );
  clockAddInfo.style.width = "min-content";
  removeBtn.classList.add("delete-btn");
  removeBtn.style.width = "0px";
  removeBtn.style.transform = "translateX(-1em)";
  removeBtn.style.backgroundColor = "red";
  newClockContainer.classList.add(
    "clock-container",
    "mt-2",
    "bg-zinc-900",
    "rounded-lg",
    "px-3"
  );
  clockMainContent.classList.add(
    "clockMainContent",
    "flex",
    "justify-around",
    "text-xl",
    "md:text-3xl",
    "mx-auto"
  );
  clockAddInfo.classList.add(
    "clockExtraInfo",
    "px-2",
    "bg-blue-600",
    "rounded-lg",
    "whitespace-nowrap",
    "text-lg",
    "sm:text-xl"
  );
  clockAddInfo.style.width = "min-content";
  removeBtn.setAttribute("aria-label", "Remove clock");

  // Add Clock Content

  const updateTime = () => {
    const now = new Date();
    const options = { timeZone: timezone, hour: "2-digit", minute: "2-digit" };
    const formattedTime = now.toLocaleTimeString("en-US", options);
    newClockTime.textContent = formattedTime;
    const hrOptions = {
      timeZone: timezone,
      hour: "numeric",
      hour12: false
    };
    const hrFinder = now.toLocaleTimeString("en-US", hrOptions);
    const localHours = new Date().getHours();
    const targetHours = Number(hrFinder);
    let hrDifference = `${targetHours - localHours} HRs`
    const absHrDifference = Math.abs(localHours - targetHours);
    let day = "";
    if (localHours > targetHours) {
      if (absHrDifference >= 12) {
        day = "Yesterday";
      } else {
        day = "Today";
      }
    } else if (localHours < targetHours) {
      if (absHrDifference >= 12) {
        day = "Tomorrow";
      } else {
        day = "Today";
      }
    } else {
      day = "Today";
    }

    clockAddInfo.textContent = `${day}, ${hrDifference}`;
  };

  removeBtn.innerHTML = deleteIcon;
  removeBtn.setAttribute("aria-label", "Remove clock");
  upperContainer.appendChild(clockAddInfo);
  upperContainer.appendChild(copyBtn);
  newClockTime.textContent = clockTime;
  newClockLocation.textContent = location;
  clockMainContent.appendChild(removeBtn);
  clockMainContent.appendChild(newClockLocation);
  clockMainContent.appendChild(newClockTime);
  newClockContainer.appendChild(upperContainer);
  newClockContainer.appendChild(clockMainContent);
  clockList.appendChild(newClockContainer);
  console.log(hrDifference)
  updateTime();
  setInterval(updateTime, 1000);
  copyBtn.addEventListener("click", () => {
    const combinedCopyText = `Time: ${newClockTime.textContent} \nLocation: ${location}\nIn Country: ${Intl.DateTimeFormat().resolvedOptions().timeZone}\nhr difference: ${clockAddInfo.textContent}`;
    const textArea = document.createElement("div");
    textArea.value = combinedCopyText;
    copyClockInfo(copyBtn, combinedCopyText);
  });
}

function copyClockInfo(btn, combinedCopyText) {
  navigator.clipboard
    .writeText(combinedCopyText)
    .then(() => {
      btn.textContent = "Copied!";
      setTimeout(function() {
        btn.innerHTML = copyIcon;
      }, 1000);
    })
    .catch((error) => {
      btn.textContent = `Copy Failed: ${error}`;
      setTimeout(function() {
        btn.innerHTML = copyIcon;
      }, 1000);
    });
}

function clockEmpty() {
  const container = document.querySelector(".clockEmpty");
  const message =
    "Looks like you haven't added any clocks yet. You can add more clocks using the buttons at the bottom left";

  if (clockList.textContent === "") {
    if (!container) {
      const newContainer = document.createElement("div");
      newContainer.textContent = message;
      newContainer.classList.add(
        "clockEmpty",
        "mt-5",
        "text-zinc-500",
        "font-bold",
        "text-sm",
        "md:text-2xl",
        "text-center",
        "mx-auto"
      );
      clockList.appendChild(newContainer);
    }
  } else if (container) {
    container.remove();
  }
}
createClock('America/New_York');
createClock('America/Los_Angeles');
createClock('Europe/Paris');