import {
  createStore,
  applyMiddleware
} from 'redux'
import logger from 'redux-logger'
import { fromJS } from 'immutable';

import { reducer as gameStateReducer } from './containers/PuzzleField'

export default function configureStore(initialState = {}) {

  const middlewares = []

  if (process.env.NODE_ENV === 'development') { middlewares.push(logger) }

  const store = createStore(
    gameStateReducer,
    fromJS(initialState),
    applyMiddleware(...middlewares)
  )

  return store
}