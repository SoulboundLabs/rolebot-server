export interface ServerConfig {
  enabled: boolean;
  protocols: Array<Protocol>;
}

export interface Protocol {
  id: string;
  name: string;
  networks: Array<string>;
  roles: Array<Role>;
}

export interface Role {
  id: string;
  name: string;
}

export interface VerifiedUser {
  wallets: Array<string>;
  discordID: string;
  deleteMe: boolean;
}