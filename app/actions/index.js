import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED
} from './types'

export const emailChanged = (email) => {
    return {
        type: EMAIL_CHANGED,
        payload: email
    }
}

export const passwordChanged = (password) => {
    return {
        type: PASSWORD_CHANGED,
        payload: password
    }
}