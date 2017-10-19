'use strict'
import React, {Component} from 'react'
import {Text, StyleSheet} from 'react-native'
import Camera from 'react-native-camera'

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
        //options.location = ...
        this.camera.capture({metadata: options})
          .then((data) => {
             console.log(data)
             let path = data.path
          })
          .catch(err => console.error(err));
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