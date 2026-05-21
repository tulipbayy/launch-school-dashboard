import { useEffect, useState } from "react";
import StudentForm from "../components/students/StudentForm";
import StudentTable from "../components/students/StudentTable";
import {
  createStudent,
  deleteStudent,
  getStudents,
  seedStudents,
  updateStudent,
} from "../services/studentService";

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
  {
    id: "s3",
    firstName: "Olivia",
    lastName: "Brown",
    birthday: "2017-01-08",
    gradeLevel: "2nd",
    className: "2A - Ms. Patel",
    guardianName: "Diane Brown",
    guardianPhone: "555-222-1188",
    guardianEmail: "diane.brown@example.com",
    notes: "Receives reading support.",
  },
  {
    id: "s4",
    firstName: "Liam",
    lastName: "Garcia",
    birthday: "2018-03-19",
    gradeLevel: "1st",
    className: "1B - Mr. Davis",
    guardianName: "Ana Garcia",
    guardianPhone: "555-310-4490",
    guardianEmail: "ana.garcia@example.com",
    notes: "Excellent classroom helper.",
  },
  {
    id: "s5",
    firstName: "Ava",
    lastName: "Martinez",
    birthday: "2014-12-03",
    gradeLevel: "5th",
    className: "5A - Ms. Wilson",
    guardianName: "Rosa Martinez",
    guardianPhone: "555-876-4412",
    guardianEmail: "rosa.martinez@example.com",
    notes: "Student council representative.",
  },
  {
    id: "s6",
    firstName: "Ethan",
    lastName: "Davis",
    birthday: "2015-07-22",
    gradeLevel: "4th",
    className: "4A - Ms. Nguyen",
    guardianName: "Andre Davis",
    guardianPhone: "555-661-2044",
    guardianEmail: "andre.davis@example.com",
    notes: "Enjoys science projects.",
  },
  {
    id: "s7",
    firstName: "Mia",
    lastName: "Miller",
    birthday: "2019-05-11",
    gradeLevel: "K",
    className: "K1 - Ms. Green",
    guardianName: "Kelly Miller",
    guardianPhone: "555-404-7710",
    guardianEmail: "kelly.miller@example.com",
    notes: "Afternoon pickup by aunt on Fridays.",
  },
  {
    id: "s8",
    firstName: "Lucas",
    lastName: "Wilson",
    birthday: "2016-11-30",
    gradeLevel: "3rd",
    className: "3B - Mr. Brooks",
    guardianName: "Harold Wilson",
    guardianPhone: "555-730-1182",
    guardianEmail: "harold.wilson@example.com",
    notes: "Prefers front-row seating.",
  },
  {
    id: "s9",
    firstName: "Sophia",
    lastName: "Anderson",
    birthday: "2017-06-17",
    gradeLevel: "2nd",
    className: "2B - Mr. Cooper",
    guardianName: "Maya Anderson",
    guardianPhone: "555-229-8830",
    guardianEmail: "maya.anderson@example.com",
    notes: "Strong art skills.",
  },
  {
    id: "s10",
    firstName: "Mason",
    lastName: "Thomas",
    birthday: "2018-09-02",
    gradeLevel: "1st",
    className: "1A - Ms. Rivera",
    guardianName: "Caleb Thomas",
    guardianPhone: "555-673-9001",
    guardianEmail: "caleb.thomas@example.com",
    notes: "Bus rider.",
  },
  {
    id: "s11",
    firstName: "Isabella",
    lastName: "Taylor",
    birthday: "2014-02-27",
    gradeLevel: "5th",
    className: "5B - Mr. Harris",
    guardianName: "Nora Taylor",
    guardianPhone: "555-441-7812",
    guardianEmail: "nora.taylor@example.com",
    notes: "Advanced math group.",
  },
  {
    id: "s12",
    firstName: "James",
    lastName: "Moore",
    birthday: "2015-10-14",
    gradeLevel: "4th",
    className: "4B - Mr. Lee",
    guardianName: "Peter Moore",
    guardianPhone: "555-919-5400",
    guardianEmail: "peter.moore@example.com",
    notes: "Needs inhaler on field trips.",
  },
  {
    id: "s13",
    firstName: "Charlotte",
    lastName: "Jackson",
    birthday: "2019-08-23",
    gradeLevel: "K",
    className: "K2 - Mr. Young",
    guardianName: "Elaine Jackson",
    guardianPhone: "555-393-1177",
    guardianEmail: "elaine.jackson@example.com",
    notes: "Speech support on Tuesdays.",
  },
  {
    id: "s14",
    firstName: "Benjamin",
    lastName: "White",
    birthday: "2016-02-05",
    gradeLevel: "3rd",
    className: "3A - Ms. Carter",
    guardianName: "Monica White",
    guardianPhone: "555-612-3434",
    guardianEmail: "monica.white@example.com",
    notes: "Enjoys coding club.",
  },
  {
    id: "s15",
    firstName: "Amelia",
    lastName: "Harris",
    birthday: "2017-04-28",
    gradeLevel: "2nd",
    className: "2A - Ms. Patel",
    guardianName: "Jordan Harris",
    guardianPhone: "555-100-4566",
    guardianEmail: "jordan.harris@example.com",
    notes: "Peanut allergy.",
  },
  {
    id: "s16",
    firstName: "Henry",
    lastName: "Martin",
    birthday: "2018-12-16",
    gradeLevel: "1st",
    className: "1B - Mr. Davis",
    guardianName: "Leah Martin",
    guardianPhone: "555-706-1818",
    guardianEmail: "leah.martin@example.com",
    notes: "New enrollment.",
  },
  {
    id: "s17",
    firstName: "Harper",
    lastName: "Thompson",
    birthday: "2014-06-07",
    gradeLevel: "5th",
    className: "5A - Ms. Wilson",
    guardianName: "Victor Thompson",
    guardianPhone: "555-882-5019",
    guardianEmail: "victor.thompson@example.com",
    notes: "Robotics club.",
  },
  {
    id: "s18",
    firstName: "Alexander",
    lastName: "Robinson",
    birthday: "2015-11-09",
    gradeLevel: "4th",
    className: "4A - Ms. Nguyen",
    guardianName: "Simone Robinson",
    guardianPhone: "555-732-6090",
    guardianEmail: "simone.robinson@example.com",
    notes: "IEP meeting scheduled.",
  },
  {
    id: "s19",
    firstName: "Evelyn",
    lastName: "Clark",
    birthday: "2019-10-21",
    gradeLevel: "K",
    className: "K1 - Ms. Green",
    guardianName: "Rachel Clark",
    guardianPhone: "555-234-6600",
    guardianEmail: "rachel.clark@example.com",
    notes: "After-school care.",
  },
  {
    id: "s20",
    firstName: "Daniel",
    lastName: "Lewis",
    birthday: "2016-07-01",
    gradeLevel: "3rd",
    className: "3B - Mr. Brooks",
    guardianName: "Owen Lewis",
    guardianPhone: "555-809-2121",
    guardianEmail: "owen.lewis@example.com",
    notes: "Great participation.",
  },
  {
    id: "s21",
    firstName: "Abigail",
    lastName: "Lee",
    birthday: "2017-09-26",
    gradeLevel: "2nd",
    className: "2B - Mr. Cooper",
    guardianName: "Grace Lee",
    guardianPhone: "555-909-8181",
    guardianEmail: "grace.lee@example.com",
    notes: "Bilingual household.",
  },
  {
    id: "s22",
    firstName: "Michael",
    lastName: "Walker",
    birthday: "2018-01-13",
    gradeLevel: "1st",
    className: "1A - Ms. Rivera",
    guardianName: "Tanya Walker",
    guardianPhone: "555-467-3201",
    guardianEmail: "tanya.walker@example.com",
    notes: "Needs bus pass replacement.",
  },
  {
    id: "s23",
    firstName: "Elizabeth",
    lastName: "Hall",
    birthday: "2014-03-31",
    gradeLevel: "5th",
    className: "5B - Mr. Harris",
    guardianName: "Brian Hall",
    guardianPhone: "555-388-1455",
    guardianEmail: "brian.hall@example.com",
    notes: "Choir member.",
  },
  {
    id: "s24",
    firstName: "Sebastian",
    lastName: "Allen",
    birthday: "2015-05-25",
    gradeLevel: "4th",
    className: "4B - Mr. Lee",
    guardianName: "Priya Allen",
    guardianPhone: "",
    guardianEmail: "priya.allen@example.com",
    notes: "Guardian phone pending.",
  },
];

const gradeOptions = ["K", "1st", "2nd", "3rd", "4th", "5th"];

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [selectedClass, setSelectedClass] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getStudents()
      .then((firebaseStudents) => {
        if (isMounted) {
          setStudents(firebaseStudents);
          setError("");
        }
      })
      .catch((loadError) => {
        console.error(loadError);

        if (isMounted) {
          setError("Unable to load students from Firebase.");
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

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const classOptions = Array.from(
    new Set(students.map((student) => student.className).filter(Boolean))
  ).sort();

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

      const matchesClass =
        selectedClass === "All" || student.className === selectedClass;

      return matchesSearch && matchesGrade && matchesClass;
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

  async function handleSave(studentData) {
    try {
      setIsSaving(true);
      setError("");

      if (editingStudent) {
        const updatedStudent = await updateStudent(editingStudent.id, studentData);

        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === editingStudent.id ? updatedStudent : student
          )
        );
        setEditingStudent(null);
        return;
      }

      const newStudent = await createStudent(studentData);
      setStudents((prevStudents) => [...prevStudents, newStudent]);
    } catch (saveError) {
      console.error(saveError);
      setError("Unable to save student record.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(studentId) {
    const shouldDelete = confirm(
      "Delete this student record? This action cannot be undone."
    );
    if (!shouldDelete) return;

    try {
      setError("");
      await deleteStudent(studentId);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== studentId)
      );
    } catch (deleteError) {
      console.error(deleteError);
      setError("Unable to delete student record.");
    }
  }

  async function handleSeedStudents() {
    try {
      setIsSaving(true);
      setError("");
      const createdStudents = await seedStudents(initialStudents);
      setStudents(createdStudents);
    } catch (seedError) {
      console.error(seedError);
      setError("Unable to create demo student records.");
    } finally {
      setIsSaving(false);
    }
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

      {error && (
        <div className="status-message status-message-error" role="alert">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="status-message">Loading student records...</div>
      )}

      {!isLoading && students.length === 0 && (
        <div className="status-message empty-data-message">
          <span>No Firebase student records yet.</span>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSeedStudents}
            disabled={isSaving}
          >
            {isSaving ? "Creating Records..." : "Create Demo Records"}
          </button>
        </div>
      )}

      <StudentForm
        key={editingStudent?.id || "new-student"}
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

        <div className="toolbar-field">
          <label htmlFor="class-filter">Class</label>
          <select
            id="class-filter"
            className="input"
            value={selectedClass}
            onChange={(event) => setSelectedClass(event.target.value)}
          >
            <option value="All">All Classes</option>
            {classOptions.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>
      </section>

      {!isLoading && students.length > 0 && (
        <StudentTable
          students={filteredStudents}
          onEdit={setEditingStudent}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}
