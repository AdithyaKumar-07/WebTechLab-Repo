const API_URL = '/notes';

async function fetchNotes() {
    const res = await fetch(API_URL);
    const notes = await res.json();
    const container = document.getElementById('notesContainer');
    container.innerHTML = notes.map(n => `
        <div class="note-item">
            <h3>${n.title} (${n.subject})</h3>
            <p>${n.description}</p>
            <button onclick="editNote('${n._id}', '${n.title}', '${n.description}')">Edit</button>
            <button onclick="deleteNote('${n._id}')">Delete</button>
        </div>
    `).join('');
}

async function addNote() {
    const title = document.getElementById('title').value;
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, subject, description })
    });
    fetchNotes();
}

async function deleteNote(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchNotes();
}

async function editNote(id, oldTitle, oldDesc) {
    const title = prompt("Edit Title", oldTitle);
    const description = prompt("Edit Description", oldDesc);
    if(title && description) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });
        fetchNotes();
    }
}

fetchNotes();
