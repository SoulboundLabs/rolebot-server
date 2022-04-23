import { ADDR_DB } from "../config";
import Store from "../store";
import { FAKE_SIGNATURE } from "./mock";

(async ( collection ) => {
  const FAKES = await collection
    .where("signature", "==", FAKE_SIGNATURE)
    .get();
  FAKES.docs.forEach(async ( doc ) => {
    await collection.doc(doc.id).delete();
    console.log(`👊 Removed ${doc.id}`);
  });
})(new Store().db.collection(ADDR_DB));