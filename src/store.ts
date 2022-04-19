import { cert, initializeApp } from "firebase-admin/app";
import { GOOGLE_CERT_JSON } from "./config";
import { Firestore, getFirestore, QuerySnapshot } from "firebase-admin/firestore";

class ConnectionError extends Error {
  constructor() {
    super("🔥 Not connected to the database");
    this.name = "ConnectionError";
  }
}

export default class Store {

  db: Firestore;

  constructor() {
    const APP = initializeApp({ credential: cert(GOOGLE_CERT_JSON) });
    this.db = getFirestore(APP);
  }

  async getVerifiedAccounts(): Promise<QuerySnapshot> {
    if (!this.db) throw new ConnectionError();
    const snapshot = await this.db.collection('addresses').get();
    // snapshot.forEach((doc) => {
    //   console.log(doc.id, '=>', doc.data());
    // });
    return snapshot;
  }

  onUpdate( collection: string, callback: (snapshot: QuerySnapshot<FirebaseFirestore.DocumentData>) => void ) {
    const QUERY = this.db.collection(collection);  
    QUERY.onSnapshot(callback);
  }

}