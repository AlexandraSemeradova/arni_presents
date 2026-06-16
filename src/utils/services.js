import { db } from "../firebase";
import { onValue, ref, get, update, set, push } from "firebase/database";
import { isObject } from "./functions";

// REALTIME LISTENER FOR ALL PRESENTS
export function subscribeToPresents(callback) {
  const presentsRef = ref(db, "arniPresents");

  return onValue(presentsRef, (snapshot) => {
    callback(snapshot.exists() ? {status: 'OK', data:snapshot.val()} : {status:'NOK', data: {}});
  });
}

// REALTIME LISTENER FOR ONE PRESENT - ID
export function subscribeToPresentById(id, callback) {
  const itemRef = ref(db, `arniPresents/${id - 1}`);

  return onValue(itemRef, (snapshot) => {
    callback(snapshot.exists() ? {status: 'OK', data:snapshot.val()} : {status:'NOK', data: {}});
  });
}

// GET ALL
export async function getAllPresents() {
  try {
    const snapshot = await get(ref(db, "arniPresents"));
    if (!snapshot.exists()) {
      console.error('Servise: Endpoint is not valid.');
      return {
        status: 404,
        data: null
      };
    } else {
        const data = snapshot.val();
        console.log(typeof data);
        if (isObject(data)) {
          return {
              status: 404,
              data: null
            };
        } else {
          return {
            status: 200,
            data: snapshot.val()
          };
        }
    }
  } catch (error) {
      console.error('Servise: Server/Firebase error.');
      return {
        status: 500,
        error: error.message
      };
  }
}

// GET ONE
export async function getPresentById(id) {
  try{
    const snapshot = await get(ref(db, `arniPresents/${id - 1}`));
     if (!snapshot.exists()) {
      console.error('Servise: Endpoint is not valid.');
      return {
        status: 404,
        data: null
      };
    } else {
        const data = snapshot.val();
        if (data === null || data !== "object") {
          return {
              status: 404,
              data: null
            };
        } else {
          return {
            status: 200,
            data: snapshot.val()
          };
        }
    }
  } catch (error) {
      console.error('Servise: Server/Firebase error.');
      return {
        status: 500,
        error: error.message
      };
  }
  // return snapshot.exists() ? snapshot.val() : null;
}

// CREATE
export async function createPresent(data) {
  try {
    const newRef = push(ref(db, "arniPresents"));
    await set(newRef, data);

    return {
      status: 200,
      data: { id: newRef.key }
    };

  } catch (error) {
    return { status: 500, error: error.message };
  }
}

// UPDATE
export async function updatePresent(id, data) {
  try {
    await update(ref(db, `arniPresents/${id - 1}`), data);

    return {
      status: 200,
      data: { updated: true }
    };

  } catch (error) {
    return { status: 500, error: error.message };
  }
}

// TOGGLE CHECK
export async function togglePresent(id, isChecked) {
  try {
    await update(ref(db, `arniPresents/${id - 1}`), {
      isChecked: !isChecked,
    });

    return {
      status: 200,
      data: { toggled: true }
    };

  } catch (error) {
    return { status: 500, error: error.message };
  }
}