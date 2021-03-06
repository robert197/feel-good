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
import firebase from 'react-native-firebase';
import { connect } from 'react-redux'
import { fetchAllPictures } from '../../actions'

const COLORS = {
  mainColor: '#FBC02D',
  textColor: 'black'
}

class Home extends Component {
 
  static navigationOptions = {
    header: null
  }

  constructor(props, context) {
    super(props, context)
    this._openCamera = this._openCamera.bind(this)
    this._getMenuItems = this._getMenuItems.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllPictures()
    console.log(this.props.pictures)
  }

  _openCamera() {
    const { navigate } = this.props.navigation
    navigate('Camera')
  }

  _getMenuItems() {
    return [
      {
        text: 'Log out',
        method: () => {
          firebase.auth().signOut()
        }
      }
    ]
  }

  render() {
    return (
      <View style={styles.container}>
        <Menu items={this._getMenuItems()}/>
        <Header title="Smiles"/>
        <ImagesGridComponent images={this.props.allImages}/>
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

const mapStateProps = state => {
  const { allImages, loading, error } = state.pictures
  return { allImages, loading, error }
}

export default connect(mapStateProps, { fetchAllPictures })(Home)