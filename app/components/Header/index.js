import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/dist/Ionicons'

export default class Header extends Component {
    constructor(props, context) {
        super(props, context)
        this.props = props
    }
    render() {
        return(
          <View style={styles.header}>
            <Text style={styles.text}>{this.props.title}</Text>
            <Icon style={styles.moreIcon} size={30} name="md-more" />
          </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 16
    },
    text: {
      fontSize: 38,
      fontWeight: 'bold',
      color: '#212121'
    },
    moreIcon: {
      marginTop: 12,
      marginRight: 16,
      color: '#212121'
    },
})