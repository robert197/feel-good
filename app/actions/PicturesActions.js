import firebase from 'react-native-firebase'
import {
    FETCH_IMAGES,
    FETCH_IMAGES_SUCCESS,
    FETCH_IMAGES_FAIL,
    ADD_IMAGE
} from './types'

export const addNewImageToAll = imageUrl => {
    return { type: ADD_IMAGE, payload: imageUrl }
}

export const fetchAllPictures = () => {
    return dispatch => {
        dispatch({ type: FETCH_IMAGES })
        let allImages = []
        let allUsers = []
        let allImageUrls = []
        const images = firebase.database().ref().once('value', (data) => {
            var dataVal = data.val()
            var totalAmountOfPics = 0
            // extract image urls
            for (let userUid in dataVal) {
                let allImageUrls = []
                let pics = Object.values(dataVal[userUid].pictures)
                totalAmountOfPics += pics.length
                pics.forEach(imageName => {
                    firebase.storage().ref('images/' + userUid + '/' + imageName).getDownloadURL()
                    .then((url) => {
                        allImageUrls.push(url)
                        if (allImageUrls.length === totalAmountOfPics) {
                            dispatch({ type: FETCH_IMAGES_SUCCESS, payload: allImageUrls })
                        }    
                    })
                    .catch(() => {
                        dispatch({ type: FETCH_IMAGES_FAIL, payload: 'Fetching images failed' })
                    })
                })
            }
        })         
    }
}
