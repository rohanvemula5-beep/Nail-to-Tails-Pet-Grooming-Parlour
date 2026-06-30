import { initializeApp } from 'firebase/app';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "gen-lang-client-0348426245",
  appId: "1:627384955513:web:58f4316e4edf5b1a191aa8",
  apiKey: "AIzaSyDe4W4pMotsI_pGS8rcNLxoxCzpwORSPpY",
  authDomain: "gen-lang-client-0348426245.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-nailtotails-20b3a52a-9195-446c-86a5-04815143ced0",
  storageBucket: "gen-lang-client-0348426245.firebasestorage.app",
  messagingSenderId: "627384955513",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, firebaseConfig.firestoreDatabaseId);

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase connection established successfully.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration: the client is offline.");
    } else {
      console.warn("Firebase connection tested. If permissions allow, it is fully active:", error);
    }
  }
}
testConnection();
