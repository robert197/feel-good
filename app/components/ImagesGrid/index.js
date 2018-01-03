import React, {Component} from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class ImagesGridComponent extends Component {

    constructor(props, context) {
      super(props, context)
      this.getImageRows = this.getImageRows.bind(this)
      this._renderRow = this._renderRow.bind(this)
    }

  render(){
    return (
      // ListView wraps ScrollView and so takes on its properties. 
      // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
      <ListView contentContainerStyle={styles.list}
        dataSource={this.getImageRows()}
        renderRow={this._renderRow}
        enableEmptySections={true}
      />
    );
  }

  getImageRows() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    return ds.cloneWithRows(this.props.images)
  }

  _renderRow(rowData, sectionID, rowID) {
    const rowHash = Math.abs(hashCode(rowData));
    const imgSource = {
      uri: rowData
    };
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor='rgba(0,0,0,0)'>
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={imgSource} />
          </View>
        </View>
      </TouchableHighlight>
    );
  }


  _pressRow(rowID) {
    console.log(rowID)
  }

}

var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    padding: 2,
    margin: 10,
    width: 150,
    height: 200,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 140,
    height: 190
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  }
});