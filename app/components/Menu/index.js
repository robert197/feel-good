import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Ionicons'

export default class Menu extends Component {
    constructor(props, context) {
        super(props, context)
        this.props = props
    }

    render() {
        return (
            <View style={styles.menu}>
                <TouchableHighlight underlayColor={'transparent'} style={styles.menuClickableArea} onPress={this._openMenu}>
                    <Icon style={styles.moreIcon} size={30} name="md-more" />
                </TouchableHighlight>
                <View style={styles.menuWrapper}>
                    <Text style={styles.menuItem}>Log out</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    menu: {
        position: 'absolute',
        zIndex: 100,
        right: 10,
        top: 10
    },
    menuWrapper: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        width: 150,
        height: 150,
        elevation: 1
    },
    menuClickableArea: {
        paddingLeft: 10,
        paddingRight: 10,
        right: 0
    },
    menuItem: {
        fontSize: 20,
    },
    moreIcon: {
        alignSelf: 'flex-end',
        marginTop: 10,
        color: '#212121'
    }
});