let students = [];

async function fetchStudents() {
  try {
    const response = await fetch('students.json');
    if (!response.ok) throw new Error("Could not fetch students.json");
    students = await response.json();
    renderTable();
  } catch (error) {
    console.error("JSON Parsing Error:", error.message);
    alert("Error loading data. Ensure you are using a Live Server.");
  }
}

document.getElementById('studentForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const course = document.getElementById('course').value;
  const marks = parseInt(document.getElementById('marks').value);

  const newStudent = { id: Date.now(), name, course, marks };
  students.push(newStudent);
  renderTable();
  e.target.reset();
});

function updateMarks(id) {
  const newMarks = prompt("Enter new marks (0-100):");
  if (newMarks !== null && !isNaN(newMarks) && newMarks >= 0 && newMarks <= 100) {
    const student = students.find(s => s.id === id);
    if (student) {
      student.marks = parseInt(newMarks);
      renderTable();
    }
  } else {
    alert("Invalid input!");
  }
}

function deleteStudent(id) {
  students = students.filter(s => s.id !== id);
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';
  students.forEach(s => {
    tbody.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.course}</td>
        <td>${s.marks}</td>
        <td>
          <button onclick="updateMarks(${s.id})">Update</button>
          <button class="delete-btn" onclick="deleteStudent(${s.id})">Delete</button>
        </td>
      </tr>`;
  });
}

fetchStudents();
