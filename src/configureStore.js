import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'

// advanced use of redux dev tools
// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()

export default function configureStore(preloadedState) {
  const store = createStore(
    reducers,
    preloadedState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware),
    ),
  )
  sagaMiddleware.run(sagas)

  return store
}
