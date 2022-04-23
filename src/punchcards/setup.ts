import { 
  CONF_DB, 
  TEST_SERVER_ID 
} from "../config";
import Store from "../store";

new Store()
  .db
  .collection(CONF_DB)
  .doc(TEST_SERVER_ID)
  .update({ enabled: true })
  .then(() => {
    console.log("👊 SUCCESS");
  });
