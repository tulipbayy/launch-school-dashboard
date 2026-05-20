import StudentsPage from "./pages/StudentsPage";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div>
          <div className="sidebar-brand">
            <span className="brand-mark">TJ</span>
            <div>
              <strong>TJ Elementary</strong>
              <span>Admin Dashboard</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            <a href="#home">Home</a>
            <a className="active" href="#students">
              Student Database
            </a>
            <a href="#classes">Classes</a>
            <a href="#teachers">Teacher Dashboard</a>
            <a href="#calendar">Calendar</a>
          </nav>
        </div>

        <button className="logout-button" type="button">
          Logout
        </button>
      </aside>

      <StudentsPage />
    </div>
  );
}

export default App;
