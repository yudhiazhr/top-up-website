import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  
  apiKey:  import.meta.env.VITE_API_API_KEY_FIREBASE,
  authDomain:  import.meta.env.VITE_API_AUTH_DOMAIN_FIREBASE,
  projectId:  import.meta.env.VITE_API_PROJECT_ID_FIREBASE,
  storageBucket:  import.meta.env.VITE_API_STORAGE_BUCKET_FIREBASE,
  messagingSenderId:  import.meta.env.VITE_API_MESSAGING_SENDER_ID_FIREBASE,
  appId:  import.meta.env.VITE_API_APP_ID_FIREBASE,
  measurementId:  import.meta.env.VITE_API_MEASUREMENT_ID_FIREBASE,   

}


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);