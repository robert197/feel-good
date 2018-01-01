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
} from '../actions/types'

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    user: null,
    error: null,
    loading: false
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case NAME_CHANGED:
            return { ...state,
                name: action.payload
            }

        case EMAIL_CHANGED:
            return { ...state,
                email: action.payload
            }
        
        case PASSWORD_CHANGED:
            return { ...state,
                password: action.payload
            }

        case CONFIRM_PASSWORD_CHANGED:
            return { ...state,
                confirmPassword: action.payload
            }

        case REGISTER_USER:
            return { ...state,
                loading: action.payload,
                error: null
            }

        case REGISTRATION_SUCCESS:
            return { ...state,
                email: action.payload,
                loading: false,
                error: null
            }
        
        case REGISTRATION_FAIL:
            return { ...state,
                error: action.payload,
                loading: false
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