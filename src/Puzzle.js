import React from 'react'
import * as cn from 'classnames'

const Puzzle = (props) => {
  {
    const { puzzle, sideSize, backgroundImg } = props
    const cssClasses = cn({
      'Puzzle': true,
      'Puzzle__empty': puzzle.value === 0
    })
    const cssStyles = {
      width: sideSize,
      height: sideSize,

      position: 'absolute',
      left: puzzle.fieldX,
      top: puzzle.fieldY,

      boxShadow: 'inset 0 0 0 1px white'
    }

    if (puzzle.value) {
      cssStyles.background = `url(${backgroundImg})`
      cssStyles.backgroundPosition = `-${puzzle.backgroundX}px -${puzzle.backgroundY}px`
    } else {
      cssStyles.backgroundColor = 'transparent'
      cssStyles.boxShadow = 'none'
    }

    return (
      <div className={cssClasses} style={cssStyles} onClick={() => { props.onClick(puzzle) }} >
        {puzzle.value ? puzzle.value : null}
      </div>
    )
  }
}

export default Puzzle 