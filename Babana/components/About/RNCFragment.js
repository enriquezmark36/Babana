import React, {Component} from 'react';
import * as ReactNative from 'react-native'
import * as NativeBase from 'native-base';
import {dependencies} from '../../package.json';

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

const listFragment = (name, version) => {
  return(
    <CardItem bordered key={name}>
      <Body>
        <Text> {name} </Text>
        <Text note> {version.replace(/[^0-9.]/g, '')} </Text>
      </Body>
    </CardItem>
  );
}
const fragment = (props) => (
  <Card>
    <CardItem>
      <Text note> React Native</Text>
    </CardItem>
    {Object.keys(dependencies).map(name => listFragment(name, dependencies[name]))}
  </Card>
)

export default fragment;
