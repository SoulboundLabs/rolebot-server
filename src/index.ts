import 'dotenv/config';
import Rolebot from './rolebot';

((BOT_TOKEN) => {

  if (!BOT_TOKEN) {
    console.log('// 🔥 BOT_TOKEN not found! Ask @bloomingbridges //');
    process.exit(1);
  }

  // TODO Set up a way of letting Rolebot know the db has been updated /////////

  // INIT //////////////////////////////////////////////////////////////////////
  new Rolebot(BOT_TOKEN);
  //////////////////////////////////////////////////////////////////////////////

})(process.env.BOT_TOKEN);