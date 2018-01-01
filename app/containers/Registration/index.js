import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Button,
    TextInput,
    Text,
    ActivityIndicator
} from 'react-native'
import Header from '../../components/Header'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import { nameChanged, emailChanged, passwordChanged, confirmPasswordChanged, registerUser } from '../../actions' 

class Register extends Component {
    
    static navigationOptions = {
        header: null
    }

    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <View>
                <Header title="Registration"/>

                <TextInput
                autoCorrect={false}
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={this.props.nameChanged}
                placeholder={'Name'}
                value={this.props.name}
                />

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

                <TextInput
                autoCorrect={false}
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={this.props.confirmPasswordChanged}
                placeholder={'Confirm Password'}
                value={this.props.confirmPassword}
                secureTextEntry={true}
                />

                <Button title="Register" onPress={this.register.bind(this)}/>

                <Text>{ this.props.error }</Text>

                { this.props.loading ? <ActivityIndicator size={'large'}/> : null }
            </View>
        )
    }

    register() {
        const { name, email, password, confirmPassword } = this.props
        this.props.registerUser(name, email, password, confirmPassword)
    }
}

const mapStateProps = state => {
    const { name, email, password, confirmPassword, loading, error } = state.auth
    return { name, email, password, confirmPassword, loading, error }
}

export default connect(mapStateProps, { nameChanged, emailChanged, passwordChanged, confirmPasswordChanged, registerUser })(Register)