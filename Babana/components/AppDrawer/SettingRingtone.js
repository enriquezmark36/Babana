import React, {PureComponent} from 'react';
import { View, StyleSheet, ScrollView, SectionList } from 'react-native';
import * as NativeBase from "native-base";
import BabanaRingtone from 'react-native-babana-ringtone';

import CommonStyles from "./styles";

const {
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Content,
} = NativeBase;

export default class ringtone extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      RingtoneURI: "",
      RingtoneName: "Default",
    };
    this._pickRingtone = this._pickRingtone.bind(this);
  }

  componentWillMount() {

  }

  async _pickRingtone(){
    await BabanaRingtone
        .pickRingtone()
        .catch((errcode, errmsg) => {
          console.log(errcode, errmsg);
    });
    BabanaRingtone.getLoadedRingtone(
      (errcode, errmsg) => console.log(errcode, errmsg),
      (title, uri) => this.setState({RingtoneURI: uri,RingtoneName: title})
    );
  }

  render() {
    return (
      <Content
        style={CommonStyles.settingsItem}
      >
        <ListItem
          icon button noBorder
          onPress={this._pickRingtone}
        >
          <Left>
            <Icon
              size={16}
              name="bell"
              type="MaterialCommunityIcons"
            />
          </Left>
          <Body>
            <Text>Ringtone</Text>
            <Text note>{this.state.RingtoneName}</Text>
          </Body>
          <Right/>
        </ListItem>
      </Content>
    );
  }
}
