import React, {Component} from 'react'
import {Text, StyleSheet, View} from 'react-native'
import Camera from 'react-native-camera'
import RNFS from 'react-native-fs'
import ImageResizerService from '../../../Services/ImageResizer.service'
import APIUtils from '../../../Services/EmotionAPI.service'

export default class CameraComponent extends Component {
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
        emotionValues: {},
        isHappy: false,
        isLoading: false,
        happiness: 0
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
            { this.state.isLoading ? <Text style={styles.loadingText}>Loading...</Text> : <Text></Text> }
            { this.result() }
            <Text style={styles.capture} onPress={this.takePicture.bind(this)}>MACH FOTO!</Text>
          </Camera>
        )
    }

    result() {
      let procentualHappiness = Math.round(this.state.happiness * 100)
      let showResult = this.state.happiness > 0
      console.log(procentualHappiness);
      if (showResult) {
        return procentualHappiness >= 50
               ? <Text style={styles.valuesPreview}>Great! You are ({procentualHappiness}%) happy</Text>
               : <Text style={styles.valuesPreview}>You happiness is only ({procentualHappiness}%)
               ... Smile!</Text>
      }
    }

    takePicture() {
      this.setState(state => {
        state.isLoading = true
        return state
      })
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
        this.setState((state) => {
          state.happiness = parseFloat(emotions[0].scores.happiness)
          state.isLoading = false
          return state;
        })
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
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold'
    },
    loadingText: {
      color: 'white',
      fontSize: 16
    }
  });