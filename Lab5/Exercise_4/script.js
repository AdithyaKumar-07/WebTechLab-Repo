let inventory = [];

async function loadInventory() {
    try {
        const response = await fetch('inventory.json');
        if (!response.ok) throw new Error("Failed to load inventory data.");
        inventory = await response.json();
        renderTable(inventory);
    } catch (error) {
        console.error("Error:", error);
        alert("JSON Error: " + error.message);
    }
}

document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('pName').value;
    const category = document.getElementById('pCategory').value;
    const price = parseFloat(document.getElementById('pPrice').value);
    const stock = parseInt(document.getElementById('pStock').value);

    if (price <= 0 || stock < 0) {
        alert("Please enter valid price and stock values.");
        return;
    }

    const newProduct = { id: Date.now(), name, category, price, stock };
    inventory.push(newProduct);
    renderTable(inventory);
    e.target.reset();
});

function editProduct(id) {
    const product = inventory.find(p => p.id === id);
    const newPrice = prompt("Enter new price:", product.price);
    const newStock = prompt("Enter new stock quantity:", product.stock);

    if (newPrice !== null && newStock !== null) {
        product.price = parseFloat(newPrice);
        product.stock = parseInt(newStock);
        renderTable(inventory);
    }
}

function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        inventory = inventory.filter(p => p.id !== id);
        renderTable(inventory);
    }
}

function filterByCategory() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filtered = inventory.filter(p => p.category.toLowerCase().includes(searchTerm));
    renderTable(filtered);
}

function renderTable(data) {
    const tbody = document.getElementById('inventoryBody');
    tbody.innerHTML = '';
    let totalValue = 0;

    data.forEach(p => {
        const isLowStock = p.stock < 5;
        totalValue += (p.price * p.stock);

        const row = `
            <tr class="${isLowStock ? 'low-stock' : ''}">
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>$${p.price.toFixed(2)}</td>
                <td>${p.stock}</td>
                <td>
                    <button class="btn-edit" onclick="editProduct(${p.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct(${p.id})">Delete</button>
                </td>
            </tr>`;
        tbody.innerHTML += row;
    });

    document.getElementById('totalValueDisplay').innerText = `Total Inventory Value: $${totalValue.toLocaleString()}`;
}

loadInventory();
