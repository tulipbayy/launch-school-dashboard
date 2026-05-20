import { useState } from "react";
import StudentForm from "../components/students/StudentForm";
import StudentTable from "../components/students/StudentTable";

const initialStudents = [
  {
    id: "s1",
    firstName: "Emma",
    lastName: "Johnson",
    birthday: "2016-04-12",
    gradeLevel: "3rd",
    className: "3A - Ms. Carter",
    guardianName: "Sarah Johnson",
    guardianPhone: "555-123-4567",
    guardianEmail: "sarah@example.com",
    notes: "Enjoys reading.",
  },
  {
    id: "s2",
    firstName: "Noah",
    lastName: "Williams",
    birthday: "2015-09-20",
    gradeLevel: "4th",
    className: "4B - Mr. Lee",
    guardianName: "Michael Williams",
    guardianPhone: "555-987-6543",
    guardianEmail: "michael@example.com",
    notes: "Strong math skills.",
  },
];

const gradeOptions = ["K", "1st", "2nd", "3rd", "4th", "5th"];

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All");

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredStudents = students
    .filter((student) => {
      const fullName = `${student.firstName || ""} ${
        student.lastName || ""
      }`.toLowerCase();
      const guardian = (student.guardianName || "").toLowerCase();
      const email = (student.guardianEmail || "").toLowerCase();
      const phone = (student.guardianPhone || "").toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        fullName.includes(normalizedSearch) ||
        guardian.includes(normalizedSearch) ||
        email.includes(normalizedSearch) ||
        phone.includes(normalizedSearch);

      const matchesGrade =
        selectedGrade === "All" || student.gradeLevel === selectedGrade;

      return matchesSearch && matchesGrade;
    })
    .sort((a, b) =>
      `${a.lastName} ${a.firstName}`.localeCompare(
        `${b.lastName} ${b.firstName}`
      )
    );

  const studentsMissingContact = students.filter(
    (student) => !student.guardianPhone && !student.guardianEmail
  ).length;

  const assignedStudents = students.filter((student) => student.className).length;

  function handleSave(studentData) {
    if (editingStudent) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === editingStudent.id
            ? { ...student, ...studentData }
            : student
        )
      );
      setEditingStudent(null);
      return;
    }

    const newStudent = {
      id: crypto.randomUUID(),
      ...studentData,
    };

    setStudents((prevStudents) => [...prevStudents, newStudent]);
  }

  function handleDelete(studentId) {
    const shouldDelete = confirm(
      "Delete this student record? This action cannot be undone."
    );
    if (!shouldDelete) return;

    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== studentId)
    );
  }

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Thomas Jefferson Elementary</p>
          <h1 className="page-title">Student Directory</h1>
          <p className="page-subtitle">
            Add, update, search, and manage enrollment records.
          </p>
        </div>
      </header>

      <section className="summary-grid" aria-label="Student summary">
        <article className="summary-card">
          <span>Total Students</span>
          <strong>{students.length}</strong>
        </article>
        <article className="summary-card">
          <span>Assigned to Class</span>
          <strong>{assignedStudents}</strong>
        </article>
        <article className="summary-card">
          <span>Missing Contact</span>
          <strong>{studentsMissingContact}</strong>
        </article>
      </section>

      <StudentForm
        initialStudent={editingStudent}
        gradeOptions={gradeOptions}
        onSubmit={handleSave}
        onCancel={() => setEditingStudent(null)}
      />

      <section className="toolbar" aria-label="Student filters">
        <div className="toolbar-field">
          <label htmlFor="student-search">Search students</label>
          <input
            id="student-search"
            className="input"
            type="search"
            placeholder="Search by student, guardian, email, or phone"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="toolbar-field toolbar-field-small">
          <label htmlFor="grade-filter">Grade</label>
          <select
            id="grade-filter"
            className="input"
            value={selectedGrade}
            onChange={(event) => setSelectedGrade(event.target.value)}
          >
            <option value="All">All Grades</option>
            {gradeOptions.map((grade) => (
              <option key={grade} value={grade}>
                {grade === "K" ? "Kindergarten" : `${grade} Grade`}
              </option>
            ))}
          </select>
        </div>
      </section>

      <StudentTable
        students={filteredStudents}
        onEdit={setEditingStudent}
        onDelete={handleDelete}
      />
    </main>
  );
}
