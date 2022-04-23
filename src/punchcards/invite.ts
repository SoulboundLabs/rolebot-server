import { 
  DEFAULT_TEST_SERVER_CONFIG, 
  CONF_DB, 
  TEST_SERVER_ID 
} from "../config";
import Store from "../store";

new Store()
  .db
  .collection(CONF_DB)
  .doc(TEST_SERVER_ID)
  .set(DEFAULT_TEST_SERVER_CONFIG)
  .then(() => {
    console.log("👊 SUCCESS");
  });