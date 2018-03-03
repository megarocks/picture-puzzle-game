import React, { Component } from 'react'
import cn from 'classnames'

import { connect } from 'react-redux'

import { getPuzzles, getAllNeighborsOf, swapPuzzles, checkIfPuzzleClickable } from './gameUtils';

import './PuzzleField.css'
import Puzzle from './Puzzle'

import { startNewGame, gameTurn } from './gameActions'

import {
  backgroundImgSelector,
  puzzleSideSizeSelector,
  fieldSideSizeSelector,
  puzzlesPerSideSelector,
  puzzlesSelector,
  qtyPuzzlesOnFieldSelector,
  isPazzleSolvedSelector,
  emptyPuzzleIndexSelector
 } from './gameSelectors'

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
    const { backgroundImg, fieldSideSize, puzzleSideSize, puzzles, isPuzzleSolved } = this.props;
    console.log({isPuzzleSolved})
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
          <Puzzle key={puzzle.value} puzzle={puzzle} onClick={this.onPuzzleClick} sideSize={puzzleSideSize} backgroundImg={backgroundImg} />
        ))}
      </ div>
    )
  }

  onPuzzleClick = (clickedPuzzle) => {
    const { puzzles, puzzlesPerSide, emptyPuzzleIdx, gameTurn } = this.props

    const isClickablePuzzle = checkIfPuzzleClickable(clickedPuzzle, puzzles, puzzlesPerSide)
    if (!isClickablePuzzle) { return }

    const clickedPuzzleIdx = puzzles.map(p => p.value).indexOf(clickedPuzzle.value)
    const puzzlesAfterSwap = swapPuzzles(puzzles, emptyPuzzleIdx, clickedPuzzleIdx)
    gameTurn(puzzlesAfterSwap);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gameTurn: (puzzles) => dispatch(gameTurn(puzzles)),
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