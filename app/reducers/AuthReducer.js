import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../actions/types'

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: null,
    loading: false
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case EMAIL_CHANGED:
            return { ...state,
                email: action.payload
            }
        
        case PASSWORD_CHANGED:
            return { ...state,
                password: action.payload
            }

        case LOGIN_USER:
            return { ...state,
                loading: action.payload,
                error: null
            }
        
        case LOGIN_SUCCESS:
            return { ...state,
                user: action.payload,
                email: '',
                password: '',
                loading: false
            }
        
        case LOGIN_FAIL: 
            return { ...state,
                error: action.payload,
                loading: false
            }

        default:
            return state
    }
}