import { useState } from "react";

export default function StudentTable({ students, onEdit, onDelete }) {
  const [openGroups, setOpenGroups] = useState({});

  if (students.length === 0) {
    return (
      <div className="card empty-state">
        <h2>No students found</h2>
        <p>Try changing the search term or grade filter.</p>
      </div>
    );
  }

  const groupedStudents = groupStudentsByGradeAndClass(students);
  const visibleOpenGroups =
    Object.keys(openGroups).length === 0
      ? { [groupedStudents[0].key]: true }
      : openGroups;

  function toggleGroup(groupKey) {
    setOpenGroups((previousGroups) => ({
      ...previousGroups,
      [groupKey]: !visibleOpenGroups[groupKey],
    }));
  }

  function expandAllGroups() {
    setOpenGroups(
      groupedStudents.reduce((accumulator, group) => {
        accumulator[group.key] = true;
        return accumulator;
      }, {})
    );
  }

  function collapseAllGroups() {
    setOpenGroups(
      groupedStudents.reduce((accumulator, group) => {
        accumulator[group.key] = false;
        return accumulator;
      }, {})
    );
  }

  return (
    <div className="card">
      <div className="section-heading table-heading">
        <div>
          <h2>Student Records</h2>
          <p>
            {students.length} record{students.length === 1 ? "" : "s"} across{" "}
            {groupedStudents.length} roster
            {groupedStudents.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="record-controls">
          <button className="btn btn-secondary" type="button" onClick={expandAllGroups}>
            Expand All
          </button>
          <button className="btn btn-secondary" type="button" onClick={collapseAllGroups}>
            Collapse All
          </button>
        </div>
      </div>

      <div className="record-groups">
        {groupedStudents.map((group) => {
          const isOpen = Boolean(visibleOpenGroups[group.key]);

          return (
            <section className="record-group" key={group.key}>
              <button
                className="record-group-header"
                type="button"
                onClick={() => toggleGroup(group.key)}
                aria-expanded={isOpen}
              >
                <span className="accordion-icon">{isOpen ? "-" : "+"}</span>
                <h3>{group.gradeLabel}</h3>
                <span>{group.className}</span>
                <strong>
                  {group.students.length} student
                  {group.students.length === 1 ? "" : "s"}
                </strong>
              </button>

              {isOpen && (
                <div className="table-wrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th>Guardian</th>
                        <th>Contact</th>
                        <th>Notes</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {group.students.map((student) => (
                        <tr key={student.id}>
                          <td>
                            <strong>
                              {student.firstName} {student.lastName}
                            </strong>
                          </td>
                          <td>{formatDate(student.birthday)}</td>
                          <td>{student.guardianName || "N/A"}</td>
                          <td>
                            <div className="contact-stack">
                              <span>{student.guardianPhone || "No phone"}</span>
                              <span>{student.guardianEmail || "No email"}</span>
                            </div>
                          </td>
                          <td className="notes-cell">{student.notes || "None"}</td>
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
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function groupStudentsByGradeAndClass(students) {
  const gradeOrder = ["K", "1st", "2nd", "3rd", "4th", "5th"];
  const groups = students.reduce((accumulator, student) => {
    const gradeLevel = student.gradeLevel || "N/A";
    const className = student.className || "Unassigned";
    const key = `${gradeLevel}-${className}`;

    if (!accumulator[key]) {
      accumulator[key] = {
        key,
        gradeLevel,
        gradeLabel: formatGradeLabel(gradeLevel),
        className,
        students: [],
      };
    }

    accumulator[key].students.push(student);
    return accumulator;
  }, {});

  return Object.values(groups)
    .map((group) => ({
      ...group,
      students: group.students.sort((a, b) =>
        `${a.lastName || ""} ${a.firstName || ""}`.localeCompare(
          `${b.lastName || ""} ${b.firstName || ""}`
        )
      ),
    }))
    .sort((a, b) => {
      const gradeComparison =
        getGradeSortValue(a.gradeLevel, gradeOrder) -
        getGradeSortValue(b.gradeLevel, gradeOrder);

      if (gradeComparison !== 0) return gradeComparison;

      return a.className.localeCompare(b.className);
    });
}

function getGradeSortValue(gradeLevel, gradeOrder) {
  const index = gradeOrder.indexOf(gradeLevel);
  return index === -1 ? gradeOrder.length : index;
}

function formatGradeLabel(gradeLevel) {
  if (gradeLevel === "K") return "Kindergarten";
  if (gradeLevel === "N/A") return "Grade Not Assigned";
  return `${gradeLevel} Grade`;
}

function formatDate(dateValue) {
  if (!dateValue) return "N/A";

  const date = new Date(`${dateValue}T00:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
