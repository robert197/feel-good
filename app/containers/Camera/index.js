import React, {Component} from 'react'
import {Text, StyleSheet} from 'react-native'
import Camera from 'react-native-camera'
import RNFS from 'react-native-fs'
import ImageResizerService from '../../../Services/ImageResizer.service'
import APIUtils from '../../../Services/EmotionAPI.service'

export default class CameraComponent extends Component{
    static navigationOptions = {
      title: 'Camera'
    }

    render() {
        return (
            <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
            <Text style={styles.capture} onPress={this.takePicture.bind(this)}>MACH FOTO!</Text>
          </Camera>
        )
    }

    takePicture() {
        const options = {};
        this.camera.capture({metadata: options})
        .then(data => ImageResizerService.resizeImage(data.path))
        .then(resizedImageUri => this._getBlobFromImagePath(resizedImageUri))
        .then(base64image => this._getEmotionsFromImage(base64image))
        .catch(err => console.error(err))
    }

    _getBlobFromImagePath(path) {
      return RNFS.readFile(path, 'base64')
        .then(file => file) // returns base64 string
        .catch(error => console.log(error))
    }

    _getEmotionsFromImage(base64image) {
      APIUtils.getEmotions(base64image)
      .then(res => console.log(res))
    } 
}

const styles = StyleSheet.create({
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      color: '#000',
      padding: 10,
      margin: 40
    }
  });