import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class Header extends Component {
    constructor(props, context) {
        super(props, context)
        this.props = props
    }
    render() {
        return(
          <View style={styles.header}>
            <Text style={styles.text}>{this.props.title}</Text>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 13,
      paddingBottom: 10,
      paddingLeft: 16,
      paddingRight: 16,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2
    },
    text: {
      fontSize: 38,
      fontWeight: 'bold',
      color: '#212121'
    }
})