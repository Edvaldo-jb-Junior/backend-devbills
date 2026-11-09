import  { cert, getApps, initializeApp } from "firebase-admin";
import { env } from "./env";


const initializeFirebaseAdmin= ():void => {
    if(getApps().length > 0) return;

    const { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID } = env;

    if (!FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY || !FIREBASE_PROJECT_ID) {
        throw new Error("Faltando variáveis de ambiente do Firebase");
    }

    try {
        initializeApp({
            credential: cert({
                projectId: FIREBASE_PROJECT_ID,
                privateKey: FIREBASE_PRIVATE_KEY,
                clientEmail: FIREBASE_CLIENT_EMAIL
            })
        });
        console.log("Firebase Admin inicializado com sucesso!");
    } catch (error) {
        console.error("Erro ao inicializar o Firebase Admin:", error);
        process.exit(1);
    };
}

export default initializeFirebaseAdmin;
