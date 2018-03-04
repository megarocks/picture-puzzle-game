import { fromJS } from 'immutable';

import gameStateReducer from '../reducer'
import { startNewGame, gameTurn } from '../actions'


describe('gameStateReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      fieldSideSize: 500,
      puzzlesPerSide: 4,
      puzzles: []
    })
  });

  it('should have puzzlesPerSide*puzzlesPerSide puzzles when game started', () => {
    const puzzlesPerSide = state.get('puzzlesPerSide');
    const expectedResult = puzzlesPerSide * puzzlesPerSide
    expect(gameStateReducer(state, startNewGame(true)).get('puzzles')).toHaveLength(expectedResult)
  })

  it('should give capability to start game already solved', () => {
    const solvedGame = gameStateReducer(state, startNewGame(false))
    expect(solvedGame.get('puzzles')[0].fieldRow).toEqual(state.get('puzzlesPerSide') - 1)
    expect(solvedGame.get('puzzles')[0].fieldColumn).toEqual(state.get('puzzlesPerSide') - 1)
    expect(solvedGame.get('puzzles')[1].fieldRow).toEqual(0)
    expect(solvedGame.get('puzzles')[1].fieldColumn).toEqual(0)
    expect(solvedGame.get('puzzles')[solvedGame.get('puzzles').length - 1].fieldRow).toEqual(state.get('puzzlesPerSide') - 1)
    expect(solvedGame.get('puzzles')[solvedGame.get('puzzles').length - 1].fieldColumn).toEqual(state.get('puzzlesPerSide') - 2)
  })

  it('should be no changes to puzzles when turn on unclickable puzzle', () => {
    const solvedGameState = gameStateReducer(state, startNewGame(false))
    const lastPuzzleBeforeTurn = solvedGameState.get('puzzles')[1]
    const stateAfterClickOnLastPuzzle = gameStateReducer(solvedGameState, gameTurn(lastPuzzleBeforeTurn))
    const lastPuzzleAfterTurn = stateAfterClickOnLastPuzzle.get('puzzles')[1]
    expect(lastPuzzleAfterTurn).toEqual(lastPuzzleBeforeTurn)
  })

  it('should swap between puzzles when turn on clickable puzzle', () => {
    const solvedGameState = gameStateReducer(state, startNewGame(false))
    const lastPuzzleBeforeTurn = solvedGameState.get('puzzles')[solvedGameState.get('puzzles').length - 1]
    const stateAfterClickOnLastPuzzle = gameStateReducer(solvedGameState, gameTurn(lastPuzzleBeforeTurn))
    const lastPuzzleAfterTurn = stateAfterClickOnLastPuzzle.get('puzzles')[solvedGameState.get('puzzles').length - 1]
    expect(lastPuzzleAfterTurn).not.toEqual(lastPuzzleBeforeTurn)
  })

})


