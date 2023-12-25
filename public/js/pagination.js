
// ---------------------------------- user_search_bar.ejs---------------------------------------------------------
const searchInput = document.getElementById('search-input');
const autocompleteResults = document.getElementById('autocomplete-results');

// Autocomplete functionality
searchInput.addEventListener('input', async () => {
    const searchTerm = searchInput.value.trim();

    try {
        const autocompleteResponse = await fetch(`https://doc.gold.ac.uk/usr/642/api/v1/admin/autocomplete?term=${searchTerm}`);
        const autocompleteData = await autocompleteResponse.json();

        autocompleteResults.innerHTML = ''; // Clear previous results
        
        autocompleteData.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('autocomplete-result', 'list-group-item', 'list-group-item-action'); // Bootstrap 5 classes

            // Construct the display text with displayname, username, and email
            const displayText = `${result.displayname} (${result.username}) - ${result.email}`;
            resultItem.textContent = displayText;

            resultItem.addEventListener('click', () => {
                // Add the selected data to the search input
                searchInput.value = result.displayname; // Change this to the desired field

                // Clear the autocomplete results after selection
                autocompleteResults.innerHTML = '';
            });

            autocompleteResults.appendChild(resultItem);
        });
    } catch (error) {
        console.error('Autocomplete API Error:', error);
    }
});




// pagination controller
const paginationControls = document.getElementById('pagination-controls');
// Hide pagination controls initially
paginationControls.style.display = 'none';

// Search button functionality
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value.trim();
    console.log(searchTerm);

try {
    const searchResponse = await fetch(`https://doc.gold.ac.uk/usr/642/api/v1/admin/search?param=${searchTerm}`); // Update the endpoint URL
    const searchResults = await searchResponse.json();
    
    // Handle the search results here
    console.log('Search Results:', searchResults);
    // Update UI or perform further actions with the search results
    updateUIWithData(searchResults);
} catch (error) {
    console.error('Search API Error:', error);
}

    // Show pagination controls after search
    paginationControls.style.display = 'block';
});

// ---------------------------------------- user pagination ----------------------------------------------

// Example function to fetch data for a specific page
async function fetchDataForPage(pageNumber) {
    try {
        const response = await fetch(`https://doc.gold.ac.uk/usr/642/api/v1/admin/search?param=query&page=${pageNumber}`);
        const data = await response.json();
        return data; // Return fetched data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// Example function to update UI with fetched data
function updateUIWithData(data) {
    const documentContainer = document.getElementById('document-container');
    documentContainer.innerHTML = ''; // Clear previous content

    // Display fetched documents
    data.docs.forEach((el) => {
        // Create a clickable link to the user profile
        const userProfileLink = document.createElement('a');
        userProfileLink.href = `https://doc.gold.ac.uk/usr/642/admin/user/${el.username}/profile`; // Replace with actual user profile URL
        userProfileLink.classList.add(  'text-decoration-none', 'text-dark', 'reduce-padding' );

        // Create a container for each user profile data
        const userContainer = document.createElement('div');
        userContainer.classList.add('container', 'my-5');

        // Populate user profile data
        userContainer.innerHTML = `
        <div class="my-container reduce-height">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${el.picture}" alt="Profile Picture of ${el.displayname}" class="img-fluid rounded-circle" style="max-width: 150px;">
                        </div>
                        <div class="col-md-9">
                            <h4 class="card-title"><b>Display Name:</b> ${el.displayname}</h4>
                            <p class="card-text"><b>Email:</b> ${el.email}</p>
                            <p class="card-text"><b>Username:</b> ${el.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;    

        // Append user profile container to the clickable link
        userProfileLink.appendChild(userContainer);

        // Append the clickable link to the document container
        documentContainer.appendChild(userProfileLink);
    });



     // Update pagination controls with Bootstrap 5 classes and Font Awesome icons

    const paginationInfo = document.getElementById('pagination-info');
    paginationInfo.innerHTML = `Page ${data.page} of ${data.totalPages}`;

    const prevButton = document.getElementById('prev-page-btn');
    prevButton.classList.toggle('disabled', data.page === 1);
    prevButton.querySelector('a').setAttribute('aria-label', 'Previous');

    const nextButton = document.getElementById('next-page-btn');
    nextButton.classList.toggle('disabled', data.page === data.totalPages);
    nextButton.querySelector('a').setAttribute('aria-label', 'Next');

    // Update Font Awesome icons for pagination controls
    prevButton.querySelector('span').classList.add('fa', 'fa-chevron-left');
    nextButton.querySelector('span').classList.add('fa', 'fa-chevron-right');


    // // Update pagination controls
    // const paginationInfo = document.getElementById('pagination-info');
    // paginationInfo.textContent = `Page ${data.page} of ${data.totalPages}`;

    // const prevButton = document.getElementById('prev-page-btn');
    // prevButton.classList.toggle('disabled', data.page === 1);

    // const nextButton = document.getElementById('next-page-btn');
    // nextButton.classList.toggle('disabled', data.page === data.totalPages);



    // Example event listener for "Next Page" button
    document.getElementById('next-page-btn').addEventListener('click', async () => {
        currentPageNumber++; // Update current page number
        const newData = await fetchDataForPage(currentPageNumber);
        updateUIWithData(newData);
    });

    // Example event listener for "Previous Page" button
    document.getElementById('prev-page-btn').addEventListener('click', async () => {
        currentPageNumber--; // Update current page number
        const newData = await fetchDataForPage(currentPageNumber);
        updateUIWithData(newData);
    });

    // Example event listener for direct page number selection
    document.getElementById('page-number-select').addEventListener('change', async (event) => {
        const selectedPage = parseInt(event.target.value);
        currentPageNumber = selectedPage; // Update current page number
        const newData = await fetchDataForPage(selectedPage);
        updateUIWithData(newData);
    });

}


