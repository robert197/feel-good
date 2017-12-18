
import { createStore } from 'redux'
import reducers from './reducers'

export default function configureStore(initialState) {
    const store = createStore(reducers, initialState)
    if (module.hot) {
      module.hot.accept(() => {
        store.replaceReducer(require('./reducers').default)
       })
    }

    return store
}