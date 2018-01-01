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
import { emailChanged, passwordChanged, loginUser } from '../../actions/'

class Login extends Component {
    
    static navigationOptions = {
        header: null
    }

    constructor(props, context) {
        super(props, context)
        this.openRegistration = this.openRegistration.bind(this)
        this.state = {
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

                <Button title="Login" onPress={this.login.bind(this)}/>
                <Button title="Register" onPress={this.openRegistration}/>

                { this.props.loading ? <ActivityIndicator size={'large'}/> : null }

                <Text>{ this.props.error }</Text>
            </Animated.View>
        )
    }

    login() {
        this.props.loginUser(this.props.email, this.props.password)
    }

    openRegistration() {
        this.props.navigation.navigate('Registration')
    }
}

const mapStateProps = (state) => {
    const { email, password, loading, error } = state.auth
    return { email, password, loading, error }
}

export default connect(mapStateProps, { emailChanged, passwordChanged, loginUser })(Login)