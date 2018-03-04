import React from 'react'
import styled from "styled-components";

const StyledPuzzle = styled.div`
  position: absolute;
  left: ${props => props.puzzle.fieldX}px;
  top: ${props => props.puzzle.fieldY}px;
  transition: ${props => props.puzzle.value ? ' top 0.62s, left 0.62s' : 'none'};

  width: ${props => props.sideSize}px;
  height: ${props => props.sideSize}px;

  display: flex;
  justify-content: flex-end;

  font-size: 1.1618rem;
  color: #fff;
  padding: 0.38rem;
  box-sizing: border-box;

  box-shadow: ${props => props.puzzle.value ? 'inset 0 0 0 1px white' : 'none'};
  background: ${props => props.puzzle.value ? `url(${props.backgroundImg}) -${props.puzzle.backgroundX}px -${props.puzzle.backgroundY}px` : 'transparent'};
`

const Puzzle = (props) => (
  <StyledPuzzle {...props} onClick={() => { props.onClick(props.puzzle) }} >
    {props.puzzle.value ? props.puzzle.value : null}
  </StyledPuzzle>
)

export default Puzzle