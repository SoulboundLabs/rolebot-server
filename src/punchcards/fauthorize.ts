import { ADDR_DB } from "../config";
import Store from "../store";
import { 
  TEST_USERS, 
  TestUser, 
  TestUserCollection, 
  FAKE_SIGNATURE 
} from "./mock";

const ARG = process.argv.slice(2)[0] as string;
let queue: TestUserCollection = {};

if (ARG && TEST_USERS[ARG]) {
  queue[ARG] = TEST_USERS[ARG] as TestUser;
} else {
  queue = TEST_USERS;
}

const COLLECTION = new Store().db.collection(ADDR_DB);
for (const [alias, user] of Object.entries(queue)) {
  // console.log(`👊 Fake authorising ${alias}`);
  for (const address of user.wallets) {
    COLLECTION.doc(address).set({
      discordID: user.discordID,
      signature: FAKE_SIGNATURE,
      deleteMe: false
    }).then(() => {
      console.log(`👊 Successfully verified ${alias}`);
    });
  }
}