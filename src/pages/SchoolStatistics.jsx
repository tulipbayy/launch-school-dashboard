import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const attendanceData = [
  { month: 'Aug', attendance: 1800 }, { month: 'Sept', attendance: 1900 },
  { month: 'Oct', attendance: 1950 }, { month: 'Nov', attendance: 1850 },
  { month: 'Dec', attendance: 1880 }, { month: 'Jan', attendance: 1820 },
  { month: 'Feb', attendance: 1980 }, { month: 'Mar', attendance: 1750 },
  { month: 'Apr', attendance: 1920 }, { month: 'May', attendance: 1810 },
  { month: 'June', attendance: 1700 }
];

const solData = [
  { grade: '3rd', score: 421.6 },
  { grade: '4th', score: 452 },
  { grade: '5th', score: 372 },
  { grade: '6th', score: 511 }
];

const pieData = [
  { name: 'K', value: 300 }, { name: '1st', value: 350 },
  { name: '2nd', value: 320 }, { name: '3rd', value: 340 },
  { name: '4th', value: 330 }, { name: '5th', value: 360 }
];

const letterGradeData = [
  { grade: 'A', count: 450 },
  { grade: 'B', count: 620 },
  { grade: 'C', count: 310 },
  { grade: 'D', count: 85 },
  { grade: 'F', count: 35 }
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

const kpiData = [
  { title: 'Total Current Enrollment', value: '2,000' },
  { title: 'Student to Teacher Ratio', value: '15:1' },
  { title: 'Overall School SOL Pass Rate', value: '84%' },
  { title: 'Average Daily Absences', value: '38' }
];

export default function SchoolStatistics() {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#cbb3b3', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <nav style={{ width: '250px', backgroundColor: '#8a6e6e', color: 'white', padding: '30px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'normal', margin: '0 0 20px 0' }}>Navigation</h2>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Home</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Student Database</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold' }}>School Statistics</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Teacher Dashboard</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Calendar</a>
        <div style={{ marginTop: 'auto', marginBottom: '20px' }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Logout</a>
        </div>
      </nav>

      <main style={{ flexGrow: 1, padding: '40px', overflowY: 'auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px', color: '#4a3b3b' }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', fontWeight: 'bold' }}>School Statistics</h1>
          <p style={{ fontSize: '1.2rem', margin: 0, opacity: 0.8 }}>Thomas Jefferson Elementary School Dashboard</p>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ backgroundColor: '#f4ecec', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#4a3b3b', fontSize: '1.2rem' }}>Total Attendance Chart - 2026 (Population: 2,000)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[1500, 2000]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="attendance" stroke="#ff0000" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ backgroundColor: '#f4ecec', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', flexGrow: 1 }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#4a3b3b', fontSize: '1.2rem' }}>Average SOL Score (3-6)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={solData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" />
                  <YAxis domain={[300, 600]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#ff4d4d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ width: '380px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ backgroundColor: '#f4ecec', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#4a3b3b', fontSize: '1.2rem' }}>Enrollment by Grade Level</h3>
              <PieChart width={340} height={320}>
                <Pie 
                  data={pieData} 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={95} 
                  fill="#8884d8" 
                  dataKey="value" 
                  label 
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </div>

            <div style={{ backgroundColor: '#f4ecec', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', flexGrow: 1 }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#4a3b3b', fontSize: '1.2rem', textAlign: 'center' }}>Grade Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={letterGradeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8a6e6e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          {kpiData.map((kpi, idx) => (
            <div key={idx} style={{ flex: 1, backgroundColor: '#f4ecec', padding: '25px 20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#4a3b3b', fontSize: '1rem', fontWeight: 'normal' }}>{kpi.title}</h4>
              <p style={{ margin: 0, color: '#4a3b3b', fontSize: '2.2rem', fontWeight: 'bold' }}>{kpi.value}</p>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}