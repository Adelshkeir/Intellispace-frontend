import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJRiwL87PHG39TLvdeUqnt_CQVlEEO0as",
  authDomain: "intelispace-82b49.firebaseapp.com",
  projectId: "intelispace-82b49",
  storageBucket: "intelispace-82b49.appspot.com",
  messagingSenderId: "57308685445",
  appId: "1:57308685445:web:bff63199d67eb17114f5ec",
  measurementId: "G-CMK3C30BH5"
};

const app = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${file.name}`);

    const uploadTask = imageRef.put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        reject(error);
      },
      () => {
        imageRef.getDownloadURL().then((url) => {
          resolve(url);
        });
      }
    );
  });
};

export default uploadImage;
