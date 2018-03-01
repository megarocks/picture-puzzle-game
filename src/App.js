import React, { Component } from 'react'

import './App.css'
import PuzzleField from './PuzzleField'

import backgroundImg from './assets/monks.jpg'

class App extends Component {

  render() {
    return (
      <div className="App">
        <PuzzleField fieldSideSize={500} puzzlesPerSide={4} backgroundImg={backgroundImg} />
      </div>
    )
  }
}

export default App 
