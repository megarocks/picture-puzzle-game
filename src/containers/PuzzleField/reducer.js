import * as actionTypes from './actionTypes'

import {
  getPuzzles,
  swapPuzzles,
  checkIfPuzzleClickable
} from './utils'


import { emptyPuzzleIndexSelector, qtyPuzzlesOnFieldSelector, puzzleSideSizeSelector, puzzlesPerSideSelector, puzzlesSelector } from './selectors'

export default function (state = {}, action) {
  const qtyPuzzlesOnField = qtyPuzzlesOnFieldSelector(state)
  const puzzleSideSize = puzzleSideSizeSelector(state)
  const puzzlesPerSide = puzzlesPerSideSelector(state)
  const puzzles = puzzlesSelector(state)

  switch (action.type) {

    case actionTypes.START_NEW_GAME:
      const generatedPuzzles = getPuzzles({ shouldBeRandom: action.isRandom, qtyPuzzlesOnField, puzzlesPerSide, puzzleSideSize});
      return state.set('puzzles', generatedPuzzles);

    case actionTypes.GAME_TURN:
      const { clickedPuzzle } = action
      const emptyPuzzleIdx = emptyPuzzleIndexSelector(state);

      const isClickablePuzzle = checkIfPuzzleClickable(clickedPuzzle, puzzlesPerSide,puzzles)
      if (!isClickablePuzzle) { return state }

      const clickedPuzzleIdx = puzzles.map(p => p.value).indexOf(clickedPuzzle.value)
      const puzzlesAfterSwap = swapPuzzles(emptyPuzzleIdx, clickedPuzzleIdx, puzzles)

      return state.set('puzzles', puzzlesAfterSwap);

    default:
      return state;
  }
}