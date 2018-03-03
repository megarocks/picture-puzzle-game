import * as actionTypes from './actionTypes'

export const gameTurn = (clickedPuzzle) => {
  return {
    type: actionTypes.GAME_TURN,
    clickedPuzzle
  }
}

export const startNewGame = (isRandom) => {
  return {
    type: actionTypes.START_NEW_GAME,
    isRandom
  }
}