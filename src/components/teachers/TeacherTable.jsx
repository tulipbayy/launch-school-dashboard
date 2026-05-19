export default function TeacherTable({ teachers, onEdit, onDelete }) {
  if (teachers.length === 0) {
    return <p className="empty-message">No teachers found.</p>;
  }

  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Grade Level</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>
                {teacher.firstName} {teacher.lastName}
              </td>
              <td>{teacher.email || "N/A"}</td>
              <td>{teacher.phone || "N/A"}</td>
              <td>{teacher.subject || "N/A"}</td>
              <td>
                <span className="badge">{teacher.gradeLevel || "N/A"}</span>
              </td>
              <td className="table-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => onEdit(teacher)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(teacher.id)}
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
