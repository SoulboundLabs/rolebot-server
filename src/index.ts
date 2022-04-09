import 'dotenv/config';
import Discord, { ClientOptions, MessageEmbed, User } from "discord.js";

// CONST //////////////////////////////////////////////////////////////////////
// Configuration options for Discord bot permissions //////////////////////////
const CLIENT_OPTIONS: ClientOptions = { 
  intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], 
  partials: ['MESSAGE', 'CHANNEL'] 
};
// Where to send users to connect their wallet + Discord account //////////////
const VERIFY_URL = 'https://rolebot.emblemdao.com/verify/';

// FUNC ///////////////////////////////////////////////////////////////////////
// FN:SEND_VERIFY_LINK ////////////////////////////////////////////////////////
function sendVerificationLink( user: User ) {
  const msg = new MessageEmbed()
    .setColor('#CA4072')
    .setTitle('Roleless are we?')
    .setDescription(`Prithee, head to [${VERIFY_URL}](${VERIFY_URL}) to receive
                     recognition for your on-chain efforts.`);
  user.send({ embeds: [msg] });
}

// INIT ///////////////////////////////////////////////////////////////////////
((BOT_TOKEN) => {

  if (!BOT_TOKEN) {
    console.log('// 🔥 BOT_TOKEN not found! Ask @bloomingbridges //');
    process.exit(1);
  }

  const discordClient = new Discord.Client(CLIENT_OPTIONS);
  
  // ON:READY /////////////////////////////////////////////////////////////////
  discordClient.on('ready', () => {
    console.log("// 🤖 Rolebot operational //");
  });
  
  // ON:MESSAGE_CREATE ////////////////////////////////////////////////////////
  discordClient.on("messageCreate", async (message) => {
    if (message.author.bot || message.inGuild() ) return; // DMs only
    // Uncomment below to filter out messages that aren't commands
    // if (!message.content.startsWith(".")) return; 
    if (message.content === ".whoami") {
      sendVerificationLink(message.author);
    }
  });
  
  discordClient.login(BOT_TOKEN);

})(process.env.BOT_TOKEN);