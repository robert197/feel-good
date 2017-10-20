import React, {Component} from 'react'
import {Text, StyleSheet} from 'react-native'
import Camera from 'react-native-camera'
import RNFS from 'react-native-fs'

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
        .then(data => this._getBlobFromImagePath(data.path))
        .then()
        .catch(err => console.error(err))
    }

    _getBlobFromImagePath(path) {
      return RNFS.readFile(path, 'base64')
        .then(file => file)
        .catch(error => console.log(error))
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