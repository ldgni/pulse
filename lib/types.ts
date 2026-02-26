interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

interface Competition {
  name: string;
}

interface Score {
  fullTime: {
    home: number;
    away: number;
  };
}

export interface Match {
  id: number;
  utcDate: string;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
  competition: Competition;
}

export interface Standing {
  position: number;
  team: Team;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
}
