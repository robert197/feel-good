const APIUtils = {

    getEmotions() {
        const endpoint = "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?"
        const key1 = "c272558001dd426c87ddc5b5e9413b19"
        const key2 = "84d2f19028694aa8b8d5ec69ccd7c69a"
        return fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': key1
            },
            body: JSON.stringify({
                "url": "http://www.howtobehappyalways.com/wp-content/uploads/2017/10/being-happy.jpg"
            })
        })
        .then(response => response.json())
    }
}

export default APIUtils