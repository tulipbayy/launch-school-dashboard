import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import "./App.css";

function App() {
  const [teacherName, setTeacherName] = useState("");
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);

  const [classForm, setClassForm] = useState({
    className: "",
    gradeLevel: "",
    subject: "",
    room: "",
  });

  const [studentForm, setStudentForm] = useState({
    studentName: "",
    className: "",
    grade: "",
  });

  useEffect(() => {
    const unsubscribeClasses = onSnapshot(collection(db, "classes"), (snapshot) => {
      const classData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setClasses(classData);
    });

    const unsubscribeStudents = onSnapshot(collection(db, "students"), (snapshot) => {
      const studentData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setStudents(studentData);
    });

    return () => {
      unsubscribeClasses();
      unsubscribeStudents();
    };
  }, []);

  function handleTeacherLogin(e) {
    e.preventDefault();

    if (!teacherName.trim()) {
      alert("Please enter your teacher name.");
    }
  }

  function handleClassChange(e) {
    setClassForm({
      ...classForm,
      [e.target.name]: e.target.value,
    });
  }

  function handleStudentChange(e) {
    setStudentForm({
      ...studentForm,
      [e.target.name]: e.target.value,
    });
  }

  async function addClass(e) {
    e.preventDefault();

    if (!classForm.className || !classForm.gradeLevel || !teacherName) {
      alert("Please enter a teacher name and class information.");
      return;
    }

    await addDoc(collection(db, "classes"), {
      ...classForm,
      teacherName,
      createdAt: new Date(),
    });

    setClassForm({
      className: "",
      gradeLevel: "",
      subject: "",
      room: "",
    });
  }

  async function addStudentToClass(e) {
    e.preventDefault();

    if (!studentForm.studentName || !studentForm.className) {
      alert("Please enter a student name and class.");
      return;
    }

    await addDoc(collection(db, "students"), {
      studentName: studentForm.studentName,
      className: studentForm.className,
      grade: studentForm.grade || "Not graded",
      teacherName,
    });

    setStudentForm({
      studentName: "",
      className: "",
      grade: "",
    });
  }

  async function updateStudentGrade(studentId, newGrade) {
    await updateDoc(doc(db, "students", studentId), {
      grade: newGrade,
    });
  }

  async function removeStudent(studentId) {
    await deleteDoc(doc(db, "students", studentId));
  }

  const teacherClasses = classes.filter(
    (classItem) =>
      classItem.teacherName?.toLowerCase() === teacherName.toLowerCase()
  );

  const teacherStudents = students.filter(
    (student) =>
      student.teacherName?.toLowerCase() === teacherName.toLowerCase()
  );

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Navigation</h2>
        <p>Home</p>
        <p>Student Database</p>
        <p>School Statistics</p>
        <p className="active">Teacher Dashboard</p>
        <p>Calendar</p>
        <p className="logout">Logout</p>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div>
            <h1>Teacher Dashboard</h1>
            <p>
              View your assigned classes, manage student grades, and add students
              to your roster.
            </p>
          </div>
        </header>

        <section className="teacher-login-card">
          <form onSubmit={handleTeacherLogin}>
            <label>Teacher Name</label>
            <div className="login-row">
              <input
                type="text"
                placeholder="Example: Ms. Johnson"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
              />
              <button type="submit">View Dashboard</button>
            </div>
          </form>
        </section>

        {teacherName && (
          <>
            <section className="stats-row">
              <div className="stat-card">
                <h3>Total Classes</h3>
                <p>{teacherClasses.length}</p>
              </div>

              <div className="stat-card">
                <h3>Total Students</h3>
                <p>{teacherStudents.length}</p>
              </div>

              <div className="stat-card">
                <h3>Role</h3>
                <p>Teacher</p>
              </div>
            </section>

            <section className="content-grid">
              <div className="panel">
                <h2>Add Class</h2>
                <p className="panel-note">
                  This lets a teacher create a class assigned to their name.
                </p>

                <form onSubmit={addClass} className="form-stack">
                  <input
                    name="className"
                    placeholder="Class name"
                    value={classForm.className}
                    onChange={handleClassChange}
                  />
                  <input
                    name="gradeLevel"
                    placeholder="Grade level"
                    value={classForm.gradeLevel}
                    onChange={handleClassChange}
                  />
                  <input
                    name="subject"
                    placeholder="Subject"
                    value={classForm.subject}
                    onChange={handleClassChange}
                  />
                  <input
                    name="room"
                    placeholder="Room number"
                    value={classForm.room}
                    onChange={handleClassChange}
                  />
                  <button type="submit">Add Class</button>
                </form>
              </div>

              <div className="panel">
                <h2>Add Student Grade</h2>
                <p className="panel-note">
                  Teachers can add students to their own roster and record a grade.
                </p>

                <form onSubmit={addStudentToClass} className="form-stack">
                  <input
                    name="studentName"
                    placeholder="Student name"
                    value={studentForm.studentName}
                    onChange={handleStudentChange}
                  />

                  <select
                    name="className"
                    value={studentForm.className}
                    onChange={handleStudentChange}
                  >
                    <option value="">Select class</option>
                    {teacherClasses.map((classItem) => (
                      <option key={classItem.id} value={classItem.className}>
                        {classItem.className}
                      </option>
                    ))}
                  </select>

                  <input
                    name="grade"
                    placeholder="Grade"
                    value={studentForm.grade}
                    onChange={handleStudentChange}
                  />

                  <button type="submit">Add Student</button>
                </form>
              </div>
            </section>

            <section className="panel full-width">
              <h2>My Classes</h2>

              {teacherClasses.length === 0 ? (
                <p className="empty-message">No classes found for this teacher yet.</p>
              ) : (
                <div className="class-grid">
                  {teacherClasses.map((classItem) => (
                    <div className="class-card" key={classItem.id}>
                      <h3>{classItem.className}</h3>
                      <p>
                        <strong>Grade:</strong> {classItem.gradeLevel}
                      </p>
                      <p>
                        <strong>Subject:</strong> {classItem.subject}
                      </p>
                      <p>
                        <strong>Room:</strong> {classItem.room}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="panel full-width">
              <h2>Student Roster and Grades</h2>

              {teacherStudents.length === 0 ? (
                <p className="empty-message">No students added yet.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Class</th>
                      <th>Grade</th>
                      <th>Update Grade</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {teacherStudents.map((student) => (
                      <tr key={student.id}>
                        <td>{student.studentName}</td>
                        <td>{student.className}</td>
                        <td>{student.grade}</td>
                        <td>
                          <input
                            className="grade-input"
                            placeholder="New grade"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateStudentGrade(student.id, e.target.value);
                                e.target.value = "";
                              }
                            }}
                          />
                        </td>
                        <td>
                          <button
                            className="small-button"
                            onClick={() => removeStudent(student.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;