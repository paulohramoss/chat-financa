import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Inicializar Firebase Admin SDK
const firebaseConfig = {
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
};

admin.initializeApp(firebaseConfig);

const db = admin.firestore();

export { db, admin };
