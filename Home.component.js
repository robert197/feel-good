'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button
} from 'react-native';
import CameraComponent from './Camera.component'

export default class HomeComponent extends Component {
  static navigationOptions = {
    title: 'Welcome'
  }
  
  constructor(props, context) {
    super(props, context)
    this.state = {cameraIsOpen: false}
    this._openCamera = this._openCamera.bind(this)
  }

  _openCamera() {
    console.log('open camera')
    this.setState((prevState) => {
      return {cameraIsOpen: !prevState.cameraIsOpen}
    })
    const { navigate } = this.props.navigation
    navigate('Camera')
  }

  closeCamera() {
    console.log('close camera')

  }

  render() {
    
    return (
      <View style={styles.container}>
        <Button onPress={this._openCamera} title="open camera"></Button>
      </View>
    );
  }

  openCamera() {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  }
});