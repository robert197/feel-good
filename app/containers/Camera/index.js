import React, {Component} from 'react'
import {Text, StyleSheet, View} from 'react-native'
import Camera from 'react-native-camera'
import RNFS from 'react-native-fs'
import ImageResizerService from '../../../Services/ImageResizer.service'
import APIUtils from '../../../Services/EmotionAPI.service'

export default class CameraComponent extends Component{
    static navigationOptions = {
      title: 'Camera'
    }

    static CAMERA_OPTIONS = {
      audio: 'false', // IOS only
      mode: 'still',
      target: 'temp',
      jpegQuality: '70'
    }

    constructor(props, context) {
      super(props, context)
      this.state = {
        emotionValues: {}
      }
    }

    render() {
        return (
            <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}
            type={Camera.constants.Type.front}>

            { Object.keys(this.state.emotionValues)
              .map((emotion, i) => {
                return <View key={ 'emotion:' + i }>
                          <Text style={styles.valuesPreview} key={ 'key:' + i }>{ emotion }</Text>
                          <Text style={styles.valuesPreview} key={ 'value:' + i }>{ this.state.emotionValues[emotion] }</Text>
                       </View>
              }) }

            <Text style={styles.capture} onPress={this.takePicture.bind(this)}>MACH FOTO!</Text>
          </Camera>
        )
    }

    takePicture() {
        this.camera.capture({metadata: this.CAMERA_OPTIONS})
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
      .then(emotions => {
        this.setState((state) => state.emotionValues = emotions[0].scores)
      })
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
    },
    valuesPreview: {
      color: 'white'
    }
  });