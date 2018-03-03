import * as actionTypes from './actionTypes'

import {
  getPuzzles,
  swapPuzzles,
  checkIfPuzzleClickable
} from './utils'

import { emptyPuzzleIndexSelector, qtyPuzzlesOnFieldSelector, puzzleSideSizeSelector } from './selectors'

export default function (state = {}, action) {
  const { puzzlesPerSide, puzzles } = state
  const qtyPuzzlesOnField = qtyPuzzlesOnFieldSelector(state)
  const puzzleSideSize = puzzleSideSizeSelector(state)

  switch (action.type) {

    case actionTypes.START_NEW_GAME:
      return {
        ...state,
        puzzles: getPuzzles({ shouldBeRandom: action.isRandom, qtyPuzzlesOnField, puzzlesPerSide, puzzleSideSize})
      }

    case actionTypes.GAME_TURN:
      const { clickedPuzzle } = action
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