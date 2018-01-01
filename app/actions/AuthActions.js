import {
    NAME_CHANGED,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    CONFIRM_PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAIL
} from './types'
import firebase from 'react-native-firebase'
import { Keyboard } from 'react-native'

export const nameChanged = name => {
    return {
        type: NAME_CHANGED,
        payload: name
    }
}

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

export const confirmPasswordChanged = confirmPassword => {
    return {
        type: CONFIRM_PASSWORD_CHANGED,
        payload: confirmPassword
    }
}

export const registerUser = (name, email, password, confirmPassword) => {
    return dispatch => {
        const formIsValid = name && email && password && confirmPassword
        const passwordsMatch = password === confirmPassword
        if (!formIsValid) {
            dispatch({ type: REGISTRATION_FAIL, payload: 'Form is invalid' })
            return
        }
        if (!passwordsMatch) {
            dispatch({ type: REGISTRATION_FAIL, payload: 'Passwords do not match' })
            return
        }
        dispatch({type: REGISTER_USER, payload: true })
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
            Keyboard.dismiss()
            user.updateProfile({displayName: name})
            dispatch({ type: REGISTRATION_SUCCESS, payload: email })
        })
        .catch(() => {
            dispatch({ type: REGISTRATION_FAIL, payload: 'Registration failed' })
        })
    }
}

export const loginUser = (email, password) => {
    const noEmailOrPassword = !email || !password
    return dispatch => {
        if (noEmailOrPassword) {
            dispatch({ type: LOGIN_FAIL, payload: 'Please enter email and password' })
            return
        }
        dispatch({ type: LOGIN_USER, payload: true })
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            Keyboard.dismiss()
            dispatch({ type: LOGIN_SUCCESS, payload: user })
        })
        .catch(() => {
            dispatch({ type: LOGIN_FAIL, payload: 'Authentication failed' })
        })
    }
}
