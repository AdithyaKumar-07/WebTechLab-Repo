const apiUrl = 'http://localhost:3000/students'; // MY API URL (db.json)

document.addEventListener('DOMContentLoaded', () => {
    fetchStudents();
    document.getElementById('studentForm').addEventListener('submit', handleFormSubmit);
});

async function handleFormSubmit(e) {
    e.preventDefault();
    const student = {
        id: document.getElementById('studentId').value,
        title: document.getElementById('name').value,
        body: document.getElementById('department').value,
        userId: document.getElementById('marks').value
    };

    const method = document.getElementById('editMode').value === 'true' ? 'PUT' : 'POST';
    const url = method === 'PUT' ? `${apiUrl}/${student.id}` : apiUrl;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        });

        if (response.ok) {
            displayMessage(`Student ${method === 'POST' ? 'Added' : 'Updated'} Successfully!`, 'success');
            resetForm();
            fetchStudents();
        } else {
            handleError(response.status);
        }
    } catch (err) {
        displayMessage("Server Connection Failed", "error");
    }
}

async function fetchStudents() {
    try {
        const response = await fetch(apiUrl);
        if (response.status === 200) {
            const data = await response.json();
            renderTable(data.slice(0, 5));
        }
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}

// DELETE
async function deleteStudent(id) {
    const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    if (response.ok) {
        displayMessage("Record Deleted", "success");
        fetchStudents();
    }
}

function renderTable(students) {
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = '';
    students.forEach(s => {
        tbody.innerHTML += `
            <tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.department}</td>
                <td>${s.marks}</td>
                <td>
                    <button class="edit" onclick="setupEdit('${s.id}', '${s.name}', '${s.department}', '${s.marks}')">Edit</button>
                    <button class="delete" onclick="deleteStudent(${s.id})">Delete</button>
                </td>
            </tr>`;
    });
}

function handleError(status) {
    const msgs = { 404: "Student Not Found", 500: "Internal Server Error" };
    displayMessage(msgs[status] || "Unexpected Error", "error");
}

function displayMessage(text, type) {
    const msgDiv = document.getElementById('message');
    msgDiv.textContent = text;
    msgDiv.className = `message ${type}`;
    msgDiv.style.display = 'block';
    setTimeout(() => msgDiv.style.display = 'none', 3000);
}

function setupEdit(id, name, dept, marks) {
    document.getElementById('studentId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('department').value = dept;
    document.getElementById('marks').value = marks;
    document.getElementById('editMode').value = 'true';
    document.getElementById('submitBtn').textContent = 'Update Student';
}

function resetForm() {
    document.getElementById('studentForm').reset();
    document.getElementById('editMode').value = 'false';
    document.getElementById('submitBtn').textContent = 'Add Student';
}
