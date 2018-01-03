import React, {Component} from 'react'
import {Text, StyleSheet, View, ActivityIndicator, Image} from 'react-native'
import Camera from 'react-native-camera'
import RNFS from 'react-native-fs'
import ImageResizerService from '../../../Services/ImageResizer.service'
import APIUtils from '../../../Services/EmotionAPI.service'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import firebase from 'react-native-firebase'
import Modal from 'react-native-modalbox'
import { connect } from 'react-redux'
import { addNewImageToAll } from '../../actions'

class CameraComponent extends Component {

    static navigationOptions = {
      headerStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0
      },
      headerTintColor: 'white'
    }
    static CAMERA_OPTIONS = {
      audio: 'false', // IOS only
      mode: 'still',
      target: 'temp',
      jpegQuality: '75'
    }

    constructor(props, context) {
      super(props, context)
      this.state = {
        emotionValues: {},
        isHappy: false,
        isLoading: false,
        happiness: 0,
        isPreviewReady: false,
        imageUri: '',
        previewImage: false
      }
      this._onCloseModal = this._onCloseModal.bind(this)
    }

    render() {
      return (
        <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        type={Camera.constants.Type.front}>

        { this._showImagePreview() }
        { this.result() }

        <View style={{display: this.state.previewImage ? 'none' : 'flex'}}>
          { this.state.isLoading ? <ActivityIndicator size={'large'} color={'white'} /> : <ActivityIndicator animating={false} /> }
          <Text style={styles.capture} disabled={this.state.isLoading} onPress={this.takePicture.bind(this)}><Icon name="ios-camera-outline" size={60} color="black" /></Text>
        </View>

      </Camera>
      )
    }

    _onCloseModal() {
      this.setState({previewImage: false})
    }

    _showImagePreview() {      
      return (
        <Modal style={{
          height: 600,
          backgroundColor: "white",
        }}
        backdrop={false}
        position={"top"}
        isOpen={this.state.previewImage}
        onClosed={this._onCloseModal}>
          <Image source={{uri: this.state.imageUri}} style={{flex: 1}}></Image>
        </Modal>
      )
    }

    result() {
      let procentualHappiness = Math.round(this.state.happiness * 100)
      let showResult = this.state.happiness > 0
      if (showResult) {
        return (procentualHappiness < 50) && !this.state.isLoading
        ? <Text style={styles.valuesPreview}>You happiness is only ({procentualHappiness}%) ... Smile!</Text>
        : <Text
        style={{display: this.state.previewImage ? 'flex' : 'none', color: 'white'}}>
          Great you are ({procentualHappiness}%) happy! Now you can donate by posting your image and watching a video!
        </Text>
      } else {
        return <Text></Text>
      }
    }

    takePicture() {
      this.setState(state => {
        state.isLoading = true
        return state
      })
      this.camera.capture({metadata: this.CAMERA_OPTIONS})
      .then(data => ImageResizerService.resizeImage(data.path))
      .then(resizedImageUri => {
        this.setState({imageUri: resizedImageUri})
        return this._getBlobFromImagePath(resizedImageUri)
      })
      .then(base64image => this._getEmotionsFromImage(base64image))
      .then(happiness => {
        if (happiness >= 0.5) {
          console.log('happy!')
          this.setState({previewImage: true})
        }
      })
      .then(() => {
        this._uploadImage(this.state.imageUri, this.state.happiness)
      })
      .catch(console.log)
    }

    _getBlobFromImagePath(path) {
      return RNFS.readFile(path, 'base64')
        .then(base64string => base64string)
        .catch(console.log)
    }

    _getEmotionsFromImage(base64image) {
      return APIUtils.getEmotions(base64image)
      .then(emotions => {
        const happiness = !!emotions[0] ? parseFloat(emotions[0].scores.happiness) : 0
        this.setState((state) => {
          state.happiness = happiness
          state.isLoading = false
          return state;
        })
        return happiness
      })
    }
    
    _uploadImage(filePath, happiness) {
      const pathArray = filePath.split('/')
      const imageName = pathArray[pathArray.length - 1].split('.')[0] + '-!-' + this.state.happiness + '.jpg'
      const userUid = firebase.auth().currentUser.uid
      if(this.state.happiness >= 0.5) {
        firebase.database().ref(userUid + '/pictures/').push(imageName)
      }
      firebase.storage()
      .ref('images')
      .child(`${userUid}/${imageName}`)
      .putFile(filePath)
      .then((ref) => {
        this.props.addNewImageToAll(ref.downloadURL)
      })
      .catch(console.log)
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
      borderRadius: 50,
      color: '#000',
      paddingTop: 2,
      paddingBottom: 2,
      paddingRight: 8,
      paddingLeft: 8,
      margin: 40
    },
    valuesPreview: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold'
    },
    loadingText: {
      color: 'white',
      fontSize: 16
    }
  });

  export default connect(null, { addNewImageToAll })(CameraComponent)