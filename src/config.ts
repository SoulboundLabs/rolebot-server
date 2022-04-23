import { ClientOptions, Intents } from "discord.js";

// Configuration options for Discord bot permissions ///////////////////////////
export const CLIENT_OPTIONS: ClientOptions = { 
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.DIRECT_MESSAGES
  ], 
  partials: ["MESSAGE", 'CHANNEL', 'GUILD_MEMBER'] 
};

// Where to send users to connect their wallet + Discord account ///////////////
export const CLIENT_URL = process.env.CLIENT_URL || 'https://localhost:3000';
export const VERIFY_URL = process.env.VERIFY_URL || "!MISSING OAUTH URL!";

// Prefix for commands, e.g. '.' in '.whoami' //////////////////////////////////
export const CMD_PREFIX = '/';

// All the commands that Rolebot is listening for //////////////////////////////
export enum Commands {
  ShowUserRoles = 'whoami',
  UnlinkWallet = 'unlink',
  MockWelcome = 'saybeepboop',
  ShowServerConfig = 'spillit'
}

// Colour palette for bot messages /////////////////////////////////////////////
export enum Palette {
  Brand = '#CA4072',
  Confidential = '#000000',
  Error = '#FF0000'
};

// Google Firestore config /////////////////////////////////////////////////////
export const GOOGLE_CERT_JSON = __dirname + "/rolebot-45f4c-92dabed858fc.json";

// Google Firebase collection names ////////////////////////////////////////////
export const ADDR_DB = "addresses";
export const CONF_DB = "configurations";

// Server configurations ///////////////////////////////////////////////////////
export const TEST_SERVER_ID = '814601441980710982';
export const DEFAULT_TEST_SERVER_CONFIG = {
  enabled: false,
  protocols: [
    {
      id: "test",
      name: "Flotocol",
      networks: [],
      roles: [
        { id: "dank-memer", name: "Dank Memer" },
        { id: "troll-lord", name: "Troll Lord" },
        { id: "spam-blaster", name: "Spam Blaster" },
        { id: 'moji-hype-juicer', name: "Moji-hype Juicer" },
        { id: 'wall-flower', name: "Wall Flower" }
      ]
    },
  ]
};
export const DEFAULT_SERVER_CONFIG = {
  enabled: false,
  protocols: [
    {
      id: 'thegraph',
      name: 'The Graph',
      networks: ['mainnet'],
      roles: [
        { id: "indexer", name: "Indexer" },
        { id: "curator", name: "Curator" },
        { id: "delegator", name: "Delegator" },
        { id: "subgraph_dev", name: "Subgraph Developer" }
      ]
    }
  ]
};