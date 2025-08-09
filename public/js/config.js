// Initialize Firebase with environment variables
const firebaseConfig = {
    // apiKey: process.env.FIREBASE_API_KEY,
    // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.FIREBASE_PROJECT_ID,
    // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.FIREBASE_APP_ID,
    // measurementId: process.env.FIREBASE_MEASUREMENT_ID
    apiKey: "AIzaSyBfx2U6d3EFfDBTdr6VPVXtWsDLElNSPmA",
  authDomain: "biashara-37163.firebaseapp.com",
  projectId: "biashara-37163",
  storageBucket: "biashara-37163.firebasestorage.app",
  messagingSenderId: "94176136097",
  appId: "1:94176136097:web:0b98048c135e3e0f61d9e0",
  measurementId: "G-36M6ZY7SZM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
//const storage = firebase.storage();

// Export Firebase services
// export { db, auth, storage };
export { db, auth };