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

  if (addClock.disabled) {
    addClockBtn.style.backgroundColor = '#353535';
  } else {
    addClockBtn.removeAttribute('style');
  }

  if (showDeleteBtn.disabled) {
    showDeleteBtn.style.backgroundColor = '#353535';
  } else {
    showDeleteBtn.removeAttribute('style');
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
