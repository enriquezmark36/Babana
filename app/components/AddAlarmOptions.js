import React, { PureComponent } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import {
  Divider,
  List,
  Switch,
  IconButton,
  TouchableRipple,
  withTheme,
} from 'react-native-paper';

import * as AlarmOptionBlank from '../components/AlarmOptionTemplate'

const _options = {
  Repeat: AlarmOptionBlank,
  Label: AlarmOptionBlank,
  Notify: AlarmOptionBlank,
  Ringtone: AlarmOptionBlank,
  Vibrate: AlarmOptionBlank,
};

export default class AddAlarmOptions extends PureComponent<Props> {
  _keyExtractor = ({key, item}) => key;

  _renderItem = ({item}) => {
    return (
      <List.Item
        title={item.key}
        style={styles.listItem}
        right={() => item.item.right(this.props)}
        left={() => item.item.right(this.props)}
        onPress={() => item.item.onPress(this.props)}
      />
    );
  };

  render() {
    return (
      <FlatList
        data={Object.keys(_options).map(key => ({key: key , item: _options[key] }) )}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ItemSeparatorComponent={Divider}
      />
    );
  }
}
const styles = StyleSheet.create({
  listItem: {
    paddingLeft: 8,
  },
});
