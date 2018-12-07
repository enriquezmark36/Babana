import React, {PureComponent} from 'react';
import { View, StyleSheet, ScrollView, SectionList } from 'react-native';
import * as NativeBase from "native-base";

const {
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Button,
  Icon,
} = NativeBase;

export default class ringtone extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      RingtoneURI: null,
      RingtoneName: null,
    };
  }

  componentWillMount() {

  }

  render() {
    return (
      <ListItem button noBorder>
        <Text>Choose ringtone</Text>
      </ListItem>
    );
  }
}
