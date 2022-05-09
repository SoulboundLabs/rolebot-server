import { cert, initializeApp } from "firebase-admin/app";
import { GOOGLE_CERT_JSON, ADDR_DB, CONF_DB } from "./config";
import { Firestore, getFirestore, QuerySnapshot } from "firebase-admin/firestore";
import { ServerConfig, VerifiedUser } from "./types";

class ConnectionError extends Error {
  constructor() {
    super("✋ Not connected to the database");
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
    const SNAPSHOT = await this.db.collection(ADDR_DB).get();
    // SNAPSHOT.forEach((doc) => {
    //   console.log(doc.id, '=>', doc.data());
    // });
    return SNAPSHOT;
  }

  async getServerConfig( id: string ): Promise<ServerConfig | undefined> {
    if (!this.db) throw new ConnectionError();
    const DOC = await this.db.collection(CONF_DB).doc(id).get();
    return DOC.data() as ServerConfig;
  }

  deleteUserData( wallets: Array<string> ): void {
    if (!this.db) throw new ConnectionError();
    for (const wallet of wallets) {
      this.db.collection(ADDR_DB).doc(wallet).delete();
    }
  }

  onUpdate( collection: string, callback: (snapshot: QuerySnapshot<FirebaseFirestore.DocumentData>) => void ) {
    const QUERY = this.db.collection(collection);  
    QUERY.onSnapshot(callback);
  }

}