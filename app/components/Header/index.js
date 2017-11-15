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
      paddingTop: 13,
      paddingBottom: 10,
      paddingLeft: 16,
      paddingRight: 16,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      elevation: 2,
      position: 'relative'
    },
    text: {
      fontSize: 38,
      fontWeight: 'bold',
      color: '#212121'
    },
    moreIcon: {
      marginTop: 12,
      color: '#212121'
    },
})