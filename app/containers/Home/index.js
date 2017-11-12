import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button,
  ActivityIndicator
} from 'react-native';
import CameraComponent from '../Camera'
import APIUtils from '../../../Services/EmotionAPI.service'
import FAB from 'react-native-fab'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import ImagesGridComponent from '../../components/ImagesGrid'

const COLORS = {
  mainColor: '#FBC02D',
  textColor: 'black'
}

export default class HomeComponent extends Component {
 
  static navigationOptions = {
    header: null
  }

  constructor(props, context) {
    super(props, context)
    this._openCamera = this._openCamera.bind(this)
  }

  _openCamera() {
    console.log('open camera')
    const { navigate } = this.props.navigation
    navigate('Camera')
  }

  render() {  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.smile}>Smiles</Text>
          <Icon style={styles.moreIcon} size={30} name="md-more" />
        </View>
        <ImagesGridComponent style={styles.imagesGrid} />
        <FAB style={styles.fabButton} buttonColor={COLORS.mainColor} iconTextColor={COLORS.textColor} onClickAction={() => {this._openCamera()}} visible={true} iconTextComponent={<Icon name="md-add"/>} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  smile: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#212121'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16
  },
  moreIcon: {
    marginTop: 12,
    marginRight: 16,
    color: '#212121'
  },
  imagesGrid: {
    flexDirection: 'column'
  },
  fabButton: {
    marginBottom: 40
  }
});