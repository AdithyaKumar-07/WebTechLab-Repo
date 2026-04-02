import React from 'react';
import './index.css';

const StudentCard = ({ name, department, marks }) => {
  return (
    <div className="student-card">
      <h2 className="student-name">{name}</h2>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Marks:</strong> {marks}</p>
    </div>
  );
};

export default StudentCard;
