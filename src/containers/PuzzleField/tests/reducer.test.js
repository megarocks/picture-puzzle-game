import gameStateReducer from '../reducer'

import { startNewGame, gameTurn } from '../actions'


describe('gameStateReducer', () => {
  let state
  beforeEach(() => {
    state = {
      fieldSideSize: 500,
      puzzlesPerSide: 4,
      puzzles: []
    }
  });

  it('should return the initial state', () => {
    expect(gameStateReducer(undefined, {})).toEqual({});
  });

  it('should have puzzlesPerSide*puzzlesPerSide puzzles when game started', () => {
      const expectedResult = state.puzzlesPerSide * state.puzzlesPerSide
      expect(gameStateReducer(state, startNewGame(true)).puzzles).toHaveLength(expectedResult)
  })

  it('should give capability to start game already solved', () => {

    const solvedGame = gameStateReducer(state, startNewGame(false))
    expect(solvedGame.puzzles[0].fieldRow).toEqual(state.puzzlesPerSide - 1)
    expect(solvedGame.puzzles[0].fieldColumn).toEqual(state.puzzlesPerSide - 1)
    expect(solvedGame.puzzles[1].fieldRow).toEqual(0)
    expect(solvedGame.puzzles[1].fieldColumn).toEqual(0)
    expect(solvedGame.puzzles[solvedGame.puzzles.length - 1].fieldRow).toEqual(state.puzzlesPerSide - 1)
    expect(solvedGame.puzzles[solvedGame.puzzles.length - 1].fieldColumn).toEqual(state.puzzlesPerSide - 2)
  })

  it('should be no changes to puzzles when turn on unclickable puzzle', () => {

    const solvedGameState = gameStateReducer(state, startNewGame(false))
    const lastPuzzleBeforeTurn = solvedGameState.puzzles[1]
    const stateAfterClickOnLastPuzzle = gameStateReducer(solvedGameState, gameTurn(lastPuzzleBeforeTurn))
    const lastPuzzleAfterTurn = stateAfterClickOnLastPuzzle.puzzles[1]
    expect(lastPuzzleAfterTurn).toEqual(lastPuzzleBeforeTurn)
  })

  it('should swap between puzzles when turn on clickable puzzle', () => {

    const solvedGameState = gameStateReducer(state, startNewGame(false))
    const lastPuzzleBeforeTurn = solvedGameState.puzzles[solvedGameState.puzzles.length - 1]
    const stateAfterClickOnLastPuzzle = gameStateReducer(solvedGameState, gameTurn(lastPuzzleBeforeTurn))
    const lastPuzzleAfterTurn = stateAfterClickOnLastPuzzle.puzzles[solvedGameState.puzzles.length - 1]
    expect(lastPuzzleAfterTurn).not.toEqual(lastPuzzleBeforeTurn)
  })

})


