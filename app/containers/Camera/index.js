import React, {Component} from 'react'
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native'
import Camera from 'react-native-camera'
import RNFS from 'react-native-fs'
import ImageResizerService from '../../../Services/ImageResizer.service'
import APIUtils from '../../../Services/EmotionAPI.service'
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default class CameraComponent extends Component {

    static navigationOptions = {
      headerStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0
      },
      headerTintColor: 'white'
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
            { this.state.isLoading ? <ActivityIndicator size={'large'} color={'white'} /> : <ActivityIndicator animating={false} /> }
            { this.result() }
            <Text style={styles.capture} onPress={this.takePicture.bind(this)}><Icon name="ios-camera-outline" size={60} color="black" /></Text>
          </Camera>
        )
    }

    result() {
      let procentualHappiness = Math.round(this.state.happiness * 100)
      let showResult = this.state.happiness > 0
      console.log('happiness: ', procentualHappiness)
      if (showResult) {
        return procentualHappiness >= 50
               ? <Text style={styles.valuesPreview}>Great! You are ({procentualHappiness}%) happy!</Text>
               : <Text style={styles.valuesPreview}>You happiness is only ({procentualHappiness}%)
               ... Smile!</Text>
      } else {
        return <Text></Text>
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
        .then(base64string => base64string)
        .catch(error => console.log(error))
    }

    _getEmotionsFromImage(base64image) {
      APIUtils.getEmotions(base64image)
      .then(emotions => {
        console.log('api response: ', emotions)
        this.setState((state) => {
          state.happiness = !!emotions[0] ? parseFloat(emotions[0].scores.happiness) : 0
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
      borderRadius: 50,
      color: '#000',
      paddingTop: 2,
      paddingBottom: 2,
      paddingRight: 8,
      paddingLeft: 8,
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