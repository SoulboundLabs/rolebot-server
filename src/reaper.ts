import { GraphQLClient } from "graphql-request";
import { THE_GRAPH_BADGES_URL, THE_GRAPH_BADGES_QUERY } from "./config";
import { TEST_BADGES } from "./punchcards/mock";
import { Role } from "./types";

export class ReaperFactory {
  static sendFor( protocol: string, victim: Array<string> ): Reaper {
    if (protocol === 'the-graph') {
      return new BadgeReaper(victim);
    } else {
      return new MockReaper(victim);
    }
  }
}

interface Reaper {
  victim: Array<string>;
  reap(): Promise<Role[]>;
}

class MockReaper implements Reaper {

  constructor( public victim: Array<string> ) {
    console.log("// 💀 MockReaper is ready to reap souls", this.victim);
  }

  reap(): Promise<Role[]> {
    return Promise.resolve(TEST_BADGES
      .filter(( badge ) => this.victim.includes(badge.badgeWinner.id))
      .map(( badge ) => ({ id: badge.id, name: badge.metaData.name } as Role)));
  }

}

class BadgeReaper implements Reaper {

  gql: GraphQLClient;
  query: string;

  constructor( public victim: Array<string> ) {
    // TODO Make this constructor accept different networks ////////////////////
    this.gql = new GraphQLClient(THE_GRAPH_BADGES_URL); 
    this.query = THE_GRAPH_BADGES_QUERY;
    console.log("// 💀 BadgeReaper is ready to reap souls", this.victim);
  }

  async reap(): Promise<Role[]> {
    const RES = await this.gql.rawRequest(this.query, this.victim);
    console.log(RES.data);
    return RES.data.map(( badge: { id: string, metaData: { name: string } } ) => ({
      id: badge.id, name: badge.metaData.name
    } as Role));
  }

}