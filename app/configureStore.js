
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import ReduxThunk from 'redux-thunk'

export default function configureStore(initialState) {
    const store = createStore(reducers, initialState, applyMiddleware(ReduxThunk))
    if (module.hot) {
      module.hot.accept(() => {
        store.replaceReducer(require('./reducers').default)
      })
    }

    return store
}