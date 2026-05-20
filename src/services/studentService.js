import { db } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const studentsCollection = collection(db, "students");

export async function getStudents() {
  const snapshot = await getDocs(studentsCollection);

  return snapshot.docs.map((studentDoc) => ({
    id: studentDoc.id,
    ...studentDoc.data(),
  }));
}

export async function createStudent(studentData) {
  const studentRef = await addDoc(studentsCollection, {
    ...studentData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return {
    id: studentRef.id,
    ...studentData,
  };
}

export async function updateStudent(studentId, studentData) {
  const studentRef = doc(db, "students", studentId);

  await updateDoc(studentRef, {
    ...studentData,
    updatedAt: serverTimestamp(),
  });

  return {
    id: studentId,
    ...studentData,
  };
}

export async function deleteStudent(studentId) {
  const studentRef = doc(db, "students", studentId);

  await deleteDoc(studentRef);
}

export async function seedStudents(students) {
  const createdStudents = await Promise.all(
    students.map(({ id, ...studentData }) => createStudent(studentData))
  );

  return createdStudents;
}
