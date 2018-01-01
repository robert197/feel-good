import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types'
import firebase from 'react-native-firebase'
import { Keyboard } from 'react-native'

export const emailChanged = email => {
    return {
        type: EMAIL_CHANGED,
        payload: email
    }
}

export const passwordChanged = password => {
    return {
        type: PASSWORD_CHANGED,
        payload: password
    }
}

export const loginUser = (email, password) => {
    const noEmailOrPassword = !email || !password
    return dispatch => {
        if (noEmailOrPassword) {
            return
        }
        dispatch({ type: LOGIN_USER, payload: true })
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            Keyboard.dismiss()
            dispatch({ type: LOGIN_SUCCESS, payload: user })
        })
        .catch(() => {
            dispatch({ type: LOGIN_FAIL, payload: 'Authentication failed' })
        })
    }
}
