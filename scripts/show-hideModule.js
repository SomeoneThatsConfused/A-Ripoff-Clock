function showModule() {
  // Clock Module
  const clockModuleSelector = document.querySelector(".clockModuleSelector");
  const clockModule = document.querySelector(".clock-module");
  // Timer Module
  const timerModuleSelector = document.querySelector(".timerModuleSelector");
  const timerModule = document.querySelector(".timer-module");
  // Stopwatch Module
  const stopwatchModuleSelector = document.querySelector(
    ".stopwatchModuleSelector"
  );
  const stopwatchModule = document.querySelector(".stopwatch-module");
  if (clockModuleSelector.classList.contains("Selected")) {
    clockModule.classList.remove("hidden");
    clockModule.classList.add("flex");
  } else {
    hideModule(clockModule);
  }

  if (timerModuleSelector.classList.contains("Selected")) {
    timerModule.classList.remove("hidden");
    timerModule.classList.add("flex");
  } else {
    hideModule(timerModule);
  }
  if (stopwatchModuleSelector.classList.contains("Selected")) {
    stopwatchModule.classList.remove("hidden");
    stopwatchModule.classList.add("flex");
  } else {
    hideModule(stopwatchModule);
  }
}

function hideModule(module) {
  module.classList.add("hidden");
}
