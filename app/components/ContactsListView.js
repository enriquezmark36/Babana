import React, { Component } from 'react';
import * as Paper from 'react-native-paper';
import ReactNative from 'react-native';

const {
  Divider,
  List,
  Caption,
  withTheme,
} = Paper;

const {
  View,
  Text,
  StyleSheet,
  FlatList,
} = ReactNative;

class ContactListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: null,
    };
  }

  _renderItem = ({item}) => {
    if (typeof item.phoneNumbers !== 'object')
      return null;

    return (
      <View>
        {item.phoneNumbers.map((n,index) => {
            if (index === 0) {
              return (
                  <List.Item
                    title={item.fullname}
                    description={n.number}
                    key={n.id}
                    onPress={() => this.props.callbackAdd(item.fullname,n.number, n.id)}
                    right={ () =>
                      <Caption style={styles.rightLabel}>{n.label}</Caption>
                    }
                  />
              );
            } else {
              return (
                  <List.Item
                    description={n.number}
                    key={n.id}
                    onPress={() => this.props.callbackAdd(item.fullname,n.number, n.id)}
                    right={ () =>
                      <Caption style={styles.rightLabel}>{n.label}</Caption>
                    }
                  />
              );
            }
          })}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.listContainer}
          data={this.props.contactList}
          keyExtractor={(item) => item.recordID}
          renderItem={this._renderItem}
          ItemSeparatorComponent={Divider}
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
  rightLabel: {
    flexDirection: 'row',
    alignSelf: 'center',
  }
});

export default withTheme(ContactListView);
