import {
  createStore,
  applyMiddleware
} from 'redux';
import logger from 'redux-logger'

import gameStateReducer from './gameStateReducer'

export default function configureStore(initialState) {

  const middlewares = [];

  if (process.env.NODE_ENV === 'development') { middlewares.push(logger) }

  const store = createStore(
    gameStateReducer,
    initialState,
    applyMiddleware(...middlewares)
  )

  return store;
}