// JavaScript for toggling light and dark modes
const toggleMode = () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
  };
  
  // Example: Toggle mode when a button is clicked
  const modeToggleBtn = document.getElementById('modeToggleBtn');
  modeToggleBtn.addEventListener('click', toggleMode);
  