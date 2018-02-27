import React, { Component } from 'react';
import * as cn from 'classnames';
import './App.css';
import backgroundImg from './assets/monks.jpg';

class App extends Component {
  constructor(props) {
    super(props);

    const { fieldSideSize, puzzlesPerSide } = this.props;
    const puzzleSideSize = fieldSideSize / puzzlesPerSide;
    this.state = {
      puzzles: [],
      fieldSideSize,
      puzzlesPerSide,
      puzzleSideSize
    };
  }

  componentWillMount() {
    this.setState({
      puzzles: this.initializePuzzles()
    })
  }

  render() {
    const pazzleSolved = this.state.puzzles.map(p => p.value).every((value, idx, values) => {
      const currentValue = value;
      const nextValue = values[idx + 1];
      if (typeof nextValue !== 'undefined' && nextValue === 0 && currentValue === values.length - 1) {
        return true;
      } else if (typeof nextValue === 'undefined' && currentValue === 0) {
        return true;
      } else {
        return nextValue >= currentValue;
      }
    })
    console.log({ pazzleSolved })

    const gameAreaStyles = {
      width: `${this.state.fieldSideSize}px`,
      height: `${this.state.fieldSideSize}px`
    }
    return (
      <div className="App" style={gameAreaStyles} >
        {this.state.puzzles.map(p => (<Puzzle key={p.value} puzzle={p} sideSize={this.state.puzzleSideSize} onPuzzleClick={this.onPuzzleClick} />))}
      </ div>
    );
  }

  initializePuzzles() {
    let randomIntegers = [];
    // while (randomIntegers.length < 16) {
    //   const randomInt = this.getRandomIntInclusive(0, 15);
    //   if (randomIntegers.indexOf(randomInt) > -1) {
    //     continue;
    //   } else {
    //     randomIntegers.push(randomInt);
    //   }
    // }

    for (let i = 1; i <= 16; i++) {
      if (i < 16) {
        randomIntegers.push(i)
      } else {
        randomIntegers.push(0)
      }
    }

    randomIntegers.forEach(num => {
      const { row, column } = this.getPuzzleRowAndColumnByValue(num)
      console.log(`for value: ${num} row: ${row} column: ${column}`)
    })

    const puzzles = randomIntegers.map(value => {
      const { row, column } = this.getPuzzleRowAndColumnByValue(value);
      const { x, y } = this.getPuzzleBackgoundCoordinatesByPosition(row, column);
      return {
        row, column, value, x, y, backgroundX: x, backgroundY: y
      }
    })

    console.log(puzzles);
    return puzzles
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  onPuzzleClick = (clickedPuzzle) => {
    console.log(`puzzle #${JSON.stringify(clickedPuzzle)} clicked`);
    const clickedPuzzleNeighborhoods = this.getAllNeighborhoods(clickedPuzzle);
    const clickablePuzzle = clickedPuzzleNeighborhoods.map(p => p.value).indexOf(0) > -1
    console.log({ clickedPuzzleNeighborhoods, clickablePuzzle })
    if (clickablePuzzle) {
      const flatPuzzleValuesArray = this.state.puzzles.map(p => p.value);
      const clickedPuzzleIdx = flatPuzzleValuesArray.indexOf(clickedPuzzle.value);
      const emptyPuzzleIdx = flatPuzzleValuesArray.indexOf(0);

      const puzzlesCopy = [...this.state.puzzles];
      puzzlesCopy[emptyPuzzleIdx].value = clickedPuzzle.value;
      puzzlesCopy[clickedPuzzleIdx].value = 0;
      this.setState({
        puzzles: puzzlesCopy
      });
    }
    // try to find empty puzzle around
    // if found perform swap
    // check if puzzle resolved
  }

  getAllNeighborhoods = (clickedPuzzle) => {
    const neighborhoods = []
    if (clickedPuzzle.row - 1 >= 0 && clickedPuzzle.row - 1 <= 3) {
      neighborhoods.push(this.state.puzzles.find(p => (p.row === clickedPuzzle.row - 1 && p.column === clickedPuzzle.column)));
    }
    if (clickedPuzzle.row + 1 >= 0 && clickedPuzzle.row + 1 <= 3) {
      neighborhoods.push(this.state.puzzles.find(p => (p.row === clickedPuzzle.row + 1 && p.column === clickedPuzzle.column)));
    }
    if (clickedPuzzle.column - 1 >= 0 && clickedPuzzle.column - 1 <= 3) {
      neighborhoods.push(this.state.puzzles.find(p => (p.column === clickedPuzzle.column - 1 && p.row === clickedPuzzle.row)));
    }
    if (clickedPuzzle.column + 1 >= 0 && clickedPuzzle.column + 1 <= 3) {
      neighborhoods.push(this.state.puzzles.find(p => (p.column === clickedPuzzle.column + 1 && p.row === clickedPuzzle.row)));
    }
    return neighborhoods;
  }

  getPuzzleRowAndColumnByValue(value) {
    if (value === 0) return { row: this.state.puzzlesPerSide - 1, column: this.state.puzzlesPerSide - 1 }

    const row = Math.ceil(value / this.state.puzzlesPerSide) - 1
    const column = (value - 1) % 4;
    return { row, column };
  }

  getPuzzleBackgoundCoordinatesByPosition(row, column) {
    const { puzzleSideSize } = this.state;
    const x = column * puzzleSideSize;
    const y = row * puzzleSideSize
    return { x, y }
  }
}

class Puzzle extends Component {
  render() {
    const { puzzle, sideSize } = this.props;
    const cssClasses = cn({
      'Puzzle': true,
      'Puzzle--empty': puzzle.value === 0
    });
    console.log(backgroundImg)
    const cssStyles = {
      width: sideSize,
      height: sideSize,
      position: 'absolute',
      left: puzzle.x,
      top: puzzle.y,
      background: `url(${backgroundImg})`,
      'backgroundPosition': `-${puzzle.backgroundX}px -${puzzle.backgroundY}px`
    }

    return (
      <div className={cssClasses} onClick={() => { this.props.onPuzzleClick(puzzle) }} style={cssStyles}>
        {puzzle.value ? puzzle.value : null}
      </div>
    )
  }
}

export default App;
