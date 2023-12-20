// JavaScript for toggling light and dark modes
const toggleMode = () => {
  const body = document.body;
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');

  // Store the current mode in localStorage
  const currentMode = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('mode', currentMode);
};

// Apply stored mode on page load
document.addEventListener('DOMContentLoaded', function () {
  const savedMode = localStorage.getItem('mode');

  if (savedMode === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');

  sidebarToggle.addEventListener('click', function (event) {
    sidebar.classList.toggle('show');
  });
});

// Example: Toggle mode when a button is clicked
const modeToggleBtn = document.getElementById('modeToggleBtn');
modeToggleBtn.addEventListener('click', toggleMode);
