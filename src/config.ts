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
export const CMD_PREFIX = '.';

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
  Confidential = '#000000'
};