import { ADDR_DB } from "../config";
import Store from "../store";
import { TEST_USERS, TestUser } from "./mock";

if  (process.argv.length < 3) {
  console.log("✋ No user alias / wallet address given");
  process.exit(1);
}
const ARG = process.argv.slice(2)[0] as string;
const ALIAS = TEST_USERS[ARG] ? ARG : "Anon";
let user;

if (ARG.slice(0, 2) === "0x") {
  user = { wallets: [ARG] };
} else if (ALIAS !== "Anon") {
  user = TEST_USERS[ARG] as TestUser;
} else {
  console.log("✋ Alias not recognised");
  process.exit(1);
}

console.log(`👊 Unlinking all of ${ALIAS}'s wallets`);

(async () => {
  const COLLECTION = new Store().db.collection(ADDR_DB);
  for (const address of user.wallets) {
    console.log(`👊 Unlinking ${address}`);
    await COLLECTION.doc(address).delete();
    console.log("👊 SUCCESS");
  }
})();

