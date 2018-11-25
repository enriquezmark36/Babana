import React, { Component } from 'react';
import * as NativeBase from 'native-base';
import ReactNative from 'react-native';

const {
  Text,
  ListItem,
  Left,
  Body,
  Right,
  List,
  Icon,
  Button,
} = NativeBase;

const {
  View,
  StyleSheet,
} = ReactNative;

export default class ContactsListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: null,
    };
  }

  _renderItem = (item) => {
    if (typeof item.phoneNumbers !== 'object')
      return null;

    var len = item.phoneNumbers.length - 1;
    return (
      item.phoneNumbers.map((n,index) => {
        return (
          <ListItem
            noBorder={len === index ? false : true}
            onPress={() => this.props.callbackAdd(item.fullname,n.number, n.id)}
            key={n.id}
          >
            <Body>
              {(index === 0) && (
                <Text>{item.fullname}</Text>
              )}
              <Text note>{n.number}</Text>
            </Body>
            <Right>
              <Text note>{n.label}</Text>
            </Right>
          </ListItem>
        );
      })
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <List
          style={styles.listContainer}
          dataArray={this.props.contacts}
          renderRow={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex:1,
  },
  listContainer: {
    flex: 1,
  },
});
