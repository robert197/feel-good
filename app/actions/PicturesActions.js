import firebase from 'react-native-firebase'

export const fetchAllPictures = () => {
    return dispatch => {
        // dispatch({type: 'FETCH_IMAGES'})
        let allImages = []
        let allUsers = []
        let allImageUrls = []
        const images = firebase.database().ref().on('value', (data) => {
            var dataVal = data.val()
            // extract image urls
            for (let userUid in dataVal) {
                let pics = Object.values(dataVal[userUid].pictures)
                pics.forEach(imageName => {
                    firebase.storage().ref('images/' + userUid + '/' + imageName).getDownloadURL()
                    .then((url) => {
                        allImageUrls.push(url)
                        // dispatch({ type: 'FETCH_IMAGES_SUCCESS', palyoad: allImageUrls })
                    })
                    .catch(() => {
                        // dispatch({ type: 'FETCH_IMAGES_FAIL', payload: 'Fetching images failed' })
                    })
                })
            }
        })
        
           
    }
}