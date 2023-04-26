// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnURvHzKLT7JStTSpchUW0E6W3jQIlS4I",
  authDomain: "fullstack-miniproject.firebaseapp.com",
  projectId: "fullstack-miniproject",
  storageBucket: "fullstack-miniproject.appspot.com",
  messagingSenderId: "601694685177",
  appId: "1:601694685177:web:e058ddb05c8deb2e1e5f28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
