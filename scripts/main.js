const currentTime = document.querySelector(".currentTime");
const dateContainer = document.querySelector(".date-container");
const resetBtn = document.querySelector(".resetBtn");
resetBtn.disabled = true;
resetBtn.setAttribute("aria-label", "Reset stopwatch");
const lapBtn = document.querySelector(".lapBtn");
lapBtn.disabled = true;
lapBtn.setAttribute("aria-label", "Add lap");
function isButtonDisabled() {
  if (resetBtn.disabled) {
    resetBtn.style.backgroundColor = "#353535";
    resetBtn.style.color = "#FFE6E6)";
  } else {
    resetBtn.removeAttribute("style");
  }
  if (lapBtn.disabled) {
    lapBtn.style.backgroundColor = "#353535";
    lapBtn.style.color = "#FFE6E6)";
  } else {
    lapBtn.removeAttribute("style");
  }

  if (addClock.disabled) {
    addClockBtn.style.backgroundColor = "#353535";
  } else {
    addClockBtn.removeAttribute("style");
  }

  if (editBtn.disabled) {
    editBtn.style.color = "#353535";
  } else {
    editBtn.style.color = 'white';
  }
  if (addClockBtn.disabled) {
    addClockBtn.style.color = '#353535';
  } else {
    addClockBtn.style.color = 'white';
  }
}

function addMessage(text) {
  const messageContainer = document.createElement("div");
  messageContainer.textContent = text;
  messageContainer.classList.add(
    "bg-zinc-900",
    "text-white",
    "bold",
    "p-3",
    "absolute",
    "rounded-lg"
  );
  messageContainer.style.top = "10px";
  messageContainer.style.right = "10px";
  messageContainer.style.opacity = "0.8";
  document.body.appendChild(messageContainer);
  setInterval(() => {
    messageContainer.remove();
  }, 3000);
}
