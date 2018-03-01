import React, { Component } from 'react';
import * as cn from 'classnames';
import * as cd from 'clone-deep';
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
      puzzles: this.initializePuzzles(true)
    })
  }

  render() {
    const pazzleSolved = this.state.puzzles.every((puzzle, idx, values) => {
      const [puzzleShouldRow, puzzleShouldColumn] = this.getPuzzleRowAndColumnByNumber(idx);
      return puzzle.fieldRow === puzzleShouldRow && puzzle.fieldColumn === puzzleShouldColumn;
    })
    console.log(this.state.puzzles)
    console.log({ pazzleSolved })

    const gameAreaStyles = {
      width: `${this.state.fieldSideSize}px`,
      height: `${this.state.fieldSideSize}px`
    }
    return (
      <div className="App" style={gameAreaStyles} >
        {this.state.puzzles.map(p => (
          <Puzzle key={p.value} puzzle={p} sideSize={this.state.puzzleSideSize} onPuzzleClick={this.onPuzzleClick} />
        ))}
      </ div>
    );
  }

  initializePuzzles(shouldBeRandom) {
    let puzzleValues = [];
    if (shouldBeRandom) {
      while (puzzleValues.length < 16) {
        const randomInt = this.getRandomIntInclusive(0, 15);
        if (puzzleValues.indexOf(randomInt) > -1) {
          continue;
        } else {
          puzzleValues.push(randomInt);
        }
      }
    } else {
      for (let i = 0; i < 16; i++) {
        if (i <= 15) {
          puzzleValues.push(i)
        } else {
          puzzleValues.push(0)
        }
      }
    }

    const puzzles = puzzleValues.map((puzzleValue, puzzleIndex) => {

      const [fieldRow, fieldColumn] = this.getPuzzleRowAndColumnByNumber(puzzleIndex);
      const [fieldX, fieldY] = this.getPuzzleBackgoundCoordinatesByPosition(fieldRow, fieldColumn);

      const [backgroundRow, backgroundColumn] = this.getPuzzleRowAndColumnByNumber(puzzleValue);
      const [backgroundX, backgroundY] = this.getPuzzleBackgoundCoordinatesByPosition(backgroundRow, backgroundColumn);

      return {
        value: puzzleValue, fieldRow, fieldColumn, fieldX, fieldY, backgroundX, backgroundY
      }
    })

    return puzzles
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  onPuzzleClick = (clickedPuzzle) => {
    const clickedPuzzleNeighborhoods = this.getAllNeighborhoodsOf(clickedPuzzle);
    const clickablePuzzle = clickedPuzzleNeighborhoods.map(p => p.value).indexOf(0) > -1
    if (clickablePuzzle) {
      const flatPuzzleValuesArray = this.state.puzzles.map(p => p.value);

      const clickedPuzzleIdx = flatPuzzleValuesArray.indexOf(clickedPuzzle.value);
      const emptyPuzzleIdx = flatPuzzleValuesArray.indexOf(0);

      const puzzlesCopy = cd(this.state.puzzles);

      const emptyPuzzle = cd(puzzlesCopy[emptyPuzzleIdx]);

      puzzlesCopy[emptyPuzzleIdx].fieldX = cd(clickedPuzzle).fieldX;
      puzzlesCopy[emptyPuzzleIdx].fieldY = cd(clickedPuzzle).fieldY;
      puzzlesCopy[emptyPuzzleIdx].fieldColumn = cd(clickedPuzzle).fieldColumn;
      puzzlesCopy[emptyPuzzleIdx].fieldRow = cd(clickedPuzzle).fieldRow;

      puzzlesCopy[clickedPuzzleIdx].fieldX = cd(emptyPuzzle).fieldX;
      puzzlesCopy[clickedPuzzleIdx].fieldY = cd(emptyPuzzle).fieldY;
      puzzlesCopy[clickedPuzzleIdx].fieldColumn = cd(emptyPuzzle).fieldColumn;
      puzzlesCopy[clickedPuzzleIdx].fieldRow = cd(emptyPuzzle).fieldRow;

      this.setState({
        puzzles: puzzlesCopy
      });
    }
  }

  getAllNeighborhoodsOf = (clickedPuzzle) => {
    const { puzzles, puzzlesPerSide } = this.state;

    const neighborhoods = []

    // puzzle below
    if (clickedPuzzle.fieldRow - 1 >= 0 && clickedPuzzle.fieldRow - 1 <= puzzlesPerSide - 1) {
      neighborhoods.push(puzzles.find(p => (p.fieldRow === clickedPuzzle.fieldRow - 1 && p.fieldColumn === clickedPuzzle.fieldColumn)));
    }

    // puzzle above
    if (clickedPuzzle.fieldRow + 1 >= 0 && clickedPuzzle.fieldRow + 1 <= puzzlesPerSide - 1) {
      neighborhoods.push(puzzles.find(p => (p.fieldRow === clickedPuzzle.fieldRow + 1 && p.fieldColumn === clickedPuzzle.fieldColumn)));
    }

    // puzzle to the left
    if (clickedPuzzle.fieldColumn - 1 >= 0 && clickedPuzzle.fieldColumn - 1 <= puzzlesPerSide - 1) {
      neighborhoods.push(puzzles.find(p => (p.fieldColumn === clickedPuzzle.fieldColumn - 1 && p.fieldRow === clickedPuzzle.fieldRow)));
    }

    // puzzle to the right
    if (clickedPuzzle.fieldColumn + 1 >= 0 && clickedPuzzle.fieldColumn + 1 <= puzzlesPerSide - 1) {
      neighborhoods.push(puzzles.find(p => (p.fieldColumn === clickedPuzzle.fieldColumn + 1 && p.fieldRow === clickedPuzzle.fieldRow)));
    }

    return neighborhoods;
  }

  getPuzzleRowAndColumnByNumber(value) {
    if (value === 0) return [this.state.puzzlesPerSide - 1, this.state.puzzlesPerSide - 1]

    const row = Math.ceil(value / this.state.puzzlesPerSide) - 1
    const column = (value - 1) % this.state.puzzlesPerSide;
    return [row, column];
  }

  getPuzzleBackgoundCoordinatesByPosition(row, column) {
    const { puzzleSideSize } = this.state;
    const x = column * puzzleSideSize;
    const y = row * puzzleSideSize
    return [x, y]
  }
}

class Puzzle extends Component {
  render() {
    const { puzzle, sideSize } = this.props;
    const cssClasses = cn({
      'Puzzle': true,
      'Puzzle--empty': puzzle.value === 0
    });
    const cssStyles = {
      width: sideSize,
      height: sideSize,

      position: 'absolute',
      left: puzzle.fieldX,
      top: puzzle.fieldY,

      boxShadow: 'inset 0 0 0 1px white'
    }

    if (puzzle.value) {
      cssStyles.background = `url(${backgroundImg})`;
      cssStyles.backgroundPosition = `-${puzzle.backgroundX}px -${puzzle.backgroundY}px`;
    } else {
      cssStyles.backgroundColor = 'transparent';
      cssStyles.boxShadow = 'none';
    }

    return (
      <div className={cssClasses} style={cssStyles} onClick={() => { this.props.onPuzzleClick(puzzle) }} >
        {puzzle.value ? puzzle.value : null}
      </div>
    )
  }
}

export default App;
