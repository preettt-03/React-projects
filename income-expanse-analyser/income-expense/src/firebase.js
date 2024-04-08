// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyB62zdy36Oy1CL5hAWSF53X0rAx7JuJ_gk",
    authDomain: "react-firebase-in-ex-analysis.firebaseapp.com",
    projectId: "react-firebase-in-ex-analysis",
    storageBucket: "react-firebase-in-ex-analysis.appspot.com",
    messagingSenderId: "847627545278",
    appId: "1:847627545278:web:2903de4081bdf730190cef",
    measurementId: "G-7TL70WJLX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export{auth , provider , db};
