export interface Badge extends Role {
  id: string,
  name: string,
  soulScore: number
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

export interface ServerConfig {
  enabled: boolean;
  protocols: Array<Protocol>;
}

export interface VerifiedUser {
  wallets: Array<string>;
  discordID: string;
  deleteMe: boolean;
}

export interface UpdateQueue {
  [key: string]: Array<VerifiedUser>
}