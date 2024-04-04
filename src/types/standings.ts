export interface Team {
  id: number;
  crest: string;
  name: string;
  shortName: string;
}

export interface Standing {
  position: number;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  team: Team;
}

export interface StandingsTable {
  table: Standing[];
}
