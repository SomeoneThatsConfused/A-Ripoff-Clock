const selectorContainers = document.querySelectorAll(".selectorContainer");
let selectedModule = document.querySelector(".Selected");

// Event Listeners
selectorContainers.forEach((container) => {
  container.addEventListener("click", (e) => {
    selectModule(container);
  });
});

// Functions
function selectModule(container) {
  const moduleSelector = container.querySelector(".moduleSelector");

  if (selectedModule) {
    selectedModule.classList.remove("Selected");
    selectedModule.classList.add("notSelected");
  }

  moduleSelector.classList.add("Selected");
  moduleSelector.classList.remove("notSelected");
  selectedModule = moduleSelector;

  showModule();
}
