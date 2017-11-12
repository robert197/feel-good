import RNFetchBlob from 'react-native-fetch-blob'

const APIUtils = {
    getEmotions(base64image) {
        const endpoint = "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?"
        const key1 = "6ead7712d719430099113c03f259fc22"
        const key2 = "84d2f19028694aa8b8d5ec69ccd7c69a"
        return RNFetchBlob.fetch(
            'POST',
            endpoint,
            {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': key1
            },
            base64image
        )
        .then(response => response.json())
    }
}

export default APIUtils