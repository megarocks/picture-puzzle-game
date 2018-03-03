import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configureStore from './configureStore'
import './App.css'
import PuzzleField from './PuzzleField'

import backgroundImg from './assets/monks.jpg'

const initalGameState = {
  fieldSideSize: 500,
  puzzlesPerSide: 4,
  backgroundImg,
  puzzles: []
}

const store = configureStore(initalGameState);

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <PuzzleField />
        </div>
      </Provider>
    )
  }
}

export default App
