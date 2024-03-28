export interface Team {
  crest: string;
  name: string;
  shortName: string;
}

export interface Score {
  fullTime: {
    home: number;
    away: number;
  };
}

export interface Competition {
  name: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  score?: Score;
  utcDate: string;
  competition: Competition;
  stage?: string;
  matchday?: number;
}
