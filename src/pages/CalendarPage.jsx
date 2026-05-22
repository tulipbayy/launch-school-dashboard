import { useEffect, useMemo, useRef, useState } from "react";
import EventForm from "../components/calendar/EventForm";
import {
  createEvent,
  deleteEvent,
  getEvents,
  seedEvents,
  updateEvent,
} from "../services/calendarService";
import "../styles/students.css";
import "../styles/calendar.css";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const CATEGORY_LABELS = {
  academic: "Academic",
  sports: "Sports",
  arts: "Arts & Music",
  holiday: "Holiday / No School",
  community: "Community",
  other: "Other",
};

const SEED_EVENTS = [
  { id: "e1",  title: "Back to School Night",        date: "2026-09-08", allDay: true,  category: "community", location: "Main Auditorium",    description: "Meet the teachers and tour the classrooms." },
  { id: "e2",  title: "Picture Day",                 date: "2026-09-18", allDay: true,  category: "community", location: "Gymnasium",           description: "Individual and class photos." },
  { id: "e3",  title: "Fall Book Fair",              date: "2026-10-06", endDate: "2026-10-10", allDay: true, category: "community", location: "Library", description: "Shop for books all week!" },
  { id: "e4",  title: "Halloween Parade",            date: "2026-10-30", allDay: false, category: "community", location: "School Grounds",      startTime: "10:00", endTime: "11:00", description: "Costume parade around the school." },
  { id: "e5",  title: "Veterans Day Assembly",       date: "2026-11-11", allDay: false, category: "community", location: "Gymnasium",           startTime: "09:00", endTime: "10:00", description: "Honoring our veterans with special performances." },
  { id: "e6",  title: "Thanksgiving Break",          date: "2026-11-25", endDate: "2026-11-27", allDay: true, category: "holiday", location: "", description: "No school — Thanksgiving recess." },
  { id: "e7",  title: "Winter Concert",             date: "2026-12-10", allDay: false, category: "arts",     location: "Main Auditorium",    startTime: "18:00", endTime: "19:30", description: "Annual winter music performance by all grades." },
  { id: "e8",  title: "Winter Break",               date: "2026-12-22", endDate: "2027-01-02", allDay: true, category: "holiday", location: "", description: "Winter recess — school closed." },
  { id: "e9",  title: "Science Fair",               date: "2027-02-12", allDay: false, category: "academic", location: "Gymnasium",           startTime: "08:30", endTime: "14:00", description: "Students present their science projects to judges and families." },
  { id: "e10", title: "Parent-Teacher Conferences", date: "2027-02-19", allDay: false, category: "academic", location: "Classrooms",          startTime: "13:00", endTime: "17:00", description: "Sign-up sheets sent home the prior week." },
  { id: "e11", title: "Spring Picture Day",         date: "2027-03-05", allDay: true,  category: "community", location: "Gymnasium",           description: "Spring individual photos." },
  { id: "e12", title: "Spring Break",              date: "2027-03-29", endDate: "2027-04-04", allDay: true, category: "holiday", location: "", description: "Spring recess — school closed." },
  { id: "e13", title: "Earth Day Celebration",     date: "2027-04-22", allDay: false, category: "community", location: "School Garden",       startTime: "09:00", endTime: "11:30", description: "Students plant trees and participate in campus cleanup." },
  { id: "e14", title: "Art Show",                  date: "2027-04-30", allDay: false, category: "arts",     location: "Hallways & Gym",     startTime: "17:00", endTime: "19:00", description: "Student artwork on display for families." },
  { id: "e15", title: "Field Day",                 date: "2027-05-16", allDay: true,  category: "sports",   location: "Athletic Field",      description: "A day of outdoor games and team competitions for all grades." },
  { id: "e16", title: "Spring Concert",            date: "2027-05-22", allDay: false, category: "arts",     location: "Main Auditorium",    startTime: "18:00", endTime: "19:30", description: "End-of-year music performance." },
  { id: "e17", title: "Memorial Day",              date: "2027-05-31", allDay: true,  category: "holiday",  location: "",                    description: "No school — Memorial Day." },
  { id: "e18", title: "Fifth Grade Graduation",    date: "2027-06-10", allDay: false, category: "academic", location: "Main Auditorium",    startTime: "10:00", endTime: "11:30", description: "Celebration for graduating fifth graders." },
  { id: "e19", title: "Last Day of School",        date: "2027-06-14", allDay: true,  category: "academic", location: "",                    description: "Last day — half day for students." },
];

function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDisplayDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function formatShortDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatTime(time) {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

export default function CalendarPage() {
  const today = new Date();
  const formRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getEvents()
      .then((firebaseEvents) => {
        if (isMounted) {
          setEvents(firebaseEvents);
          setError("");
        }
      })
      .catch((loadError) => {
        console.error(loadError);

        if (isMounted) {
          setError("Unable to load events from Firebase.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function jumpToToday() {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setSelectedDate(formatDateKey(today));
  }

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const lastDay = new Date(viewYear, viewMonth + 1, 0);
    const startPadding = firstDay.getDay();
    const days = [];

    for (let i = startPadding - 1; i >= 0; i--) {
      days.push({ date: new Date(viewYear, viewMonth, -i), isCurrentMonth: false });
    }
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push({ date: new Date(viewYear, viewMonth, d), isCurrentMonth: true });
    }
    const remaining = 7 - (days.length % 7);
    if (remaining < 7) {
      for (let d = 1; d <= remaining; d++) {
        days.push({ date: new Date(viewYear, viewMonth + 1, d), isCurrentMonth: false });
      }
    }
    return days;
  }, [viewYear, viewMonth]);

  const eventsByDate = useMemo(() => {
    const map = {};
    events.forEach((ev) => {
      if (!map[ev.date]) map[ev.date] = [];
      map[ev.date].push(ev);

      if (ev.endDate && ev.endDate !== ev.date) {
        const start = new Date(ev.date + "T00:00:00");
        const end = new Date(ev.endDate + "T00:00:00");
        const cur = new Date(start);
        cur.setDate(cur.getDate() + 1);
        while (cur <= end) {
          const key = formatDateKey(cur);
          if (!map[key]) map[key] = [];
          if (!map[key].find((e) => e.id === ev.id)) map[key].push(ev);
          cur.setDate(cur.getDate() + 1);
        }
      }
    });
    return map;
  }, [events]);

  const todayStr = formatDateKey(today);
  const thisMonthEvents = events.filter((ev) => {
    const [y, m] = ev.date.split("-");
    return parseInt(y) === viewYear && parseInt(m) - 1 === viewMonth;
  });

  const upcomingEvents = events
    .filter((ev) => ev.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 8);

  const nextEvent = events
    .filter((ev) => ev.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  async function handleSave(eventData) {
    try {
      setIsSaving(true);
      setError("");

      if (editingEvent) {
        const updated = await updateEvent(editingEvent.id, eventData);
        setEvents((prev) =>
          prev.map((ev) => (ev.id === editingEvent.id ? updated : ev))
        );
        setEditingEvent(null);
        return;
      }

      const created = await createEvent(eventData);
      setEvents((prev) => [...prev, created]);
    } catch (saveError) {
      console.error(saveError);
      setError("Unable to save event. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(eventId) {
    const shouldDelete = confirm(
      "Delete this event? This action cannot be undone."
    );
    if (!shouldDelete) return;

    try {
      setError("");
      await deleteEvent(eventId);
      setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
    } catch (deleteError) {
      console.error(deleteError);
      setError("Unable to delete event. Please try again.");
    }
  }

  async function handleSeedEvents() {
    try {
      setIsSaving(true);
      setError("");
      const created = await seedEvents(SEED_EVENTS);
      setEvents(created);
    } catch (seedError) {
      console.error(seedError);
      setError("Unable to load demo events.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleEditEvent(ev) {
    setEditingEvent(ev);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleDayClick(dateKey, isCurrentMonth) {
    if (!isCurrentMonth) {
      const [y, m] = dateKey.split("-");
      setViewYear(parseInt(y));
      setViewMonth(parseInt(m) - 1);
    }
    setSelectedDate((prev) => (prev === dateKey ? null : dateKey));
  }

  const selectedDateEvents = selectedDate ? (eventsByDate[selectedDate] || []) : [];

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Thomas Jefferson Elementary</p>
        <h1 className="page-title">School Calendar</h1>
        <p className="page-subtitle">
          View, add, and manage all school events for the year.
        </p>
      </header>

      <section className="summary-grid" aria-label="Calendar summary">
        <article className="summary-card">
          <span>Events This Month</span>
          <strong>{thisMonthEvents.length}</strong>
        </article>
        <article className="summary-card">
          <span>Total Events</span>
          <strong>{events.length}</strong>
        </article>
        <article className="summary-card">
          <span>Next Event</span>
          {nextEvent ? (
            <strong className="next-event-name" style={{ fontSize: "18px", lineHeight: 1.2 }}>
              {nextEvent.title}
            </strong>
          ) : (
            <strong>—</strong>
          )}
        </article>
      </section>

      {error && (
        <div className="status-message status-message-error" role="alert">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="status-message">Loading calendar events...</div>
      )}

      {!isLoading && events.length === 0 && (
        <div className="status-message empty-data-message">
          <span>No events yet. Load the school year calendar to get started.</span>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSeedEvents}
            disabled={isSaving}
          >
            {isSaving ? "Loading..." : "Load Demo Events"}
          </button>
        </div>
      )}

      <div ref={formRef}>
        <EventForm
          key={editingEvent?.id ?? "new"}
          initialEvent={editingEvent}
          defaultDate={selectedDate || ""}
          onSubmit={handleSave}
          onCancel={() => setEditingEvent(null)}
          isSaving={isSaving}
        />
      </div>

      <section className="card calendar-section" aria-label="Monthly calendar">
        <div className="calendar-nav">
          <button className="btn btn-secondary" type="button" onClick={prevMonth}>
            ← Prev
          </button>
          <div style={{ textAlign: "center" }}>
            <h2 className="calendar-month-title">
              {MONTHS[viewMonth]} {viewYear}
            </h2>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={jumpToToday}
              style={{ fontSize: "13px", minHeight: "unset", padding: "5px 12px", marginTop: "6px" }}
            >
              Today
            </button>
          </div>
          <button className="btn btn-secondary" type="button" onClick={nextMonth}>
            Next →
          </button>
        </div>

        <div className="calendar-grid" role="grid" aria-label={`${MONTHS[viewMonth]} ${viewYear}`}>
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="calendar-day-header" role="columnheader">
              {day}
            </div>
          ))}

          {calendarDays.map(({ date, isCurrentMonth }, i) => {
            const dateKey = formatDateKey(date);
            const dayEvents = eventsByDate[dateKey] || [];
            const isToday = dateKey === todayStr;
            const isSelected = dateKey === selectedDate;

            return (
              <div
                key={i}
                className={[
                  "calendar-day",
                  !isCurrentMonth && "calendar-day-other",
                  isToday && "calendar-day-today",
                  isSelected && "calendar-day-selected",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleDayClick(dateKey, isCurrentMonth)}
                onKeyDown={(e) => e.key === "Enter" && handleDayClick(dateKey, isCurrentMonth)}
                role="button"
                tabIndex={0}
                aria-label={`${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}${dayEvents.length ? `, ${dayEvents.length} event(s)` : ""}`}
                aria-pressed={isSelected}
              >
                <span className="calendar-day-num">{date.getDate()}</span>
                <div className="calendar-day-events">
                  {dayEvents.slice(0, 3).map((ev) => (
                    <div
                      key={ev.id}
                      className={`event-pill event-pill-${ev.category || "other"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditEvent(ev);
                      }}
                      title={ev.title}
                    >
                      {ev.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="event-pill-more">+{dayEvents.length - 3} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="calendar-legend" aria-label="Event category legend">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <span key={key} className={`legend-item legend-${key}`}>
              {label}
            </span>
          ))}
        </div>
      </section>

      {selectedDate ? (
        <section className="card" aria-label={`Events on ${selectedDate}`}>
          <div className="table-heading">
            <div className="section-heading" style={{ marginBottom: 0 }}>
              <h2 style={{ textAlign: "left" }}>
                {formatDisplayDate(selectedDate)}
              </h2>
              <p style={{ textAlign: "left" }}>
                {selectedDateEvents.length === 0
                  ? "No events scheduled"
                  : `${selectedDateEvents.length} event(s) scheduled`}
              </p>
            </div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              + Add Event
            </button>
          </div>

          {selectedDateEvents.length > 0 ? (
            <div className="table-wrap" style={{ marginTop: "20px" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Time</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDateEvents.map((ev) => (
                    <tr key={ev.id}>
                      <td>
                        <strong style={{ color: "#3f3034" }}>{ev.title}</strong>
                        {ev.description && (
                          <div style={{ color: "#715c61", fontSize: "13px", marginTop: "3px" }}>
                            {ev.description}
                          </div>
                        )}
                      </td>
                      <td className="event-time-cell">
                        {ev.allDay
                          ? "All Day"
                          : [ev.startTime && formatTime(ev.startTime), ev.endTime && formatTime(ev.endTime)]
                              .filter(Boolean)
                              .join(" – ") || "—"}
                      </td>
                      <td>
                        <span className="badge">
                          {CATEGORY_LABELS[ev.category] || ev.category}
                        </span>
                      </td>
                      <td style={{ color: "#5d474d" }}>{ev.location || "—"}</td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => handleEditEvent(ev)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => handleDelete(ev.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="event-detail-empty" style={{ marginTop: "16px" }}>
              No events on this date. Use the form above to add one.
            </p>
          )}
        </section>
      ) : (
        <section className="card" aria-label="Upcoming events">
          <div className="section-heading">
            <h2>Upcoming Events</h2>
            <p>
              {upcomingEvents.length > 0
                ? `Next ${upcomingEvents.length} scheduled school event(s)`
                : "No upcoming events found"}
            </p>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Event</th>
                    <th>Time</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingEvents.map((ev) => (
                    <tr key={ev.id}>
                      <td style={{ whiteSpace: "nowrap", color: "#5d474d", fontWeight: 700 }}>
                        {formatShortDate(ev.date)}
                      </td>
                      <td>
                        <strong style={{ color: "#3f3034" }}>{ev.title}</strong>
                      </td>
                      <td className="event-time-cell">
                        {ev.allDay
                          ? "All Day"
                          : [ev.startTime && formatTime(ev.startTime), ev.endTime && formatTime(ev.endTime)]
                              .filter(Boolean)
                              .join(" – ") || "—"}
                      </td>
                      <td>
                        <span className="badge">
                          {CATEGORY_LABELS[ev.category] || ev.category}
                        </span>
                      </td>
                      <td style={{ color: "#5d474d" }}>{ev.location || "—"}</td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => handleEditEvent(ev)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => handleDelete(ev.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state" style={{ padding: "24px 0" }}>
              <h2>No upcoming events</h2>
              <p>Use the form above to add the first event to the calendar.</p>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
