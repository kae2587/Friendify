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
  await updateDoc(doc(db, "users", uid), updates);
};
