import React, {PureComponent} from 'react';
import * as ReactNative from 'react-native';
import * as NativeBase from "native-base";

import CommonStyles from "./styles";

const {
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Content,
  Icon,
} = NativeBase;

const {
  AsyncStorage,
  StyleSheet,
  Switch,
  View
} = ReactNative;

export default class ringtone extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wouldVibrate: true
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('wouldVibrate')
      .then((value) => {
        if (value) {
          this.setState({wouldVibrate: value === '0' ? false : true});
        }
      })
      .catch((err) => {console.log(err)})
    ;
  }

  _toggleVibrate() {
    wouldVibrate = !this.state.wouldVibrate
    this.setState({wouldVibrate});

    AsyncStorage.setItem('wouldVibrate', (wouldVibrate === false ? '0' : '1'))
      .catch((err) => {console.log(err)});
  }

  render() {
    return (
      <View
        style={CommonStyles.settingsItem}
      >
        <ListItem icon button noBorder
          onPress={this._toggleVibrate.bind(this)}
          style={CommonStyles.item}
        >
          <Left>
            <Icon name="vibrate" type="MaterialCommunityIcons" />
          </Left>

          <Body>
            <Text>Vibrate</Text>
          </Body>

          <Right>
            <Switch
              value={this.state.wouldVibrate}
              trackColor={{true: "#9e00c5", false: "#767676"}}
              thumbColor={"#ff5bff"}
              onValueChange={this._toggleVibrate.bind(this)}
            />
          </Right>
        </ListItem>
      </View>
    );
  }
}
