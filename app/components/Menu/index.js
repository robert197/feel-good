import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Animated, LayoutAnimation, NativeModules } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Ionicons'
const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

export default class Menu extends Component {
    constructor(props, context) {
        super(props, context)
        this.props = props
        this._toggleMenu = this._toggleMenu.bind(this)
        this.state = {
            isOpen: false
        }
    }

    _toggleMenu() {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        let menuList = null
        if (this.state.isOpen) {
            menuList = <Animated.View style={styles.menuList}>
                            {this.props.items.map(item => <Text key={item.text} onPress={item.method} style={styles.menuItem}>{item.text}</Text>)}
                       </Animated.View>
        }
        
        return (
            <View style={styles.menu}>
                <TouchableHighlight underlayColor={'transparent'} style={styles.menuClickableArea} onPress={this._toggleMenu}>
                    <Icon style={styles.moreIcon} size={30} name="md-more" />
                </TouchableHighlight>
                { menuList }
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
    menuClickableArea: {
        paddingLeft: 10,
        paddingRight: 10,
        right: 0
    },
    menuList: {
        flex: 1,
        padding: 15,
        backgroundColor: 'white',
        width: 150,
        height: 150,
        elevation: 2,
        borderRadius: 3
    },
    menuItem: {
        fontSize: 16,
        color: 'black'
    },
    moreIcon: {
        alignSelf: 'flex-end',
        marginTop: 10,
        color: '#212121'
    }
});