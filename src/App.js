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
      return puzzle.row === puzzleShouldRow && puzzle.column === puzzleShouldColumn;
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

    const puzzles = puzzleValues.map((value, idx) => {

      const [rowOnField, columnOnField] = this.getPuzzleRowAndColumnByNumber(idx);
      const [xOnField, yOnField] = this.getPuzzleBackgoundCoordinatesByPosition(rowOnField, columnOnField);

      const [rowOnBackground, columnOnBackground] = this.getPuzzleRowAndColumnByNumber(value);
      const [backgroundX, backgroundY] = this.getPuzzleBackgoundCoordinatesByPosition(rowOnBackground, columnOnBackground);
      return {
        row: rowOnField, column: columnOnField, value, x: xOnField, y: yOnField, backgroundX, backgroundY
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
    const clickedPuzzleNeighborhoods = this.getAllNeighborhoods(clickedPuzzle);
    const clickablePuzzle = clickedPuzzleNeighborhoods.map(p => p.value).indexOf(0) > -1
    if (clickablePuzzle) {
      const flatPuzzleValuesArray = this.state.puzzles.map(p => p.value);

      const clickedPuzzleIdx = flatPuzzleValuesArray.indexOf(clickedPuzzle.value);
      const emptyPuzzleIdx = flatPuzzleValuesArray.indexOf(0);

      const puzzlesCopy = cd(this.state.puzzles);

      const emptyPuzzle = cd(puzzlesCopy[emptyPuzzleIdx]);

      puzzlesCopy[emptyPuzzleIdx].x = cd(clickedPuzzle).x;
      puzzlesCopy[emptyPuzzleIdx].y = cd(clickedPuzzle).y;
      puzzlesCopy[emptyPuzzleIdx].column = cd(clickedPuzzle).column;
      puzzlesCopy[emptyPuzzleIdx].row = cd(clickedPuzzle).row;

      puzzlesCopy[clickedPuzzleIdx].x = cd(emptyPuzzle).x;
      puzzlesCopy[clickedPuzzleIdx].y = cd(emptyPuzzle).y;
      puzzlesCopy[clickedPuzzleIdx].column = cd(emptyPuzzle).column;
      puzzlesCopy[clickedPuzzleIdx].row = cd(emptyPuzzle).row;

      this.setState({
        puzzles: puzzlesCopy
      });
    }
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

  getPuzzleRowAndColumnByNumber(value) {
    if (value === 0) return [this.state.puzzlesPerSide - 1, this.state.puzzlesPerSide - 1]

    const row = Math.ceil(value / this.state.puzzlesPerSide) - 1
    const column = (value - 1) % 4;
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
