import * as actionTypes from './actionTypes'

export default function (state = {}, action) {
  switch (action.type) {
    case actionTypes.START_NEW_GAME:
      return {
        ...state,
        puzzles: action.puzzles
      }
    case actionTypes.GAME_TURN:
      return {
        ...state,
        puzzles: action.puzzles
      }
    default:
      return state;
  }
}

