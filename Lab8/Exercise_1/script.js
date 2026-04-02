const studentName = "Arun";
let mark1 = 85;
let mark2 = 90;
let mark3 = 88;

const calculateAverage = (m1, m2, m3) => (m1 + m2 + m3) / 3;

let totalMarks = mark1 + mark2 + mark3;
let average = calculateAverage(mark1, mark2, mark3);

const reportContainer = document.getElementById('report-container');

reportContainer.innerHTML = `
    <p>Student Name: <span class="highlight">${studentName}</span></p>
    <p>Total Marks: <span class="highlight">${totalMarks}</span></p>
    <p>Average Marks: <span class="highlight">${average.toFixed(2)}</span></p>
`;
