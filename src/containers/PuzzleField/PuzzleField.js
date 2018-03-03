import React, { Component } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'

import { getPuzzles } from './utils';

import './PuzzleField.css'
import Puzzle from './Puzzle'

import { startNewGame, gameTurn } from './actions'

import {
  backgroundImgSelector,
  puzzleSideSizeSelector,
  fieldSideSizeSelector,
  puzzlesPerSideSelector,
  puzzlesSelector,
  qtyPuzzlesOnFieldSelector,
  isPazzleSolvedSelector,
  emptyPuzzleIndexSelector
 } from './selectors'

class PuzzleField extends Component {

  componentWillMount() {
    const { qtyPuzzlesOnField, puzzlesPerSide, puzzleSideSize } = this.props
    const puzzles = getPuzzles({
      qtyPuzzlesOnField, puzzlesPerSide, puzzleSideSize,
      shouldBeRandom: false
    })
    this.props.startNewGame(puzzles)
  }

  render() {
    const { backgroundImg, fieldSideSize, puzzleSideSize, puzzles, isPuzzleSolved, gameTurn } = this.props;

    const gameFieldStyles = {
      width: `${fieldSideSize}px`,
      height: `${fieldSideSize}px`,
      position: 'relative'
    }

    const cssClases = cn({
      'PuzzleField': true,
      'PuzzleField--solved': isPuzzleSolved
    })
    return (
      <div className={cssClases} style={gameFieldStyles} >
        {puzzles.map(puzzle => (
          <Puzzle key={puzzle.value} puzzle={puzzle} onClick={gameTurn} sideSize={puzzleSideSize} backgroundImg={backgroundImg} />
        ))}
      </ div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gameTurn: (clickedPuzzle) => dispatch(gameTurn(clickedPuzzle)),
    startNewGame: (puzzles) => dispatch(startNewGame(puzzles))
  };
}

const mapStateToProps = (state) => {
  return {
    fieldSideSize: fieldSideSizeSelector(state),
    puzzlesPerSide: puzzlesPerSideSelector(state),
    backgroundImg: backgroundImgSelector(state),
    puzzleSideSize: puzzleSideSizeSelector(state),
    puzzles: puzzlesSelector(state),
    qtyPuzzlesOnField: qtyPuzzlesOnFieldSelector(state),
    isPuzzleSolved: isPazzleSolvedSelector(state),
    emptyPuzzleIdx: emptyPuzzleIndexSelector(state)
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(PuzzleField)