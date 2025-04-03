import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCZUfwq_hlFX-Asogz5-mtmu-CkziksOzY',
  authDomain: 'auth-21123.firebaseapp.com',
  projectId: 'auth-21123',
  storageBucket: 'auth-21123.firebasestorage.app',
  messagingSenderId: '642242643580',
  appId: '1:642242643580:web:fd195f0b6817f9c055ebf9',
  measurementId: 'G-VXV0B6QY95',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
