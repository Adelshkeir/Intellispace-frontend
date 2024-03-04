import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAV0usA005veQhiX_GoclF54BjueFel3ik",
  authDomain: "intelispace-c108d.firebaseapp.com",
  projectId: "intelispace-c108d",
  storageBucket: "intelispace-c108d.appspot.com",
  messagingSenderId: "765371645211",
  appId: "1:765371645211:web:f2ec71d652ef8f3b7d27be",
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
