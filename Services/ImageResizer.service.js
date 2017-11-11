import ImageResizer from 'react-native-image-resizer'

const Options = {
    newWidth: 400,
    newHeight: 700,
    compressFormat: 'JPEG',
    quality: 70,
    rotation: 0,
    outputPath: ''
}

const ImageResizerService = {
    resizeImage(imageUri) {
        return ImageResizer.createResizedImage(imageUri, Options.newWidth, Options.newHeight, Options.compressFormat, Options.quality)
        .then((response) => {
            return response.uri
            // response.uri is the URI of the new image that can now be displayed, uploaded...
            // response.path is the path of the new image
            // response.name is the name of the new image with the extension
            // response.size is the size of the new image
        })
        .catch((err) => {
            // Oops, something went wrong. Check that the filename is correct and
            // inspect err to get more details.
        });
    }
}

export default ImageResizerService