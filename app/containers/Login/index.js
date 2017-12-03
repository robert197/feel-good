import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Button,
    TextInput,
    Text,
    Keyboard,
    ActivityIndicator
} from 'react-native'
import Header from '../../components/Header'
import firebase from 'react-native-firebase';

const config = {
    apiKey: 'AIzaSyC-0XuqCpAvHv8qsb1UDkSc8yjihIsC7Dc',
    authDomain: 'feelgood-3c6a8.firebaseio.com/',
    databaseUrl: 'https://feelgood-3c6a8.firebaseio.com/'
}

export default class Login extends Component {
    
    static navigationOptions = {
        header: null
    }

    constructor(props, context) {
        super(props, context)
        this._openHome = this._openHome.bind(this)
        this._login = this._login.bind(this)
        this._openRegistration = this._openRegistration.bind(this)
        this.state = { mail: '', password: '', validationMessage: '', loading: false }
    }

    render() {
        return (
            <View>
                <Header title="Login"/>

                <TextInput
                autoCorrect={false}
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(mail) => this.setState({mail})}
                placeholder={'Email'}
                keyboardType={'email-address'}
                value={this.state.mail}
                />

                <TextInput
                autoCorrect={false}
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(password) => this.setState({password})}
                placeholder={'Password'}
                value={this.state.password}
                secureTextEntry={true}
                />

                <Button title="Login" onPress={this._login}/>
                <Button title="Register" onPress={this._openRegistration}/>

                { this.state.loading ? <ActivityIndicator size={'large'}/> : null }

                <Text>{ this.state.validationMessage }</Text>
            </View>
        )
    }

    _login() {
        this._toggleLoading()
        firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.password)
        .then((user) => {
            Keyboard.dismiss()
            this._toggleLoading()
            this._openHome()
        })
        .catch(() => {
            this._toggleLoading()
            this.setState({validationMessage: 'Email or password was wrong. Please check if your data is correct or create new account.'})
        })
    }

    _openHome() {
        this.props.navigation.navigate('Home')
    }

    _openRegistration() {
        this.props.navigation.navigate('Registration')
    }

    _toggleLoading() {
        this.setState({loading: !this.state.loading})
    }
}