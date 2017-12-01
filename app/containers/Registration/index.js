import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Button,
    TextInput
} from 'react-native'
import Header from '../../components/Header'
import firebase from 'react-native-firebase';

export default class Register extends Component {
    
    static navigationOptions = {
        header: null
    }

    constructor(props, context) {
        super(props, context)
        this._openLogin = this._openLogin.bind(this)
        this.state = { firstName: '', lastName: '', mail: '', password: '', repeatPassword: '' }
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
                placeholder={'E-Mail'}
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
                onChangeText={(password) => this.setState({password})}
                placeholder={'Repeat Password'}
                value={this.state.repeatPassword}
                secureTextEntry={true}
                />

                <Button title="Register" onPress={this._openLogin}/>
            </View>
        )
    }

    _openLogin() {
        this.props.navigation.navigate('Login')
    }
}