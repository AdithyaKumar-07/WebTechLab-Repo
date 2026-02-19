let xmlDoc;

function loadXML() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            xmlDoc = this.responseXML;
            displayBooks();
        }
    };
    xhttp.open("GET", "books.xml", true);
    xhttp.send();
}

function displayBooks() {
    let table = "<table><tr><th>ID</th><th>Title</th><th>Author</th><th>Status</th><th>Actions</th></tr>";
    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        const id = books[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
        const title = books[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
        const author = books[i].getElementsByTagName("author")[0].childNodes[0].nodeValue;
        const status = books[i].getElementsByTagName("status")[0].childNodes[0].nodeValue;

        table += `<tr>
                    <td>${id}</td>
                    <td>${title}</td>
                    <td>${author}</td>
                    <td>${status}</td>
                    <td>
                        <button onclick="updateStatus('${id}')">Toggle Status</button>
                        <button onclick="deleteBook('${id}')">Delete</button>
                    </td>
                </tr>`;
    }
    table += "</table>";
    document.getElementById("bookList").innerHTML = table;
}

function addBook() {
    const id = document.getElementById("bookId").value;
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;

    if (!id || !title || !author) return alert("All fields are required!");
    if (isDuplicate(id)) return alert("ID already exists!");

    const newBook = xmlDoc.createElement("book");

    const nodes = { id, title, author, status: "Available" };
    for (const key in nodes) {
        const el = xmlDoc.createElement(key);
        el.appendChild(xmlDoc.createTextNode(nodes[key]));
        newBook.appendChild(el);
    }

    xmlDoc.documentElement.appendChild(newBook);
    displayBooks();
}

function updateStatus(id) {
    const books = xmlDoc.getElementsByTagName("book");
    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            const statusNode = books[i].getElementsByTagName("status")[0].childNodes[0];
            statusNode.nodeValue = statusNode.nodeValue === "Available" ? "Borrowed" : "Available";
            break;
        }
    }
    displayBooks();
}

function deleteBook(id) {
    const books = xmlDoc.getElementsByTagName("book");
    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            xmlDoc.documentElement.removeChild(books[i]);
            break;
        }
    }
    displayBooks();
}

function isDuplicate(id) {
    const ids = xmlDoc.getElementsByTagName("id");
    for (let i = 0; i < ids.length; i++) {
        if (ids[i].textContent === id) return true;
    }
    return false;
}