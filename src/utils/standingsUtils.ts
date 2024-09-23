const TOP_TEAMS = 3;
const CHAMPIONS_LEAGUE_QUALIFIER_POSITION = 3;
const EUROPA_LEAGUE_POSITION = 4;
const EUROPA_CONFERENCE_LEAGUE_POSITION = 5;
const RELEGATION_PLAYOFF_POSITION = -3;
const RELEGATION_POSITIONS = 2;

export function getRowClass(index: number, arrayLength: number) {
  if (index < TOP_TEAMS) return "bg-blue-500/60";
  if (index === CHAMPIONS_LEAGUE_QUALIFIER_POSITION) return "bg-orange-500/60";
  if (index === EUROPA_LEAGUE_POSITION) return "bg-green-500/60";
  if (index === EUROPA_CONFERENCE_LEAGUE_POSITION) return "bg-blue-300/60";
  if (index === arrayLength + RELEGATION_PLAYOFF_POSITION)
    return "bg-yellow-500/60";
  if (index >= arrayLength - RELEGATION_POSITIONS - 1) return "bg-red-500/60"; // Adjusted condition
  return "";
}
