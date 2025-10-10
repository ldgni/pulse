export interface Match {
  id: number;
  utcDate: string;
  homeTeam: { name: string; tla: string; crest: string };
  awayTeam: { name: string; tla: string; crest: string };
  score: {
    fullTime: {
      home: number;
      away: number;
    };
  };
  competition: { name: string };
}
