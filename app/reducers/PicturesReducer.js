import {
    FETCH_IMAGES,
    FETCH_IMAGES_SUCCESS,
    FETCH_IMAGES_FAIL,
    ADD_IMAGE
} from '../actions/types'

const INITIAL_STATE = {
    allImages: [],
    loading: false,
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_IMAGES:
            return { ...state,
                loading: true
            }
        
        case FETCH_IMAGES_SUCCESS:
            return { ...state, 
                loading: false,
                error: null,
                allImages: action.payload
            }
        
        case FETCH_IMAGES_FAIL:
            return { ...state,
                loading: false,
                error: action.payload
            }
        
        case ADD_IMAGE:
            return { ...state,
                allImages: [...state.allImages, action.payload]
            }

        default:
            return state
    }
}