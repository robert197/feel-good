import React, { Component } from 'react';
import {
  StackNavigator
} from 'react-navigation'
import {
  AppRegistry,
  View,
  AsyncStorage
} from 'react-native'
import firebase from 'react-native-firebase';
import Home from './app/containers/Home'
import CameraComponent from './app/containers/Camera'
import Login from './app/containers/Login'
import Registration from './app/containers/Registration'

const SigningNavigator = StackNavigator({
  Login: { screen: Login },
  Registration: { screen: Registration }
})

const MainNavigator = StackNavigator({
  Home: { screen: Home },
  Camera: { screen: CameraComponent }
})

export default class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {loggedIn: false}
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!!user) {
        this.setState({loggedIn: true})
      } else {
        this.setState({loggedIn: false})
      }
    })
  }

  render() {
    return (
      this._renderNavigation()
    )
  }

  _renderNavigation() {
    return this.state.loggedIn ? <MainNavigator /> : <SigningNavigator />
  }
}
