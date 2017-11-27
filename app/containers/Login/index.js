import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Button,
    TextInput
} from 'react-native'
import Header from '../../components/Header'

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
        this.state = { mail: '', password: '' }
    }

    render() {
        return (
            <View>
                <Header title="Login"/>

                <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(mail) => this.setState({mail})}
                keyboardType={'email-address'}
                value={this.state.mail}
                />

                <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                secureTextEntry={true}
                />

                <Button title="Login" onPress={this._openHome}/>
            </View>
        )
    }

    _openHome() {
        const { navigate } = this.props.navigation
        navigate('Home')
    }
}