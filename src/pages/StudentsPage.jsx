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
    guardianName: "Michael Williams",
    guardianPhone: "555-987-6543",
    guardianEmail: "michael@example.com",
    notes: "Strong math skills.",
  },
];

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [editingStudent, setEditingStudent] = useState(null);

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
    const shouldDelete = confirm("Are you sure you want to delete this student?");
    if (!shouldDelete) return;

    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== studentId)
    );
  }

  return (
    <main className="page">
      <header className="page-header">
        <h1 className="page-title">Student Directory</h1>
        <p className="page-subtitle">
          Add, update, and manage student records.
        </p>
      </header>

      <StudentForm
        initialStudent={editingStudent}
        onSubmit={handleSave}
        onCancel={() => setEditingStudent(null)}
      />

      <StudentTable
        students={students}
        onEdit={setEditingStudent}
        onDelete={handleDelete}
      />
    </main>
  );
}
