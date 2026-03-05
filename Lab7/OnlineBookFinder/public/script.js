async function searchBooks() {
    const query = document.getElementById('searchInput').value;
    const res = await fetch(`/books/search?title=${query}`);
    const data = await res.json();
    display(data);
}

async function loadMore(page) {
    const res = await fetch(`/books?page=${page}`);
    const data = await res.json();
    display(data);
}

function display(books) {
    const container = document.getElementById('results');
    container.innerHTML = books.map(b => `
                <div class="book-card">
                    <span class="category">${b.category}</span>
                    <h3>${b.title}</h3>
                    <p>By ${b.author} (${b.year})</p>
                    <div class="rating">⭐ ${b.rating}</div>
                    <p><b>Price:</b> ₹${b.price}</p>
                </div>
            `).join('');
}

async function fetchTopRated() {
    try {
        const res = await fetch('/books/top');
        const data = await res.json();
        display(data);
    } catch (err) {
        console.error("Error fetching top rated books:", err);
    }
}