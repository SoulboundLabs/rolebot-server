import { cert, initializeApp } from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";

export default class Store {

  db: Firestore;

  constructor() {
    const APP = initializeApp({
      credential: cert(__dirname + "/rolebot-45f4c-92dabed858fc.json")
    });
    this.db = getFirestore(APP);
  }

  async getVerifiedAccounts() {
    if (!this.db) return; // TODO Proper error messaging ///////////////////////
    const snapshot = await this.db.collection('addresses').get();
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  }

}