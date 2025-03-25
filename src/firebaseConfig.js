import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwRYx-PPnZZ6ZPPQ20rkPW02ZGWAtNttI",
  authDomain: "ecommerce-859cf.firebaseapp.com",
  projectId: "ecommerce-859cf",
  storageBucket: "ecommerce-859cf.firebasestorage.app",
  messagingSenderId: "56955066728",
  appId: "1:56955066728:web:12c41f1a0923a17b129edd",
  measurementId: "G-3DND3CKB8C",
  databaseURL:"https://ecommerce-859cf-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
