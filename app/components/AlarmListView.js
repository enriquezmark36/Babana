import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import {
  Divider,
  List,
  Switch,
  IconButton,
  TouchableRipple,
  withTheme,
} from 'react-native-paper';

import type { Theme } from 'react-native-paper/types';

type Props = {
  theme: Theme,
  navigation: any,
};

class AlarmListView extends Component<Props> {
  _keyExtractor = item => item.id.toString();

  _renderItem = ({item}) => (
    <List.Item
      title={item.name}
      style={styles.alarmItem}
      right={ props =>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Switch {...props}
            value={item.switch}
            onValueChange={() => {
              console.log('Going to toggle an Alarm');
              this.props.toggleAlarm(item.id);
            }}
          />
          <IconButton {...props}
            icon="close"
            size={24}
            onPress={() => {
              console.log('Going to remove an Alarm');
              this.props.removeAlarm(item.id);
            }}
          />
        </View>
      }
    />
  );

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    return (
      <FlatList
        contentContainerStyle={{ backgroundColor: background }}
        data={Object.keys(this.props.alarmLister).map(key => this.props.alarmLister[key])}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        ItemSeparatorComponent={Divider}
      />
    );
  }
}

const styles = StyleSheet.create({
  alarmItem: {
    paddingLeft: 8,
  },
});

export default withTheme(AlarmListView);
