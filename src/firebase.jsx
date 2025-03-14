import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJRiwL87PHG39TLvdeUqnt_CQVlEEO0as",
  authDomain: "intelispace-82b49.firebaseapp.com",
  projectId: "intelispace-82b49",
  storageBucket: "intelispace-82b49.firebasestorage.app",
  messagingSenderId: "57308685445",
  appId: "1:57308685445:web:bff63199d67eb17114f5ec",
  measurementId: "G-CMK3C30BH5",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export default uploadImage;
