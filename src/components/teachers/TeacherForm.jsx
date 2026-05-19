import { useEffect, useState } from "react";

const emptyTeacher = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  gradeLevel: "",
  notes: "",
};

export default function TeacherForm({ initialTeacher, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(emptyTeacher);

  useEffect(() => {
    if (initialTeacher) {
      setFormData({
        firstName: initialTeacher.firstName || "",
        lastName: initialTeacher.lastName || "",
        email: initialTeacher.email || "",
        phone: initialTeacher.phone || "",
        subject: initialTeacher.subject || "",
        gradeLevel: initialTeacher.gradeLevel || "",
        notes: initialTeacher.notes || "",
      });
    } else {
      setFormData(emptyTeacher);
    }
  }, [initialTeacher]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      alert("First name and last name are required.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Teacher email is required.");
      return;
    }

    onSubmit(formData);
    setFormData(emptyTeacher);
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{initialTeacher ? "Edit Teacher" : "Add Teacher"}</h2>

      <div className="form-grid">
        <input
          className="input"
          name="firstName"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
        />

        <input
          className="input"
          name="lastName"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
        />

        <input
          className="input"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="input"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          className="input"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
        />

        <select
          className="input"
          name="gradeLevel"
          value={formData.gradeLevel}
          onChange={handleChange}
        >
          <option value="">Select grade level</option>
          <option value="K">Kindergarten</option>
          <option value="1st">1st Grade</option>
          <option value="2nd">2nd Grade</option>
          <option value="3rd">3rd Grade</option>
          <option value="4th">4th Grade</option>
          <option value="5th">5th Grade</option>
        </select>
      </div>

      <textarea
        className="input"
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
      />

      <div className="form-actions">
        <button className="btn btn-primary" type="submit">
          {initialTeacher ? "Save Changes" : "Add Teacher"}
        </button>

        {initialTeacher && (
          <button className="btn btn-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
