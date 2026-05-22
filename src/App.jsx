import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import ClassPage from './pages/ClassPage'
import CalendarPage from './pages/CalendarPage'
import SchoolStatistics from './pages/SchoolStatistics'
import StudentDirectoryPage from './pages/StudentsPage'
import './App.css'

const sampleTeachers = [
  { name: 'Elena Rivera', className: 'Grade 4 Math', students: 24 },
  { name: 'Sam Patel', className: 'Grade 3 Reading', students: 22 },
  { name: 'Nora Thompson', className: 'Grade 5 Science', students: 26 },
]

const navItems = [
  'Home',
  'Students',
  'Classes',
  'Teachers',
  'Calendar',
  'Statistics',
]

function App() {
  const [activePage, setActivePage] = useState('Home')

  function handleSignOut() {
    setActivePage('Home')
  }

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
        <div className="sidebar-footer">
          <span>Admin User</span>
          <button
            className="logout-link"
            type="button"
            aria-label="Sign out and return to Home"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        {getDashboardHeader(activePage) && (
          <DashboardHeader {...getDashboardHeader(activePage)} />
        )}

        {activePage === 'Home' && <HomePage setActivePage={setActivePage} />}
        {activePage === 'Students' && <StudentDirectoryPage />}
        {activePage === 'Classes' && <ClassPage />}
        {activePage === 'Teachers' && <TeacherDashboard />}
        {activePage === 'Calendar' && <CalendarPage />}
        {activePage === 'Statistics' && <SchoolStatistics />}
      </main>
    </div>
  )
}

function DashboardHeader({ title, subtitle, showUserCard = false }) {
  return (
    <header className="dashboard-header">
      <div>
        <p className="eyebrow">Thomas Jefferson Elementary</p>
        <h1>{title}</h1>
        {subtitle && <p className="dashboard-subtitle">{subtitle}</p>}
      </div>
      {showUserCard && (
        <section className="user-card" aria-label="Current user">
          <div className="avatar" aria-hidden="true">
            TJ
          </div>
          <div>
            <strong>Admin User</strong>
            <span>School Office</span>
          </div>
        </section>
      )}
    </header>
  )
}

function getDashboardHeader(activePage) {
  const headers = {
    Home: {
      title: 'School Dashboard',
      showUserCard: true,
    },
    Classes: {
      title: 'Class Dashboard',
      subtitle: 'Review class rosters, averages, grading weights, and grade entry.',
    },
    Teachers: {
      title: 'Teacher Dashboard',
      subtitle: 'Find teacher rosters, add classes, and update student grades.',
    },
  }

  return headers[activePage]
}

function HomePage({ setActivePage }) {
  const [dashboardData, setDashboardData] = useState({
    students: [],
    classes: [],
    teachers: [],
    events: [],
  })
  const [dashboardError, setDashboardError] = useState('')

  useEffect(() => {
    const unsubscribeStudents = onSnapshot(
      collection(db, 'students'),
      (snapshot) => {
        setDashboardData((currentData) => ({
          ...currentData,
          students: snapshot.docs.map((studentDoc) => ({
            id: studentDoc.id,
            ...studentDoc.data(),
          })),
        }))
      },
      () => setDashboardError('Some dashboard data could not be loaded.'),
    )

    const unsubscribeClasses = onSnapshot(
      collection(db, 'classes'),
      (snapshot) => {
        setDashboardData((currentData) => ({
          ...currentData,
          classes: snapshot.docs.map((classDoc) => ({
            id: classDoc.id,
            ...classDoc.data(),
          })),
        }))
      },
      () => setDashboardError('Some dashboard data could not be loaded.'),
    )

    const unsubscribeTeachers = onSnapshot(
      collection(db, 'teachers'),
      (snapshot) => {
        setDashboardData((currentData) => ({
          ...currentData,
          teachers: snapshot.docs.map((teacherDoc) => ({
            id: teacherDoc.id,
            ...teacherDoc.data(),
          })),
        }))
      },
      () => setDashboardError('Some dashboard data could not be loaded.'),
    )

    const unsubscribeEvents = onSnapshot(
      collection(db, 'events'),
      (snapshot) => {
        setDashboardData((currentData) => ({
          ...currentData,
          events: snapshot.docs.map((eventDoc) => ({
            id: eventDoc.id,
            ...eventDoc.data(),
          })),
        }))
      },
      () => setDashboardError('Some dashboard data could not be loaded.'),
    )

    return () => {
      unsubscribeStudents()
      unsubscribeClasses()
      unsubscribeTeachers()
      unsubscribeEvents()
    }
  }, [])

  const todayKey = formatDateKey(new Date())
  const upcomingEvents = dashboardData.events
    .filter((event) => event.date >= todayKey)
    .sort((eventA, eventB) => eventA.date.localeCompare(eventB.date))
  const displayedEvents = upcomingEvents.slice(0, 4)

  const teacherCount =
    dashboardData.teachers.length || countUniqueClassTeachers(dashboardData.classes)

  const stats = [
    { label: 'Total Students', value: dashboardData.students.length },
    { label: 'Total Teachers', value: teacherCount },
    { label: 'Total Classes', value: dashboardData.classes.length },
    { label: 'Upcoming Events', value: upcomingEvents.length },
  ]

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

      {dashboardError && (
        <p className="dashboard-alert" role="alert">
          {dashboardError}
        </p>
      )}

      <section className="content-grid">
        <article className="events-panel">
          <div className="panel-header">
            <h2>Upcoming Events</h2>
            <button type="button" onClick={() => setActivePage('Calendar')}>
              View Calendar
            </button>
          </div>
          <EventList events={displayedEvents} />
        </article>

        <aside className="info-panel">
          <h2>Admin Summary</h2>
          <p>Signed in as Admin User.</p>
          <p>{getNextEventText(upcomingEvents[0])}</p>
        </aside>
      </section>

      <section className="quick-actions" aria-label="Quick actions">
        <button type="button" onClick={() => setActivePage('Students')}>
          Manage Students
        </button>
        <button type="button" onClick={() => setActivePage('Teachers')}>
          Teacher Dashboard
        </button>
        <button type="button" onClick={() => setActivePage('Classes')}>
          View Classes
        </button>
        <button type="button" onClick={() => setActivePage('Calendar')}>
          View Calendar
        </button>
      </section>
    </>
  )
}

function TeacherDashboard() {
  const [teacherName, setTeacherName] = useState('')
  const [teacherClasses, setTeacherClasses] = useState([])
  const [teacherStudents, setTeacherStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [classForm, setClassForm] = useState({
    className: '',
    gradeLevel: '',
    subject: '',
    room: '',
  })
  const [studentForm, setStudentForm] = useState({
    studentName: '',
    className: '',
    grade: '',
  })

  useEffect(() => {
    const unsubscribeClasses = onSnapshot(
      collection(db, 'classes'),
      (snapshot) => {
        setTeacherClasses(
          snapshot.docs.map((classDoc) => ({
            id: classDoc.id,
            ...classDoc.data(),
          })),
        )
      },
    )

    const unsubscribeStudents = onSnapshot(
      collection(db, 'students'),
      (snapshot) => {
        setTeacherStudents(
          snapshot.docs.map((studentDoc) => ({
            id: studentDoc.id,
            ...studentDoc.data(),
          })),
        )
      },
    )

    const unsubscribeTeachers = onSnapshot(
      collection(db, 'teachers'),
      (snapshot) => {
        setTeachers(
          snapshot.docs.map((teacherDoc) => ({
            id: teacherDoc.id,
            ...teacherDoc.data(),
          })),
        )
      },
    )

    return () => {
      unsubscribeClasses()
      unsubscribeStudents()
      unsubscribeTeachers()
    }
  }, [])

  function handleClassChange(event) {
    setClassForm({
      ...classForm,
      [event.target.name]: event.target.value,
    })
  }

  function handleStudentChange(event) {
    setStudentForm({
      ...studentForm,
      [event.target.name]: event.target.value,
    })
  }

  async function addClass(event) {
    event.preventDefault()

    if (!classForm.className || !classForm.gradeLevel || !teacherName) {
      window.alert('Please enter a teacher name and class information.')
      return
    }

    await addDoc(collection(db, 'classes'), {
      ...classForm,
      teacherName,
      createdAt: new Date(),
    })

    setClassForm({
      className: '',
      gradeLevel: '',
      subject: '',
      room: '',
    })
  }

  async function addStudentToClass(event) {
    event.preventDefault()

    if (!studentForm.studentName || !studentForm.className) {
      window.alert('Please enter a student name and class.')
      return
    }

    await addDoc(collection(db, 'students'), {
      studentName: studentForm.studentName,
      className: studentForm.className,
      grade: studentForm.grade || 'Not graded',
      teacherName,
    })

    setStudentForm({
      studentName: '',
      className: '',
      grade: '',
    })
  }

  async function updateStudentGrade(studentId, newGrade) {
    if (!newGrade.trim()) return

    await updateDoc(doc(db, 'students', studentId), {
      grade: newGrade,
    })
  }

  async function removeStudent(studentId) {
    await deleteDoc(doc(db, 'students', studentId))
  }

  const normalizedTeacherName = teacherName.toLowerCase()
  const visibleClasses = teacherClasses.filter(
    (classItem) =>
      classItem.teacherName?.toLowerCase() === normalizedTeacherName,
  )
  const visibleStudents = teacherStudents.filter(
    (student) => student.teacherName?.toLowerCase() === normalizedTeacherName,
  )
  const teacherDirectoryRows = getTeacherDirectoryRows(teachers, teacherClasses)

  return (
    <>
      <section className="page-panel teacher-login-card">
        <div className="panel-header">
          <h2>Teacher Lookup</h2>
        </div>
        <form className="form-stack">
          <label htmlFor="teacherName">Filter by Teacher Name</label>
          <div className="login-row">
            <input
              id="teacherName"
              type="text"
              placeholder="Example: Ms. Rivera"
              value={teacherName}
              onChange={(event) => setTeacherName(event.target.value)}
            />
          </div>
        </form>
      </section>

      {!teacherName && (
        <section className="page-panel">
          <div className="panel-header">
            <h2>Teacher Directory</h2>
          </div>
          <DataTable
            headers={['Teacher', 'Class', 'Students']}
            rows={teacherDirectoryRows.map((teacher) => [
              teacher.name,
              teacher.className,
              teacher.students,
            ])}
          />
        </section>
      )}

      {teacherName && (
        <>
          <section className="stats-grid" aria-label="Teacher summary">
            <article className="stat-card">
              <span>Total Classes</span>
              <strong>{visibleClasses.length}</strong>
            </article>
            <article className="stat-card">
              <span>Total Students</span>
              <strong>{visibleStudents.length}</strong>
            </article>
            <article className="stat-card">
              <span>Role</span>
              <strong>Teacher</strong>
            </article>
          </section>

          <section className="content-grid teacher-tools">
            <article className="page-panel form-panel">
              <div className="panel-header">
                <h2>Add Class</h2>
              </div>
              <form onSubmit={addClass} className="form-stack">
                <input
                  name="className"
                  placeholder="Class name"
                  value={classForm.className}
                  onChange={handleClassChange}
                />
                <input
                  name="gradeLevel"
                  placeholder="Grade level"
                  value={classForm.gradeLevel}
                  onChange={handleClassChange}
                />
                <input
                  name="subject"
                  placeholder="Subject"
                  value={classForm.subject}
                  onChange={handleClassChange}
                />
                <input
                  name="room"
                  placeholder="Room number"
                  value={classForm.room}
                  onChange={handleClassChange}
                />
                <button type="submit">Add Class</button>
              </form>
            </article>

            <article className="page-panel form-panel">
              <div className="panel-header">
                <h2>Add Student Grade</h2>
              </div>
              <form onSubmit={addStudentToClass} className="form-stack">
                <input
                  name="studentName"
                  placeholder="Student name"
                  value={studentForm.studentName}
                  onChange={handleStudentChange}
                />
                <select
                  name="className"
                  value={studentForm.className}
                  onChange={handleStudentChange}
                >
                  <option value="">Select class</option>
                  {visibleClasses.map((classItem) => (
                    <option key={classItem.id} value={classItem.className}>
                      {classItem.className}
                    </option>
                  ))}
                </select>
                <input
                  name="grade"
                  placeholder="Grade"
                  value={studentForm.grade}
                  onChange={handleStudentChange}
                />
                <button type="submit">Add Student</button>
              </form>
            </article>
          </section>

          <section className="page-panel">
            <div className="panel-header">
              <h2>My Classes</h2>
            </div>
            {visibleClasses.length === 0 ? (
              <p className="empty-message">
                No classes found for this teacher yet.
              </p>
            ) : (
              <div className="class-grid">
                {visibleClasses.map((classItem) => (
                  <article className="class-card" key={classItem.id}>
                    <h3>{classItem.className}</h3>
                    <p>
                      <strong>Grade:</strong> {classItem.gradeLevel}
                    </p>
                    <p>
                      <strong>Subject:</strong> {classItem.subject}
                    </p>
                    <p>
                      <strong>Room:</strong> {classItem.room}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="page-panel">
            <div className="panel-header">
              <h2>Student Roster and Grades</h2>
            </div>
            {visibleStudents.length === 0 ? (
              <p className="empty-message">No students added yet.</p>
            ) : (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Class</th>
                      <th>Grade</th>
                      <th>Update Grade</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleStudents.map((student) => (
                      <tr key={student.id}>
                        <td>{student.studentName}</td>
                        <td>{student.className}</td>
                        <td>{student.grade}</td>
                        <td>
                          <input
                            className="grade-input"
                            placeholder="New grade"
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') {
                                updateStudentGrade(student.id, event.target.value)
                                event.target.value = ''
                              }
                            }}
                          />
                        </td>
                        <td>
                          <button
                            className="small-button"
                            type="button"
                            onClick={() => removeStudent(student.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </>
  )
}

function EventList({ events }) {
  if (events.length === 0) {
    return <p className="empty-message">No upcoming events found.</p>
  }

  return (
    <ul className="event-list">
      {events.map((event) => (
        <li key={event.id || `${event.title}-${event.date}`}>
          <span>{event.title || event.name}</span>
          <time>{formatDisplayDate(event.date)}</time>
        </li>
      ))}
    </ul>
  )
}

function countUniqueClassTeachers(classes) {
  return new Set(
    classes
      .map((classItem) => classItem.teacherName || classItem.teacher)
      .filter(Boolean),
  ).size
}

function getTeacherDirectoryRows(teachers, classes) {
  if (teachers.length > 0) {
    return teachers.map((teacher) => ({
      name: teacher.name || teacher.teacherName || 'Unnamed Teacher',
      className: teacher.className || teacher.assignedClass || 'Unassigned',
      students: teacher.students || teacher.studentCount || 0,
    }))
  }

  const classRows = classes
    .filter((classItem) => classItem.teacherName || classItem.teacher)
    .map((classItem) => ({
      name: classItem.teacherName || classItem.teacher,
      className: classItem.className || classItem.name || 'Unnamed Class',
      students: classItem.students || classItem.studentCount || 0,
    }))

  return classRows.length > 0 ? classRows : sampleTeachers
}

function getNextEventText(event) {
  if (!event) return 'No upcoming events are currently scheduled.'

  return `Next event: ${event.title || event.name} on ${formatDisplayDate(event.date)}.`
}

function formatDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function formatDisplayDate(dateString) {
  if (!dateString) return 'Date TBD'

  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
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
