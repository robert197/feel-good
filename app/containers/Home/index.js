import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import CameraComponent from '../Camera'
import APIUtils from '../../../Services/EmotionAPI.service'
import FAB from 'react-native-fab'
import ImagesGridComponent from '../../components/ImagesGrid'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import Icon from 'react-native-vector-icons/dist/Ionicons'

const COLORS = {
  mainColor: '#FBC02D',
  textColor: 'black'
}

export default class Home extends Component {
 
  static navigationOptions = {
    header: null
  }

  constructor(props, context) {
    super(props, context)
    this._openCamera = this._openCamera.bind(this)
    this._openMenu = this._openMenu.bind(this)
  }

  _openCamera() {
    const { navigate } = this.props.navigation
    navigate('Camera')
  }

  _openMenu() {
    console.log('open menu')
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Menu />
        <Header title="Smiles"/>
        <ImagesGridComponent />
        <FAB style={styles.fabButton} buttonColor={COLORS.mainColor} iconTextColor={COLORS.textColor} onClickAction={() => {this._openCamera()}} visible={true} iconTextComponent={<Icon name="md-add"/>} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fabButton: {
    marginBottom: 40
  }
});