import * as actionTypes from './actionTypes'

import {
  swapPuzzles,
  checkIfPuzzleClickable
} from './utils'

import { emptyPuzzleIndexSelector } from './selectors'

export default function (state = {}, action) {
  switch (action.type) {

    case actionTypes.START_NEW_GAME:
      return {
        ...state,
        puzzles: action.puzzles
      }

    case actionTypes.GAME_TURN:
      const { clickedPuzzle } = action
      const { puzzles, puzzlesPerSide } = state
      const emptyPuzzleIdx = emptyPuzzleIndexSelector(state);

      const isClickablePuzzle = checkIfPuzzleClickable(clickedPuzzle, puzzlesPerSide,puzzles)
      if (!isClickablePuzzle) { return state }

      const clickedPuzzleIdx = puzzles.map(p => p.value).indexOf(clickedPuzzle.value)
      const puzzlesAfterSwap = swapPuzzles(emptyPuzzleIdx, clickedPuzzleIdx, puzzles)

      return {
        ...state,
        puzzles: puzzlesAfterSwap
      }

    default:
      return state;
  }
}