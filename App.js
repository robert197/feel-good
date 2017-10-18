import React, { Component } from 'react';
import {
  StackNavigator
} from 'react-navigation'
import {
  AppRegistry,
} from 'react-native'

import HomeComponent from './Home.component'
import CameraComponent from './Camera.component'

const Navigator = StackNavigator({
  Home: { screen: HomeComponent },
  Camera: { screen: CameraComponent }
})

export default class App extends Component {
  render() {
    return <Navigator />
  }
}
