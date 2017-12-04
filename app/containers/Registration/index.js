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

export default class Register extends Component {
    
    static navigationOptions = {
        header: null
    }

    constructor(props, context) {
        super(props, context)
        this._openLogin = this._openLogin.bind(this)
        this._register = this._register.bind(this)
        this._dataIsValid = this._dataIsValid.bind(this)
        this.state = { name: '', mail: '', password: '', repeatPassword: '', validationMessage: '' }
    }

    render() {
        return (
            <View>
                <Header title="Registration"/>

                <TextInput
                autoCorrect={false}
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(name) => this.setState({name})}
                placeholder={'Name'}
                value={this.state.name}
                />

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

                <TextInput
                autoCorrect={false}
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(repeatPassword) => this.setState({repeatPassword})}
                placeholder={'Repeat Password'}
                value={this.state.repeatPassword}
                secureTextEntry={true}
                />

                <Button title="Register" onPress={this._register}/>

                <Text>{ this.state.validationMessage }</Text>

                { this.state.loading ? <ActivityIndicator size={'large'}/> : null }
            </View>
        )
    }

    _register() {
        if (!this._allFieldsAreFilled()) {
            return false
        }
        if (this._dataIsValid()) {
            firebase.auth().createUserWithEmailAndPassword(this.state.mail, this.state.password)
            .then(user => {
                user.updateProfile({displayName: this.state.name})
                this._openLogin()
            })
            .catch(console.log)
        }
    }

    _openLogin() {
        this.props.navigation.navigate('Login')
    }

    _dataIsValid() {
        if (this._allFieldsAreFilled()) {
            if (this.state.password === this.state.repeatPassword) {
                return true
            }
            this.setState({validationMessage: 'Passwords do not match'})
            return false
        }
        this.setState({validationMessage: 'Not all fields are filled out'})
        return false
        
    }

    _allFieldsAreFilled() {
        return this.state.name && this.state.mail && this.state.mail && this.state.password && this.state.repeatPassword
    }
}