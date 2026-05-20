import { useState } from 'react'
import './App.css'

const students = [
  { name: 'Maya Chen', grade: '4th', teacher: 'Ms. Rivera' },
  { name: 'Jordan Brooks', grade: '3rd', teacher: 'Mr. Patel' },
  { name: 'Avery Johnson', grade: '5th', teacher: 'Mrs. Thompson' },
]

const teachers = [
  { name: 'Elena Rivera', className: 'Grade 4 Math', students: 24 },
  { name: 'Sam Patel', className: 'Grade 3 Reading', students: 22 },
  { name: 'Nora Thompson', className: 'Grade 5 Science', students: 26 },
]

const classes = [
  { name: 'Grade 4 Math', teacher: 'Ms. Rivera', average: '91%' },
  { name: 'Grade 3 Reading', teacher: 'Mr. Patel', average: '88%' },
  { name: 'Grade 5 Science', teacher: 'Mrs. Thompson', average: '93%' },
]

const stats = [
  { label: 'Total Students', value: 248 },
  { label: 'Total Teachers', value: 18 },
  { label: 'Total Classes', value: 12 },
  { label: 'Upcoming Events', value: 4 },
]

const events = [
  { name: 'Parent Teacher Conference', date: 'May 22, 2026' },
  { name: 'Field Trip', date: 'May 23, 2026' },
  { name: 'School Assembly', date: 'May 27, 2026' },
  { name: 'Last Day of School', date: 'May 30, 2026' },
]

const navItems = ['Home', 'Students', 'Classes', 'Teachers', 'Calendar']

function App() {
  const [activePage, setActivePage] = useState('Home')

  return (
    <div className="dashboard-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <h2>Navigation</h2>
        <nav>
          {navItems.map((item) => (
            <button
              className={activePage === item ? 'active' : ''}
              key={item}
              type="button"
              aria-label={`Open ${item} page`}
              onClick={() => setActivePage(item)}
            >
              {item}
            </button>
          ))}
        </nav>
        <button className="logout-link" type="button">
          Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Thomas Jefferson Elementary</p>
            <h1>School Dashboard</h1>
          </div>
          <section className="user-card" aria-label="Current user">
            <div className="avatar" aria-hidden="true">
              TJ
            </div>
            <div>
              <strong>Admin User</strong>
              <span>School Office</span>
            </div>
          </section>
        </header>

        {activePage === 'Home' && <HomePage setActivePage={setActivePage} />}
        {activePage === 'Students' && <StudentsPage />}
        {activePage === 'Classes' && <ClassesPage />}
        {activePage === 'Teachers' && <TeachersPage />}
        {activePage === 'Calendar' && <CalendarPage />}
      </main>
    </div>
  )
}

function HomePage({ setActivePage }) {
  return (
    <>
      <section className="stats-grid" aria-label="School summary">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="events-panel">
          <div className="panel-header">
            <h2>Upcoming Events</h2>
            <button type="button" onClick={() => setActivePage('Calendar')}>
              View Calendar
            </button>
          </div>
          <EventList />
        </article>

        <aside className="info-panel">
          <h2>User Info</h2>
          <p>Use this area later for login details, alerts, or quick notes.</p>
        </aside>
      </section>

      <section className="quick-actions" aria-label="Quick actions">
        <button type="button" onClick={() => setActivePage('Students')}>
          Manage Students
        </button>
        <button type="button" onClick={() => setActivePage('Classes')}>
          View Classes
        </button>
      </section>
    </>
  )
}

function StudentsPage() {
  return (
    <section className="page-panel">
      <div className="panel-header">
        <h2>Student Directory</h2>
        <button type="button">Add Student</button>
      </div>
      <DataTable
        headers={['Student', 'Grade', 'Teacher']}
        rows={students.map((student) => [
          student.name,
          student.grade,
          student.teacher,
        ])}
      />
    </section>
  )
}

function ClassesPage() {
  return (
    <section className="page-panel">
      <div className="panel-header">
        <h2>Classes</h2>
        <button type="button">Add Class</button>
      </div>
      <DataTable
        headers={['Class', 'Teacher', 'Average Grade']}
        rows={classes.map((classItem) => [
          classItem.name,
          classItem.teacher,
          classItem.average,
        ])}
      />
    </section>
  )
}

function TeachersPage() {
  return (
    <section className="page-panel">
      <div className="panel-header">
        <h2>Teacher Directory</h2>
        <button type="button">Add Teacher</button>
      </div>
      <DataTable
        headers={['Teacher', 'Class', 'Students']}
        rows={teachers.map((teacher) => [
          teacher.name,
          teacher.className,
          teacher.students,
        ])}
      />
    </section>
  )
}

function CalendarPage() {
  return (
    <section className="page-panel">
      <div className="panel-header">
        <h2>School Calendar</h2>
        <button type="button">Add Event</button>
      </div>
      <EventList />
    </section>
  )
}

function EventList() {
  return (
    <ul className="event-list">
      {events.map((event) => (
        <li key={event.name}>
          <span>{event.name}</span>
          <time>{event.date}</time>
        </li>
      ))}
    </ul>
  )
}

function DataTable({ headers, rows }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('-')}>
              {row.map((cell) => (
                <td key={cell}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
