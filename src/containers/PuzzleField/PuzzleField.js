import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from "styled-components";

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

const StyledPuzzleField = styled.div`
  width: ${props => props.fieldSideSize}px;
  height: ${props => props.fieldSideSize}px;
  position: relative;
  box-shadow: 0px 0px 3px 3px ${props => props.isPuzzleSolved ? '#47ac6a' : '#333333'};
  transition: box-shadow 1s;
`

class PuzzleField extends Component {

  componentWillMount() {
    this.props.startNewGame(true)
  }

  render() {
    const { backgroundImg, fieldSideSize, puzzleSideSize, puzzles, isPuzzleSolved, gameTurn } = this.props;

    return (
      <StyledPuzzleField fieldSideSize={fieldSideSize} isPuzzleSolved={isPuzzleSolved}>
        {puzzles.map(puzzle => (
          <Puzzle key={puzzle.value} puzzle={puzzle} onClick={gameTurn} sideSize={puzzleSideSize} backgroundImg={backgroundImg} />
        ))}
      </StyledPuzzleField>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    gameTurn: (clickedPuzzle) => dispatch(gameTurn(clickedPuzzle)),
    startNewGame: (isRandom) => dispatch(startNewGame(isRandom))
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