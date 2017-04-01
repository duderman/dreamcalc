import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Iterable } from 'immutable'

import rootReducer, { rootSaga } from 'ducks'

export default function () {
  let middlewares = []
  const sagaMiddleware = createSagaMiddleware()
  middlewares.push(sagaMiddleware)

  const createLogger = require('redux-logger')
  const stateTransformer = state => Iterable.isIterable(state) ? state.toJS() : state

  const logger = createLogger({
    stateTransformer,
    collapsed: _ => true
  })

  middlewares.push(logger)

  const finalCreateStore = compose(
    applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__()
  )(createStore)

  const store = finalCreateStore(rootReducer)

  sagaMiddleware.run(rootSaga)

  return store
}
