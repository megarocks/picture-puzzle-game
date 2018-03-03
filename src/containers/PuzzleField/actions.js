import * as actionTypes from './actionTypes'

export const gameTurn = (puzzles) => {
  return {
    type: actionTypes.GAME_TURN,
    puzzles
  }
}

export const startNewGame = (puzzles) => {
  return {
    type: actionTypes.START_NEW_GAME,
    puzzles
  }
}