import { combineReducers } from 'redux'
import PicturesReducer from './PicturesReducer'

export default combineReducers({
    pictures: PicturesReducer,
})