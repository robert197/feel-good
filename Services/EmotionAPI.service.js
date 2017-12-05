import RNFetchBlob from 'react-native-fetch-blob'

const APIUtils = {
    getEmotions(base64image) {
        const endpoint = "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?"
        const key = "98cd8c2f327e4d90b8720404efc90625"
        return RNFetchBlob.fetch(
            'POST',
            endpoint,
            {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': key
            },
            base64image
        )
        .then(response => response.json())
    }
}

export default APIUtils