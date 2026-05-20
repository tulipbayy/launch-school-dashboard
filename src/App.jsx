import React, { useState } from 'react';
import SchoolStatistics from './pages/SchoolStatistics';
import ClassPage from './pages/ClassPage';

function App() {
  // State to track which page is currently being viewed
  const [currentPage, setCurrentPage] = useState('statistics');

  return (
    <div>
      {/* --- DEVELOPER TESTING MENU --- 
        This is a floating menu just for you to test the pages easily. 
        You and your team will delete this later when you connect the real sidebar links!
      */}
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#333',
        padding: '10px 20px',
        borderRadius: '30px',
        display: 'flex',
        gap: '10px',
        zIndex: 9999, // Ensures it floats on top of everything
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
      }}>
        <button 
          onClick={() => setCurrentPage('statistics')}
          style={{
            padding: '8px 16px',
            backgroundColor: currentPage === 'statistics' ? '#8b5a5a' : '#555',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          View Statistics Page
        </button>
        <button 
          onClick={() => setCurrentPage('classPage')}
          style={{
            padding: '8px 16px',
            backgroundColor: currentPage === 'classPage' ? '#8b5a5a' : '#555',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          View Class Page
        </button>
      </div>

      {/* --- PAGE RENDERING LOGIC --- */}
      {currentPage === 'statistics' && <SchoolStatistics />}
      {currentPage === 'classPage' && <ClassPage />}
      
    </div>
  );
}

export default App;