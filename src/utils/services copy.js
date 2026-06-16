import { db } from "../firebase";
import { ref, get, update, set, push } from "firebase/database";

// GET ALL
export async function getAllPresents() {
    const snapshot = await get(ref(db, "arniPresents"));
    console.log(snapshot);
    return snapshot.exists() ? snapshot.val() : {};
}

// GET ONE
export async function getPresentById(id) {
  const snapshot = await get(ref(db, `arniPresents/${id - 1}`));
  return snapshot.exists() ? snapshot.val() : null;
}

// CREATE
export async function createPresent(data) {
  const newRef = push(ref(db, "arniPresents"));
  await set(newRef, data);
  return newRef.key;
}

// UPDATE
export async function updatePresent(id, data) {
  return update(ref(db, `arniPresents/${id - 1}`), data);
}

// TOGGLE CHECK
export async function togglePresent(id, isChecked) {
  return update(ref(db, `arniPresents/${id - 1}`), {
    isChecked: !isChecked,
  });
}