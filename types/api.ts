export interface Match {
  id: number;
  utcDate: string;
  homeTeam: {
    name: string;
    shortName: string;
    crest: string;
  };
  awayTeam: {
    name: string;
    shortName: string;
    crest: string;
  };
  score: {
    fullTime: {
      home: number;
      away: number;
    };
  };
  competition: {
    name: string;
  };
}

export interface Standing {
  position: number;
  team: {
    name: string;
    tla: string;
    crest: string;
  };
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
}
