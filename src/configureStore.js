import {
  createStore,
  applyMiddleware
} from 'redux';
import logger from 'redux-logger'

import gameStateReducer from './gameStateReducer'

export default function configureStore(initialState) {

  const store = createStore(
    gameStateReducer,
    initialState,
    applyMiddleware(
      logger
    ))

  return store;
}