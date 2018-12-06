import React, {Component} from 'react';
import * as ReactNative from 'react-native'
import * as NativeBase from 'native-base';
import Developers from './developers.json';

const {
  StyleSheet,
  View,
  Image,
  Linking,
} = ReactNative;

const {
  Title,
  Header,
  Body,
  Text,
  Button,
  Left,
  Right,
  Icon,
  Card,
  CardItem,
} = NativeBase;
//
const EmailButton = (props) => {
  if (props.address == null) {
    return null;
  }

  return (
    <Button transparent onPress={()=>Linking.openURL("mailto:"+props.address)}>
      <Text>Email</Text>
    </Button>
  );
}

const listFragment = (name) => {
  return(
    <CardItem bordered key={name} >
      <Body>
        <Text> {name} </Text>
          <EmailButton address={Developers[name].Email}/>
      </Body>
    </CardItem>
  );
}

const fragment = (props) => (
  <Card>
    <CardItem>
      <Text note> Developers </Text>
    </CardItem>
    {Object.keys(Developers).map(name => listFragment(name))}
  </Card>
)

export default fragment;
