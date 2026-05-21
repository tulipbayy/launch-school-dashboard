import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function SchoolStatistics() {
  const [attendanceData, setAttendanceData] = useState([
    { month: 'Aug', attendance: 1800 }, { month: 'Sept', attendance: 1900 },
    { month: 'Oct', attendance: 1950 }, { month: 'Nov', attendance: 1850 },
    { month: 'Dec', attendance: 1880 }, { month: 'Jan', attendance: 1820 },
    { month: 'Feb', attendance: 1980 }, { month: 'Mar', attendance: 1750 },
    { month: 'Apr', attendance: 1920 }, { month: 'May', attendance: 1810 },
    { month: 'June', attendance: 1700 }
  ]);

  const solData = [
    { grade: '3rd', score: 421.6 }, { grade: '4th', score: 452 },
    { grade: '5th', score: 372 }, { grade: '6th', score: 511 }
  ];

  const pieData = [
    { name: 'K', value: 280 }, { name: '1st', value: 290 },
    { name: '2nd', value: 270 }, { name: '3rd', value: 285 },
    { name: '4th', value: 295 }, { name: '5th', value: 288 },
    { name: '6th', value: 292 }
  ];

  const letterGradeData = [
    { grade: 'A', count: 850 }, { grade: 'B', count: 620 },
    { grade: 'C', count: 340 }, { grade: 'D', count: 120 },
    { grade: 'F', count: 70 }
  ];

  const kpiData = [
    { title: 'Total Enrollment', value: '2,000', trend: '+4% vs last year' },
    { title: 'Average Daily Attendance', value: '94.2%', trend: '-1.1% vs last month' },
    { title: 'Honor Roll Students', value: '842', trend: '+12% vs last semester' },
    { title: 'Teacher to Student Ratio', value: '1:22', trend: 'Stable' }
  ];

  const pieColors = ['#8a6e6e', '#a38787', '#bda2a2', '#d6bebe', '#e0caca', '#ebd6d6', '#f5e4e4'];

  return (
    <div style={{ padding: '40px', backgroundColor: '#cbb3b3', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      
      <div style={{ marginBottom: '30px', color: '#4a3b3b' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', fontWeight: 'bold' }}>School Statistics</h1>
        <p style={{ fontSize: '1.2rem', margin: 0, opacity: 0.8 }}>Thomas Jefferson Elementary Overview</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '30px' }}>
        
        {/* ROW 1: Attendance Line Chart */}
        <div style={{ backgroundColor: '#f4ecec', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#4a3b3b', fontSize: '1.3rem' }}>Average Daily Attendance (2025-2026)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="month" stroke="#8a6e6e" />
              <YAxis stroke="#8a6e6e" domain={[1600, 2000]} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="attendance" stroke="#8b5a5a" strokeWidth={3} dot={{ r: 4, fill: '#8b5a5a' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ROW 2:Bar Chart, Pie Chart, Bar Chart */}
        <div style={{ display: 'flex', gap: '20px' }}>
          
          <div style={{ backgroundColor: '#f4ecec', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', flexGrow: 1 }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#4a3b3b', fontSize: '1.2rem', textAlign: 'center' }}>Average SOL Scores by Grade</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={solData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis domain={[300, 600]} />
                <Tooltip />
                <Bar dataKey="score" fill="#8a6e6e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ backgroundColor: '#f4ecec', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', width: '300px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#4a3b3b', fontSize: '1.2rem', textAlign: 'center' }}>Enrollment by Grade</h3>
            <PieChart width={260} height={200}>
              <Pie data={pieData} cx="50%" cy="45%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
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
            <h4 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '1rem', fontWeight: 'normal' }}>{kpi.title}</h4>
            <p style={{ margin: '0 0 10px 0', fontSize: '2rem', fontWeight: 'bold', color: '#4a3b3b' }}>{kpi.value}</p>
            <span style={{ fontSize: '0.9rem', color: kpi.trend.includes('+') ? '#4caf50' : (kpi.trend.includes('-') ? '#f44336' : '#888') }}>
              {kpi.trend}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}