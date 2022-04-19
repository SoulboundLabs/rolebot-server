import { CLIENT_OPTIONS, CLIENT_URL, VERIFY_URL, CMD_PREFIX } from "./config";
import { Commands, Palette } from "./config";
import Discord, { 
  Client, 
  ColorResolvable, 
  Guild, 
  Message, 
  MessageActionRow,
  MessageButton,
  MessageEmbed, 
  User 
} from "discord.js";
import Messages from "./messages.json";
import Store from "./store";

interface ServerSettings {
  enabled: boolean,
  protocol: string;
  networks: Array<string>;
  roles: Array<string>;
}

export default class Rolebot {

  client: Client;
  store: Store;

  constructor( token: string ) {
    this.client = new Discord.Client(CLIENT_OPTIONS);
    this.registerEventHandlers();
    this.store = new Store();
    this.client.login(token);
  }

  // SETUP /////////////////////////////////////////////////////////////////////
  // FN:REGISTER_EVENT_HANDLERS ////////////////////////////////////////////////
  registerEventHandlers() {
    this.client.on('ready', this.onReady.bind(this));
    this.client.on("guildCreate", this.onGuildCreate.bind(this));
    this.client.on("messageCreate", this.onMessageCreate.bind(this));
  }
  //////////////////////////////////////////////////////////////////////////////

  // EVENTS ////////////////////////////////////////////////////////////////////
  // ON:READY //////////////////////////////////////////////////////////////////
  onReady() {
    console.log("// 🤖 operational //");
    this.store.getVerifiedAccounts();
  }
  // ON:GUILD_CREATE ///////////////////////////////////////////////////////////
  // Fires whenever the bot joins a new server /////////////////////////////////
  async onGuildCreate( guild: Guild ) {
    console.log(`// 🤖 joined ${guild.name} (${guild.id}) //`);
    // TODO Push a new, disabled ServerSettings entry to the DB ////////////////
  }
  // ON:MESSAGE_CREATE /////////////////////////////////////////////////////////
  async onMessageCreate( message: Message ) {
    if (message.author.bot || message.inGuild() ) return; // DMs only //////////
    if (!message.content.startsWith(CMD_PREFIX)) return; // Commands only //////
    const CMD = message.content.slice(1);
    switch (CMD) {
      case Commands.ShowUserRoles:
        if (false) { // TODO Query the db to find the user's verified roles ////
          // TODO Display all verified roles ///////////////////////////////////
        } else {
          this.sendVerificationLink(message.author);
        }
        break;
      case Commands.UnlinkWallet:
        // TODO Implement function to wipe a user's data (on this server?) /////
        break;
      case Commands.ShowServerConfig:
        // TODO Only show this information to Rolebot server admins ////////////
        // MAYBEDO Respond with a "Select Server" dropdown /////////////////////
        this.sendServerConfig(message.author);
        break;
      case Commands.MockWelcome:
        this.sendMockWelcomeMessage(message.author);
        break;
      default:
        console.log("// 🤖 encountered unknown command //");
    }
  }
  //////////////////////////////////////////////////////////////////////////////

  // FUNC //////////////////////////////////////////////////////////////////////
  // FN:SEND_PRIVATE_MESSAGE ///////////////////////////////////////////////////
  sendPrivateMessage( to: User, title = "", desc = "", color?: Palette ) {
    const MSG = new MessageEmbed();
    MSG.setColor((color ? color : Palette.Brand) as ColorResolvable);
    if (title !== "") MSG.setTitle(title);
    if (desc !== "") MSG.setDescription(desc);
    to.send({ embeds: [MSG] });
  }
  // FN:SEND_VERIFICATION_LINK /////////////////////////////////////////////////
  sendVerificationLink( user: User ) {
    const CURL = CLIENT_URL + '' // Any params? E.g. Server / user ID? /////////
    const VURL = VERIFY_URL;

    const DESC = Messages.unverified.description.replace(/\$URL/ig, CURL);
    const EMBED = new MessageEmbed();
    EMBED.setTitle(Messages.unverified.title);
    EMBED.setDescription(DESC);
    const ROW = new MessageActionRow().addComponents(
      new MessageButton().setURL(VURL)
                         .setLabel("Get verified")
                         .setStyle("LINK")
    );
    user.send({ embeds: [EMBED], components: [ROW] });
  }
  // FN:SEND_SERVER_CONFIG ////////////////////////////////////////////////////
  sendServerConfig( user: User ) {
    const SETTINGS = JSON.stringify(this.retrieveServerSettings(), null, 2);
    this.sendPrivateMessage(
      user, 
      Messages.config.title, 
      Messages.config.description.replace(/\$CONFIG/ig, SETTINGS), 
      Palette.Confidential
    );
  }
  // FN:SEND_MOCK_WELCOME_MESSAGE //////////////////////////////////////////////
  sendMockWelcomeMessage( user: User ) {
    const S = this.retrieveServerSettings();
    const T = Messages.welcome.title.replace('$PROTOCOL', S.protocol);
    const D = Messages.welcome.description.replace(/\$PROTOCOL/ig, S.protocol);
    this.sendPrivateMessage(user, T, D);
  }
  // FN:POST_WELCOME_MESSAGE ///////////////////////////////////////////////////
  postWelcomeMessage() {
    // TODO See if we can determine the guild's 'general' channel //////////////
    // TODO Post the message publicly in 'general' /////////////////////////////
  }
  // FN:RETRIEVE_SERVER_SETTINGS ///////////////////////////////////////////////
  retrieveServerSettings( id?: string ): ServerSettings {
    // TODO Make this function retrieve the actual settings ////////////////////
    return {
      enabled: true,
      protocol: "The Graph",
      networks: ["Subgraph 1", "Subgraph 2"],
      roles: ["Delegator", "Indexer", "Curator", "Subgraph Dev"]
    };
  }
  //////////////////////////////////////////////////////////////////////////////

}