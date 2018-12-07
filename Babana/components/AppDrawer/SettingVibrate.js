import React, {PureComponent} from 'react';
import * as ReactNative from 'react-native';
import * as NativeBase from "native-base";

const {
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Content,
  Switch // AFAIK, this only wraps the theme from RN
} = NativeBase;

const {
  View,
  StyleSheet,
  ScrollView,
  SectionList,
} = ReactNative;

export default class ringtone extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wouldVibrate: true
    };
  }

  componentWillMount() {
  }

  _toggleVibrate() {
    this.setState(function(state, props) {
      return {
        wouldVibrate: !state.wouldVibrate
      };
    });
  }

  render() {
    return (
      <ListItem button noBorder
        onPress={this._toggleVibrate.bind(this)}
      >
          <Left>
            <Text>Vibrate</Text>
          </Left>

          <Body/>

          <Right>
            <Switch
              value={this.state.wouldVibrate}
              onValueChange={this._toggleVibrate.bind(this)}
            />
          </Right>
      </ListItem>
    );
  }
}
