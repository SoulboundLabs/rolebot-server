import 'dotenv/config';
import Discord from "discord.js";

const discordClient = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"], partials: ['MESSAGE', 'CHANNEL'] });
discordClient.on('ready', () => {
  console.log("//// Rolebot operational ////");
});
discordClient.login(process.env.BOT_TOKEN);