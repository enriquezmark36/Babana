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
import * as AlarmOptionNotify from '../components/AlarmOptionNotify'

const _options = {
  Repeat: AlarmOptionBlank,
  Label: AlarmOptionBlank,
  Notify: AlarmOptionNotify,
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
        right={(props) => item.item.right({...this.props, ...props})}
        left={(props) => item.item.left({...this.props, ...props})}
        onPress={(props) => item.item.onPress({...this.props, ...props})}
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
