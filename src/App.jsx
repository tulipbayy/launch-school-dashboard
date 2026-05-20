import './App.css'

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
  return (
    <div className="dashboard-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <h2>Navigation</h2>
        <nav>
          {navItems.map((item) => (
            <a href="/" key={item}>
              {item}
            </a>
          ))}
        </nav>
        <a className="logout-link" href="/">
          Logout
        </a>
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
              <a href="/">View Calendar</a>
            </div>
            <ul className="event-list">
              {events.map((event) => (
                <li key={event.name}>
                  <span>{event.name}</span>
                  <time>{event.date}</time>
                </li>
              ))}
            </ul>
          </article>

          <aside className="info-panel">
            <h2>User Info</h2>
            <p>Use this area later for login details, alerts, or quick notes.</p>
          </aside>
        </section>

        <section className="quick-actions" aria-label="Quick actions">
          <a href="/">Manage Students</a>
          <a href="/">View Classes</a>
        </section>
      </main>
    </div>
  )
}

export default App
