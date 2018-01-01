import { combineReducers } from 'redux'
import PicturesReducer from './PicturesReducer'
import AuthReducer from './AuthReducer'

export default combineReducers({
    pictures: PicturesReducer,
    auth: AuthReducer
})