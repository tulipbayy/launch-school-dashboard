export default function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return <p className="empty-message">No students found.</p>;
  }

  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
            <th>Birthday</th>
            <th>Guardian</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                {student.firstName} {student.lastName}
              </td>
              <td>
                <span className="badge">{student.gradeLevel || "N/A"}</span>
              </td>
              <td>{student.birthday || "N/A"}</td>
              <td>{student.guardianName || "N/A"}</td>
              <td>{student.guardianPhone || student.guardianEmail || "N/A"}</td>
              <td className="table-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => onEdit(student)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
