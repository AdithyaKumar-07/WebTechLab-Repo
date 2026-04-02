const student = {
    id: 101,
    name: "Priya",
    department: "CSE",
    marks: 92
};

const { id, name, department, marks } = student;

document.getElementById('destructured-output').innerHTML = 
    `<strong>Output:</strong> ${id} ${name} ${department} ${marks}`;

const updatedStudent = {
    ...student,
    grade: student.marks > 90 ? "A" : "B"
};

document.getElementById('object-output').textContent = 
    JSON.stringify(updatedStudent, null, 4);

console.log(id, name, department, marks);
console.log(updatedStudent);
