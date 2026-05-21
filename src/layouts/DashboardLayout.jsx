import { NavLink } from "react-router-dom";
import "../styles/layout.css";

export default function DashboardLayout({ children }) {
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
            <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
              Home
            </NavLink>
            <NavLink to="/students" className={({ isActive }) => isActive ? "active" : ""}>
              Student Database
            </NavLink>
            <NavLink to="/classes" className={({ isActive }) => isActive ? "active" : ""}>
              Classes
            </NavLink>
            <NavLink to="/teachers" className={({ isActive }) => isActive ? "active" : ""}>
              Teacher Dashboard
            </NavLink>
            <NavLink to="/calendar" className={({ isActive }) => isActive ? "active" : ""}>
              Calendar
            </NavLink>
          </nav>
        </div>

        <button className="logout-button" type="button">
          Logout
        </button>
      </aside>

      {children}
    </div>
  );
}
