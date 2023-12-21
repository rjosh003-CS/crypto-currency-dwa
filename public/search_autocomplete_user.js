// Assuming 'autocompleteInput' represents the input field for autocomplete
const autocompleteInput = document.getElementById('autocomplete-input'); // Replace 'autocomplete-input' with the ID of your input field
const searchInput = document.getElementById('search-bar'); // Replace 'search-bar' with the ID of your search bar

autocompleteInput.addEventListener('input', () => {
  const userInput = autocompleteInput.value; // Get user input

  fetch(`/admin/autocomplete?param=${userInput}`)
    .then((response) => response.json())
    .then((data) => {
      // Clear previous suggestions
      autocompleteInput.setAttribute('list', 'suggestions-list'); // Assuming 'suggestions-list' is the ID for your datalist

      // Remove previous suggestions from datalist
      const suggestionsList = document.getElementById('suggestions-list'); // Replace with your datalist ID
      suggestionsList.innerHTML = '';

      // Handle the retrieved data (populate suggestions)
      data.forEach((user) => {
        const option = document.createElement('option');
        option.value = user.name; // Change 'name' to the property you want to show in suggestions
        suggestionsList.appendChild(option);
      });

      // Handle click event on suggestions to add value to search bar
      suggestionsList.addEventListener('click', (event) => {
        if (event.target.tagName === 'OPTION') {
          searchInput.value = event.target.value; // Add clicked value to search bar
        }
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
