import { useEffect, useState } from "react";

const emptyStudent = {
  firstName: "",
  lastName: "",
  birthday: "",
  gradeLevel: "",
  guardianName: "",
  guardianPhone: "",
  guardianEmail: "",
  notes: "",
};

export default function StudentForm({ initialStudent, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(emptyStudent);

  useEffect(() => {
    if (initialStudent) {
      setFormData({
        firstName: initialStudent.firstName || "",
        lastName: initialStudent.lastName || "",
        birthday: initialStudent.birthday || "",
        gradeLevel: initialStudent.gradeLevel || "",
        guardianName: initialStudent.guardianName || "",
        guardianPhone: initialStudent.guardianPhone || "",
        guardianEmail: initialStudent.guardianEmail || "",
        notes: initialStudent.notes || "",
      });
    } else {
      setFormData(emptyStudent);
    }
  }, [initialStudent]);

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

    onSubmit(formData);
    setFormData(emptyStudent);
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{initialStudent ? "Edit Student" : "Add Student"}</h2>

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
          name="birthday"
          type="date"
          value={formData.birthday}
          onChange={handleChange}
        />

        <select
          className="input"
          name="gradeLevel"
          value={formData.gradeLevel}
          onChange={handleChange}
        >
          <option value="">Select grade</option>
          <option value="K">Kindergarten</option>
          <option value="1st">1st Grade</option>
          <option value="2nd">2nd Grade</option>
          <option value="3rd">3rd Grade</option>
          <option value="4th">4th Grade</option>
          <option value="5th">5th Grade</option>
        </select>

        <input
          className="input"
          name="guardianName"
          placeholder="Guardian name"
          value={formData.guardianName}
          onChange={handleChange}
        />

        <input
          className="input"
          name="guardianPhone"
          placeholder="Guardian phone"
          value={formData.guardianPhone}
          onChange={handleChange}
        />

        <input
          className="input"
          name="guardianEmail"
          placeholder="Guardian email"
          value={formData.guardianEmail}
          onChange={handleChange}
        />
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
