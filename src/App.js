import React, { Component } from 'react'
import { Provider } from 'react-redux'
import styled from "styled-components";

import configureStore from './configureStore'
import { PuzzleField } from './containers/PuzzleField'
import backgroundImg from './assets/monks.jpg'

const initalGameState = {
  fieldSideSize: 500,
  puzzlesPerSide: 4,
  backgroundImg,
  puzzles: []
}

const store = configureStore(initalGameState);

const StyledApp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <StyledApp>
          <PuzzleField />
        </StyledApp>
      </Provider>
    )
  }
}

export default App
