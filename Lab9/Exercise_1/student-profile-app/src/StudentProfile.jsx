import React from 'react';

const StudentProfile = () => {
  const studentName = "Adithya Kumar";
  const department = "CSE with Specialization in AI/ML";
  const year = "3rd Year";
  const section = "BCE";

  return (
    <div style={cardStyle}>
      <h2 style={{ textAlign: 'center' }}>Student Profile</h2>
      <p><strong>Name:</strong> {studentName}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Year:</strong> {year}</p>
      <p><strong>Section:</strong> {section}</p>
    </div>
  );
};

const cardStyle = {
  border: '2px solid #4A90E2',
  borderRadius: '12px',
  padding: '20px',
  maxWidth: '350px',
  margin: '40px auto',
  fontFamily: 'Segoe UI, sans-serif',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

export default StudentProfile;
