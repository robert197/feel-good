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
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged } from '../../actions/'

class Login extends Component {
    
    static navigationOptions = {
        header: null
    }

    constructor(props, context) {
        super(props, context)
        this._openHome = this._openHome.bind(this)
        this._login = this._login.bind(this)
        this._openRegistration = this._openRegistration.bind(this)
        this.state = {
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
                onChangeText={this.props.emailChanged}
                placeholder={'Email'}
                keyboardType={'email-address'}
                value={this.props.email}
                />

                <TextInput
                autoCorrect={false}
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={this.props.passwordChanged}
                placeholder={'Password'}
                value={this.props.password}
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
        if (!this.props.email || !this.props.password) {
            return false
        }
        this._toggleLoading()
        firebase.auth().signInWithEmailAndPassword(this.props.email, this.props.password)
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

const mapStateProps = (state) => {
    const { email, password } = state.auth
    return { email, password }
}

export default connect(mapStateProps, { emailChanged, passwordChanged })(Login)