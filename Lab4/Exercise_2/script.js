function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

async function searchProducts(query) {
    const resultsContainer = document.getElementById('results-container');
    if (query.trim() === '') {
        resultsContainer.innerHTML = '';
        return;
    }

    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const products = await response.json();

        const matchedProducts = products.filter(product => {
            return product.name.toLowerCase().includes(query.toLowerCase()) ||
                   product.category.toLowerCase().includes(query.toLowerCase());
        });

        displayResults(matchedProducts);

    } catch (error) {
        resultsContainer.innerHTML = `<p style="color: red;">Error fetching products: ${error.message}</p>`;
        console.error('Error:', error);
    }
}

function displayResults(products) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    if (products.length === 0) {
        resultsContainer.innerHTML = '<p>No results found</p>';
        return;
    }

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <h4>${product.name}</h4>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Category: ${product.category}</p>
        `;
        resultsContainer.appendChild(productDiv);
    });
}

const searchInput = document.getElementById('searchInput');
const debouncedSearch = debounce(searchProducts, 300);
searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
