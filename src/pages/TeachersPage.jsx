import { useState } from "react";
import TeacherForm from "../components/teachers/TeacherForm";
import TeacherTable from "../components/teachers/TeacherTable";

const initialTeachers = [
  {
    id: "t1",
    firstName: "Olivia",
    lastName: "Smith",
    email: "olivia.smith@tjelementary.edu",
    phone: "555-222-1111",
    subject: "Math",
    gradeLevel: "3rd",
    notes: "Homeroom teacher.",
  },
  {
    id: "t2",
    firstName: "James",
    lastName: "Brown",
    email: "james.brown@tjelementary.edu",
    phone: "555-333-2222",
    subject: "Science",
    gradeLevel: "4th",
    notes: "Science club advisor.",
  },
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [editingTeacher, setEditingTeacher] = useState(null);

  function handleSave(teacherData) {
    if (editingTeacher) {
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.id === editingTeacher.id
            ? { ...teacher, ...teacherData }
            : teacher
        )
      );
      setEditingTeacher(null);
      return;
    }

    const newTeacher = {
      id: crypto.randomUUID(),
      ...teacherData,
    };

    setTeachers((prevTeachers) => [...prevTeachers, newTeacher]);
  }

  function handleDelete(teacherId) {
    const shouldDelete = confirm("Are you sure you want to delete this teacher?");
    if (!shouldDelete) return;

    setTeachers((prevTeachers) =>
      prevTeachers.filter((teacher) => teacher.id !== teacherId)
    );
  }

  return (
    <main className="page">
      <header className="page-header">
        <h1 className="page-title">Teacher Directory</h1>
        <p className="page-subtitle">
          Add, update, and manage teacher records.
        </p>
      </header>

      <TeacherForm
        initialTeacher={editingTeacher}
        onSubmit={handleSave}
        onCancel={() => setEditingTeacher(null)}
      />

      <TeacherTable
        teachers={teachers}
        onEdit={setEditingTeacher}
        onDelete={handleDelete}
      />
    </main>
  );
}
