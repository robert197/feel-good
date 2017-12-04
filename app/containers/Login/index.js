import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Button,
    TextInput,
    Text,
    Keyboard,
    ActivityIndicator,
    Animated
} from 'react-native'
import Header from '../../components/Header'
import firebase from 'react-native-firebase';

export default class Login extends Component {
    
    static navigationOptions = {
        header: null
    }

    constructor(props, context) {
        super(props, context)
        this._openHome = this._openHome.bind(this)
        this._login = this._login.bind(this)
        this._openRegistration = this._openRegistration.bind(this)
        this.state = {
            mail: '',
            password: '',
            validationMessage: '',
            loading: false,
            fadeInAnimationValue: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.timing(this.state.fadeInAnimationValue, { toValue: 1, duration: 100 }).start();     
    }

    render() {
        const { fadeInAnimationValue } = this.state
        return (
            <Animated.View style={{ opacity: fadeInAnimationValue }}>
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
            </Animated.View>
        )
    }

    _login() {
        if (!this.state.mail || !this.state.password) {
            return false
        }
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