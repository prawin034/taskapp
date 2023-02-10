// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBu2_E35jMTEus0BCEcPmp0At-zDQvFCdI',
  authDomain: 'form-ec1a9.firebaseapp.com',
  projectId: 'form-ec1a9',
  storageBucket: 'form-ec1a9.appspot.com',
  messagingSenderId: '517232102131',
  appId: '1:517232102131:web:4a26cdc1877d01265f8586',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
