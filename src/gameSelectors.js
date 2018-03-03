import { createSelector } from 'reselect'

import { getPuzzleRowAndColumnByNumber } from './gameUtils'

export const backgroundImgSelector = state => state.backgroundImg
export const fieldSideSizeSelector = state => state.fieldSideSize
export const puzzlesPerSideSelector = state => state.puzzlesPerSide
export const puzzlesSelector = state => state.puzzles
export const emptyPuzzleIndexSelector = state => state.puzzles.map(p => p.value).indexOf(0)

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
  (puzzlesPerSide, puzzles) => puzzles.every((puzzle, puzzleIndex) => {
    const [puzzleRowWhenSolved, puzzleColumnWhenSolved] = getPuzzleRowAndColumnByNumber(puzzlesPerSide, puzzleIndex)
    const puzzleAtCorrectPlace = puzzle.fieldRow === puzzleRowWhenSolved && puzzle.fieldColumn === puzzleColumnWhenSolved
    return puzzleAtCorrectPlace
  })
)