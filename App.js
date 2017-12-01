import React, { Component } from 'react';
import {
  StackNavigator
} from 'react-navigation'
import {
  AppRegistry,
} from 'react-native'

import Home from './app/containers/Home'
import CameraComponent from './app/containers/Camera'
import Login from './app/containers/Login'
import Registration from './app/containers/Registration'

const Navigator = StackNavigator({
  Login: { screen: Login },
  Registration: { screen: Registration },
  Home: { screen: Home },
  Camera: { screen: CameraComponent }
})

export default class App extends Component {
  render() {
    return <Navigator />
  }
}
