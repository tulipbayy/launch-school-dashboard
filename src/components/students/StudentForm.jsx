import { useState } from "react";

const emptyStudent = {
  firstName: "",
  lastName: "",
  birthday: "",
  gradeLevel: "",
  className: "",
  guardianName: "",
  guardianPhone: "",
  guardianEmail: "",
  notes: "",
};

export default function StudentForm({
  initialStudent,
  gradeOptions,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState(() =>
    getInitialFormData(initialStudent)
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.birthday ||
      !formData.gradeLevel ||
      !formData.guardianName.trim()
    ) {
      alert("Please complete the required student and guardian fields.");
      return;
    }

    if (!formData.guardianPhone.trim() && !formData.guardianEmail.trim()) {
      alert("Please provide at least one guardian contact method.");
      return;
    }

    onSubmit({
      ...formData,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      guardianName: formData.guardianName.trim(),
      guardianPhone: formData.guardianPhone.trim(),
      guardianEmail: formData.guardianEmail.trim(),
      className: formData.className.trim(),
      notes: formData.notes.trim(),
    });
    setFormData(emptyStudent);
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="section-heading">
        <h2>{initialStudent ? "Edit Student" : "Add Student"}</h2>
        <p>Required fields are marked with an asterisk.</p>
      </div>

      <div className="form-grid">
        <label className="field">
          <span>First name *</span>
          <input
            className="input"
            name="firstName"
            placeholder="Emma"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field">
          <span>Last name *</span>
          <input
            className="input"
            name="lastName"
            placeholder="Johnson"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field">
          <span>Birthday *</span>
          <input
            className="input"
            name="birthday"
            type="date"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field">
          <span>Grade *</span>
          <select
            className="input"
            name="gradeLevel"
            value={formData.gradeLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select grade</option>
            {gradeOptions.map((grade) => (
              <option key={grade} value={grade}>
                {grade === "K" ? "Kindergarten" : `${grade} Grade`}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Class assignment</span>
          <input
            className="input"
            name="className"
            placeholder="3A - Ms. Carter"
            value={formData.className}
            onChange={handleChange}
          />
        </label>

        <label className="field">
          <span>Guardian name *</span>
          <input
            className="input"
            name="guardianName"
            placeholder="Sarah Johnson"
            value={formData.guardianName}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field">
          <span>Guardian phone</span>
          <input
            className="input"
            name="guardianPhone"
            type="tel"
            placeholder="555-123-4567"
            value={formData.guardianPhone}
            onChange={handleChange}
          />
        </label>

        <label className="field">
          <span>Guardian email</span>
          <input
            className="input"
            name="guardianEmail"
            type="email"
            placeholder="guardian@example.com"
            value={formData.guardianEmail}
            onChange={handleChange}
          />
        </label>
      </div>

      <label className="field">
        <span>Notes</span>
        <textarea
          className="input"
          name="notes"
          placeholder="Academic, medical, pickup, or support notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </label>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit">
          {initialStudent ? "Save Changes" : "Add Student"}
        </button>

        {initialStudent && (
          <button className="btn btn-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function getInitialFormData(initialStudent) {
  if (!initialStudent) return emptyStudent;

  return {
    firstName: initialStudent.firstName || "",
    lastName: initialStudent.lastName || "",
    birthday: initialStudent.birthday || "",
    gradeLevel: initialStudent.gradeLevel || "",
    className: initialStudent.className || "",
    guardianName: initialStudent.guardianName || "",
    guardianPhone: initialStudent.guardianPhone || "",
    guardianEmail: initialStudent.guardianEmail || "",
    notes: initialStudent.notes || "",
  };
}
