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

const eventsCollection = collection(db, "events");

export async function getEvents() {
  const snapshot = await getDocs(eventsCollection);
  return snapshot.docs.map((eventDoc) => ({
    id: eventDoc.id,
    ...eventDoc.data(),
  }));
}

export async function createEvent(eventData) {
  const eventRef = await addDoc(eventsCollection, {
    ...eventData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return {
    id: eventRef.id,
    ...eventData,
  };
}

export async function updateEvent(eventId, eventData) {
  const eventRef = doc(db, "events", eventId);

  await updateDoc(eventRef, {
    ...eventData,
    updatedAt: serverTimestamp(),
  });

  return {
    id: eventId,
    ...eventData,
  };
}

export async function deleteEvent(eventId) {
  const eventRef = doc(db, "events", eventId);
  await deleteDoc(eventRef);
}

export async function seedEvents(events) {
  const created = await Promise.all(
    events.map(({ id: _id, ...eventData }) => createEvent(eventData))
  );
  return created;
}
