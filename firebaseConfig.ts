import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDL-It5UZ9xuSvAgVsaQdmETL4wXqR7mHU",
  authDomain: "restate.firebaseapp.com",
  projectId: "restate-98d61",
  storageBucket: "restate-98d61.firebasestorage.app",
  messagingSenderId: "394542627961",
  appId: "1:394542627961:android:893e12659a9272f30c28a8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // ✅ works with Expo Go
