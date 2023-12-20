// JavaScript for toggling light and dark modes
const toggleMode = () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
  };
  

// Toggle sidebar
document.addEventListener('DOMContentLoaded', function() {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggleIcon = document.querySelector('#sidebarToggle .fa-burger');

  sidebarToggle.addEventListener('click', function(event) {
    sidebar.classList.toggle('show');
  });
});

  // Example: Toggle mode when a button is clicked
  const modeToggleBtn = document.getElementById('modeToggleBtn');
  modeToggleBtn.addEventListener('click', toggleMode);
  