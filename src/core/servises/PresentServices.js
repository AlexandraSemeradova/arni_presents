import { db } from "../firebase/firebase";
import { onValue, ref, get, update, set, push } from "firebase/database";
import { isObject } from "../../utils/helpers";

// REALTIME LISTENER FOR ALL PRESENTS
export function subscribeToPresents(callback) {
  const presentRef = ref(db, "arniPresents");
  return onValue(presentRef,(snapshot) => {
    try {
      const exists = snapshot.exists();
      if (!exists) {
        throw new Error('Servise: Data does not exist.');
      }
      callback({status: "OK", data: snapshot.val()});
    }
    catch (error) {
      console.error(error.message)
      callback({status: "NO_CONTENT", data: []});
    }
  },
  (error) => {
    console.error('Servise: Endpoint is not valid or other server/backend error. Check rules in firebase.');
    callback({status: "ERROR", data: [], error: error.message});
  }
  );
}

// REALTIME LISTENER FOR ONE PRESENT - ID
export function subscribeToPresentById(id, callback) {
  const presentRef = ref(db, `arniPresents/${id - 1}`);

  return onValue(presentRef, (snapshot) => {
    try {
      const exists = snapshot.exists();
      if (!exists) {
        throw new Error('Servise: Object does not exist.');
      }
      callback({status: "OK", data: snapshot.val()});
    }
    catch (error) {
      console.error(error.message)
      callback({status: "NO_CONTENT", data: {}});
    }
  },
    (error) => {
      console.error('Servise: Endpoint is not valid or other server/backend error. Check rules in firebase.');
      callback({status: "ERROR", data: {}, error: error.message});
    }
  );
}

// GET ALL (no listener)
export async function getAllPresents(callback) {
  try {
    const snapshot = await get(ref(db, "arniPresents"));

    if (!snapshot.exists()) {
      console.error("Service: Data does not exist.");
      return callback({ status: "NO_CONTENT", data: [] });
    }

    return callback({ status: "OK", data: snapshot.val() });

  } catch (error) {
    console.error("Service: Server/Firebase error.", error.message);
    return callback({ status: "ERROR", data: [], error: error.message });
  }
}

// GET ONE
export async function getPresentById(id) {
  try {
    const snapshot = await get(ref(db, `arniPresents/${id - 1}`));

    if (!snapshot.exists()) {
      console.error("Service: Data does not exist.");
      return callback({ status: "NO_CONTENT", data: {} });
    }

    return callback({ status: "OK", data: snapshot.val() });

  } catch (error) {
    console.error("Service: Server/Firebase error.", error.message);
    return callback({ status: "ERROR", data: {}, error: error.message });
  }
}

// CREATE
export async function createPresent(data) {
  try {
    const newRef = push(ref(db, "arniPresents"));
    await set(newRef, data);

    return {
      status: "OK",
      data: { id: newRef.key }
    };

  } catch (error) {
    return { status: "ERROR", error: error.message };
  }
}

// UPDATE
export async function updatePresent(id, data) {
  try {
    await update(ref(db, `arniPresents/${id - 1}`), data);

    return {
      status: "OK",
      data: { updated: true }
    };

  } catch (error) {
    return { status: "ERROR", error: error.message };
  }
}

//TOGGLE
export async function togglePresent(id, isChecked, email) {
  try {
    const presentRef = ref(db, `arniPresents/${id - 1}`);

    const snapshot = await get(presentRef);
    const presentData = snapshot.val();

    await update(presentRef, {
      isChecked: !isChecked,
      reservedByEmail: email,
    });

    return {
      status: "OK",
      data: {presentData}
    };

  } catch (error) {
    return { status: "ERROR", error: error.message };
  }
}