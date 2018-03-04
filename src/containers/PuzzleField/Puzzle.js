import React from 'react'
import * as cn from 'classnames'
import styled from "styled-components";

const Puzzle = (props) => {
  {
    const { puzzle, sideSize, backgroundImg } = props

    const StyledPuzzle = styled.div`
      position: absolute;
      left: ${puzzle.fieldX}px;
      top: ${puzzle.fieldY}px;
      transition: ${puzzle.value ? ' top 0.62s, left 0.62s' : 'none'};

      width: ${sideSize}px;
      height: ${sideSize}px;

      display: flex;
      justify-content: flex-end;

      font-size: 1.1618rem;
      color: #fff;
      padding: 0.38rem;
      box-sizing: border-box;

      box-shadow: ${puzzle.value ? 'inset 0 0 0 1px white' : 'none'};
      background: ${puzzle.value ? `url(${backgroundImg}) -${puzzle.backgroundX}px -${puzzle.backgroundY}px` : 'transparent' };
    `

    return (
      <StyledPuzzle onClick={() => { props.onClick(puzzle) }} >
        {puzzle.value ? puzzle.value : null}
      </StyledPuzzle>
    )
  }
}

export default Puzzle