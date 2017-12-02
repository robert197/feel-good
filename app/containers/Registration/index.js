import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Button,
    TextInput,
    Text
} from 'react-native'
import Header from '../../components/Header'
import firebase from 'react-native-firebase';

const config = {
    apiKey: "AIzaSyC-0XuqCpAvHv8qsb1UDkSc8yjihIsC7Dc",
    authDomain: "feelgood-3c6a8.firebaseapp.com",
    databaseURL: "https://feelgood-3c6a8.firebaseio.com",
    projectId: "feelgood-3c6a8",
    storageBucket: "feelgood-3c6a8.appspot.com",
    messagingSenderId: "270985536317"
  };
firebase.initializeApp(config);

export default class Register extends Component {
    
    static navigationOptions = {
        header: null
    }

    constructor(props, context) {
        super(props, context)
        this._openLogin = this._openLogin.bind(this)
        this._register = this._register.bind(this)
        this._dataIsValid = this._dataIsValid.bind(this)
        this.state = { firstName: '', lastName: '', mail: '', password: '', repeatPassword: '', validationMessage: '' }
    }

    render() {
        return (
            <View>
                <Header title="Registration"/>

                <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(firstName) => this.setState({firstName})}
                placeholder={'First Name'}
                value={this.state.firstName}
                />

                <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(lastName) => this.setState({lastName})}
                placeholder={'Last Name'}
                value={this.state.lastName}
                />

                <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(mail) => this.setState({mail})}
                placeholder={'Email'}
                keyboardType={'email-address'}
                value={this.state.mail}
                />

                <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(password) => this.setState({password})}
                placeholder={'Password'}
                value={this.state.password}
                secureTextEntry={true}
                />

                <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(repeatPassword) => this.setState({repeatPassword})}
                placeholder={'Repeat Password'}
                value={this.state.repeatPassword}
                secureTextEntry={true}
                />

                <Button title="Register" onPress={this._register}/>

                <Text>{ this.state.validationMessage }</Text>
            </View>
        )
    }

    _register() {
        if (this._dataIsValid()) {
            firebase.auth().createUserWithEmailAndPassword(this.state.mail, this.state.password)
            .then(this._openLogin)
            .catch(console.log)
        }
    }

    _openLogin() {
        this.props.navigation.navigate('Login')
    }

    _dataIsValid() {
        if (this.state.firstName && this.state.lastName && this.state.mail && this.state.mail && this.state.password && this.state.repeatPassword) {
            if (this.state.password === this.state.repeatPassword) {
                return true
            }
            this.setState({validationMessage: 'Passwords do not match'})
            return false
        }
        this.setState({validationMessage: 'Not all fields are filled out'})
        return false
        
    }
}