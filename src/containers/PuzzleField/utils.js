import cd from 'clone-deep'

export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export const getPuzzles = ({ qtyPuzzlesOnField, puzzlesPerSide, puzzleSideSize, shouldBeRandom }) => {
  console.log({ qtyPuzzlesOnField, puzzlesPerSide, puzzleSideSize, shouldBeRandom })
  let puzzleValues = []
  if (shouldBeRandom) {
    while (puzzleValues.length < qtyPuzzlesOnField) {
      const randomInt = getRandomIntInclusive(0, qtyPuzzlesOnField - 1)
      if (puzzleValues.indexOf(randomInt) > -1) { continue } else {
        puzzleValues.push(randomInt)
      }
    }
  } else {
    for (let i = 0; i < qtyPuzzlesOnField; i++) {
      puzzleValues.push(i <= qtyPuzzlesOnField - 1 ? i : 0);
    }
  }

  const puzzles = puzzleValues.map((puzzleValue, puzzleIndex) => {

    const [fieldRow, fieldColumn] = getPuzzleRowAndColumnByNumber(puzzlesPerSide ,puzzleIndex)
    const [fieldX, fieldY] = getCoordinatesByPosition(puzzleSideSize, fieldRow, fieldColumn)

    const [backgroundRow, backgroundColumn] = getPuzzleRowAndColumnByNumber(puzzlesPerSide, puzzleValue)
    const [backgroundX, backgroundY] = getCoordinatesByPosition(puzzleSideSize, backgroundRow, backgroundColumn)

    return {
      value: puzzleValue, fieldRow, fieldColumn, fieldX, fieldY, backgroundX, backgroundY
    }
  })
  console.log(puzzles)
  return puzzles
}

export const getPuzzleRowAndColumnByNumber = (puzzlesPerSide, value) => {
  if (value === 0) return [puzzlesPerSide - 1, puzzlesPerSide - 1]

  const row = Math.ceil(value / puzzlesPerSide) - 1
  const column = (value - 1) % puzzlesPerSide
  return [row, column]
}

export const getCoordinatesByPosition = (puzzleSideSize, row, column) => {
  const x = column * puzzleSideSize
  const y = row * puzzleSideSize
  return [x, y]
}

export const getAllNeighborsOf = (clickedPuzzle, puzzles, puzzlesPerSide) => {
  const neighbors = []

  // puzzle below
  if (clickedPuzzle.fieldRow - 1 >= 0 && clickedPuzzle.fieldRow - 1 <= puzzlesPerSide - 1) {
    neighbors.push(puzzles.find(p => (p.fieldRow === clickedPuzzle.fieldRow - 1 && p.fieldColumn === clickedPuzzle.fieldColumn)))
  }

  // puzzle above
  if (clickedPuzzle.fieldRow + 1 >= 0 && clickedPuzzle.fieldRow + 1 <= puzzlesPerSide - 1) {
    neighbors.push(puzzles.find(p => (p.fieldRow === clickedPuzzle.fieldRow + 1 && p.fieldColumn === clickedPuzzle.fieldColumn)))
  }

  // puzzle to the left
  if (clickedPuzzle.fieldColumn - 1 >= 0 && clickedPuzzle.fieldColumn - 1 <= puzzlesPerSide - 1) {
    neighbors.push(puzzles.find(p => (p.fieldColumn === clickedPuzzle.fieldColumn - 1 && p.fieldRow === clickedPuzzle.fieldRow)))
  }

  // puzzle to the right
  if (clickedPuzzle.fieldColumn + 1 >= 0 && clickedPuzzle.fieldColumn + 1 <= puzzlesPerSide - 1) {
    neighbors.push(puzzles.find(p => (p.fieldColumn === clickedPuzzle.fieldColumn + 1 && p.fieldRow === clickedPuzzle.fieldRow)))
  }

  return neighbors
}

export const swapPuzzles = (emptyPuzzleIdx, clickedPuzzleIdx, puzzles) => {
  const swapedPuzzles = cd(puzzles)

  const clickedPuzzle = swapedPuzzles[clickedPuzzleIdx]
  const emptyPuzzle = swapedPuzzles[emptyPuzzleIdx]
  const emptyPuzzleCopy = cd(emptyPuzzle)

  emptyPuzzle.fieldX = clickedPuzzle.fieldX
  emptyPuzzle.fieldY = clickedPuzzle.fieldY
  emptyPuzzle.fieldColumn = clickedPuzzle.fieldColumn
  emptyPuzzle.fieldRow = clickedPuzzle.fieldRow

  clickedPuzzle.fieldX = emptyPuzzleCopy.fieldX
  clickedPuzzle.fieldY = emptyPuzzleCopy.fieldY
  clickedPuzzle.fieldColumn = emptyPuzzleCopy.fieldColumn
  clickedPuzzle.fieldRow = emptyPuzzleCopy.fieldRow

  return swapedPuzzles;
}

export const checkIfPuzzleClickable = (clickedPuzzle, puzzlesPerSide, puzzles) => {
  const clickedPuzzleNeighbors = getAllNeighborsOf(clickedPuzzle, puzzles, puzzlesPerSide)
  const isClickablePuzzle = clickedPuzzleNeighbors.map(p => p.value).indexOf(0) > -1
  return isClickablePuzzle;
}