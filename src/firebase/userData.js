import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const createUserDoc = async (uid, userData) => {
  await setDoc(doc(db, "users", uid), userData);
};

export const getUserData = async (uid) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateUserData = async (uid, updates) => {
  await setDoc(doc(db, "users", uid), updates, { merge: true });
};

export const saveUserSpotifyData = async (uid, data) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    await updateDoc(userRef, data);
  } else {
    await setDoc(userRef, data);
  }
};

export const saveUserProfile = async (uid, profile) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    profile
  });
};