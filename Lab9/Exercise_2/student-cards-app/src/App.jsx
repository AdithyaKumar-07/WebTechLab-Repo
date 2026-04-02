import React from 'react';
import StudentCard from './StudentCard';
import './index.css';

const App = () => {
  const students = [
    { id: 1, name: 'Adithya Kumar', department: 'CSE', marks: 98 },
    { id: 2, name: 'Nikhitha Lakshmi', department: 'ECE', marks: 70 },
    { id: 3, name: 'Gowri', department: 'Social Sciences', marks: 84 },
  ];

  return (
    <div className="app-container">
      <h1>Student Database</h1>
      <div className="card-container">
        {students.map(student => (
          <StudentCard
            key={student.id}
            name={student.name}
            department={student.department}
            marks={student.marks}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
