import React, { useState } from 'react';

// --- MOCK DATABASE ---
// Instead of one class, we now have an object containing multiple classes!
const classesData = {
  math3: {
    id: 'math3',
    name: '3rd Grade Math',
    teacher: 'Ms. Johnson',
    room: 'Room 204',
    overallAverage: '87% (B+)',
    totalStudents: 24,
    roster: [
      { id: 1, name: 'Emma Davis', grade: '92% (A)', lastAssignment: 'Fractions Quiz (95)' },
      { id: 2, name: 'Liam Wilson', grade: '85% (B)', lastAssignment: 'Fractions Quiz (82)' },
      { id: 3, name: 'Olivia Martinez', grade: '78% (C+)', lastAssignment: 'Fractions Quiz (75)' },
      { id: 4, name: 'Noah Anderson', grade: '95% (A)', lastAssignment: 'Fractions Quiz (100)' },
    ]
  },
  science3: {
    id: 'science3',
    name: '3rd Grade Science',
    teacher: 'Ms. Johnson',
    room: 'Lab 101',
    overallAverage: '91% (A-)',
    totalStudents: 22,
    roster: [
      { id: 1, name: 'Emma Davis', grade: '95% (A)', lastAssignment: 'Volcano Project (98)' },
      { id: 2, name: 'Liam Wilson', grade: '88% (B+)', lastAssignment: 'Volcano Project (85)' },
      { id: 5, name: 'Lucas Scott', grade: '91% (A-)', lastAssignment: 'Volcano Project (90)' },
      { id: 6, name: 'Mia Thomas', grade: '89% (B+)', lastAssignment: 'Volcano Project (88)' },
    ]
  }
};

const gradingWeights = [
  { category: 'Tests', weight: '40%' },
  { category: 'Quizzes', weight: '30%' },
  { category: 'Projects', weight: '20%' },
  { category: 'Participation', weight: '10%' }
];

export default function ClassPage() {
  // STATE: This tracks which class the dropdown currently has selected
  const [selectedClassId, setSelectedClassId] = useState('math3');
  
  // Create a variable that holds the data for whatever class is currently selected
  const currentClass = classesData[selectedClassId];

  // Form State
  const [selectedStudent, setSelectedStudent] = useState('');
  const [assignmentName, setAssignmentName] = useState('');
  const [score, setScore] = useState('');
  const [total, setTotal] = useState('');
  const [category, setCategory] = useState('');

  const handleGradeSubmit = (e) => {
    e.preventDefault();
    alert(`Grade added for ${selectedStudent} in ${currentClass.name}!`);
    setAssignmentName(''); setScore(''); setTotal(''); setCategory(''); setSelectedStudent('');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#cbb3b3', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* SIDEBAR */}
      <nav style={{ width: '250px', backgroundColor: '#8a6e6e', color: 'white', padding: '30px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'normal', margin: '0 0 20px 0' }}>Navigation</h2>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Home</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Student Database</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>School Statistics</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Teacher Dashboard</a>
        <div style={{ backgroundColor: '#705656', width: '100%', textAlign: 'center', padding: '15px 0', borderLeft: '4px solid #fff' }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold' }}>Class View</a>
        </div>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Calendar</a>
      </nav>

      {/* MAIN CONTENT */}
      <main style={{ flexGrow: 1, padding: '40px', overflowY: 'auto' }}>
        
        {/* HEADER SECTION WITH CLASS SELECTOR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px', color: '#4a3b3b' }}>
          <div>
            {/* The Dropdown to switch classes */}
            <select 
              value={selectedClassId} 
              onChange={(e) => setSelectedClassId(e.target.value)}
              style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4a3b3b', backgroundColor: 'transparent', border: 'none', borderBottom: '2px solid #8b5a5a', marginBottom: '10px', cursor: 'pointer', outline: 'none' }}
            >
              {Object.values(classesData).map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
            <p style={{ fontSize: '1.2rem', margin: 0, opacity: 0.8 }}>{currentClass.teacher} | {currentClass.room}</p>
          </div>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ backgroundColor: '#f4ecec', padding: '15px 30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <p style={{ margin: '0 0 5px 0', fontSize: '1rem', color: '#666' }}>Total Students</p>
              <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#4a3b3b' }}>{currentClass.totalStudents}</h2>
            </div>
            <div style={{ backgroundColor: '#f4ecec', padding: '15px 30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <p style={{ margin: '0 0 5px 0', fontSize: '1rem', color: '#666' }}>Overall Class Average</p>
              <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#8b5a5a' }}>{currentClass.overallAverage}</h2>
            </div>
          </div>
        </div>

        {/* WEIGHTS ROW */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          {gradingWeights.map((item, idx) => (
            <div key={idx} style={{ flex: 1, backgroundColor: '#f4ecec', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#4a3b3b', fontSize: '1.1rem', fontWeight: 'normal' }}>{item.category}</h4>
              <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#8a6e6e' }}>{item.weight}</p>
            </div>
          ))}
        </div>

        {/* ROSTER & GRADING FORM */}
        <div style={{ display: 'flex', gap: '30px' }}>
          
          <div style={{ flex: 2, backgroundColor: '#f4ecec', borderRadius: '8px', padding: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#4a3b3b', fontSize: '1.5rem' }}>Student Roster</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ddd', color: '#8a6e6e' }}>
                  <th style={{ padding: '15px 10px' }}>Student Name</th>
                  <th style={{ padding: '15px 10px' }}>Current Grade</th>
                  <th style={{ padding: '15px 10px' }}>Latest Assignment</th>
                </tr>
              </thead>
              <tbody>
                {currentClass.roster.map((student) => (
                  <tr key={student.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px 10px', color: '#4a3b3b', fontWeight: '500' }}>{student.name}</td>
                    <td style={{ padding: '15px 10px', color: '#4a3b3b', fontWeight: 'bold' }}>{student.grade}</td>
                    <td style={{ padding: '15px 10px', color: '#666', fontSize: '0.9rem' }}>{student.lastAssignment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ flex: 1, backgroundColor: '#f4ecec', borderRadius: '8px', padding: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', alignSelf: 'flex-start' }}>
            <h3 style={{ margin: '0 0 25px 0', color: '#4a3b3b', fontSize: '1.5rem' }}>Add Grade</h3>
            <form onSubmit={handleGradeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label style={labelStyle}>Student</label>
                <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} style={inputStyle} required>
                  <option value="">Select Student...</option>
                  {/* Notice how this dynamically pulls from the CURRENT class roster! */}
                  {currentClass.roster.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle} required>
                  <option value="">Select Category...</option>
                  {gradingWeights.map((w, idx) => <option key={idx} value={w.category}>{w.category} ({w.weight})</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Assignment Name</label>
                <input type="text" placeholder="e.g., Chapter 4 Test" value={assignmentName} onChange={e => setAssignmentName(e.target.value)} style={inputStyle} required />
              </div>
              
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Score</label>
                  <input type="number" placeholder="95" value={score} onChange={e => setScore(e.target.value)} style={inputStyle} required />
                </div>
                <span style={{ fontSize: '1.5rem', color: '#666', marginTop: '25px' }}>/</span>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Total</label>
                  <input type="number" placeholder="100" value={total} onChange={e => setTotal(e.target.value)} style={inputStyle} required />
                </div>
              </div>

              <button type="submit" style={{ backgroundColor: '#8b5a5a', color: 'white', border: 'none', padding: '15px', fontSize: '1.1rem', cursor: 'pointer', borderRadius: '4px', marginTop: '10px', fontWeight: 'bold' }}>
                Submit Grade
              </button>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: '8px', color: '#4a3b3b', fontWeight: 'bold', fontSize: '0.9rem' };
const inputStyle = { padding: '12px 15px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', width: '100%', boxSizing: 'border-box', fontFamily: 'inherit' };