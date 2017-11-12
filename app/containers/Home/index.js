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
import CameraComponent from '../Camera'
import APIUtils from '../../../Services/EmotionAPI.service'

export default class HomeComponent extends Component {
  static navigationOptions = {
    title: 'Give a Smile'
  }
  
  constructor(props, context) {
    super(props, context)
    this.state = {
      cameraIsOpen: false,
      emotionValues: {}
    }
    this._openCamera = this._openCamera.bind(this)
    this._getEmotions = this._getEmotions.bind(this)
  }

  _openCamera() {
    console.log('open camera')
    this.setState((prevState) => {
      return {cameraIsOpen: !prevState.cameraIsOpen}
    })
    const { navigate } = this.props.navigation
    navigate('Camera')
  }

  _getEmotions() {
      APIUtils.getEmotions()
        .then(emotions => {
          this.setState((state) => state.emotionValues = emotions[0].scores)
          console.log(this.state)
        })
        .catch(error => console.log(error))
  }

  render() {  
    return (
      <View style={styles.container}>
        <Button onPress={this._openCamera} title="open camera"></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10
  }
});