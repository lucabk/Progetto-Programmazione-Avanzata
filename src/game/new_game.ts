import {
  EnglishDraughts as Draughts,
} from 'rapid-draughts/english';

export function createGame() {
  // Initialise the game
  const draughts = Draughts.setup();

  return { draughts }

}
