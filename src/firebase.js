import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXXvoA7-9dDmOV1rvldsyMuiA56SeA8o8",
  authDomain: "restaurant-7cc61.firebaseapp.com",
  projectId: "restaurant-7cc61",
  storageBucket: "restaurant-7cc61.firebasestorage.app",
  messagingSenderId: "319413536505",
  appId: "1:319413536505:web:061d101e452e6981bdc428",
  measurementId: "G-BPFPCK9ZYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Authentication
export const auth = getAuth(app);
export default app;
