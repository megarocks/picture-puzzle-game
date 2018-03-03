export const gameTurn = (puzzles) => {
  return {
    type: 'GAME_TURN',
    puzzles
  }
}

export const startNewGame = (puzzles) => {
  return {
    type: 'START_NEW_GAME',
    puzzles
  }
}

export const puzzleClick = (puzzle) => {
  return {
    type: 'PUZZLE_CLICK',
    puzzle
  }
}