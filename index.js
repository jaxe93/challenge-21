document.addEventListener('DOMContentLoaded', () => {
    const bookSearchForm = document.getElementById('bookSearchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    bookSearchForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const searchTerm = searchInput.value.trim();

        // Check if the search term is not empty
        if (searchTerm !== '') {
            try {
                // Make a fetch request to your backend API endpoint
                const response = await fetch(`/api/books?search=${searchTerm}`);
                const data = await response.json();

                // Update the search results on the front end
                displaySearchResults(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        }
    });

    function displaySearchResults(books) {
        // Clear previous search results
        searchResults.innerHTML = '';

        if (books.length === 0) {
            searchResults.innerHTML = '<p>No books found.</p>';
        } else {
            // Create HTML elements for each book and append to searchResults
            books.forEach((book) => {
                const bookElement = document.createElement('div');
                bookElement.classList.add('book');

                // Customize the display of book information as needed
                bookElement.innerHTML = `
                    <h2>${book.title}</h2>
                    <p>Author: ${book.author}</p>
                    <p>ISBN: ${book.isbn}</p>
                    <!-- Add more book details as needed -->
                `;

                searchResults.appendChild(bookElement);
            });
        }
    }
});