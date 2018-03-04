import { createSelector } from 'reselect'

import { getPuzzleRowAndColumnByNumber } from './utils'

export const backgroundImgSelector = state => state.get('backgroundImg')
export const fieldSideSizeSelector = state => state.get('fieldSideSize')
export const puzzlesPerSideSelector = state => state.get('puzzlesPerSide')
export const puzzlesSelector = state => state.get('puzzles')

export const qtyPuzzlesOnFieldSelector = createSelector(
  puzzlesPerSideSelector,
  (puzzlesPerSide) => puzzlesPerSide * puzzlesPerSide
)

export const puzzleSideSizeSelector = createSelector(
  fieldSideSizeSelector,
  puzzlesPerSideSelector,
  (fieldSideSize, puzzlesPerSide) => fieldSideSize / puzzlesPerSide
)

export const isPazzleSolvedSelector = createSelector(
  puzzlesPerSideSelector,
  puzzlesSelector,
  (puzzlesPerSide, puzzles) => puzzles.every((puzzle) => {
    const [puzzleRowWhenSolved, puzzleColumnWhenSolved] = getPuzzleRowAndColumnByNumber(puzzlesPerSide, puzzle.value)
    const isPuzzleAtCorrectPlace = puzzle.fieldRow === puzzleRowWhenSolved && puzzle.fieldColumn === puzzleColumnWhenSolved
    return isPuzzleAtCorrectPlace
  })
)

export const emptyPuzzleIndexSelector = createSelector(
  puzzlesSelector,
  (puzzles) => puzzles.map(p => p.value).indexOf(0)
)
