import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configureStore from './configureStore'
import { PuzzleField } from './containers/PuzzleField'

import './App.css'
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
