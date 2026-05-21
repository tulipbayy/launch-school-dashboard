import { useState } from "react";

const CATEGORY_OPTIONS = [
  { value: "academic", label: "Academic" },
  { value: "sports", label: "Sports" },
  { value: "arts", label: "Arts & Music" },
  { value: "holiday", label: "Holiday / No School" },
  { value: "community", label: "Community" },
  { value: "other", label: "Other" },
];

const emptyForm = {
  title: "",
  date: "",
  endDate: "",
  startTime: "",
  endTime: "",
  allDay: true,
  category: "academic",
  location: "",
  description: "",
};

export default function EventForm({ initialEvent, defaultDate, onSubmit, onCancel, isSaving }) {
  const [form, setForm] = useState(() =>
    initialEvent
      ? { ...emptyForm, ...initialEvent }
      : { ...emptyForm, date: defaultDate || "" }
  );

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
    if (!initialEvent) setForm(emptyForm);
  }

  function handleCancel() {
    setForm(emptyForm);
    onCancel();
  }

  const isEditing = Boolean(initialEvent);

  return (
    <section className="card" aria-label={isEditing ? "Edit event" : "Add event"}>
      <div className="section-heading">
        <h2>{isEditing ? "Edit Event" : "Add New Event"}</h2>
        <p>
          {isEditing
            ? "Update the details for this school event."
            : "Fill in the details to add an event to the school calendar."}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field" style={{ gridColumn: "1 / -1" }}>
            <span>Event Title *</span>
            <input
              className="input"
              name="title"
              type="text"
              placeholder="e.g., Spring Concert, Science Fair, Field Day"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <span>Date *</span>
            <input
              className="input"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <span>End Date (optional)</span>
            <input
              className="input"
              name="endDate"
              type="date"
              value={form.endDate}
              onChange={handleChange}
              min={form.date}
            />
          </div>

          <div className="field-checkbox">
            <input
              id="allDay"
              name="allDay"
              type="checkbox"
              checked={form.allDay}
              onChange={handleChange}
            />
            <label htmlFor="allDay">All-day event</label>
          </div>

          <div className="field">
            <span>Category *</span>
            <select
              className="input"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {!form.allDay && (
            <>
              <div className="field">
                <span>Start Time</span>
                <input
                  className="input"
                  name="startTime"
                  type="time"
                  value={form.startTime}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <span>End Time</span>
                <input
                  className="input"
                  name="endTime"
                  type="time"
                  value={form.endTime}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="field" style={{ gridColumn: "1 / -1" }}>
            <span>Location</span>
            <input
              className="input"
              name="location"
              type="text"
              placeholder="e.g., Gymnasium, Main Auditorium, Playground"
              value={form.location}
              onChange={handleChange}
            />
          </div>

          <div className="field" style={{ gridColumn: "1 / -1" }}>
            <span>Description</span>
            <textarea
              className="input"
              name="description"
              placeholder="Additional details about this event..."
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Add Event"}
          </button>
          {isEditing && (
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
