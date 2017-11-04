const APIUtils = {

    getEmotions() {
        const endpoint = "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?"
        const key1 = "6ead7712d719430099113c03f259fc22"
        const key2 = "84d2f19028694aa8b8d5ec69ccd7c69a"
        return fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': key1
            },
            body: JSON.stringify({
                "url": "http://icarexperience.ca/wp-content/uploads/2016/04/happy-guy.jpg"
            })
        })
        .then(response => response.json())
    }
}

export default APIUtils