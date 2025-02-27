export interface Team {
  id: number;
  name: string;
  shortName: string;
  crest: string;
}

export interface Match {
  id: number;
  competition: {
    name: string;
    emblem: string;
  };
  utcDate: string;
  status: string;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
}

export interface StandingEntry {
  position: number;
  team: Team;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
}

export interface StandingsResponse {
  standings: {
    table: StandingEntry[];
  }[];
}
